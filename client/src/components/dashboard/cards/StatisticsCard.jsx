import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchuserstats } from '../../../redux/features/user/userStatsSlice';
import Buttons from './Buttons';

const StatisticsCard = () => {
  const {events, totalEvents, totalTasks, status} = useSelector((state) => state.userStats);
  const names = ["Events", "Tasks", "Highest Rank"];
  const data = {"Events":totalEvents,"Tasks": totalTasks,"Highest Rank":"nil"};
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchuserstats());
  },[dispatch])
  
  
  const [stat, setStat] = useState("Events");

  
  if(status === "pending"){
    return (<p>Loading</p>);
  }
  if(status === "failed"){
    return (<p>failed to load the data.</p>);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 bg-gradient-to-b from-white to-indigo-100">
      <div className="flex w-full justify-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Statistics</h2>
      </div>
      <div className="w-4/5 h-px bg-gray-400 mb-4 mx-auto" />
      <div className='lg:flex lg:w-full lg:gap-2 lg:flex-row-reverse lg:space-x-2'>
        <ul className="flex flex-col justify-between text-center space-y-4 md:space-y-0 sm:flex-wrap lg:w-[100px] lg:h-full lg:gap-2">
          {names.map((name, index) => {
            return (
              <span onClick={() => { setStat(name); }} key={index} className={`rounded-sd-sm flex w-full flex-1 flex-col items-center justify-center text-xs font-medium text-sd-easy ${name === stat ? 'bg-green-300' : 'bg-gray-200'} rounded-lg cursor-pointer`}>
                <Buttons name={name} />
              </span>
            )
          })}
        </ul>
        <div className="h-full w-full flex items-center justify-center pt-12">
          <div className="rounded-full flex w-32 h-32 cursor-pointer items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-transform duration-300 hover:scale-105">
            <p className="text-center text-5xl">{data[stat]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
