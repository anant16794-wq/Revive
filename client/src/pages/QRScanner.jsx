import React, { useState, useRef, useEffect } from 'react'

const QRScanner = () => {
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState("Your QR result will appear here...")
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const resultRef = useRef(null)
  const loaderRef = useRef(null)
  const streamRef = useRef(null)
  const scanningRef = useRef(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  const startScanner = () => {
    setScanning(true)
    scanningRef.current = true
    if (loaderRef.current) loaderRef.current.style.display = "block"
    if (videoRef.current) videoRef.current.style.display = "none"

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(s => {
        streamRef.current = s
        setTimeout(() => {
          if (loaderRef.current) loaderRef.current.style.display = "none"
          if (videoRef.current) {
            videoRef.current.style.display = "block"
            videoRef.current.srcObject = s
          }
          scan()
        }, 1200)
      })
      .catch(err => {
        alert("Camera access denied.")
        console.log(err)
        setScanning(false)
        scanningRef.current = false
      })
  }

  const stopScanner = () => {
    setScanning(false)
    scanningRef.current = false
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    if (videoRef.current) videoRef.current.style.display = "none"
    if (loaderRef.current) loaderRef.current.style.display = "none"
  }

  const scan = () => {
    if (!scanningRef.current) return
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (window.jsQR) {
      const code = window.jsQR(imgData.data, canvas.width, canvas.height)
      if (code) {
        setScanResult("QR Code: " + code.data)
        if (resultRef.current) {
          resultRef.current.classList.add("pop")
          setTimeout(() => {
            if (resultRef.current) resultRef.current.classList.remove("pop")
          }, 300)
        }
      }
    }

    requestAnimationFrame(scan)
  }

  const handleScanClick = () => {
    if (scanning) stopScanner()
    else startScanner()
  }

  useEffect(() => {
    setupCircleAnimations()
    setupPopupAccessibility()
  }, [])

  const setupCircleAnimations = () => {
    const CIRCUMFERENCE = 2 * Math.PI * 70 // r=70
    document.querySelectorAll('.circle-wrap').forEach(wrap => {
      const svgCircle = wrap.querySelector('.progress-circle')
      const numEl = wrap.querySelector('.num')
      if (!svgCircle || !numEl) return

      const type = wrap.dataset.type || 'percent'
      const target = Number(wrap.dataset.target) || 0
      const max = Number(wrap.dataset.max) || (type === 'percent' ? 100 : Math.max(1, target))

      // initial dash
      svgCircle.style.strokeDasharray = CIRCUMFERENCE
      svgCircle.style.strokeDashoffset = CIRCUMFERENCE

      // animate progress using requestAnimationFrame
      let start = null
      const duration = 1100 + Math.random() * 600 // slight variation

      function step(ts) {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = easeOutCubic(progress)
        const value = Math.round(eased * target)

        // percentage of max
        const percent = Math.min(1, (eased * target) / max)
        const offset = CIRCUMFERENCE * (1 - percent)
        svgCircle.style.strokeDashoffset = String(offset)

        // update displayed number with some formatting for kg
        if (type === 'kg') numEl.textContent = value
        else if (type === 'percent') numEl.textContent = Math.round(value)
        else if (type === 'count') numEl.textContent = value

        if (progress < 1) requestAnimationFrame(step)
        else {
          // small pulse on completion
          svgCircle.animate(
            [
              { transform: 'scale(1)' },
              { transform: 'scale(1.02)' },
              { transform: 'scale(1)' }
            ],
            { duration: 360, easing: 'ease-out' }
          )
        }
      }

      // trigger on small delay so cards appear staggered
      setTimeout(
        () => requestAnimationFrame(step),
        120 + Math.random() * 240
      )

      // hover popup: scale stroke color slightly
      wrap.parentElement?.addEventListener(
        'mouseenter',
        () =>
          (svgCircle.style.transition =
            'stroke-dashoffset .9s cubic-bezier(.22,.9,.18,1), stroke .3s')
      )
      wrap.parentElement?.addEventListener(
        'mouseleave',
        () =>
          (svgCircle.style.transition =
            'stroke-dashoffset 1.3s cubic-bezier(.22,.9,.18,1)')
      )
    })

    // SVG animations
    document.querySelectorAll('.circle-wrap svg').forEach(svg => {
      svg.addEventListener('mouseenter', () => {
        svg.animate(
          [
            {
              filter: 'drop-shadow(0 0 0px rgba(0,150,200,0.0))',
              transform: 'rotate(-90deg) scale(1)'
            },
            {
              filter: 'drop-shadow(0 0 12px rgba(0,150,200,0.35))',
              transform: 'rotate(-90deg) scale(1.12)'
            }
          ],
          { duration: 350, easing: 'ease-out', fill: 'forwards' }
        )
      })

      svg.addEventListener('mouseleave', () => {
        svg.animate(
          [
            {
              filter: 'drop-shadow(0 0 12px rgba(0,150,200,0.35))',
              transform: 'rotate(-90deg) scale(1.12)'
            },
            {
              filter: 'drop-shadow(0 0 0px rgba(0,150,200,0))',
              transform: 'rotate(-90deg) scale(1)'
            }
          ],
          { duration: 350, easing: 'ease-out', fill: 'forwards' }
        )
      })

      svg.addEventListener('click', () => {
        svg.animate(
          [
            { transform: 'rotate(-90deg) scale(1)' },
            { transform: 'rotate(-90deg) scale(1.18)' },
            { transform: 'rotate(-90deg) scale(1)' }
          ],
          { duration: 420, easing: 'cubic-bezier(.2,1.2,.3,1)' }
        )
      })
    })
  }

  const setupPopupAccessibility = () => {
    document.querySelectorAll('.info').forEach(i => {
      i.setAttribute('tabindex', '0')
      i.addEventListener('focus', () => {
        const popup = i.querySelector('.popup')
        if (popup) popup.style.opacity = '1'
      })
      i.addEventListener('blur', () => {
        const popup = i.querySelector('.popup')
        if (popup) popup.style.opacity = '0'
      })
    })
  }

  return (
    <div>
      <header>
        <a href="index.html" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
          ReVive
        </a>
        <nav>
          <a href="index.html">Home</a>
          <a href="leaderboard.html">Leaderboard</a>
          <a href="rewards.html">Reward Points</a>
        </nav>
      </header>

      <div className="container">
        <div className="left-box">
          <h2>Scan the QR Code</h2>
          <p>Click the button below to start scanning.</p>
          <button onClick={handleScanClick}>{scanning ? 'Stop Scanning' : 'Start QR Scan'}</button>
        </div>

        <div ref={loaderRef} style={{ display: 'none' }}>
          <div className="spinner"></div>
          <p>Preparing camera...</p>
        </div>

        <div className="scanner-box">
          <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
          <canvas ref={canvasRef} hidden></canvas>
          <div ref={resultRef}>{scanResult}</div>
        </div>
      </div>

      <div className="wrap">
        <div className="card" role="group" aria-label="Waste generated today">
          <div className="circle-wrap" data-type="kg" data-target="128" data-max="200">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle className="bg-circle" cx="80" cy="80" r="70"></circle>
              <circle className="progress-circle" cx="80" cy="80" r="70"></circle>
            </svg>
            <div className="value">
              <div className="num">0</div>
              <div className="unit">kg</div>
            </div>
          </div>
          <div className="label-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Waste generated today</h3>
              <div className="info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v5"
                    stroke="rgba(230,238,246,0.85)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="17" r="0.5" fill="rgba(230,238,246,0.85)" />
                </svg>
                <div className="popup" role="tooltip">
                  Target: <strong>200 kg</strong>
                  <br />
                  <small>Shows today's collected solid waste (dummy)</small>
                </div>
              </div>
            </div>
            <p className="desc">
              Total weight in kilograms. Animated progress shows proportion of target collected.
            </p>
          </div>
        </div>

        <div className="card" role="group" aria-label="Segregation rate">
          <div className="circle-wrap" data-type="percent" data-target="72" data-max="100">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#00d1ff" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle className="bg-circle" cx="80" cy="80" r="70"></circle>
              <circle className="progress-circle" style={{ stroke: 'url(#g1)' }} cx="80" cy="80" r="70"></circle>
            </svg>
            <div className="value">
              <div className="num">0</div>
              <div className="unit">%</div>
            </div>
          </div>
          <div className="label-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Segregation rate</h3>
              <div className="info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v5"
                    stroke="rgba(230,238,246,0.85)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="17" r="0.5" fill="rgba(230,238,246,0.85)" />
                </svg>
                <div className="popup" role="tooltip">
                  Shows % of correctly segregated waste.
                  <br />
                  <small>Good for measuring citizen behaviour.</small>
                </div>
              </div>
            </div>
            <p className="desc">
              Higher is better — this shows how much of the waste stream is segregated at source.
            </p>
          </div>
        </div>

        <div className="card" role="group" aria-label="Number of complaints today">
          <div className="circle-wrap" data-type="count" data-target="8" data-max="20">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle className="bg-circle" cx="80" cy="80" r="70"></circle>
              <circle className="progress-circle" cx="80" cy="80" r="70"></circle>
            </svg>
            <div className="value">
              <div className="num">0</div>
              <div className="unit">complaints</div>
            </div>
          </div>
          <div className="label-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Number of complaints today</h3>
              <div className="info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v5"
                    stroke="rgba(230,238,246,0.85)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="17" r="0.5" fill="rgba(230,238,246,0.85)" />
                </svg>
                <div className="popup" role="tooltip">
                  Daily complaints received. <small>Animated count from 0 to target.</small>
                </div>
              </div>
            </div>
            <p className="desc">Counts all service requests filed by citizens today.</p>
          </div>
        </div>

        <div className="card" role="group" aria-label="Pending complaints">
          <div className="circle-wrap" data-type="count" data-target="3" data-max="12">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle className="bg-circle" cx="80" cy="80" r="70"></circle>
              <circle className="progress-circle grad2" cx="80" cy="80" r="70"></circle>
            </svg>
            <div className="value">
              <div className="num">0</div>
              <div className="unit">pending</div>
            </div>
          </div>
          <div className="label-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Pending complaints</h3>
              <div className="info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v5"
                    stroke="rgba(230,238,246,0.85)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="17" r="0.5" fill="rgba(230,238,246,0.85)" />
                </svg>
                <div className="popup" role="tooltip">
                  Shows complaints still open at the end of the day.
                </div>
              </div>
            </div>
            <p className="desc">Lower is better — aim for zero pending every evening.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRScanner
