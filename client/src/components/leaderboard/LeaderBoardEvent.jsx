import React, { useState, useEffect } from "react";

const leaderboardData = {
  global: [
    { name: "Arib", year: 2023, branch: "Computer Science", aura: 9500 },
    { name: "Aleem", year: 2024, branch: "Mechanical Engineering", aura: 8700 },
    { name: "Rochan", year: 2023, branch: "Electrical Engineering", aura: 8200 },
    { name: "Dylan", year: 2024, branch: "Civil Engineering", aura: 7800 },
  ],
  event1: [
    { name: "Sam", year: 2023, branch: "Software Engineering", aura: 9200 },
    { name: "Jane", year: 2024, branch: "Computer Science", aura: 8700 },
  ],
  event2: [
    { name: "Alex", year: 2023, branch: "Data Science", aura: 9000 },
    { name: "Chris", year: 2024, branch: "Artificial Intelligence", aura: 8500 },
  ],
};

const Leaderboard = () => {
  const [event, setEvent] = useState("global");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const handleEventChange = (e) => setEvent(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  useEffect(() => {
    const filteredData = leaderboardData[event].filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  }, [event, searchTerm]);

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8 border border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">
          {event.charAt(0).toUpperCase() + event.slice(1)} Leaderboard
        </h1>
        <select
          className="border border-gray-300 p-2 rounded-md bg-white"
          value={event}
          onChange={handleEventChange}
        >
          <option value="global">Global</option>
          <option value="event1">Event 1</option>
          <option value="event2">Event 2</option>
        </select>
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
          {data.map((user, index) => (
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
          ))}
        </tbody>
      </table>
      <p className="text-gray-500 text-xs text-center mt-4">
        powered by flywheel
      </p>
    </div>
  );
};

export default Leaderboard;
