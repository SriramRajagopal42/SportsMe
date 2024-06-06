import React from 'react';
import {useEffect,} from 'react'
import {useGroupsContext} from '../hooks/useGroupsContext'
import {useAuthContext} from '../hooks/useAuthContext'

//components
import GroupDetails from '../components/GroupDetails'
import FilterBar from '../components/FilterBar';


const GroupsList = () => {

    const {groups, dispatch} = useGroupsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetch_groups = async() => {
            const response = await fetch('http://localhost:4000/api/groups/filtered/inverse_user', {
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

    return (
        <div className="home">
            <div className='workouts'>
                <FilterBar type={"groups_list"}/>
                <h1>Available Groups</h1>
                {groups && groups.map((group) => (
                    <GroupDetails key={group._id} group={group} />
                ))}

            </div>
        </div>
    )
}

export default GroupsList