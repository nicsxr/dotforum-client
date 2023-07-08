import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateComment from './CreateComment';

const Comment = (props) => {
    const comment = props.comment

    const { user } = useSelector((state) => state.auth)
    const [showCreateComment, setShowCreateComment] = useState(false);
    
    function toggleComment(){
        setShowCreateComment(!showCreateComment)
    }

    return (
        <div className='dark:text-white relative'>
            {comment.childComments && comment.childComments.length >= 1 && <button className='absolute bg-slate-800 ml-2 top-1 w-[2px]' style={{height: "calc(100% - 9px)"}}></button>}
            <div className='bg-slate-800 m-2 rounded-md flex justify-between'>
                <div className='p-5'>
                    <p className='text-gray-400'>u/{comment.username}</p>
                    <div className=''>
                        {comment.text}
                    </div>
                </div>
                {user && <button onClick={toggleComment} style={{"alignSelf": "flex-end"}} className='mr-5 mb-5'>reply</button>}
            </div>

            {user && <div className='w-full'>
                {showCreateComment && <CreateComment parentCommentId={comment.commentId} isMainComment={false}/>}
            </div>}


            {/* Render child comments */}
            <div>
                {comment.childComments && comment.childComments.length > 0 && 
                    comment.childComments.map((childComment, index) => {
                        return(
                            <div  key={index} className='ml-5'>
                                <Comment comment={childComment}/>
                            </div>
                        )
                    })
                }
                {comment.childComments.length >= 3 && 
                    <button className='ml-3'>Load more</button>
                }
            </div>
        </div>
    );
}

export default Comment;
