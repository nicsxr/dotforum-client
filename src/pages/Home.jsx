import {useEffect, useState} from 'react'
import Post from "../components/Post.jsx";
import {getPublicHome} from "../services/home.service.js";
import CreatePost from '../components/CreatePost.jsx';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [posts, setPosts] = useState([])
  const { user } = useSelector((state) => state.auth)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    fetchHome()
  }, [])

  async function fetchHome(){
    getPublicHome(page).then((res) => {
      setPosts([...posts, ...res.data])
      setPage(page + 1)
      console.log(hasMore)
      if(res.data.length == 0) setHasMore(false)
    })
  }
  
  async function refreshHome(){
    getPublicHome(1).then((res) => {
      setPosts([...res.data])
      setPage(2)
      if(res.data.length == 0) setHasMore(false)
    })
  }
  
  return (
    <div>
      {user && <CreatePost/>}
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchHome}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className='text-center text-white'>
            <b>No more posts 🙂</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={refreshHome}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 className='text-center text-white'>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 className='text-center text-white'>&#8593; Release to refresh</h3>
        }
      >

      {posts.map((post) => <Post post={post} key={post.id}/>)}
    </InfiniteScroll>
    </div>
  )
}

export default Home