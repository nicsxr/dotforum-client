import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getCommentsByPostId, getPostById } from '../services/post.service';
import { VoteStatus } from '../utils/enums'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ForumIcon from '@mui/icons-material/Forum';
import CommentsList from '../components/CommentsList';
import CreateComment from '../components/CreateComment';
import { useSelector } from 'react-redux';

function Post() {
    const [post, setPost] = useState(null)

    let { id } = useParams()
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        getPostById(id).then((res) => {
            setPost(res.data)
          })
    }, [id]);

    return (
        <>
        { post && <div className='p-4 xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 m-auto mb-5 bg-slate-800 rounded-2xl'>
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
          <div className='bg-slate-700 relative cursor-pointer rounded-md'>
            <a href={`/post/${post.id}`} className='w-full h-full top-0 left-0 absolute opacity-0'>aa</a>
            <h5 className='text-2xl font-normal tracking-tight text-gray-900 dark:text-white text-left pl-5'>
              {post.title}
            </h5>
            <div className='mt-3 rounded-md'>
              <h1 className='dark:text-gray-300 pl-5 mt-4 truncate'>
                {post.body}
              </h1>
            </div>
          </div>
          <div className='px-5 pl-3'>
            <div className='flex justify-between items-center mt-3'>
                <div className="text-3xl font-bold text-gray-900 dark:text-white flex">
                    <button>
                        {post.vote == VoteStatus.Upvote
                            ? <ThumbUpIcon />
                            : <ThumbUpOutlinedIcon />
                        }
                    </button>
                    <span className="mr-3 ml-3">{post.upvotes-post.downvotes}</span>
                    <button>
                        {post.vote == VoteStatus.Downvote
                            ? <ThumbDownIcon />
                            : <ThumbDownOutlinedIcon />
                        }
                    </button>
                </div>
                <button className="flex place-items-center dark:text-white">
                    <ForumIcon fontSize="large" color=""/>
                    <span className="ml-1 text-lg">{post.totalComments} comments</span>
                </button>
            </div>
          </div>
        </div>
        }
        {user && post && <CreateComment postId={id} isMainComment={true}/>}
        


        {/* COMMENTS */}
        <div>
          <CommentsList postId={id}/>
        </div>
      </>
    )
}

export default Post