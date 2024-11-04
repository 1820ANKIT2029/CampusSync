import React from 'react'
import { useSelector } from 'react-redux'

function Blogs({events}) {
    const index = useSelector((state)=> state.event)
  return (
    <>
      <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 dark:text-gray-900 hide-scrollbar rounded-lg">
    <div className="w-full mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">Code Sangam</h1>
        <p className="text-sm dark:text-gray-600">by
            <a rel="noopener noreferrer" href="#" target="_blank" className="underline dark:text-violet-600">
                <span itemprop="name">CodeMaster</span>
            </a> on
            <time datetime="2024-11-04">Nov 4th, 2024</time>
        </p>
    </div>
    <div className="dark:text-gray-800">
        <p>Gear up for an adrenaline-packed experience as you face coding challenges from all around the world! This competition will test your coding prowess, speed, and creativity under pressure. Whether you’re here to hone your skills, challenge yourself, or aim for the top leaderboard spot, this is your chance to shine.</p>
        <p>Each challenge is designed to push your boundaries and encourage innovative problem-solving. Solutions will be evaluated based on efficiency, accuracy, and clarity, so bring your best coding practices. Are you ready to take on the competition?</p>
        <p>Stay tuned for live updates, and may the best coder win!</p>
    </div>
    <div className="pt-12 border-t dark:border-gray-300">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img src="https://source.unsplash.com/75x75/?coder,developer" alt="CodeMaster" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300" />
            <div className="flex flex-col">
                <h4 className="text-lg font-semibold">CodeMaster</h4>
                <p className="dark:text-gray-600">As an experienced developer and a fierce advocate for competitive programming, CodeMaster is here to inspire and challenge coders of all levels..</p>
            </div>
        </div>
    </div>
</article>

    </>
  )
}

export default Blogs
