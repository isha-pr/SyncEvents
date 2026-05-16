import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

/* ── Image helper ── */
const getEventImage = (category = '', id = 0) => {
  const c = category.toLowerCase();
  if (c.includes('hack') || c.includes('cod'))      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=220&fit=crop&auto=format';
  if (c.includes('workshop') || c.includes('train')) return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=220&fit=crop&auto=format';
  if (c.includes('cultural') || c.includes('fest')) return 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=220&fit=crop&auto=format';
  if (c.includes('sport') || c.includes('game'))    return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=220&fit=crop&auto=format';
  if (c.includes('music') || c.includes('concert')) return 'https://images.unsplash.com/photo-1501386761578-eaa54b05f7e4?w=600&h=220&fit=crop&auto=format';
  if (c.includes('quiz'))                            return 'https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=600&h=220&fit=crop&auto=format';
  if (c.includes('tech') || c.includes('seminar'))  return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=220&fit=crop&auto=format';
  if (c.includes('art') || c.includes('design'))    return 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=220&fit=crop&auto=format';
  return `https://picsum.photos/seed/${(id || 1) + 10}/600/220`;
};

const getCatEmoji = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('hack')) return '💻'; if (c.includes('workshop')) return '🛠️';
  if (c.includes('cultural') || c.includes('fest')) return '🎭';
  if (c.includes('sport')) return '🏆'; if (c.includes('music')) return '🎵';
  if (c.includes('quiz')) return '❓'; if (c.includes('art')) return '🎨';
  return '🎫';
};

const lbl = { display:'block', fontSize:'0.78rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.3rem' };
const OG  = 'linear-gradient(135deg,#f97316,#ea580c)';

/* ── Countdown Timer ── */
const CountdownTimer = ({ date }) => {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const calc = () => {
      const d = new Date(date) - new Date();
      if (d <= 0) return setLeft(null);
      setLeft({ d: Math.floor(d/86400000), h: Math.floor((d%86400000)/3600000), m: Math.floor((d%3600000)/60000) });
    };
    calc(); const t = setInterval(calc, 30000); return () => clearInterval(t);
  }, [date]);
  if (!left) return <span style={{ color:'#9ca3af', fontWeight:600, fontSize:'0.82rem' }}>Event is live!</span>;
  return (
    <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
      {[['D',left.d],['H',left.h],['M',left.m]].map(([u,v]) => (
        <div key={u} style={{ background:'rgba(249,115,22,0.12)', border:'1px solid rgba(249,115,22,0.25)', borderRadius:'10px', padding:'0.4rem 0.6rem', textAlign:'center', minWidth:'46px' }}>
          <div style={{ fontSize:'1.1rem', fontWeight:800, color:'#f97316', lineHeight:1 }}>{String(v).padStart(2,'0')}</div>
          <div style={{ fontSize:'0.55rem', fontWeight:700, color:'#ea580c', opacity:0.8, textTransform:'uppercase', marginTop:'2px' }}>{u}</div>
        </div>
      ))}
    </div>
  );
};

