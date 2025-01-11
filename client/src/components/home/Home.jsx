import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LeaderboardCard from '../leaderboard/LeaderboardCard';
import Blogs from './components/Blogs';
import EventCarousel from './components/EventCarousel';
import { fetchBlogs } from '../../redux/features/blogs/blogsSlice';



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {blogs, status} = useSelector((state) => state.blogs);
  const index = useSelector((state) => state.event.event);
  const targetBlogRef = useRef(null);

  const scrollToBlog = () => {
    if (targetBlogRef.current) {
        targetBlogRef.current.scrollIntoView({ top: offsetTop, behavior: "smooth" });
    } else {
        console.error("Target blog ref is not available yet.");
    }
  };
  // console.log("home")
  // console.log(blogs);
  // console.log(index);
  // console.log(status);

  useEffect(()=>{
      dispatch(fetchBlogs());
  },[dispatch]);

  if(status === "failed"){
    return (
      <p>Error while fetching the data</p>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-blue-100 flex justify-center p-4">
      <div className="grid gap-4 w-full max-w-screen-lg">
        
        
        <div className="hidden md:grid md:grid-cols-4 md:gap-4 w-full h-screen">
          <div
            className="col-span-3 h-full overflow-y-auto rounded p-4 hide-scrollbar"
            style={{
              backgroundImage: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
              color: 'white',
              overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}
          >
            {(status === "succeeded") && blogs[index] && (
              <div ref={targetBlogRef}>
                <Blogs blogs={blogs[index]} />
              </div>
            )}
            {status !== "succeeded" && <p>Loading...</p>}
          </div>
          
          
          <div className="col-span-1 rounded p-4">
            <LeaderboardCard />
          </div>
        </div>

            {/* {mobile section} */}
        <div className="md:hidden grid gap-4 w-full">
          <div
            className="bg-gradient-to-r from-teal-400 to-purple-600 text-white rounded p-4"
          >
            {(status === "succeeded") && blogs[index] && (
              <div ref={targetBlogRef}>
                <Blogs blogs={blogs[index]} />
              </div>
            )}
            {status !== "succeeded" && <p>Loading...</p>}
          </div>
          <div className="rounded">
            <LeaderboardCard />
          </div>
        </div>
      </div>
    </div>
    <div>
    <EventCarousel scrollToBlogfunc={scrollToBlog} blogs={blogs}/>
  </div>
  </>
  );
};

export default Home;
