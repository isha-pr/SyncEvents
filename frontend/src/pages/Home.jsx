import React from 'react';
import { Link } from 'react-router-dom';

/* ── small inline-style helpers ── */
const orangeGrad = 'linear-gradient(135deg, #f97316, #ea580c)';
const cardBase = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '14px',
  padding: '1.75rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const Home = () => {
  /* ── Feature cards data ── */
  const features = [
    {
      icon: '📅',
      title: 'Discover Events',
      desc: 'Browse all upcoming campus events — hackathons, workshops, symposiums, cultural fests, and more — in one unified feed.',
    },
    {
      icon: '🎫',
      title: 'Instant Booking',
      desc: 'Reserve solo tickets or register entire teams in seconds. Capacity bars show real-time seat availability.',
    },
    {
      icon: '📄',
      title: 'PDF Tickets',
      desc: 'Download a QR-coded PDF ticket after every booking. Present it at the venue for seamless check-in.',
    },
    {
      icon: '🤖',
      title: 'AI Campus Assistant',
      desc: 'Ask the Gemini-powered chatbot about events, fees, team rules, or anything else — it knows your schedule in real time.',
    },
    {
      icon: '👥',
      title: 'Team Registration',
      desc: 'Register as a team with a custom team name and member details. The system validates all members against the campus directory.',
    },
    {
      icon: '🛡️',
      title: 'Admin Control',
      desc: 'Admins can create and terminate events, set capacities, and view full registration breakdowns — all from one dashboard.',
    },
  ];

  /* ── How-it-works steps ── */
  const steps = [
    { num: '01', title: 'Create Your Account', desc: 'Register as a student or administrator using your campus email and department credentials.' },
    { num: '02', title: 'Explore Events',       desc: 'Browse the live event catalogue. Filter by category, date, or participation type.' },
    { num: '03', title: 'Book & Confirm',        desc: 'Select tickets or register your team. Payment summary is shown before confirmation.' },
    { num: '04', title: 'Download Your Ticket',  desc: 'Get an instant QR-coded PDF ticket. No queues — just scan and enter.' },
  ];

  /* ── Stats ── */
  const stats = [
    { value: '50+',  label: 'Events per Semester' },
    { value: '2 000+', label: 'Students Registered' },
    { value: '100%', label: 'Paperless Ticketing' },
    { value: '24 / 7', label: 'AI Assistant Support' },
  ];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: '#1a1a1a' }}>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 2rem 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Real background image */}
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop&auto=format"
          alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
          onError={e => e.target.style.display='none'}
        />
        {/* Dark gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(17,24,39,0.88) 0%, rgba(17,24,39,0.72) 40%, rgba(194,65,12,0.55) 100%)', zIndex:1 }} />
        {/* Subtle dot grid on top */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'28px 28px', zIndex:1 }} />

        {/* Content — z-index above overlay */}
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(249,115,22,0.18)', color: '#fdba74',
            borderRadius: '999px', padding: '0.4rem 1.1rem',
            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.4px',
            marginBottom: '1.75rem', border: '1.5px solid rgba(249,115,22,0.35)',
            backdropFilter: 'blur(8px)',
          }}>
            🎓 Smart Campus Event Management System
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-1.5px',
            color: '#ffffff',
            marginBottom: '1.5rem',
            maxWidth: '820px',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            Your Campus Events,{' '}
            <span style={{ background: orangeGrad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Reimagined.
            </span>
          </h1>

          {/* Sub-headline */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '600px',
            lineHeight: 1.75,
            marginBottom: '2.75rem',
          }}>
            Sync Events is the all-in-one smart campus platform for discovering events,
            booking tickets, managing teams, and getting AI-powered assistance — all in real time.
          </p>

          {/* CTA Buttons */}
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'3.5rem' }}>
            <Link to="/login">
              <button style={{
                background: orangeGrad, color:'#fff', border:'none',
                padding:'0.9rem 2.4rem', fontSize:'1rem', fontWeight:800,
                borderRadius:'12px', cursor:'pointer', letterSpacing:'0.2px',
                boxShadow:'0 6px 24px rgba(249,115,22,0.5)',
                transition:'all 0.2s',
              }}>
                🚀 Get Started — It’s Free
              </button>
            </Link>
            <Link to="/register">
              <button style={{
                background:'rgba(255,255,255,0.12)', color:'#fff',
                border:'2px solid rgba(255,255,255,0.45)',
                padding:'0.9rem 2.2rem', fontSize:'1rem', fontWeight:700,
                borderRadius:'12px', cursor:'pointer',
                backdropFilter:'blur(8px)',
                transition:'all 0.2s',
              }}>
                Create Account
              </button>
            </Link>
          </div>

          {/* Quick-feature pills */}
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center' }}>
            {['✅ No Paper Tickets','✅ Team Bookings','✅ QR Check-in','✅ AI Chat Support','✅ Admin Analytics'].map(pill => (
              <span key={pill} style={{
                background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)',
                borderRadius:'999px', padding:'0.35rem 1rem',
                fontSize:'0.82rem', color:'rgba(255,255,255,0.88)', fontWeight:500,
                backdropFilter:'blur(6px)',
              }}>{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS STRIP ══════════════════════ */}
      <section style={{
        background: orangeGrad,
        padding: '2.5rem 2rem',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem', textAlign: 'center',
        }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', marginTop: '0.35rem', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ ABOUT / WHAT IS THIS ══════════════════════ */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Left text */}
          <div>
            <span style={{
              display: 'inline-block', background: '#ffedd5', color: '#c2410c',
              borderRadius: '999px', padding: '0.3rem 1rem', fontSize: '0.78rem',
              fontWeight: 700, letterSpacing: '0.5px', marginBottom: '1rem',
            }}>ABOUT THE PLATFORM</span>

            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem', color: '#111827' }}>
              Built for Students,{' '}
              <span style={{ background: orangeGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Designed by Campus
              </span>
            </h2>

            <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
              Managing campus events used to mean paper forms, WhatsApp group chaos, and sold-out queues. 
              <strong> Sync Events</strong> replaces all of that with a secure, real-time digital platform.
            </p>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }}>
              Students discover events, book tickets, and register teams — all from their browser. 
              Admins publish events, monitor capacity, and view detailed registration breakdowns. 
              And the AI assistant answers questions 24/7, powered by Google Gemini.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link to="/register">
                <button style={{
                  background: orangeGrad, color: '#fff', border: 'none',
                  padding: '0.8rem 1.8rem', borderRadius: '10px', fontWeight: 700,
                  fontSize: '0.95rem', cursor: 'pointer',
                }}>Join Now →</button>
              </Link>
              <Link to="/login">
                <button style={{
                  background: 'transparent', color: '#f97316', border: '2px solid #f97316',
                  padding: '0.8rem 1.8rem', borderRadius: '10px', fontWeight: 700,
                  fontSize: '0.95rem', cursor: 'pointer',
                }}>Sign In</button>
              </Link>
            </div>
          </div>

          {/* Right visual card stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🎯', title: 'Role-Based Access', desc: 'Separate portals for students and administrators with secure JWT authentication.' },
              { icon: '⚡', title: 'Real-Time Capacity', desc: 'Live availability bars show exactly how many tickets or team slots remain.' },
              { icon: '🔒', title: 'Secure & Reliable', desc: 'End-to-end API security, venue conflict detection, and validated team emails.' },
            ].map(item => (
              <div key={item.title} style={{
                ...cardBase,
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                borderLeft: '4px solid #f97316',
              }}>
                <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#111827' }}>{item.title}</div>
                  <div style={{ fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FEATURES GRID ══════════════════════ */}
      <section style={{ padding: '5rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Section heading */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', background: '#ffedd5', color: '#c2410c',
              borderRadius: '999px', padding: '0.3rem 1rem', fontSize: '0.78rem',
              fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.75rem',
            }}>EVERYTHING YOU NEED</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
              Powerful Features for the
              <span style={{ background: orangeGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Entire Campus</span>
            </h2>
            <p style={{ color: '#6b7280', marginTop: '0.75rem', maxWidth: '520px', margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              From discovery to check-in, Sync Events handles the entire event lifecycle for students and organizers.
            </p>
          </div>

          {/* Features grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                ...cardBase,
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
              >
                {/* accent top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: orangeGrad }} />

                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px',
                  background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', marginBottom: '1rem',
                }}>{f.icon}</div>

                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem', color: '#111827' }}>{f.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', background: '#ffedd5', color: '#c2410c',
              borderRadius: '999px', padding: '0.3rem 1rem', fontSize: '0.78rem',
              fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.75rem',
            }}>HOW IT WORKS</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#111827' }}>
              From Sign-up to{' '}
              <span style={{ background: orangeGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Check-in in 4 Steps</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {steps.map((step, idx) => (
              <div key={step.num} style={{
                ...cardBase,
                textAlign: 'center',
                position: 'relative',
              }}>
                {/* connecting line (not on last) */}
                {idx < steps.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '2.5rem', right: '-12px',
                    width: '24px', height: '2px',
                    background: '#fdba74', zIndex: 1,
                    display: 'none', // hidden on mobile, shown via grid gap
                  }} />
                )}

                <div style={{
                  width: '54px', height: '54px', borderRadius: '50%',
                  background: orangeGrad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 800, color: '#fff',
                  margin: '0 auto 1rem',
                  boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
                }}>{step.num}</div>

                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#111827' }}>{step.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHO IS IT FOR ══════════════════════ */}
      <section style={{ padding: '5rem 2rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', background: '#ffedd5', color: '#c2410c',
              borderRadius: '999px', padding: '0.3rem 1rem', fontSize: '0.78rem',
              fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.75rem',
            }}>WHO IS IT FOR?</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#111827' }}>
              Designed for <span style={{ background: orangeGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Everyone on Campus</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Students */}
            <div style={{ ...cardBase, borderTop: '4px solid #f97316' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem', color: '#111827' }}>Students</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Browse all campus events in one place',
                  'Book individual or team registrations',
                  'Manage your acquired tickets',
                  'Download QR-coded PDF tickets',
                  'Get instant AI help & event info',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#374151' }}>
                    <span style={{ color: '#f97316', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.75rem' }}>
                <Link to="/register">
                  <button style={{
                    width: '100%', background: orangeGrad, color: '#fff',
                    border: 'none', padding: '0.8rem', borderRadius: '8px',
                    fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                  }}>Register as Student →</button>
                </Link>
              </div>
            </div>

            {/* Admins */}
            <div style={{ ...cardBase, borderTop: '4px solid #ea580c' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem', color: '#111827' }}>Event Administrators</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Publish new events with full details',
                  'Set team sizes and ticket capacities',
                  'Automatic venue conflict detection',
                  'View all registrations per event',
                  'Terminate events and manage lifecycle',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#374151' }}>
                    <span style={{ color: '#ea580c', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.75rem' }}>
                <Link to="/login">
                  <button style={{
                    width: '100%', background: 'transparent', color: '#ea580c',
                    border: '2px solid #ea580c', padding: '0.8rem', borderRadius: '8px',
                    fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                  }}>Admin Sign In →</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ EVENT CATEGORIES SHOWCASE ══════════════════════ */}
      <section style={{ padding:'5rem 2rem', background:'#111827' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <span style={{ display:'inline-block', background:'rgba(249,115,22,0.18)', color:'#fb923c', borderRadius:'999px', padding:'0.3rem 1rem', fontSize:'0.78rem', fontWeight:700, letterSpacing:'0.5px', marginBottom:'0.75rem', border:'1px solid rgba(249,115,22,0.3)' }}>EXPLORE BY CATEGORY</span>
            <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.4rem)', fontWeight:800, color:'#fff', lineHeight:1.2 }}>
              Every Kind of Campus Event,
              <span style={{ background:orangeGrad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}> One Platform</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1rem' }}>
            {[
              { cat:'Hackathon',   img:'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=260&fit=crop&auto=format', emoji:'💻' },
              { cat:'Workshop',    img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop&auto=format', emoji:'🛠️' },
              { cat:'Cultural',    img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=260&fit=crop&auto=format', emoji:'🎭' },
              { cat:'Sports',      img:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=260&fit=crop&auto=format', emoji:'🏆' },
              { cat:'Conference',  img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=260&fit=crop&auto=format', emoji:'🎤' },
              { cat:'Music',       img:'https://images.unsplash.com/photo-1501386761578-eaa54b05f7e4?w=400&h=260&fit=crop&auto=format', emoji:'🎵' },
            ].map(c => (
              <div key={c.cat} style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'180px', cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.querySelector('img').style.transform='scale(1.08)'}
                onMouseLeave={e => e.currentTarget.querySelector('img').style.transform='scale(1)'}
              >
                <img src={c.img} alt={c.cat} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', display:'block' }} onError={e => e.target.style.display='none'} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
                <div style={{ position:'absolute', bottom:'0.85rem', left:'0.85rem' }}>
                  <div style={{ fontSize:'1.3rem', marginBottom:'0.2rem' }}>{c.emoji}</div>
                  <div style={{ color:'#fff', fontWeight:700, fontSize:'0.9rem' }}>{c.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FINAL CTA ══════════════════════ */}
      <section style={{
        padding: '5rem 2rem',
        background: orangeGrad,
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
            Ready to Experience Smarter Campus Events?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.25rem' }}>
            Join thousands of students already using Sync Events. Sign up in under 60 seconds — no credit card required.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={{
                background: '#fff', color: '#f97316',
                border: 'none', padding: '0.9rem 2.2rem',
                borderRadius: '10px', fontWeight: 800, fontSize: '1rem',
                cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}>Get Started for Free →</button>
            </Link>
            <Link to="/login">
              <button style={{
                background: 'transparent', color: '#fff',
                border: '2px solid rgba(255,255,255,0.7)',
                padding: '0.9rem 2.2rem', borderRadius: '10px',
                fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
              }}>Sign In</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer style={{ background:'#0d1117', color:'#9ca3af', padding:'2.5rem 2rem 1.75rem' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem', marginBottom:'1.75rem', paddingBottom:'1.75rem', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
              <div style={{ background:orangeGrad, color:'#fff', width:'36px', height:'36px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'1.1rem' }}>S</div>
              <span style={{ color:'#fff', fontWeight:800, fontSize:'1.1rem', letterSpacing:'-0.3px' }}>Sync Events</span>
            </div>
            <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
              {['Home','Login','Register','About'].map(l => (
                <Link key={l} to={l==='Home'?'/':l==='Login'?'/login':l==='Register'?'/register':'/'}
                  style={{ color:'#9ca3af', fontSize:'0.88rem', fontWeight:500, textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.target.style.color='#f97316'}
                  onMouseLeave={e=>e.target.style.color='#9ca3af'}>{l}</Link>
              ))}
            </div>
          </div>
          <p style={{ textAlign:'center', fontSize:'0.82rem', color:'#6b7280' }}>
            © 2026 <span style={{ color:'#f97316', fontWeight:700 }}>Sync Events</span> — Smart Campus Event Ticket Booking System. Built with ❤️ for campus communities.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
