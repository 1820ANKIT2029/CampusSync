import React from 'react';

const AuraScoreCard = ({ score }) => {
  return (
    <div className="lg:w-72 lg:h-64 flex flex-col items-center justify-center max-w-sm mx-auto mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg p-4 text-white text-center">
      <h2 className="text-2xl font-bold">Aura Score</h2>
      <p className="mt-2 text-5xl font-extrabold">{score}</p>
      <p className="mt-1 text-lg">Your unique score representing your aura.</p>
    </div>
  );
};

export default AuraScoreCard;
