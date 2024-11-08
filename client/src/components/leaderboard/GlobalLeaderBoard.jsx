import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const socket = io("http://localhost:5000/leaderBoard");

    socket.on("leaderboardUpdate", (data) => {
      setLeaderboardData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Filter the leaderboard data based on the search term
  const filteredData = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive filtering
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      
      <div id="notification">
        {filteredData.length > 0 ? (
          filteredData.map((user, index) => (
            <p key={index}>{JSON.stringify(user)}</p> // Display user info as JSON
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