/* ── EventCard ── */
const EventCard = ({ event, onBook }) => {
  const [imgErr, setImgErr] = useState(false);
  const cap   = (event.availableTickets / (event.totalCapacity || event.availableTickets || 1)) * 100;
  const color = cap > 50 ? '#16a34a' : cap > 25 ? '#f97316' : cap > 5 ? '#ea580c' : '#ef4444';
  const isTeam  = event.participationType === 'Team';
  const left    = isTeam ? Math.floor(event.availableTickets / event.teamSize) : event.availableTickets;
  const canBook = left > 0;
  const availTx = isTeam ? `${left} Teams Left` : `${left} Tickets Left`;

  return (
    <div className="event-card">
      <div className="event-card-image">
        {!imgErr
          ? <img src={getEventImage(event.category, event.id)} alt={event.name} onError={() => setImgErr(true)} />
          : <div style={{ width:'100%', height:'100%', background: OG, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3.5rem' }}>{getCatEmoji(event.category)}</div>
        }
        <div className="event-card-overlay" />
        {/* badges on image */}
        <div style={{ position:'absolute', top:'0.75rem', left:'0.75rem', display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
          <span className="badge badge-white">{getCatEmoji(event.category)} {event.category}</span>
          <span className="badge" style={{ background: isTeam ? 'rgba(124,58,237,0.88)' : 'rgba(5,150,105,0.88)', color:'#fff' }}>
            {isTeam ? `👥 Team (${event.teamSize})` : '🧍 Solo'}
          </span>
        </div>
        {/* price badge */}
        <div style={{ position:'absolute', bottom:'0.75rem', right:'0.75rem', background: OG, color:'#fff', borderRadius:'10px', padding:'0.25rem 0.85rem', fontWeight:800, fontSize:'1.1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
          ₹{event.registrationFee}
        </div>
        {/* event name on image */}
        <div style={{ position:'absolute', bottom:'0.75rem', left:'0.75rem', right:'5rem' }}>
          <h3 style={{ color:'#fff', fontWeight:800, fontSize:'1rem', lineHeight:1.3, textShadow:'0 1px 4px rgba(0,0,0,0.6)' }}>{event.name}</h3>
        </div>
      </div>

      <div className="event-card-body">
        <div style={{ display:'flex', flexDirection:'column', gap:'0.28rem', marginBottom:'0.9rem' }}>
          <div style={{ display:'flex', gap:'0.5rem', fontSize:'0.82rem', color:'#6b7280', alignItems:'center' }}>
            <span>📅</span><span>{event.eventDate}{event.eventTime ? ` · ${event.eventTime}` : ''}</span>
          </div>
          <div style={{ display:'flex', gap:'0.5rem', fontSize:'0.82rem', color:'#6b7280', alignItems:'center' }}>
            <span>📍</span><span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{event.venue}</span>
          </div>
        </div>

        <p style={{ fontSize:'0.83rem', color:'#6b7280', lineHeight:1.6, marginBottom:'1rem',
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {event.description}
        </p>

        {/* availability bar */}
        <div style={{ marginBottom:'1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.76rem', fontWeight:600, marginBottom:'4px' }}>
            <span style={{ color:'#9ca3af' }}>Availability</span>
            <span style={{ color }}>{availTx}</span>
          </div>
          <div style={{ height:'6px', background:'#f3f4f6', borderRadius:'999px', overflow:'hidden' }}>
            <div style={{ width:`${Math.min(cap,100)}%`, height:'100%', background: color, borderRadius:'999px', transition:'width 0.6s' }} />
          </div>
        </div>

        <button onClick={() => onBook(event)} disabled={!canBook}
          style={{ width:'100%', padding:'0.82rem', fontWeight:800, fontSize:'0.92rem',
            background: canBook ? OG : '#e5e7eb', color: canBook ? '#fff' : '#9ca3af',
            border:'none', borderRadius:'10px', cursor: canBook ? 'pointer' : 'not-allowed', transition:'all 0.2s' }}>
          {canBook ? '🎟️ Book Now' : '❌ Sold Out'}
        </button>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents]               = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketsToBook, setTicketsToBook] = useState(1);
  const [teamMembers, setTeamMembers]     = useState([]);
  const [teamName, setTeamName]           = useState('');
  const [msg, setMsg]                     = useState({ type:'', text:'' });
  const [bookings, setBookings]           = useState([]);
  const [activeCat, setActiveCat]         = useState('All');

  const fetchData = async () => {
    try {
      const [evRes, bkRes] = await Promise.all([api.get('/events/public'), api.get('/bookings/my')]);
      setEvents(evRes.data); setBookings(bkRes.data);
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event); setTicketsToBook(1); setTeamName('');
    setTeamMembers(event.participationType === 'Team' ? Array(event.teamSize).fill({ name:'', email:'' }) : []);
  };
  const handleTeamMemberChange = (i, field, val) => {
    const u = [...teamMembers]; u[i] = { ...u[i], [field]: val }; setTeamMembers(u);
  };

  const handleBook = async (e) => {
    e.preventDefault(); setMsg({ type:'', text:'' });
    if (selectedEvent.participationType === 'Team') {
      if (!teamName.trim()) { setMsg({ type:'error', text:'Please provide a Team Name.' }); return; }
      if (teamMembers.some(m => !m.name.trim() || !m.email.trim())) {
        setMsg({ type:'error', text:'Please fill Name and Email for all team members.' }); return;
      }
    }
    try {
      await api.post('/bookings', {
        eventId: selectedEvent.id,
        numberOfTickets: selectedEvent.participationType === 'Team' ? selectedEvent.teamSize : ticketsToBook,
        teamName: selectedEvent.participationType === 'Team' ? teamName : null,
        teamMembers: selectedEvent.participationType === 'Team' ? teamMembers : [],
      });
      setMsg({ type:'success', text:`Successfully booked for ${selectedEvent.name}!` });
      setSelectedEvent(null); fetchData();
    } catch (err) { setMsg({ type:'error', text: err.response?.data?.message || 'Booking failed.' }); }
  };

  const downloadTicket = async (b) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22); doc.text('Sync Events Ticket', 20, 20);
      doc.setFontSize(16);
      doc.text(`Event: ${b.event.name}`, 20, 40);
      doc.text(`Venue: ${b.event.venue}`, 20, 50);
      doc.text(`Date: ${b.event.eventDate}`, 20, 60);
      doc.text(`Booked By: ${b.user?.name || user.name}`, 20, 70);
      if (b.teamName) { doc.text(`Team: ${b.teamName}`, 20, 80); doc.text(`Members: ${b.teamMembers}`, 20, 90); }
      else if (b.teamMembers) { doc.text(`Team: ${b.teamMembers}`, 20, 80); }
      else { doc.text(`Tickets: ${b.numberOfTickets}`, 20, 80); }
      const qr = await QRCode.toDataURL(`TICKET\nID:${b.id}\nEvent:${b.event.name}\nBooker:${b.user?.email||user.email}`);
      doc.addImage(qr, 'PNG', 20, 110, 50, 50);
      doc.save(`Ticket_${b.event.name.replace(/\s+/g,'_')}.pdf`);
    } catch { alert('Failed to generate PDF ticket.'); }
  };

  /* ── Booking panel ── */
  if (selectedEvent) {
    const [imgErr2, setImgErr2] = [false, () => {}];
    return (
      <div className="dash-bg dash-bg-student" style={{ paddingBottom:'3rem' }}>
        {/* hero */}
        <div style={{ background: OG, padding:'0', height:'220px', position:'relative', overflow:'hidden' }}>
          <img src={getEventImage(selectedEvent.category, selectedEvent.id)} alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.4 }}
            onError={e => e.target.style.display='none'} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(249,115,22,0.95), rgba(234,88,12,0.8))' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'1.5rem 2rem' }}>
            <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.75)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:'0.3rem' }}>Booking Event</div>
            <h1 style={{ color:'#fff', fontSize:'1.8rem', fontWeight:800, lineHeight:1.2, marginBottom:'0.6rem' }}>{selectedEvent.name}</h1>
            <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', fontSize:'0.88rem', color:'rgba(255,255,255,0.9)' }}>
              <span>📍 {selectedEvent.venue}</span>
              <span>📅 {selectedEvent.eventDate}</span>
              <span>💰 ₹{selectedEvent.registrationFee}{selectedEvent.participationType==='Team'?' / Team':' / Ticket'}</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ maxWidth:'780px', paddingTop:'1.75rem' }}>
          <button onClick={() => setSelectedEvent(null)} className="btn-danger"
            style={{ marginBottom:'1.5rem', display:'inline-flex', alignItems:'center', gap:'0.4rem' }}>
            ← Cancel &amp; Go Back
          </button>
          {msg.text && <div className={msg.type==='error'?'error-msg':'success-msg'} style={{ marginBottom:'1.25rem' }}>{msg.text}</div>}

          {/* About card */}
          <div className="card" style={{ marginBottom:'1.25rem' }}>
            <div style={lbl}>About This Event</div>
            <p style={{ color:'#374151', lineHeight:1.8, marginBottom:'1.25rem' }}>{selectedEvent.description}</p>
            <div style={lbl}>📍 Location Map</div>
            <iframe width="100%" height="200"
              style={{ border:0, borderRadius:'10px', marginTop:'0.5rem' }}
              loading="lazy" allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(selectedEvent.venue)}&output=embed`} />
          </div>

          {/* Booking form */}
          <div className="card">
            <div style={{ ...lbl, marginBottom:'1rem' }}>📋 Registration Details</div>
            <form onSubmit={handleBook} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {selectedEvent.participationType === 'Solo' ? (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div><div style={lbl}>Number of Tickets</div>
                    <input type="number" value={ticketsToBook} onChange={e=>setTicketsToBook(parseInt(e.target.value))} min="1" max={selectedEvent.availableTickets} required />
                  </div>
                  <div><div style={lbl}>Total Amount</div>
                    <input type="text" value={`₹${ticketsToBook*selectedEvent.registrationFee}`} disabled />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="form-section">
                    <div className="form-section-title">👥 Team Details</div>
                    <div style={lbl}>Team Name</div>
                    <input type="text" placeholder="Enter your team name" value={teamName} onChange={e=>setTeamName(e.target.value)} required style={{ fontWeight:700 }} />
                  </div>
                  <div className="form-section">
                    <div className="form-section-title">👤 Team Members ({selectedEvent.teamSize} required)</div>
                    <p style={{ fontSize:'0.8rem', color:'#f97316', marginBottom:'1rem', fontWeight:500 }}>
                      ⚠️ All members must have a registered account with the provided email.
                    </p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                      {teamMembers.map((m, i) => (
                        <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', background:'#fff', borderRadius:'8px', padding:'0.75rem', border:'1px solid #e5e7eb' }}>
                          <div><div style={lbl}>Member {i+1} — Name</div>
                            <input type="text" placeholder="Full name" value={m.name} onChange={e=>handleTeamMemberChange(i,'name',e.target.value)} required style={{ marginBottom:0 }} />
                          </div>
                          <div><div style={lbl}>Member {i+1} — Email</div>
                            <input type="email" placeholder="Campus email" value={m.email} onChange={e=>handleTeamMemberChange(i,'email',e.target.value)} required style={{ marginBottom:0 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:'1rem' }}><div style={lbl}>Total Amount (1 Team)</div>
                      <input type="text" value={`₹${selectedEvent.registrationFee}`} disabled />
                    </div>
                  </div>
                </div>
              )}
              <button type="submit" style={{ width:'100%', padding:'0.95rem', fontWeight:800, fontSize:'1rem' }}>
                ✅ Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main dashboard ── */
  const categories = ['All', ...new Set(events.map(e => e.category).filter(Boolean))];
  const feat = events[0];
  const filtered = activeCat === 'All' ? events : events.filter(e => e.category === activeCat);
  const featLeft = feat ? (feat.participationType==='Team' ? Math.floor(feat.availableTickets/feat.teamSize) : feat.availableTickets) : 0;

  return (
    <div className="dash-bg dash-bg-student">

      {/* ── Unified Student Header ── */}
      <div className="dashboard-hero">
        {/* Subtle background image layer */}
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=500&fit=crop&auto=format"
          alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.10, zIndex:0 }}
          onError={e => e.target.style.display='none'}
        />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize:'24px 24px', zIndex:0 }} />

        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>

          {/* ── Row 1: Identity + Actions ── */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.25rem', marginBottom:'1.6rem' }}>

            {/* Left: Avatar + greeting */}
            <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              <div style={{
                width:'54px', height:'54px', borderRadius:'50%',
                background:'rgba(255,255,255,0.22)', border:'2px solid rgba(255,255,255,0.45)',
                color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:800, fontSize:'1.4rem', flexShrink:0,
                boxShadow:'0 4px 16px rgba(0,0,0,0.18)', backdropFilter:'blur(4px)',
              }}>
                {(user?.name || 'S')[0].toUpperCase()}
              </div>
              <div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'rgba(255,255,255,0.15)', borderRadius:'999px', padding:'0.22rem 0.8rem', fontSize:'0.7rem', fontWeight:800, color:'rgba(255,255,255,0.9)', marginBottom:'0.35rem', border:'1px solid rgba(255,255,255,0.25)', letterSpacing:'0.5px' }}>
                  🎓 Student Portal
                </div>
                <div style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.8rem', fontWeight:400, marginBottom:'0.15rem' }}>Welcome back 👋</div>
                <h1 style={{ color:'#fff', fontSize:'1.75rem', fontWeight:800, lineHeight:1.15, textShadow:'0 2px 10px rgba(0,0,0,0.18)', margin:0 }}>
                  {user?.name || 'Student'}
                </h1>
                <div style={{ color:'rgba(255,255,255,0.70)', fontSize:'0.78rem', fontWeight:500, marginTop:'0.2rem' }}>
                  {user?.department || 'Campus Student'}{user?.email ? ` · ${user.email}` : ''}
                </div>
              </div>
            </div>

            {/* Right: Quick-action buttons */}
            <div style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap' }}>
              <button
                onClick={() => setActiveCat('All')}
                style={{ padding:'0.65rem 1.35rem', fontWeight:800, fontSize:'0.85rem', borderRadius:'10px', border:'none', background:'#fff', color:'#f97316', cursor:'pointer', boxShadow:'0 4px 16px rgba(0,0,0,0.14)', letterSpacing:'0.2px' }}
              >
                🎫 Browse Events
              </button>
              <button
                onClick={() => document.getElementById('my-bookings-section')?.scrollIntoView({ behavior:'smooth' })}
                style={{ padding:'0.65rem 1.35rem', fontWeight:700, fontSize:'0.85rem', borderRadius:'10px', border:'2px solid rgba(255,255,255,0.45)', background:'transparent', color:'#fff', cursor:'pointer' }}
              >
                📋 My Bookings
              </button>
            </div>
          </div>

          {/* ── Row 2: Stat pills ── */}
          <div style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap' }}>
            {[
              { icon:'🎫', label:'Events Available', val: events.length },
              { icon:'📋', label:'My Bookings',      val: bookings.length },
              { icon:'💰', label:'Total Spent',       val:`₹${bookings.reduce((s,b) => s+(b.totalAmount||0), 0)}` },
              { icon:'✅', label:'Categories',        val: categories.length - 1 },
            ].map(s => (
              <div key={s.label} className="stat-pill">
                <div className="stat-pill-value">{s.icon} {s.val}</div>
                <div className="stat-pill-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin separator line */}
      <div style={{ height:'4px', background:'linear-gradient(90deg, #fdba74, #fb923c, #f97316, #fb923c, #fdba74)' }} />

      <div className="container" style={{ paddingTop:'2rem' }}>
        {msg.text && <div className={msg.type==='error'?'error-msg':'success-msg'} style={{ marginBottom:'1.5rem' }}>{msg.text}</div>}

        {/* ── Featured Event Banner ── */}
        {feat && (
          <div style={{ background:'#fff', borderRadius:'22px', overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', marginBottom:'2.5rem', display:'grid', gridTemplateColumns:'1fr 360px' }}>
            <div style={{ padding:'2.25rem 2.5rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem', flexWrap:'wrap' }}>
                <span style={{ background:'linear-gradient(135deg,#fff7ed,#ffedd5)', color:'#c2410c', borderRadius:'999px', padding:'0.25rem 0.9rem', fontSize:'0.72rem', fontWeight:800, border:'1px solid #fdba74', letterSpacing:'0.5px' }}>⭐ FEATURED EVENT</span>
                <span style={{ background:'#f3f4f6', color:'#374151', borderRadius:'999px', padding:'0.25rem 0.8rem', fontSize:'0.72rem', fontWeight:700 }}>{getCatEmoji(feat.category)} {feat.category}</span>
                <span style={{ background: feat.participationType==='Team'?'#ede9fe':'#ecfdf5', color: feat.participationType==='Team'?'#7c3aed':'#065f46', borderRadius:'999px', padding:'0.25rem 0.8rem', fontSize:'0.72rem', fontWeight:700 }}>{feat.participationType==='Team'?`👥 Team (${feat.teamSize})`:'🧍 Solo'}</span>
              </div>
              <h2 style={{ fontSize:'1.8rem', fontWeight:800, color:'#111827', lineHeight:1.25, marginBottom:'0.75rem' }}>{feat.name}</h2>
              <p style={{ color:'#6b7280', lineHeight:1.75, marginBottom:'1.25rem', fontSize:'0.9rem' }}>{feat.description.substring(0,150)}…</p>
              <div style={{ display:'flex', gap:'1.5rem', marginBottom:'1.25rem', flexWrap:'wrap', fontSize:'0.87rem' }}>
                <span style={{ color:'#6b7280' }}>📍 {feat.venue}</span>
                <span style={{ color:'#6b7280' }}>📅 {feat.eventDate}{feat.eventTime?` · ${feat.eventTime}`:''}</span>
                <span style={{ color:'#f97316', fontWeight:800, fontSize:'1.1rem' }}>₹{feat.registrationFee}</span>
              </div>
              <div style={{ marginBottom:'1.5rem' }}>
                <div style={{ fontSize:'0.7rem', color:'#9ca3af', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:'0.5rem' }}>Starts In</div>
                <CountdownTimer date={feat.eventDate} />
              </div>
              <button onClick={() => handleSelectEvent(feat)} disabled={featLeft<=0}
                style={{ alignSelf:'flex-start', padding:'0.85rem 2rem', fontWeight:800, fontSize:'0.95rem', borderRadius:'12px', opacity: featLeft>0?1:0.5, cursor: featLeft>0?'pointer':'not-allowed' }}>
                {featLeft>0?'🎟️ Book Featured Event →':'❌ Sold Out'}
              </button>
            </div>
            <div style={{ position:'relative', minHeight:'320px' }}>
              <img src={getEventImage(feat.category, feat.id)} alt={feat.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                onError={e => { e.target.style.display='none'; }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(255,255,255,0.08), transparent)' }} />
            </div>
          </div>
        )}

        {/* ── Category Filter Chips ── */}
        {events.length > 0 && (
          <div style={{ display:'flex', gap:'0.5rem', overflowX:'auto', paddingBottom:'0.5rem', marginBottom:'1.5rem', scrollbarWidth:'none' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{ whiteSpace:'nowrap', padding:'0.45rem 1.1rem', borderRadius:'999px', border:'2px solid', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', transition:'all 0.18s', flexShrink:0,
                  borderColor: activeCat===cat?'#f97316':'#e5e7eb',
                  background: activeCat===cat?OG:'#fff',
                  color: activeCat===cat?'#fff':'#374151',
                  boxShadow: activeCat===cat?'0 4px 14px rgba(249,115,22,0.3)':'0 1px 4px rgba(0,0,0,0.06)',
                }}>
                {cat==='All'?'🎫 All Events':`${getCatEmoji(cat)} ${cat}`}
              </button>
            ))}
          </div>
        )}

        {/* ── Section header ── */}
        <div className="section-heading">
          <div className="section-heading-icon">🎫</div>
          <h2>{activeCat === 'All' ? 'All Events' : activeCat}</h2>
          <span className="badge badge-orange" style={{ marginLeft:'0.1rem' }}>{filtered.length}</span>
          {activeCat !== 'All' && (
            <button onClick={() => setActiveCat('All')} style={{ marginLeft:'auto', padding:'0.35rem 0.9rem', fontSize:'0.78rem', fontWeight:700, background:'transparent', color:'#9ca3af', border:'1.5px solid #e5e7eb', borderRadius:'999px', boxShadow:'none', cursor:'pointer' }}>✕ Clear Filter</button>
          )}
        </div>

        {filtered.length === 0
          ? <div className="card" style={{ textAlign:'center', padding:'3rem', color:'#9ca3af', marginBottom:'2.5rem' }}>
              <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>🔍</div>
              <div style={{ fontWeight:600 }}>No {activeCat} events available.</div>
              <button onClick={()=>setActiveCat('All')} style={{ marginTop:'1rem', padding:'0.5rem 1.5rem', fontSize:'0.85rem' }}>Show All Events</button>
            </div>
          : <div className="events-grid" style={{ marginBottom:'3rem' }}>
              {filtered.map(ev => <EventCard key={ev.id} event={ev} onBook={handleSelectEvent} />)}
            </div>
        }

        {/* ── My Bookings ── */}
        <div id="my-bookings-section" className="section-heading">
          <div className="section-heading-icon">📋</div>
          <h2>My Bookings</h2>
          <span className="badge badge-orange" style={{ marginLeft:'0.1rem' }}>{bookings.length}</span>
        </div>

        {bookings.length > 0 && (
          <div className="booking-summary-strip">
            {[
              { label:'Total Bookings', value: bookings.length, icon:'🎟️' },
              { label:'Total Paid',     value: `₹${bookings.reduce((s,b)=>s+(b.totalAmount||0),0)}`, icon:'💰' },
              { label:'Events Booked',  value: new Set(bookings.map(b=>b.event?.id)).size, icon:'📅' },
              { label:'Latest Booking', value: bookings[0]?.event?.name?.substring(0,14)+'…' || '—', icon:'✅' },
            ].map(s => (
              <div key={s.label} className="booking-summary-item">
                <span style={{ fontSize:'1.2rem', marginBottom:'0.25rem' }}>{s.icon}</span>
                <div className="booking-summary-value">{s.value}</div>
                <div className="booking-summary-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {bookings.length === 0
          ? <div className="card" style={{ textAlign:'center', padding:'3rem', color:'#9ca3af', marginBottom:'3rem' }}>
              <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>🎫</div>
              <div style={{ fontWeight:700, fontSize:'1rem', color:'#374151' }}>No bookings yet.</div>
              <div style={{ fontSize:'0.88rem', marginTop:'0.35rem', color:'#9ca3af' }}>Browse events above and grab your spot!</div>
              <button onClick={()=>setActiveCat('All')} style={{ marginTop:'1.25rem', padding:'0.65rem 1.5rem', fontSize:'0.88rem', fontWeight:700 }}>Explore Events →</button>
            </div>
          : <div className="events-grid" style={{ marginBottom:'3rem' }}>
              {bookings.map(b => (
                <div key={b.id} className="ticket-card">
                  {/* Ticket top half */}
                  <div className="ticket-top" style={{ borderLeft:'5px solid #f97316' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem' }}>
                      <span className="badge badge-green">✓ CONFIRMED</span>
                      <span style={{ fontSize:'0.75rem', color:'#9ca3af', fontWeight:600 }}>#{b.id}</span>
                    </div>
                    <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'#111827', lineHeight:1.3, marginBottom:'0.75rem' }}>{b.event.name}</h3>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.28rem' }}>
                      <div style={{ fontSize:'0.82rem', color:'#6b7280' }}>📅 {b.event.eventDate}</div>
                      <div style={{ fontSize:'0.82rem', color:'#6b7280' }}>📍 {b.event.venue}</div>
                    </div>
                  </div>
                  {/* Ticket bottom half */}
                  <div className="ticket-bottom">
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem', marginBottom:'1rem' }}>
                      {b.teamName && <div style={{ fontSize:'0.875rem', color:'#374151' }}><span style={{ color:'#9ca3af', fontWeight:600, marginRight:'0.4rem' }}>Team:</span>{b.teamName}</div>}
                      {b.teamMembers
                        ? <div style={{ fontSize:'0.875rem', color:'#374151' }}><span style={{ color:'#9ca3af', fontWeight:600, marginRight:'0.4rem' }}>Members:</span>{b.teamMembers}</div>
                        : <div style={{ fontSize:'0.875rem', color:'#374151' }}><span style={{ color:'#9ca3af', fontWeight:600, marginRight:'0.4rem' }}>Tickets:</span>{b.numberOfTickets}</div>
                      }
                      <div style={{ fontSize:'1.25rem', fontWeight:800, color:'#f97316' }}>₹{b.totalAmount} Paid</div>
                    </div>
                    <button onClick={() => downloadTicket(b)} style={{ width:'100%', fontWeight:700, fontSize:'0.88rem' }}>
                      ⬇️ Download PDF Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
};

export default StudentDashboard;
