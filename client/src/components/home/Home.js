import React from "react";
import "./Home.css";
import articleImage from "../../assets/pen.jpg";

function Home() {
  return (
    <div className="articleHome">
      <h1 className="main-title">Welcome to Our Platform</h1>
      <img src={articleImage} alt="Article Writing" className="articleImage" />
      <p className="lead">
        Welcome to our platform, where you'll find a wealth of knowledge on a wide range of topics. From programming to artificial intelligence, from database management to the latest tech trends, we've got it all covered. Our goal is to provide you with insightful articles that inform, inspire, and empower.
        <br /><br />
        Our team of experts is dedicated to curating content that meets your interests and needs. Whether you're a seasoned professional or just starting on your learning journey, there's something here for everyone. So, take a moment to explore, discover, and expand your horizons with us.
        <br /><br />
        Join us on this journey of discovery and learning. Let's dive into the world of knowledge together!
      </p>
    </div>
  );
}

export default Home;
