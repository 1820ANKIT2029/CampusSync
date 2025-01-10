import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';


const LeaderboardCard = () => {
  const [leaderboardData, setLeaderboardData] = useState  ([]);
  const navigate = useNavigate();
  let socket;

  useEffect(() => {
    socket = io("http://localhost:5000/leaderBoard");

    socket.on("leaderboardUpdate", (value) => {
      setLeaderboardData(value.slice(0, 5));
    });

  }, []);

  function leaderboardpage() {
    navigate("/leaderboard");
  }

  return (
    <div className="flex flex-col justify-center items-center sm:min-w-[240px] md:max-w-[450]">
      <div className="relative flex max-w-[450px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-navy-800 dark:shadow-none">
        <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:bg-navy-700 dark:shadow-none">
          <h4 className="text-lg font-bold text-navy-700 text-black">Aura Icons</h4>
          <button onClick={leaderboardpage} className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 text-black dark:hover:bg-white/10 dark:active:bg-white/20">
            See all
          </button>
        </div>
        <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
          <table role="table" className="w-full min-w-[400px] overflow-x-scroll">
            <tbody role="rowgroup" className="px-4">
              {leaderboardData.map((Participant, index) => (
                <tr key={index} role="row max-w-[400]">
                  <td className="py-3 text-sm" role="cell">
                    <div className="flex items-center gap-4 gap-x-9">
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img src={Participant.profilePic} alt="" className="h-full w-full rounded-full" />
                      </div>
                      <p className="text-sm font-medium text-navy-700 text-black">{Participant.name}</p>
                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
