import React from 'react';

const LeaderboardCard = () => {
  const Participants = [
    {
      name: '@maddison_c21',
      image:
        'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80',
      events: 9821,
      aura: 30,
    },
    {
      name: '@karl.will02',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
      events: 7032,
      aura: 30,
    },
    {
      name: '@andreea.1z',
      image:
        'https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80',
      events: 5204,
      aura: 30,
    },
    {
      name: '@abraham47.y',
      image:
        'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
      events: 4309,
      aura: 30,
    },
    {
      name: '@simmmple.web',
      image: 'https://i.ibb.co/7p0d1Cd/Frame-24.png',
      events: 3871,
      aura: 30,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center sm:min-w-[240px] md:max-w-[450]">
      <div className="relative flex max-w-[450px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:bg-navy-700 dark:shadow-none">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">Aura Icons</h4>
          <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
            See all
          </button>
        </div>
        <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
          <table role="table" className="w-full min-w-[400px] overflow-x-scroll">
            <tbody role="rowgroup" className="px-4">
              {Participants.map((Participant, index) => (
                <tr key={index} role="row max-w-[400]">
                  <td className="py-3 text-sm" role="cell">
                    <div className="flex items-center gap-2">
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img src={Participant.image} alt="" className="h-full w-full rounded-full" />
                      </div>
                      <p className="text-sm font-medium text-navy-700 dark:text-white">{Participant.name}</p>
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
