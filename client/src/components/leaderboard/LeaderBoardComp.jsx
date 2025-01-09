import React, { useState, useEffect } from "react";


const LeaderBoardComp = ({leaderboardData, pageNo}) => {
  const [event, setEvent] = useState("global");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(leaderboardData);
  const [page, setPage] = useState(pageNo); 
  const handleEventChange = (e) => setEvent(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  useEffect(() => {
    
    const filteredData = leaderboardData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  }, [event, searchTerm]);

  useEffect(()=>{
    setData(leaderboardData);
    setPage(pageNo)
  }, [leaderboardData, pageNo])

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8 border border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">
          {event.charAt(0).toUpperCase() + event.slice(1)} Leaderboard
        </h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="p-3">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Year</th>
            <th className="p-3">Branch</th>
            <th className="p-3">Aura</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {

            index = index + 10 * (page - 1)

            return(
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-yellow-50" : "bg-gray-100"}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.year}</td>
                <td className="p-3">{user.branch}</td>
                <td className="p-3">{user.aura}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardComp;
