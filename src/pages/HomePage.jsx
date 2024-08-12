import React from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <TaskList />
      <Footer />
    </div>
  );
};

export default HomePage;
