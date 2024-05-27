


const Comments = ({comments}) => {


    return  (

        <div>
            <h2><strong>Comments</strong></h2>
            {comments.map((comment) => (
                <div>
                   <h4>{comment.user}</h4>
                   <p>{comment.comment}</p>
                </div>
                ))}
        </div>

    );



}


export default Comments