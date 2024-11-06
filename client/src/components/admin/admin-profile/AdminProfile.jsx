import React, { useEffect, useState } from "react";
import Participants from "../cards/Participant.jsx";
import EventCount from "../cards/EventCount.jsx";
import Contribution from "../cards/Contribution.jsx";
import Events from '../event/Events.jsx';
import axios from 'axios';



const EventsData = [
  {
    title: "Ready to Code? Compete, Solve, and Conquer Challenges!",
    creator: "CodeMaster",
    date: "2024-11-04",
    content: [
      "Gear up for an adrenaline-packed experience as you face coding challenges from all around the world! This competition will test your coding prowess, speed, and creativity under pressure. Whether you’re here to hone your skills, challenge yourself, or aim for the top leaderboard spot, this is your chance to shine.",
      "Each challenge is designed to push your boundaries and encourage innovative problem-solving. Solutions will be evaluated based on efficiency, accuracy, and clarity, so bring your best coding practices. Are you ready to take on the competition?",
      "Stay tuned for live updates, and may the best coder win!"
    ],
    creatorInfo: {
      name: "CodeMaster",
      bio: "As an experienced developer and a fierce advocate for competitive programming, CodeMaster is here to inspire and challenge coders of all levels.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "Unleash Your Creativity with Coding Hackathons!",
    creator: "DevGuru",
    date: "2024-11-03",
    content: [
      "Join us for a series of exciting hackathons that will ignite your creativity! Put your skills to the test as you collaborate with others to build innovative projects.",
      "Whether you’re a beginner or a seasoned pro, there’s something for everyone. The goal is to learn, collaborate, and have fun while creating something amazing!",
      "Don’t miss this opportunity to network with like-minded individuals and showcase your talents!"
    ],
    creatorInfo: {
      name: "DevGuru",
      bio: "DevGuru is a passionate coder who loves sharing knowledge and helping others grow in the tech community.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "Mastering Algorithms: Your Path to Becoming a Coding Ninja!",
    creator: "AlgoExpert",
    date: "2024-11-02",
    content: [
      "Dive deep into the world of algorithms and data structures with our comprehensive guide! Mastering these concepts is essential for any coder looking to excel in competitive programming.",
      "We’ll cover everything from sorting algorithms to graph theory, providing you with the tools you need to tackle any coding challenge with confidence.",
      "Join us as we embark on this journey to becoming coding ninjas!"
    ],
    creatorInfo: {
      name: "AlgoExpert",
      bio: "AlgoExpert is a coding enthusiast and educator who loves breaking down complex topics into digestible lessons.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "The Future of Coding: Trends to Watch in 2025!",
    creator: "TechTrends",
    date: "2024-11-01",
    content: [
      "Stay ahead of the curve by exploring the latest trends in coding and technology! From AI advancements to the rise of no-code platforms, we’ll discuss what to expect in the coming years.",
      "Understanding these trends will not only enhance your skills but also prepare you for the future job market.",
      "Let’s navigate the evolving landscape of technology together!"
    ],
    creatorInfo: {
      name: "TechTrends",
      bio: "TechTrends is a tech enthusiast who enjoys exploring the latest innovations and sharing insights with others.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "The Future of Coding: Trends to Watch in 2025!",
    creator: "TechTrends",
    date: "2024-11-01",
    content: [
      "Stay ahead of the curve by exploring the latest trends in coding and technology! From AI advancements to the rise of no-code platforms, we’ll discuss what to expect in the coming years.",
      "Understanding these trends will not only enhance your skills but also prepare you for the future job market.",
      "Let’s navigate the evolving landscape of technology together!"
    ],
    creatorInfo: {
      name: "TechTrends",
      bio: "TechTrends is a tech enthusiast who enjoys exploring the latest innovations and sharing insights with others.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "The Future of Coding: Trends to Watch in 2025!",
    creator: "TechTrends",
    date: "2024-11-01",
    content: [
      "Stay ahead of the curve by exploring the latest trends in coding and technology! From AI advancements to the rise of no-code platforms, we’ll discuss what to expect in the coming years.",
      "Understanding these trends will not only enhance your skills but also prepare you for the future job market.",
      "Let’s navigate the evolving landscape of technology together!"
    ],
    creatorInfo: {
      name: "TechTrends",
      bio: "TechTrends is a tech enthusiast who enjoys exploring the latest innovations and sharing insights with others.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  },
  {
    title: "The Future of Coding: Trends to Watch in 2025!",
    creator: "TechTrends",
    date: "2024-11-01",
    content: [
      "Stay ahead of the curve by exploring the latest trends in coding and technology! From AI advancements to the rise of no-code platforms, we’ll discuss what to expect in the coming years.",
      "Understanding these trends will not only enhance your skills but also prepare you for the future job market.",
      "Let’s navigate the evolving landscape of technology together!"
    ],
    creatorInfo: {
      name: "TechTrends",
      bio: "TechTrends is a tech enthusiast who enjoys exploring the latest innovations and sharing insights with others.",
      imageUrl: "https://icon-library.com/images/username-icon/username-icon-24.jpg"
    }
  }
];


const AdminProfile = () => {
  const [eventData,setEventData] = useState({
    "totalBlogs":0,
    "totalEvents":0,
    "totalParticipants":0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/getStats', {
          withCredentials: true 
        });
        // console.log(response);
        setEventData(response.data);
        console.log(eventData);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, []);


  return (
    <div className="flex flex-col items-center p-4">
      {/* Top Section */}
      <div className="w-full flex justify-center items-center">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 md:m-4 gap-6">
            <Participants
              key={0}
              value={eventData.totalParticipants}
            />
            <EventCount
              key={1}
              value={eventData.totalEvents}
            />
            <Contribution
              key={2}
              value={2*eventData.totalEvents + eventData.totalParticipants + 0.5*eventData.totalBlogs}
            />
        </div>
      </div>

      <Events events={EventsData}/>

      <Events events={EventsData}/>
      
    </div>
  );
};

export default AdminProfile;
