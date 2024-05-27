import {useGroupsContext} from '../../hooks/useGroupsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import {useState, useEffect, useRef} from 'react';

import "./Comments.css";


const Comments = ({comments, group_id}) => {

    const {dispatch} = useGroupsContext()
    const {user} = useAuthContext()
    const [comment_str, setComment] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const commentsRef = useRef(null);

    const addCommment = async(event) => {
        event.preventDefault();
        setComment("");
        if (!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/groups/addComment/' + group_id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comments: {user: user.username, comment: comment_str}})
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: "UPDATE_GROUP", payload: json});
        }

    }

    useEffect(() => {
        if (isVisible && commentsRef.current) {
          const handleScroll = () => {
            const element = commentsRef.current;
            if (element) {
              const bottomPosition = element.getBoundingClientRect().bottom;
              window.scrollTo({
                top: window.scrollY + bottomPosition,
                behavior: 'smooth'
              });
            }
          };
          handleScroll();
        }
      }, [isVisible]); 

    
    return  (
        <div>
            <button onClick={() => {setIsVisible(!isVisible)}} className="toggle_button">
                    {isVisible ? 'Hide Comments' : 'Show Comments'}
                </button>
             {isVisible && (
            <div ref={commentsRef} className="comments_container">
                {comments.map((comment, index) => (
                    <div key={index} className="comment_item">
                    <h4 className="comment_user">{comment.user}</h4>
                    <p className="comment_text">{comment.comment}</p>
                    </div>
                    ))}
                <form className="comment_form" onSubmit={addCommment}>
                    <input 
                    type="text"
                    className="comment_input"
                    placeholder="Write a comment..."
                    value={comment_str}
                    onChange={(event) => {setComment(event.target.value)}}
                    />
                    <button type="submit" className="comment_button">Comment</button>
                </form>
            </div>
            )} 
        </div>
        
    );

}


export default Comments