import React, { useEffect, useState } from 'react';
import { getCommentsByPostId } from '../services/post.service';
import Comment from './Comment';

const CommentsList = (props) => {
    const [comments, setComments] = useState([])
    const postId = props.postId
    useEffect(() => {
        getCommentsByPostId(postId).then((res) => {
            setComments(res.data)
          })
    }, []);
    return (
        <div className='p-4 xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 m-auto mb-5 bg-slate-700 rounded-2xl'>
            {comments && comments.length > 0 ? 
                comments.map((comment, index) => {
                    return(
                        <div key={index}>
                            <Comment comment={comment}/>
                        </div>
                    )
                }) : <h1 className='text-center dark:text-white text-xl'>No comments</h1>
            }
        </div>
    );
}

export default CommentsList;
