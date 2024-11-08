import React, { useState, useEffect } from 'react';
// import Leaderboard from './LeaderBoardEvent.jsx';
import LeaderBoardComp from './LeaderBoardComp.jsx';
import { io } from 'socket.io-client';

const GlobalLeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000/leaderBoard");

    socket.on("leaderboardUpdate", (data) => {
      setLeaderboardData(data);
      console.log(leaderboardData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (leaderboardData.length > 0) {
      console.log("Updated leaderboard data:", leaderboardData);
    }
  }, [leaderboardData]);

  return (
    <>
      <LeaderBoardComp leaderboardData={leaderboardData}/>
    </>
  );
};

export default GlobalLeaderBoard;
