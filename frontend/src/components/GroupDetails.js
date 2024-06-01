/* eslint-disable react/react-in-jsx-scope */
import {useGroupsContext} from '../hooks/useGroupsContext'
import { useAuthContext } from '../hooks/useAuthContext'
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

    return (
        <div className="workout-details">
            <h4>{group.sport}</h4>
            <p><strong>Members: </strong>{group.usernames}</p>
            <p><strong>Place: </strong>{group.place}</p>
            <p><strong>Date: </strong>{group.date}</p>
            <p><strong>Time: </strong>{group.time}</p>
            <p><strong>Group size: </strong>{group.group_size}</p>
            <p>{formatDistanceToNow(new Date(group.createdAt), {addSuffix: true})}</p>
            <hr />
            <Comments comments={group.comments} group_id={group._id}/>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default GroupDetails