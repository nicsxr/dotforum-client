import React, { useEffect, useState } from 'react';
import { getCommentsByPostId } from '../services/post.service';
import Comment from './Comment';
import InfiniteScroll from 'react-infinite-scroll-component';

const CommentsList = (props) => {
    const [comments, setComments] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)


    const postId = props.postId
    useEffect(() => {
        fetchPostComments()
    }, []);

    async function fetchPostComments(){
        console.log(page)
        getCommentsByPostId(postId, page).then((res) => {
            console.log(comments)
            setComments([...comments, ...res.data])
            setPage(page + 1)
            if(res.data.length == 0) setHasMore(false)
        })
    }
    return (
        <div className='p-4 xl:w-2/5 lg:w-2/3 md:w-2/3 w-11/12 m-auto mb-5 bg-slate-700 rounded-2xl'> {/* min-h-full ????? */}
            <InfiniteScroll
                dataLength={comments.length} //This is important field to render the next data
                next={fetchPostComments}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                <p className='text-center text-white mt-3'>
                    <b>No more comments 🙂</b>
                </p>
                }
                // below props only if you need pull down functionality
                // refreshFunction={refreshHome}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                // <h3 className='text-center text-white'>&#8595; Pull down to refresh</h3>
                // }
                // releaseToRefreshContent={
                // <h3 className='text-center text-white'>&#8593; Release to refresh</h3>
                // }
            >

            {/* {comments.length > 0 && comments.map((comment, index) => <Comment comment={comment} key={index}/>)} */}

            {comments && comments.length > 0 &&
                comments.map((comment, index) => {
                    return(
                        <div key={index}>
                            <Comment comment={comment}/>
                        </div>
                    )
                })
            }

        </InfiniteScroll>
        </div>
    );
}

export default CommentsList;
