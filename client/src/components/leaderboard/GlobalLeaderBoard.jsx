import React, { useState, useEffect } from 'react';
// import Leaderboard from './LeaderBoardEvent.jsx';
import LeaderBoardComp from './LeaderBoardComp.jsx';
import { io } from 'socket.io-client';

const GlobalLeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [pageNo, setPageNo] = useState(1)
  let socket;

  useEffect(() => {
    socket = io("http://localhost:5000/leaderBoard");

    socket.on("leaderboardUpdate", (data) => {
      console.log("data here");
      console.log(data);
      setLeaderboardData(data);
    });

  }, []);


  return (
    <>
      {leaderboardData.length > 0 && (<LeaderBoardComp leaderboardData={leaderboardData.slice(0, 10)} />)}
      {/* {leaderboardData.length > 0 && (<LeaderBoardComp leaderboardData={leaderboardData.slice(0, 10)} />)} */}
    </>
  );
};

export default GlobalLeaderBoard;
