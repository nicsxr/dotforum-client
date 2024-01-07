import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateComment from './CreateComment';
import { getChildCommentsByCommentId, voteComment } from '../services/comment.service';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { VoteStatus } from '../utils/enums';

const Comment = (props) => {
    // const comment = props.comment

    const [comment, setComment] = useState(props.comment)
    const { user } = useSelector((state) => state.auth)
    const [childComments, setChildComments] = useState(props.comment.childComments)
    const [showCreateComment, setShowCreateComment] = useState(false);
    const [showChildComments, setShowChildComments] = useState(true)
    const [page, setPage] = useState(comment.childComments.length > 0 ? 2 : 1)
    
    function toggleCreateComment(){
        setShowCreateComment(!showCreateComment)
    }

    function toggleShowChildComments(){
        setShowChildComments(!showChildComments)
    }

    async function getChildComments(){
        getChildCommentsByCommentId(comment.commentId, page, comment.childComments.length > 0 ? comment.childComments.length : 5).then((res) => {
            setChildComments([...childComments, ...res.data])
            setPage(page + 1)
        })
    }

    async function vote(userVote){
        voteComment(comment.commentId, userVote).then((res) => {
          console.log(res)
        //   if(res.data){
        //       const oldComm = comment
        //       oldComm.vote = res.data.vote
        //       oldComm.upvotes = res.data.upvotes
        //       oldComm.downvotes = res.data.downvotes
        //     }
            setComment(res.data)
        })
    }
    return (
        <div className='dark:text-white relative'>
            {/* Side line-button */}
            {childComments && childComments.length >= 1 
            && <button className={showChildComments ? `absolute bg-slate-800 ml-2 top-1 w-[2px] z-10` : "hidden"} style={{height: "calc(100% - 9px)"}} onClick={toggleShowChildComments}></button>}
            

            <div className='bg-slate-800 mt-2 mr-2 ml-2 rounded-md flex justify-between'>
                <div className='p-5' onClick={toggleShowChildComments}>
                    <p className='text-gray-400'>u/{comment.username}</p>
                    <div>
                        {comment.text}
                    </div>
                </div>
                <div className='px-5 pl-3'>
            <div className='flex justify-between items-center mt-3'>
                <div className="text-3xl font-bold text-gray-900 dark:text-white flex">
                    <button onClick={() => vote(VoteStatus.Upvote)}>
                        {comment.vote == VoteStatus.Upvote
                            ? <ThumbUpIcon />
                            : <ThumbUpOutlinedIcon />
                        }
                    </button>
                    <span className="mr-3 ml-3">{comment.upvotes-comment.downvotes}</span>
                    <button onClick={() => vote(VoteStatus.Downvote)}>
                        {comment.vote == VoteStatus.Downvote
                            ? <ThumbDownIcon />
                            : <ThumbDownOutlinedIcon />
                        }
                    </button>
                </div>
            </div>
          </div>
            </div>
            {comment.childCommentsCount > 0 && childComments.length == comment.childCommentsCount && <p className='justify-items-start ml-4' onClick={toggleShowChildComments}>{comment.childCommentsCount} comments</p> }
            <div className='pr-5 mb z-10 left-0 w-full text-right'>
                {user && <button onClick={toggleCreateComment}>reply</button>}
            </div>

            {user && <div className='w-full'>
                {showCreateComment && <CreateComment parentCommentId={comment.commentId} isMainComment={false}/>}
            </div>}

            {/* Render child comments */}
            <div className={showChildComments ? "" : "hidden"}>
                {childComments && childComments.length > 0 && 
                    childComments.map((childComment, index) => {
                        return(
                            <div  key={index} className='ml-5'>
                                <Comment comment={childComment}/>
                            </div>
                        )
                    })
                }
                {childComments.length < comment.childCommentsCount && 
                    <button className='ml-3' onClick={getChildComments}>show more</button>
                }
            </div>

        </div>
    );
}

export default Comment;
