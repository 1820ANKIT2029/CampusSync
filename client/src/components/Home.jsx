import React from 'react';
import axios from 'axios';

function Home() {
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default behavior, if necessary

    try {
      const result = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      console.log(result);
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full bg-purple-600 py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
