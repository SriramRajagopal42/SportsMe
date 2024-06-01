import React from 'react';
import {useEffect,} from 'react'
import {useGroupsContext} from '../hooks/useGroupsContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';

//components
import GroupDetails from '../components/GroupDetails'
import GroupForm from '../components/GroupForm'

const Home = () => {

    const {groups, dispatch} = useGroupsContext()
    const {user} = useAuthContext()

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/groupslist');
    };

    useEffect(() => {
        const fetch_groups = async() => {
                const response = await fetch('http://localhost:4000/api/groups/filtered', {
                method: 'POST',

                //This line does the filtering
                body: JSON.stringify({member_ids: user.id}),

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





    return (
        <div className="home">
            <div className='workouts'>
                <h1>Current Groups</h1>
                {groups && groups.map((group) => (
                    <GroupDetails key={group._id} group={group} />
                ))}
                <button className="home-button" onClick={handleClick}>Look For Groups</button>

            </div>
            <GroupForm />
        </div>
    )
}

export default Home