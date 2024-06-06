/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import {useGroupsContext} from '../hooks/useGroupsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Comments from './Comments/Comments'

const GroupDetails = ({group}) => {

    const {dispatch} = useGroupsContext()
    const {user} = useAuthContext()


    


    const handleClick = async() => {
        if (!user) {
            return
        }
        
        const response = await fetch('http://localhost:4000/api/groups/' + group._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: "DELETE_GROUP", payload: json})
        }
    }

    const handleJoin = async() => {
        console.log("testing");
        const response = await fetch('http://localhost:4000/api/groups/join/' + group._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        // console.log(response.json);
        // console.log(response);

        const json = await response.json()


        if (response.ok) {
            dispatch({type: "SET_GROUP", payload: json})
        }
    }

    const handleLeave = async() => {
        console.log("testing");
        const response = await fetch('http://localhost:4000/api/groups/leave/' + group._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })


        const json = await response.json()


        if (response.ok) {
            dispatch({type: "SET_GROUP", payload: json})
        }
    }



    return (
        <div className="workout-details">
            <h4>{group.sport}</h4>
            <p>
            <strong>Members: </strong>
                {group.usernames.map((username, index) => (
                    <Link to={`/profile/${group.member_ids[index]}`} key={index} style={{ textDecoration: 'none', color: 'pink' }} >  {username}{index < group.usernames.length - 1 ?  ', ' : ''} </Link>

                ))}
            </p>
            <p><strong>Place: </strong>{group.place}</p>
            <p><strong>Date: </strong>{group.date}</p>
            <p><strong>Time: </strong>{group.time}</p>
            <p><strong>Group size: </strong>{group.group_size}</p>
            <p>{formatDistanceToNow(new Date(group.createdAt), {addSuffix: true})}</p>
            <hr />
            <Comments comments={group.comments} group_id={group._id}/>
            {!group.member_ids.includes(user.id) && <button onClick={handleJoin}>Join Group</button>}
            {group.member_ids.includes(user.id) && !(group.creator_id === user.id) && <button onClick={handleLeave}>Leave Group</button>}
            {group.creator_id === user.id && <span className="material-symbols-outlined" onClick={handleClick}>delete</span>}
        </div>
    )
}

export default GroupDetails