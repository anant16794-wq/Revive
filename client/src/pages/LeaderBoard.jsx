import React, { useState, useEffect, useRef } from 'react'

const LeaderBoard = () => {
  const [wards, setWards] = useState([
    { name: "Green Valley Ward", locality: "North Green Locality", region: "North", population: 45200, cleanliness: 9.2, officer: "A. Singh", points: 980, avatar: "https://i.pravatar.cc/150?img=1", history: [720,780,820,840,900,920,950,980] },
    { name: "Riverbank Ward", locality: "Riverside Locality", region: "East", population: 39800, cleanliness: 8.8, officer: "B. Kaur", points: 920, avatar: "https://i.pravatar.cc/150?img=2", history: [600,650,700,760,800,840,880,920] },
    { name: "Sunset Block Ward", locality: "Sunset District", region: "West", population: 33210, cleanliness: 8.3, officer: "C. Mehta", points: 850, avatar: "https://i.pravatar.cc/150?img=3", history: [480,520,580,610,680,750,800,850] },
    { name: "West Street Ward", locality: "Old West Locality", region: "West", population: 28100, cleanliness: 7.8, officer: "D. Sharma", points: 820, avatar: "https://i.pravatar.cc/150?img=4", history: [420,460,500,540,600,660,760,820] },
    { name: "Hilltop Ward", locality: "Hilltop Locality", region: "North", population: 19500, cleanliness: 8.6, officer: "E. Roy", points: 790, avatar: "https://i.pravatar.cc/150?img=5", history: [360,380,420,460,520,600,700,790] },
    { name: "Lakeside Ward", locality: "Blue Lake", region: "South", population: 24300, cleanliness: 8.1, officer: "F. Khan", points: 760, avatar: "https://i.pravatar.cc/150?img=6", history: [300,340,380,420,480,520,630,760] },
    { name: "Unity Central Ward", locality: "Central Hub", region: "Central", population: 51500, cleanliness: 9.0, officer: "G. Patel", points: 720, avatar: "https://i.pravatar.cc/150?img=7", history: [220,260,300,350,420,520,650,720] },
    { name: "South Park Ward", locality: "South Park", region: "South", population: 28900, cleanliness: 7.5, officer: "H. Verma", points: 700, avatar: "https://i.pravatar.cc/150?img=8", history: [200,220,240,300,360,480,590,700] },
    { name: "Harmony Ward", locality: "Harmony Circle", region: "East", population: 17890, cleanliness: 7.9, officer: "I. Nair", points: 680, avatar: "https://i.pravatar.cc/150?img=9", history: [140,160,200,260,320,460,560,680] },
    { name: "Metro Heights Ward", locality: "Metro Heights", region: "Central", population: 40120, cleanliness: 8.0, officer: "J. Rao", points: 650, avatar: "https://i.pravatar.cc/150?img=10", history: [120,140,160,200,260,320,480,650] }
  ])
  const [searchFilter, setSearchFilter] = useState('')
  const [sortValue, setSortValue] = useState('points_desc')
  const [showPopup, setShowPopup] = useState(false)
  const [selectedWard, setSelectedWard] = useState(null)
  const fullChartRef = useRef(null)

  const styles = `
    :root{
      --green:#2E7D32;
      --cream:#FFFDF5;
      --text:#1A1A1A;
      --card-bg:#ffffff;
      --muted:#777;
    }

    *{box-sizing:border-box}
    body{
      margin:0;
      font-family:Inter, Arial, sans-serif;
      background:var(--cream);
      color:var(--text);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }

    header{
      background:var(--green);
      color:#fff;
      padding:14px 22px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
    }

    .logo{font-weight:700; letter-spacing:0.2px}
    nav a{color:#fff; text-decoration:none; margin-left:18px; font-weight:600}
    nav a:hover{text-decoration:underline}

    .container{max-width:1100px; margin:28px auto; padding:0 18px;}

    h1{margin:8px 0 18px; text-align:center; color:var(--green)}

    /* Search + controls */
    .controls{
      display:flex;
      gap:12px;
      align-items:center;
      justify-content:center;
      margin-bottom:18px;
      flex-wrap:wrap;
    }
    #searchBar{
      width:360px;
      max-width:100%;
      padding:10px 14px;
      border-radius:10px;
      border:2px solid #e6e6e6;
      font-size:15px;
    }

    .sort-select{
      padding:10px 12px;
      border-radius:10px;
      border:2px solid #e6e6e6;
      background:white;
      font-weight:600;
    }

    /* List */
    #leaderboardList{display:grid; grid-template-columns:1fr; gap:14px;}

    .leaderboard-item{
      background:var(--card-bg);
      border-radius:12px;
      padding:12px;
      display:flex;
      gap:14px;
      align-items:center;
      box-shadow: 0 6px 18px rgba(16,24,40,0.06);
      transform:translateY(8px);
      opacity:0;
      animation:fadeUp .45s forwards;
      transition:transform .18s ease, box-shadow .18s ease;
      cursor:pointer;
    }
    .leaderboard-item:hover{
      transform:translateY(0);
      box-shadow: 0 12px 30px rgba(16,24,40,0.12);
    }
    @keyframes fadeUp{
      to { transform:none; opacity:1 }
    }

    .rank{
      width:56px;
      text-align:center;
      font-weight:700;
      font-size:18px;
      flex-shrink:0;
    }

    .avatar{
      width:60px; height:60px; border-radius:50%;
      background-size:cover; background-position:center;
      flex-shrink:0; box-shadow:0 4px 12px rgba(0,0,0,0.08)
    }

    .meta{
      flex:1;
      display:flex;
      flex-direction:column;
      gap:6px;
      min-width:0;
    }

    .name-row{
      display:flex; align-items:center; gap:8px; justify-content:space-between;
    }

    .ward-name{font-weight:700; font-size:16px; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
    .sub{color:var(--muted); font-size:13px}

    .right-col{
      display:flex;
      flex-direction:column;
      align-items:flex-end;
      gap:8px;
      justify-content:center;
      width:160px;
      flex-shrink:0;
    }

    .points{
      font-weight:800;
      font-size:18px;
      color:var(--green);
    }

    .spark{
      width:120px; height:36px; border-radius:6px; background:#fafafa;
      display:flex; align-items:center; justify-content:center; box-shadow: inset 0 1px 0 rgba(0,0,0,0.02);
    }

    /* badges / medal glow */
    .medal{
      font-size:20px;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:6px;
    }
    .gold{ color:#FFD700; text-shadow:0 4px 18px rgba(255,215,0,0.14); animation:shine 1.6s ease-in-out infinite; }
    .silver{ color:#C0C0C0; text-shadow:0 4px 14px rgba(192,192,192,0.09); animation:shine 1.8s ease-in-out infinite; }
    .bronze{ color:#CD7F32; text-shadow:0 4px 12px rgba(205,127,50,0.08); animation:shine 2s ease-in-out infinite; }

    @keyframes shine{
      0%{ transform:translateY(0) }
      50%{ transform:translateY(-3px) }
      100%{ transform:translateY(0) }
    }

    /* popup */
    #profilePopup{
      position:fixed; inset:0; display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); z-index:60;
    }
    #profilePopup.show{
      display:flex;
    }
    .popup-content{
      width:94%; max-width:840px; background:white; border-radius:14px; padding:18px; box-shadow:0 20px 60px rgba(0,0,0,0.28);
      transform:translateY(16px); animation:pop .34s cubic-bezier(.2,.9,.2,1) both;
    }
    @keyframes pop{ from{ opacity:0; transform:translateY(30px) scale(.98) } to{ opacity:1; transform:none } }

    .popup-top{display:flex; gap:18px; align-items:center}
    .popup-avatar{width:98px; height:98px; border-radius:50%; background-size:cover; background-position:center}
    .popup-info{flex:1}

    .info-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:12px}
    .info-card{background:#fafafa; padding:10px; border-radius:8px; font-size:14px; color:var(--muted)}

    .chart-box{margin-top:18px; background:#fff; padding:12px; border-radius:8px; box-shadow:0 8px 24px rgba(16,24,40,0.04)}

    .close-btn{background:var(--green); color:white; border:none; padding:10px 14px; border-radius:10px; font-weight:700; cursor:pointer; margin-left:10px}

    /* responsive */
    @media (min-width:900px){
      #leaderboardList{grid-template-columns:1fr}
    }

    @media (max-width:720px){
      .right-col{ width:120px }
      .spark{ display:none }
      .name-row{ flex-direction:column; align-items:flex-start; gap:6px }
      .popup-top{flex-direction:column; align-items:center; text-align:center}
      .info-grid{grid-template-columns:1fr}
    }
  `

  const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

  const assignGlobalRanks = (list) => {
    const sorted = [...list].sort((a, b) => b.points - a.points)
    sorted.forEach((w, i) => (w.globalRank = i + 1))
  }

  const animateCount = (elem, start, end, duration = 900) => {
    const startTime = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const value = Math.floor(start + (end - start) * eased)
      elem.textContent = value + ' pts'
      if (t < 1) requestAnimationFrame(step)
      else elem.textContent = end + ' pts'
    }
    requestAnimationFrame(step)
  }

  const drawSparkline = (canvas, data) => {
    const ctx = canvas.getContext('2d')
    const w = (canvas.width = canvas.clientWidth * devicePixelRatio)
    const h = (canvas.height = canvas.clientHeight * devicePixelRatio)
    ctx.clearRect(0, 0, w, h)
    const padding = 6 * devicePixelRatio
    const dw = w - padding * 2
    const dh = h - padding * 2
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = Math.max(1, max - min)

    ctx.lineWidth = 2 * devicePixelRatio
    ctx.strokeStyle = '#2E7D32'
    ctx.beginPath()
    data.forEach((v, i) => {
      const x = padding + (i / (data.length - 1)) * dw
      const y = padding + ((max - v) / range) * dh
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, 'rgba(46,125,50,0.12)')
    grad.addColorStop(1, 'rgba(46,125,50,0.02)')
    ctx.lineTo(padding + dw, padding + dh)
    ctx.lineTo(padding, padding + dh)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()
  }

  const drawFullChart = (canvas, data) => {
    const ctx = canvas.getContext('2d')
    const w = (canvas.width = canvas.clientWidth * devicePixelRatio)
    const h = (canvas.height = canvas.clientHeight * devicePixelRatio)
    ctx.clearRect(0, 0, w, h)
    const padding = 30 * devicePixelRatio
    const dw = w - padding * 2
    const dh = h - padding * 2
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = Math.max(1, max - min)

    // axes (light)
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1 * devicePixelRatio
    ctx.beginPath()
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i / 4) * dh
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + dw, y)
    }
    ctx.stroke()

    // prepare points
    const points = data.map((v, i) => {
      const x = padding + (i / (data.length - 1)) * dw
      const y = padding + ((max - v) / range) * dh
      return { x, y, v }
    })

    // animate line draw
    const totalLen = points.reduce((acc, pt, i) => {
      if (i === 0) return 0
      const prev = points[i - 1]
      return acc + Math.hypot(pt.x - prev.x, pt.y - prev.y)
    }, 0)

    const startTime = performance.now()
    const duration = 900
    const animate = (now) => {
      const t = Math.min(1, (now - startTime) / duration)
      const lenNow = totalLen * easeOutCubic(t)
      ctx.clearRect(0, 0, w, h)

      // axes lines
      ctx.strokeStyle = '#f0f0f0'
      ctx.lineWidth = 1 * devicePixelRatio
      ctx.beginPath()
      for (let i = 0; i <= 4; i++) {
        const y = padding + (i / 4) * dh
        ctx.moveTo(padding, y)
        ctx.lineTo(padding + dw, y)
      }
      ctx.stroke()

      // line
      ctx.lineWidth = 3 * devicePixelRatio
      ctx.strokeStyle = '#2E7D32'
      ctx.beginPath()
      let traveled = 0
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        if (i === 0) ctx.moveTo(p.x, p.y)
        else {
          const prev = points[i - 1]
          const segmentLen = Math.hypot(p.x - prev.x, p.y - prev.y)
          if (traveled + segmentLen <= lenNow) {
            ctx.lineTo(p.x, p.y)
          } else {
            const remain = Math.max(0, lenNow - traveled)
            const ratio = remain / segmentLen
            const x = prev.x + (p.x - prev.x) * ratio
            const y = prev.y + (p.y - prev.y) * ratio
            ctx.lineTo(x, y)
            break
          }
          traveled += segmentLen
        }
      }
      ctx.stroke()

      // area fill under current line
      ctx.lineTo(
        points[Math.min(points.length - 1, Math.floor(t * (points.length - 1)))].x,
        padding + dh
      )
      ctx.lineTo(padding, padding + dh)
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, 0, h)
      grad.addColorStop(0, 'rgba(46,125,50,0.10)')
      grad.addColorStop(1, 'rgba(46,125,50,0.02)')
      ctx.fillStyle = grad
      ctx.fill()

      // points (draw visible points)
      ctx.fillStyle = '#2E7D32'
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        let distAlong = 0
        for (let j = 1; j <= i; j++) {
          const a = points[j - 1]
          const b = points[j]
          distAlong += Math.hypot(b.x - a.x, b.y - a.y)
        }
        if (distAlong <= lenNow + 1) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 4 * devicePixelRatio, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (t < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  useEffect(() => {
    assignGlobalRanks(wards)
  }, [])

  useEffect(() => {
    if (showPopup && selectedWard && fullChartRef.current) {
      setTimeout(() => {
        if (fullChartRef.current) {
          fullChartRef.current.width = fullChartRef.current.clientWidth * devicePixelRatio
          fullChartRef.current.height = fullChartRef.current.clientHeight * devicePixelRatio
          drawFullChart(fullChartRef.current, selectedWard.history)
        }
      }, 150)
    }
  }, [showPopup, selectedWard])

  const getFilteredAndSortedWards = () => {
    assignGlobalRanks(wards)
    let list = [...wards]

    if (sortValue === 'points_desc') list.sort((a, b) => b.points - a.points)
    else if (sortValue === 'points_asc') list.sort((a, b) => a.points - b.points)
    else if (sortValue === 'alpha') list.sort((a, b) => a.name.localeCompare(b.name))

    if (searchFilter) {
      list = list.filter(w =>
        (w.name + ' ' + w.locality + ' ' + w.region).toLowerCase().includes(searchFilter.toLowerCase())
      )
    }

    return list
  }

  const handleOpenPopup = (ward) => {
    setSelectedWard(ward)
    setShowPopup(true)
  }

  const filteredWards = getFilteredAndSortedWards()

  return (
    <div>
      <style>{styles}</style>
      <header>
        <div className="logo">ReVive</div>
        <nav>
          <a href="index.html">Home</a>
          <a href="leaderboard.html" style={{ textDecoration: 'underline' }}>
            Leaderboard
          </a>
          <a href="rewards.html">Reward Points</a>
        </nav>
      </header>

      <div className="container">
        <h1>🏆 City Leaderboard</h1>

        <div className="controls">
          <input
            id="searchBar"
            placeholder="Search wards, localities..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <select
            id="sortSelect"
            className="sort-select"
            title="Sort"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="points_desc">Sort: Points ▾</option>
            <option value="points_asc">Points ↑</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>

        <div id="leaderboardList">
          {filteredWards.map((w, i) => {
            const badge =
              w.globalRank === 1
                ? <span className="medal gold">🥇</span>
                : w.globalRank === 2
                ? <span className="medal silver">🥈</span>
                : w.globalRank === 3
                ? <span className="medal bronze">🥉</span>
                : <div style={{ fontWeight: 700, color: '#444' }}>{w.globalRank}</div>

            return (
              <div
                key={w.name}
                className="leaderboard-item"
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => handleOpenPopup(w)}
              >
                <div className="rank">{badge}</div>
                <div className="avatar" style={{ backgroundImage: `url('${w.avatar}')` }}></div>
                <div className="meta">
                  <div className="name-row">
                    <div className="ward-name">{w.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{w.locality}</div>
                  </div>
                  <div className="sub">
                    {w.region} • Officer: {w.officer}
                  </div>
                </div>
                <div className="right-col">
                  <div className="points">{w.points} pts</div>
                  <div className="spark">
                    <canvas
                      className="spark-canvas"
                      style={{ width: '110px', height: '34px' }}
                      ref={(canvas) => {
                        if (canvas) {
                          setTimeout(() => drawSparkline(canvas, w.history), 80)
                        }
                      }}
                    ></canvas>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Popup */}
      <div
        id="profilePopup"
        className={showPopup ? 'show' : ''}
        onClick={() => setShowPopup(false)}
        style={{ cursor: 'pointer' }}
      >
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="popup-top">
              <div
                className="popup-avatar"
                style={{ backgroundImage: selectedWard ? `url('${selectedWard.avatar}')` : '' }}
              ></div>
              <div className="popup-info">
                <h2 style={{ margin: 0 }}>{selectedWard?.name}</h2>
                <div style={{ color: 'var(--muted)', marginTop: '6px' }}>{selectedWard?.locality}</div>
                <div style={{ marginTop: '6px', fontWeight: 700, color: 'var(--green)' }}>
                  {selectedWard?.points} pts
                </div>
                <div className="info-grid" style={{ marginTop: '12px' }}>
                  <div className="info-card">
                    <strong>Population</strong>
                    <div style={{ marginTop: '6px', fontWeight: 700 }}>
                      {selectedWard?.population.toLocaleString()}
                    </div>
                  </div>
                  <div className="info-card">
                    <strong>Cleanliness</strong>
                    <div style={{ marginTop: '6px', fontWeight: 700 }}>
                      {selectedWard?.cleanliness} / 10
                    </div>
                  </div>
                  <div className="info-card">
                    <strong>Sanitation Officer</strong>
                    <div style={{ marginTop: '6px', fontWeight: 700 }}>{selectedWard?.officer}</div>
                  </div>
                  <div className="info-card">
                    <strong>Region</strong>
                    <div style={{ marginTop: '6px', fontWeight: 700 }}>{selectedWard?.region}</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>

          <div className="chart-box">
            <canvas
              ref={fullChartRef}
              width="760"
              height="200"
              style={{ width: '100%', height: '200px' }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard
