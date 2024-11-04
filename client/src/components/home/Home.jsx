import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LeaderboardCard from '../leaderboard/LeaderboardCard';
import Blogs from './components/Blogs';
import EventCarousel from './components/EventCarousel';


const Events = [
  {
    title: "Ready to Code? Compete, Solve, and Conquer Challenges!",
    author: "CodeMaster",
    date: "2024-11-04",
    content: [
      "Gear up for an adrenaline-packed experience as you face coding challenges from all around the world! This competition will test your coding prowess, speed, and creativity under pressure. Whether you’re here to hone your skills, challenge yourself, or aim for the top leaderboard spot, this is your chance to shine.",
      "Each challenge is designed to push your boundaries and encourage innovative problem-solving. Solutions will be evaluated based on efficiency, accuracy, and clarity, so bring your best coding practices. Are you ready to take on the competition?",
      "Stay tuned for live updates, and may the best coder win!"
    ],
    authorInfo: {
      name: "CodeMaster",
      bio: "As an experienced developer and a fierce advocate for competitive programming, CodeMaster is here to inspire and challenge coders of all levels.",
      imageUrl: "https://source.unsplash.com/75x75/?coder,developer"
    }
  },
  {
    title: "Unleash Your Creativity with Coding Hackathons!",
    author: "DevGuru",
    date: "2024-11-03",
    content: [
      "Join us for a series of exciting hackathons that will ignite your creativity! Put your skills to the test as you collaborate with others to build innovative projects.",
      "Whether you’re a beginner or a seasoned pro, there’s something for everyone. The goal is to learn, collaborate, and have fun while creating something amazing!",
      "Don’t miss this opportunity to network with like-minded individuals and showcase your talents!"
    ],
    authorInfo: {
      name: "DevGuru",
      bio: "DevGuru is a passionate coder who loves sharing knowledge and helping others grow in the tech community.",
      imageUrl: "https://source.unsplash.com/75x75/?hackathon"
    }
  },
  {
    title: "Mastering Algorithms: Your Path to Becoming a Coding Ninja!",
    author: "AlgoExpert",
    date: "2024-11-02",
    content: [
      "Dive deep into the world of algorithms and data structures with our comprehensive guide! Mastering these concepts is essential for any coder looking to excel in competitive programming.",
      "We’ll cover everything from sorting algorithms to graph theory, providing you with the tools you need to tackle any coding challenge with confidence.",
      "Join us as we embark on this journey to becoming coding ninjas!"
    ],
    authorInfo: {
      name: "AlgoExpert",
      bio: "AlgoExpert is a coding enthusiast and educator who loves breaking down complex topics into digestible lessons.",
      imageUrl: "https://source.unsplash.com/75x75/?algorithm"
    }
  },
  {
    title: "The Future of Coding: Trends to Watch in 2025!",
    author: "TechTrends",
    date: "2024-11-01",
    content: [
      "Stay ahead of the curve by exploring the latest trends in coding and technology! From AI advancements to the rise of no-code platforms, we’ll discuss what to expect in the coming years.",
      "Understanding these trends will not only enhance your skills but also prepare you for the future job market.",
      "Let’s navigate the evolving landscape of technology together!"
    ],
    authorInfo: {
      name: "TechTrends",
      bio: "TechTrends is a tech enthusiast who enjoys exploring the latest innovations and sharing insights with others.",
      imageUrl: "https://source.unsplash.com/75x75/?technology"
    }
  }
];


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      dispatch(toggleAuth(false));
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-blue-100 flex justify-center p-4">
      <div className="grid gap-4 w-full max-w-screen-lg">
        
        {/* Desktop layout - Wider blog column */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4 w-full h-screen">
          {/* Blog Section with vibrant gradient background */}
          <div
            className="col-span-3 h-full overflow-y-auto rounded p-4 hide-scrollbar"
            style={{
              backgroundImage: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
              color: 'white',
              overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}
          >
            <Blogs key={1} events={Events} />
          </div>
          
          {/* Leaderboard Section */}
          <div className="col-span-1 rounded p-4">
            <LeaderboardCard />
          </div>
        </div>

            {/* {mobile section} */}
        <div className="md:hidden grid gap-4 w-full">
          <div
            className="bg-gradient-to-r from-teal-400 to-purple-600 text-white rounded p-4"
          >
            <Blogs events={Event} />
          </div>
          <div className="rounded">
            <LeaderboardCard />
          </div>
        </div>
      </div>
    </div>
    <div>
    <EventCarousel events={Events}/>
  </div>
  </>
  );
};

export default Home;
