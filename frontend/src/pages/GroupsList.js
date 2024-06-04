import React from 'react';
import {useEffect,} from 'react'
import {useGroupsContext} from '../hooks/useGroupsContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';

//components
import GroupDetails from '../components/GroupDetails'


const GroupsList = () => {

    const {groups, dispatch} = useGroupsContext()
    const {user} = useAuthContext()





    useEffect(() => {
        const fetch_groups = async() => {
                const response = await fetch('http://localhost:4000/api/groups/filtered', {
                method: 'POST',



                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_GROUPS', payload: json})
            }

        }

        if (user) {
            fetch_groups()
        }
    }, [dispatch, user])


    const userNotInGroups = groups.map(group => {
        if (group.member_ids.includes(user.id)){
            return undefined;
        } else {
            return group;
        }
    }).filter(item => item !== undefined); // Remove undefined elements

    //groups
    //  group -. member_ids
    //              ids



    return (
        <div className="home">
            <div className='workouts'>
                <h1>Available Groups</h1>
                {userNotInGroups && userNotInGroups.map((group) => (
                    <GroupDetails key={group._id} group={group} />
                ))}

            </div>
        </div>
    )
}

export default GroupsList