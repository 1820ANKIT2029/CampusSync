// src/components/AdminProfile.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData } from "../../../redux/features/adminData/adminDataSlice.js";
import Participants from "../cards/Participant";
import EventCount from "../cards/EventCount";
import Contribution from "../cards/Contribution";
import Events from "../event/Events";
import BlogsSection from "../blog/BlogsSection";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { stats, events, blogs, status } = useSelector((state) => state.adminData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdminData()); 
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (status === "failed") {
    return <h2>Failed to load data.</h2>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      {/* Top Section */}
      <div className="w-full flex justify-center items-center">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 md:m-4 gap-6">
          <Participants key={0} value={stats.totalParticipants} />
          <EventCount key={1} value={stats.totalEvents} />
          <Contribution
            key={2}
            value={2 * stats.totalEvents + stats.totalParticipants + 0.5 * stats.totalBlogs}
          />
        </div>
      </div>

      <Events events={events} />
      <BlogsSection blogs={blogs} />
    </div>
  );
};

export default AdminProfile;
