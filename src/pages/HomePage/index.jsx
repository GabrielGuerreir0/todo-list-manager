import React from "react";
import TaskList from "../../components/TaskList";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./HomePage.css";

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
