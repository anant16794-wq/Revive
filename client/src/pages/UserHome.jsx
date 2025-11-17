import React, { useState, useEffect, useRef } from "react";
const slidesData = [
  {
    bg: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5f6f0c8c5be8f1d7c0b4d4d3c3f7d2c2",
    title: "Empowering Cities With Real-Time Waste Intelligence",
    text: "Predictive routing, gamified citizen participation and measurable impact — reduce waste, save cost, engage communities.",
    btnPrimary: "Get started",
    btnSecondary: "How it works",
    images: [
      "https://picsum.photos/900/600?random=21",
      "https://picsum.photos/900/600?random=22",
      "https://picsum.photos/900/600?random=23",
      "https://picsum.photos/900/600?random=24",
    ],
    mainImg: "https://picsum.photos/800/800?blur=2&random=11",
  },
  {
    bg: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a2a03f8b1d6cfb0e3b4b7b6c2f7a4f1",
    title: "Track Recycling Progress Across Wards",
    text: "Live analytics and leaderboards encourage healthier habits and reward sustainable behaviour.",
    btnPrimary: "See Dashboard",
    btnSecondary: "View Leaderboard",
    images: [
      "https://picsum.photos/900/600?random=25",
      "https://picsum.photos/900/600?random=26",
      "https://picsum.photos/900/600?random=27",
    ],
    mainImg: "https://picsum.photos/800/800?blur=2&random=12",
  },
  {
    bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b9f5c4e6a6e6d5e999e6e6f0b1a2d3f",
    title: "Community Events & Cleanups",
    text: "Recruit volunteers, host drives and award participants — track attendance and reward impact.",
    btnPrimary: "Join an event",
    btnSecondary: "Host an event",
    images: [
      "https://picsum.photos/900/600?random=28",
      "https://picsum.photos/900/600?random=29",
    ],
    mainImg: "https://picsum.photos/800/800?blur=2&random=13",
  },
];

const rewardsData = [
  { icon: "🏆", name: "Reusable Bottle", desc: "Stainless steel bottle", cost: 500 },
  { icon: "🎟", name: "Event Pass", desc: "Free entry to workshop", cost: 250 },
  { icon: "🌱", name: "Tree Voucher", desc: "Plant a tree for community", cost: 150 },
];

const eventsData = [
  { id: "e1", name: "Community Park Clean-up", day: "Sat", type: "Free", points: 40, location: "Central Park", time: "9:00 AM" },
  { id: "e2", name: "Recycling Workshop", day: "Sun", type: "Paid", points: 30, location: "Community Hall", time: "11:00 AM" },
  { id: "e3", name: "E-waste Collection Drive", day: "Mon", type: "Free", points: 20, location: "Town Square", time: "10:00 AM" },
];

