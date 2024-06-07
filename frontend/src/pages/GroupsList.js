import React from 'react';
import {useEffect,useState} from 'react'
import {useGroupsContext} from '../hooks/useGroupsContext'
import {useAuthContext} from '../hooks/useAuthContext'

//components
import GroupDetails from '../components/GroupDetails'
import FilterBar from '../components/FilterBar';
import { useFriendContext } from '../hooks/useFriendsContext';


const GroupsList = () => {

    const {groups, dispatch} = useGroupsContext()
    const {user} = useAuthContext()
    const {friends} = useFriendContext();
    const [ordered_groups, setOrderedGroups] = useState([]);

    const countOccurences = (member_arr) => {
        return member_arr.reduce((count, member) => (friends.includes(member) ? count + 1 : count) ,0)
    }

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
                const sorted_groups = [...json].sort((a, b) => {
                    const countA = countOccurences(a.member_ids);
                    const countB = countOccurences(b.member_ids);
                    return countB - countA;
                  });
                dispatch({type: 'SET_GROUPS', payload: sorted_groups})
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