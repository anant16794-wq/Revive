import React, { useEffect, useRef } from 'react';
// Note: These dependencies would need to be in your project's package.json
// npm install chart.js canvas-confetti
import { Chart } from 'chart.js/auto';
import confetti from 'canvas-confetti';

// All the original CSS is placed here
// I've modified the 'body' selector to be '.reward-points-app-wrapper'
// to apply the background and font styles to our component's root.
const styles = `
 .reward-points-app-wrapper {
   font-family: "Poppins", sans-serif;
   margin: 0;
   padding: 0;
   background: linear-gradient(to bottom right, #6a11cb, #2575fc);
   color: white;
   overflow-x: hidden;
   min-height: 100vh;
 }

 /* ---------------- HEADER ---------------- */
 /* Styles for a header (if you choose to add one back) */
 header {
   width: 100%;
   background: rgba(0,0,0,0.3);
   backdrop-filter: blur(10px);
   padding: 15px 40px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   position: fixed;
   top: 0;
   left: 0;
   z-index: 999;
 }

 header .logo {
   font-size: 28px;
   font-weight: 700;
   color: white;
   text-decoration: none;
 }

 nav a {
   margin-left: 25px;
   font-size: 18px;
   color: white;
   text-decoration: none;
   transition: 0.3s;
 }

 nav a:hover {
   opacity: 0.7;
 }

 /* ---------------- PAGE CONTENT ---------------- */
 .container {
   width: 90%;
   max-width: 900px;
   margin: auto;
   /* Removed padding-top: 130px; as header isn't fixed */
   padding-top: 50px;
   padding-bottom: 50px;
 }

 h1 {
   text-align: center;
   font-size: 48px;
   font-weight: 800;
   margin-bottom: 10px;
 }

 /* Total Points */
 .points-box {
   text-align: center;
   background: rgba(255,255,255,0.15);
   padding: 30px;
   border-radius: 14px;
   margin-bottom: 25px;
   backdrop-filter: blur(10px);
   animation: pop 0.7s ease;
 }

 .points-big {
   font-size: 95px;
   font-weight: 800;
   letter-spacing: 2px;
 }

 /* Badge */
 .badge-section {
   text-align: center;
   margin: 25px 0;
 }

 .badge {
   font-size: 26px;
   padding: 12px 22px;
   border-radius: 30px;
   display: inline-block;
   background: gold;
   color: black;
   animation: glow 1.5s infinite alternate;
 }

 @keyframes glow {
   from { box-shadow: 0 0 5px gold; }
   to { box-shadow: 0 0 20px gold; }
 }

 /* Graph */
 .graph-box {
   margin-top: 40px;
   background: rgba(255,255,255,0.18);
   padding: 25px;
   border-radius: 20px;
   backdrop-filter: blur(12px);
 }

 .graph-box h2 {
   text-align: center;
   margin-bottom: 10px;
   font-weight: 600;
 }
 
 /* Container for the canvas to make it responsive */
 .chart-container {
    position: relative;
    height: 280px;
    width: 100%;
 }

 canvas {
   cursor: pointer;
   transition: transform .3s;
 }

 canvas:hover {
   transform: scale(1.03);
 }

 /* Redeem Section */
 .redeem-section {
   margin-top: 40px;
   padding: 25px;
   background: rgba(255,255,255,0.2);
   border-radius: 20px;
   backdrop-filter: blur(10px);
 }

 .redeem-section h2 {
   text-align: center;
   margin-bottom: 20px;
 }

 .reward-card {
   background: white;
   color: black;
   padding: 20px;
   border-radius: 12px;
   margin-bottom: 18px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: 0.3s;
   cursor: pointer;
 }

 .reward-card:hover {
   transform: scale(1.05);
   box-shadow: 0 10px 30px rgba(0,0,0,0.4);
 }

 .redeem-btn {
   background: #2575fc;
   color: white;
   padding: 10px 18px;
   border-radius: 20px;
   font-weight: 600;
 }

 @keyframes pop {
   0% { transform: scale(0.6); opacity: 0; }
   100% { transform: scale(1); opacity: 1; }
 }
`;

export default function App() {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null); // To hold the chart instance

  // Effect for Chart.js and Confetti
  useEffect(() => {
    // Ensure canvas is available
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Dummy weekly points
      const weeklyPoints = [45, 48, 41, 44, 47, 49, 46];
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      // Create the new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: days,
          datasets: [{
            label: "Points Earned",
            data: weeklyPoints,
            borderColor: "white",
            tension: 0.5,
            borderWidth: 4,
            pointRadius: 6,
            pointBackgroundColor: "gold",
            fill: false
          }]
        },
        options: {
          // Make chart responsive and fit container
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              ticks: { color: "white", font: { size: 14 } },
              grid: { color: "rgba(255,255,255,0.2)" }
            },
            x: {
              ticks: { color: "white", font: { size: 14 } },
              grid: { display: false }
            }
          }
        }
      });
    }

    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.1 }
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Dynamic badge logic
  const total = 620;
  let badgeText = "🥉 Bronze Starter";
  if (total > 500) {
    badgeText = "🏅 Gold Champion";
  } else if (total > 300) {
    badgeText = "🥈 Silver Collector";
  }

  return (
    <>
      {/* This injects all the styles into the document head */}
      <style>{styles}</style>
      
      {/* This wrapper applies the background and font styles */}
      <div className="reward-points-app-wrapper">
        
        {/* We add Google Fonts link here. In a real React app,
            this is often placed in the public/index.html file */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet" />

        <div className="container">
          <h1>Reward Points</h1>

          <div className="points-box">
            <div className="points-big" id="totalPoints">{total}</div>
            <p>Total Points Earned</p>
          </div>

          <div className="badge-section">
            <span className="badge" id="badgeText">{badgeText}</span>
          </div>

          <div className="graph-box">
            <h2>Your Weekly Progress</h2>
            <div className="chart-container">
              <canvas ref={canvasRef} id="lineChart"></canvas>
            </div>
          </div>

          <div className="redeem-section">
            <h2>Redeem Your Rewards</h2>

            <div className="reward-card">
              <span>🎟 Movie Ticket Voucher</span>
              <span className="redeem-btn">Redeem</span>
            </div>

            <div className="reward-card">
              <span>🍕 Free Pizza Coupon</span>
              <span className="redeem-btn">Redeem</span>
            </div>

            <div className="reward-card">
              <span>🛒 ₹200 Shopping Discount</span>
              <span className="redeem-btn">Redeem</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}