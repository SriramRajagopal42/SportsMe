import React from 'react';
import {useEffect,} from 'react';
import {useGroupsContext} from '../hooks/useGroupsContext';
import {useAuthContext} from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

// Components
import GroupDetails from '../components/GroupDetails'
import GroupForm from '../components/GroupForm'
import FilterBar from '../components/FilterBar';
import { useFriendContext } from '../hooks/useFriendsContext';

const Home = () => {

    const {groups, dispatch} = useGroupsContext()
    const {user} = useAuthContext()
    const {friends} = useFriendContext();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/groupslist');
    };

    useEffect(() => {
        const fetch_groups = async() => {

            const countOccurences = (member_arr) => {
                return member_arr.reduce((count, member) => (friends.includes(member) ? count + 1 : count) ,0)
            }
            
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
    }, [dispatch, user, friends])

    
    return (
        <div className="home">
            <div className='workouts'>
                <FilterBar type={"home"}/>
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