const CityZero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(120);
  const [showSignModal, setShowSignModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const slidesRef = useRef(null);
  const slideTimer = useRef(null);

  useEffect(() => {
    startSlides();

    if (window.gsap) {
      gsap.from(".hero-left h1", { y: 18, opacity: 0, duration: 0.9, ease: "power3.out" });
      gsap.from(".hero-left p", { y: 10, opacity: 0, duration: 0.9, delay: 0.1 });
      gsap.from(".visual-card", { scale: 0.98, opacity: 0, duration: 0.9, delay: 0.06, ease: "power3.out" });
    }

    return () => stopSlides();
  }, []);

  const setSlide = (i) => {
    const index = (i + slidesData.length) % slidesData.length;
    setSlideIndex(index);
  };

  const nextSlide = () => setSlide(slideIndex + 1);
  const prevSlide = () => setSlide(slideIndex - 1);

  const startSlides = () => (slideTimer.current = setInterval(nextSlide, 7000));
  const stopSlides = () => clearInterval(slideTimer.current);

  const redeemReward = (cost, btnSetter) => {
    if (userPoints >= cost) {
      setUserPoints((prev) => prev - cost);
      btnSetter(true);
      alert("Redeemed successfully — check your rewards page");
    } else {
      alert("Not enough points — join events to earn more.");
    }
  };

  const joinEvent = (event) => {
    setCurrentEvent(event);
    setShowEventModal(true);
  };

  const confirmJoin = (name) => {
    if (!name) {
      alert("Please enter your full name");
      return;
    }
    setUserPoints((prev) => prev + currentEvent.points);
    alert(`You joined ${currentEvent.name}. Points credited to your account.`);
    setShowEventModal(false);
  };

  return (
    <div className="cityzero">
      {/* NAV */}
      <header className="site-nav">
        <div className="nav-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="brand">Revive <span className="leaf">🌿</span></div>
            <div className="muted nav-hide-mobile" style={{ fontSize: "0.92rem" }}>Zero-waste urban intelligence</div>
          </div>
          <nav className="primary">
            <a href="#product">Home</a>
            <a href="#features">Features</a>
            <a href="#rewards">Rewards</a>
            <a href="#events">Events</a>
          </nav>
          <div className="nav-spacer"></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="cta-btn" onClick={() => setShowSignModal(true)}>Sign in</button>
          </div>
        </div>
      </header>

      {/* HERO SLIDER */}
      <div className="hero-slider">
        <div className="slides" ref={slidesRef} style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {slidesData.map((slide, idx) => (
            <div key={idx} className="slide" style={{ backgroundImage: `url(${slide.bg})` }}>
              <div className="hero-inner container">
                <div className="hero-left">
                  <h1>{slide.title}</h1>
                  <p>{slide.text}</p>
                  <div className="hero-actions">
                    <button className="btn-primary">{slide.btnPrimary}</button>
                    <button className="btn-outline">{slide.btnSecondary}</button>
                  </div>
                </div>
                <div className="hero-right center">
                  <div className="visual-card">
                    <img src={slide.mainImg} alt="Dashboard preview" />
                    <div className="thumb-strip">
                      {slide.images.map((img, i) => (
                        <div key={i} className="thumb" onClick={() => console.log("Thumb click")}>
                          <img src={img} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", right: 20, bottom: 18, zIndex: 30, display: "flex", gap: 8 }}>
          <button className="icon-btn" onClick={prevSlide}>‹</button>
          <button className="icon-btn" onClick={nextSlide}>›</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container">
        {/* FEATURES */}
        <section id="features">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <h2 className="section-title">Core features</h2>
            <div className="muted">Trusted by municipal teams</div>
          </div>
          <div className="features">
            <div className="card">
              <h3>Real-time analytics</h3>
              <p>Live dashboards for recycling & composting metrics with ward-level drill-downs.</p>
            </div>
            <div className="card">
              <h3>Community gamification</h3>
              <p>Leaderboards, badges and green credits that reward citizens for sustainable actions.</p>
            </div>
            <div className="card">
              <h3>Predictive routing</h3>
              <p>AI forecasts overflows and optimizes collection routes to save time and carbon.</p>
            </div>
          </div>
        </section>

        {/* REWARDS */}
        <section id="rewards">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <h2 className="section-title">Earn rewards</h2>
            <div className="muted">Your points: <strong>{userPoints}</strong></div>
          </div>
          <div className="rewards-grid">
            {rewardsData.map((r, idx) => {
              const [redeemed, setRedeemed] = useState(false);
              return (
                <div key={idx} className="reward-card">
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="reward-icon">{r.icon}</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: "#7ef0b0" }}>{r.name}</p>
                      <p className="muted" style={{ marginTop: 6 }}>{r.desc} — {r.cost} pts</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <div style={{ fontWeight: 800, color: "#7ef0b0" }}>{r.cost} pts</div>
                    <button
                      className={`btn-outline ${redeemed ? "joined" : ""}`}
                      disabled={redeemed}
                      onClick={() => redeemReward(r.cost, setRedeemed)}
                    >
                      {redeemed ? "Redeemed ✓" : "Redeem"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EVENTS */}
        <section id="events">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <h2 className="section-title">Upcoming events</h2>
            <div className="muted">Next events: <strong>{eventsData.length}</strong></div>
          </div>
          <div className="events-grid">
            {eventsData.map((e, idx) => (
              <article key={idx} className="event-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0 }}>{e.name}</h3>
                  <div className="muted">{e.day} • {e.type}</div>
                </div>
                <p className="muted" style={{ marginTop: 8 }}>Earn {e.points} pts.</p>
                <div style={{ display: "flex", gap: 10, marginTop: 12, alignItems: "center" }}>
                  <div className="muted">📍 {e.location} • {e.time}</div>
                  <div style={{ marginLeft: "auto" }}>
                    <button className="join-btn" onClick={() => joinEvent(e)}>Join</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* SIGN MODAL */}
      {showSignModal && (
        <Modal onClose={() => setShowSignModal(false)}>
          <h3>Sign in / Choose role</h3>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button className="btn-primary" onClick={() => alert("Citizen")}>Citizen</button>
            <button className="btn-outline" onClick={() => alert("Municipal")}>Municipal Admin</button>
            <button className="btn-outline" onClick={() => alert("Ward")}>Ward Officer</button>
          </div>
        </Modal>
      )}

      {/* EVENT MODAL */}
      {showEventModal && (
        <Modal onClose={() => setShowEventModal(false)}>
          <h3>Join event</h3>
          <p className="muted">You're joining: <strong>{currentEvent.name} · {currentEvent.points} pts</strong></p>
          <div className="form-row" style={{ marginTop: 10 }}>
            <input placeholder="Full name" id="fullName" />
            <select>
              <option value="citizen">Citizen</option>
              <option value="volunteer">Volunteer</option>
              <option value="ward">Ward Officer</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
            <button className="btn-primary" onClick={() => confirmJoin(document.getElementById("fullName").value)}>Confirm</button>
            <button className="btn-outline" onClick={() => setShowEventModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => (
  <div className="modal open" role="dialog" aria-modal="true">
    <div className="modal-card">
      <button className="icon-btn" style={{ position: "absolute", top: 12, right: 12 }} onClick={onClose}>✕</button>
      {children}
    </div>
  </div>
);

export default CityZero;
