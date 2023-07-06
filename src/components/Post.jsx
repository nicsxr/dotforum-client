/* eslint-disable react/prop-types */
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ForumIcon from '@mui/icons-material/Forum';
import { VoteStatus } from '../utils/enums'
import { useNavigate } from 'react-router-dom';
import { votePost } from '../services/post.service';
import { useState } from 'react';

function Post(props) {
  // let post = props.post
  const [post, setPost] = useState(props.post)
  const navigate = useNavigate()

  async function vote(userVote){
    votePost(post.id, userVote).then((res) => {
      console.log(res)
      setPost(res.data)
    })
  }
  return (
    <>
      <div className='p-4 xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 m-auto mb-5 bg-slate-800 rounded-2xl'>
        <div className='flex justify-between pr-5 pl-5 -mt-2'>
          <div>
            <h5 className='text-md font-normal tracking-tight text-gray-400 dark:text-white'>
              u/{post.username}
            </h5>
          </div>
          <div className=''>
            <h5 className='text-lg font-normal tracking-tight text-gray-400 dark:text-white'>
              c/{post.communityName}
            </h5>
          </div>
        </div>
        <div onClick={() => navigate(`/post/${post.id}`)} className='bg-slate-700 relative cursor-pointer rounded-md pb-1'>
          <h5 className='text-2xl font-normal tracking-tight text-gray-900 dark:text-white text-left pl-5'>
            {post.title}
          </h5>
          <div className='mt-3 rounded-md'>
            <h1 className='dark:text-gray-300 pl-5 mt-4 truncate'>
              {post.body}
            </h1>
          </div>
          {/* <button onClick={() => navigate(`/post/${post.id}`)}  className='w-full h-full top-0 left-0 absolute opacity-100'>asdfasdf</button> */}
        </div>
        <div className='px-5 pl-3'>
            <div className='flex justify-between items-center mt-3'>
                <div className="text-3xl font-bold text-gray-900 dark:text-white flex">
                    <button onClick={() => vote(VoteStatus.Upvote)}>
                        {post.vote == VoteStatus.Upvote
                            ? <ThumbUpIcon />
                            : <ThumbUpOutlinedIcon />
                        }
                    </button>
                    <span className="mr-3 ml-3">{post.upvotes-post.downvotes}</span>
                    <button onClick={() => vote(VoteStatus.Downvote)}>
                        {post.vote == VoteStatus.Downvote
                            ? <ThumbDownIcon />
                            : <ThumbDownOutlinedIcon />
                        }
                    </button>
                </div>
                <button className="flex place-items-center dark:text-white" onClick={() => navigate(`/post/${post.id}`)}>
                    <ForumIcon fontSize="large" color=""/>
                    <span className="ml-1 text-lg">{post.totalComments} comments</span>
                </button>
            </div>
          </div>
      </div>
    </>
  )
}

export default Post
