import React, { useState, useEffect } from 'react';
// import Leaderboard from './LeaderBoardEvent.jsx';
import LeaderBoardComp from './LeaderBoardComp.jsx';
import { io } from 'socket.io-client';

const GlobalLeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  let socket;

  function decreasePageNo(){
    if(pageNo > 1){
      setPageNo(pageNo-1)
    }
  }

  function increasePageNo(){
    if(pageNo < Math.ceil(leaderboardData.length/10)){
      setPageNo(pageNo+1)
    }
  }

  useEffect(() => {
    socket = io("http://localhost:5000/leaderBoard");

    socket.on("leaderboardUpdate", (value) => {
      console.log("data here");
      console.log(value);
      setLeaderboardData(value);
    });

  }, []);

  useEffect(()=>{
    const startIndex = 10 * (pageNo - 1);
    const endIndex = 10 * pageNo;
    const newData = leaderboardData.slice(startIndex, endIndex);
    console.log('Updated data:', newData); // Log the updated data
    setData(newData);
  }, [pageNo, leaderboardData])

  return (
    <>
      {leaderboardData?.length > 0 && (<LeaderBoardComp leaderboardData={data} pageNo={pageNo} />)}
      
      <div className='flex justify-center items-center gap-x-3'>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' 
          onClick={decreasePageNo}
        >
          prev
        </button>

        <span>
          {pageNo}
        </span>

        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' 
          onClick={increasePageNo}
        >
          next
        </button>
      </div>
    </>
  );
};

export default GlobalLeaderBoard;
