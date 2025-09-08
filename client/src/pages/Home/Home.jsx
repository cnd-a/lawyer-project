import { useState, useEffect } from "react";
import "./Home.css";

const VISIBLE = 5;        // how many cards visible at once
const CARD_WIDTH = 200;   // must match .lawyer-card width in CSS (px)
const GAP = 20;           // must match gap between cards in CSS (px)

const Home = () => {
  const [lawyers, setLawyers] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("http://localhost:3000/lawyers");
        const data = await res.json();
        setLawyers(data || []);
      } catch (err) {
        console.error("Error fetching lawyers:", err);
      }
    };
    fetchLawyers();
  }, []);

  // keep index valid when lawyers length changes
  useEffect(() => {
    const maxIndex = Math.max(0, lawyers.length - VISIBLE);
    if (index > maxIndex) setIndex(0);
  }, [lawyers, index]);

  // auto-advance every 4 seconds (only if there's something to scroll)
  useEffect(() => {
    const maxIndex = Math.max(0, lawyers.length - VISIBLE);
    if (maxIndex <= 0) return; // nothing to auto-scroll

    const id = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [lawyers]);

  const maxIndex = Math.max(0, lawyers.length - VISIBLE);
  const shiftPx = index * (CARD_WIDTH + GAP); // total pixels to translate

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="home-container">
      {/* Carousel */}
      <section className="free-consultation">
        <h2>Top Consultation, @drl lu coba cek di Home.jsx soalny gw ada limit di frontend carouselnya buat sementara</h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-btn left"
            onClick={handlePrev}
            aria-label="Previous"
          >
            ◀
          </button>

          <div className="carousel-viewport">
            <div
              className="lawyer-track"
              style={{
                transform: `translateX(-${shiftPx}px)`,
              }}
            >
              {lawyers.length === 0 && (
                // simple empty-state placeholder
                <div className="lawyer-loading">No lawyers found</div>
              )}
              {/*Ini temporary cuma buat test kalo array di limit kyk gmn*/}
              {lawyers.slice(0,5).map((lawyer) => (
                <div className="lawyer-card" key={lawyer.lawyer_id}>
                  <img
                    src="https://a.pinatafarm.com/354x640/37342d2d2e/cristiano-ronaldo-smile.jpg"
                    alt={`${lawyer.first_name} ${lawyer.last_name}`}
                  />
                  <div className="lawyer-info">
                    <h3>
                      {lawyer.first_name} {lawyer.last_name}
                    </h3>
                    <p className="lawyer-location">{lawyer.location}</p>
                    <p className="rating">⭐ {lawyer.rating ?? "N/A"}</p>
                    <p className="free-text">Free</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel-btn right"
            onClick={handleNext}
            aria-label="Next"
          >
            ▶
          </button>
        </div>

        <a className="view-all-btn" href="/lawyers">
          View all
        </a>
      </section>

      {/* Categories */}
      <section className="service-categories">
        <h3>Browse by Category</h3>
        <div className="categories-grid">
          <button className="category-btn">⚖️ Divorce</button>
          <button className="category-btn">👨‍👩‍👧 Family</button>
          <button className="category-btn">🚔 Criminal</button>
          <button className="category-btn">💰 Tax</button>
          <button className="category-btn">🏢 Corporate</button>
          <button className="category-btn">🌍 Immigration</button>
        </div>
      </section>

      {/* How it works */}
      <section className="steps-section">
        <h3>How It Works</h3>
        <div className="steps-container">
          <div className="step">
            <span className="step-number">1</span>
            <p>Choose a lawyer</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Book appointment</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Consult & resolve</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

