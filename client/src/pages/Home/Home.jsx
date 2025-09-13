import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [lawyer, setLawyer] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("http://localhost:3000/lawyers");
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="home">
      <div className="consultation">
        <h2 className="home-title">Top Consultation</h2>
        <div className="consultation-list">
          {profiles.slice(0,3).map((item) => (
            <div
              className="profile-card"
              key={item.lawyer_id}
              draggable="true"
            >
              <img
                src="https://a.pinatafarm.com/354x640/37342d2d2e/cristiano-ronaldo-smile.jpg"
                alt={`${item.first_name} ${item.last_name}`}
                className="profile-card__image"
              />
              <div className="profile-card__details">
                <h3 className="profile-card__name">
                  {item.first_name} {item.last_name}
                </h3>
                <p className="profile-card__location">{item.location}</p>
                <p className="profile-card__bio">{item.biography}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn--primary">View all</button>
      </div>

      <div className="categories">
        <h3 className="home-title">Browse by Category</h3>
        <div className="categories-grid">
          <button className="btn btn--category">⚖️ Divorce</button>
          <button className="btn btn--category">👨‍👩‍👧 Family</button>
          <button className="btn btn--category">🚔 Criminal</button>
          <button className="btn btn--category">💰 Tax</button>
          <button className="btn btn--category">🏢 Corporate</button>
          <button className="btn btn--category">🌍 Immigration</button>
        </div>
      </div>

      <div className="steps">
        <h3 className="home-title">How It Works</h3>
        <div className="steps-list">
          <div className="step">
            <span className="step-number">1</span>
            <p className="step-text">Choose a lawyer</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p className="step-text">Book appointment</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p className="step-text">Consult & resolve</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
