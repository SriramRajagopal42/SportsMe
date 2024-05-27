import {useGroupsContext} from '../hooks/useGroupsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {useState} from 'react';
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Comments from '../components/Comments'

const GroupDetails = ({group}) => {

    const {dispatch} = useGroupsContext()
    const {user} = useAuthContext()
    const [comment_str, setComment] = useState('');
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

        console.log(response);

        const json = await response.json()

        if (response.ok) {
            dispatch({type: "DELETE_GROUP", payload: json})
        }
    }

    const addCommment = async() => {
        console.log(comment_str);
        if (!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/groups/addComment/' + group._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comments: {user: user.username, comment: comment_str}})
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: "DELETE_GROUP", payload: json});
            dispatch({type: "CREATE_GROUP", payload: json});
        }


        // comments: [{
        //     user: {
        //       type: String,
        //       required: true
        //     },
        //     comment: {
        //       type: String,
        //       required: true
        //     }
        //   }]

    }

    return (
        <div className="workout-details">
            <h4>{group.sport}</h4>
            <p><strong>Place: </strong>{group.place}</p>
            <p><strong>Date: </strong>{group.date}</p>
            <p><strong>Time: </strong>{group.time}</p>
            <p><strong>Group size: </strong>{group.group_size}</p>
            <p>{formatDistanceToNow(new Date(group.createdAt), {addSuffix: true})}</p>
            <hr />
            <Comments comments={group.comments}/>

            <input onChange={(e)=>{setComment(e.target.value)}}></input>
            <button onClick={addCommment}>Comment</button>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default GroupDetails