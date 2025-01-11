import React, { useEffect } from 'react';
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
  console.log("home")
  console.log(blogs);
  console.log(index);
  console.log(status);

  useEffect(()=>{
      dispatch(fetchBlogs());
  },[]);

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
            {(status === "succeeded") && blogs[index] && (<Blogs blogs={blogs[index]} />)}
            {status !== "succeeded" && (
              <p className="max-w-2xl px-6 py-24 mx-auto space-y-1 text-lg text-center font-semibold text-black-700 animate-pulse">
                Loading...
              </p>
            )}

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
            {(status === "succeeded") && blogs[index] && (<Blogs blogs={blogs[index]} />)}
            {status !== "succeeded" && <p>Loading...</p>}
          </div>
          <div className="rounded">
            <LeaderboardCard />
          </div>
        </div>
      </div>
    </div>
    <div>
    <EventCarousel blogs={blogs}/>
  </div>
  </>
  );
};

export default Home;
