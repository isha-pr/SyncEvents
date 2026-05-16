import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const OG = 'linear-gradient(135deg,#f97316,#ea580c)';
const lbl = { display:'block', fontSize:'0.78rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.3rem' };

const getEventImage = (category='', id=0) => {
  const c = category.toLowerCase();
  if (c.includes('hack')||c.includes('cod'))       return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=200&fit=crop&auto=format';
  if (c.includes('workshop')||c.includes('train'))  return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=200&fit=crop&auto=format';
  if (c.includes('cultural')||c.includes('fest'))   return 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=200&fit=crop&auto=format';
  if (c.includes('sport')||c.includes('game'))      return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=200&fit=crop&auto=format';
  if (c.includes('music')||c.includes('concert'))   return 'https://images.unsplash.com/photo-1501386761578-eaa54b05f7e4?w=600&h=200&fit=crop&auto=format';
  if (c.includes('quiz'))                            return 'https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=600&h=200&fit=crop&auto=format';
  if (c.includes('tech')||c.includes('seminar'))    return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=200&fit=crop&auto=format';
  return `https://picsum.photos/seed/${(id||1)+20}/600/200`;
};

const getCatEmoji = (cat='') => {
  const c=cat.toLowerCase();
  if(c.includes('hack'))return'💻'; if(c.includes('workshop'))return'🛠️';
  if(c.includes('cultural')||c.includes('fest'))return'🎭';
  if(c.includes('sport'))return'🏆'; if(c.includes('music'))return'🎵';
  if(c.includes('quiz'))return'❓'; return'🎫';
};

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name:'', description:'', guidelines:'', category:'', participationType:'Solo',
    teamSize:1, registrationFee:0, eventDate:'', eventTime:'', venue:'', availableTickets:0, organizerContact:'',
  });
  const [msg, setMsg] = useState({ type:'', text:'' });
  const [viewingEvent, setViewingEvent]   = useState(null);
  const [eventBookings, setEventBookings] = useState([]);

  const fetchEvents = async () => {
    try { const r = await api.get('/events/public'); setEvents(r.data); } catch(e){ console.error(e); }
  };
  useEffect(()=>{ fetchEvents(); },[]);

  const handleChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const handleSubmit = async e => {
    e.preventDefault(); setMsg({type:'',text:''});
    const sel=new Date(formData.eventDate), min=new Date(); min.setHours(0,0,0,0);
    if(sel<min){ setMsg({type:'error',text:'Event date must be from today onwards.'}); return; }
    if(formData.participationType==='Team' && formData.availableTickets%formData.teamSize!==0){
      setMsg({type:'error',text:`Capacity (${formData.availableTickets}) must be divisible by Team Size (${formData.teamSize}).`}); return;
    }
    try {
      await api.post('/events',formData);
      setMsg({type:'success',text:'Event published successfully! 🎉'});
      setFormData({name:'',description:'',guidelines:'',category:'',participationType:'Solo',teamSize:1,registrationFee:0,eventDate:'',eventTime:'',venue:'',availableTickets:0,organizerContact:''});
      fetchEvents();
    } catch(err){ setMsg({type:'error',text:err.response?.data?.message||'Failed to create event.'}); }
  };

  const deleteEvent = async id => {
    if(!window.confirm('Terminate this event?')) return;
    try{ await api.delete(`/events/${id}`); fetchEvents(); } catch{ alert('Failed to delete.'); }
  };

  const handleViewRegistrations = async event => {
    try{ const r=await api.get(`/bookings/event/${event.id}`); setEventBookings(r.data); setViewingEvent(event); }
    catch{ alert('Failed to fetch registrations.'); }
  };

  /* ── Registrations view ── */
  if(viewingEvent){
    const revenue = eventBookings.reduce((s,b)=>s+(b.totalAmount||0),0);
    return(
      <div className="dash-bg dash-bg-admin">
        {/* mini banner */}
        <div className="dashboard-hero" style={{padding:'2rem 2rem 2.5rem'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1}}>
            <button onClick={()=>setViewingEvent(null)} style={{background:'rgba(255,255,255,0.2)',color:'#fff',border:'1.5px solid rgba(255,255,255,0.5)',borderRadius:'8px',padding:'0.45rem 1.1rem',fontWeight:700,cursor:'pointer',marginBottom:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem',fontSize:'0.88rem'}}>
              ← Back to Dashboard
            </button>
            <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.7)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.6px',marginBottom:'0.3rem'}}>Registrations for</div>
            <h1 style={{color:'#fff',fontSize:'1.8rem',fontWeight:800,marginBottom:'0.4rem'}}>{viewingEvent.name}</h1>
            <div style={{display:'flex',gap:'1.25rem',flexWrap:'wrap',fontSize:'0.88rem',color:'rgba(255,255,255,0.82)'}}>
              <span>📅 {viewingEvent.eventDate}</span>
              <span>📍 {viewingEvent.venue}</span>
              <span>💰 ₹{viewingEvent.registrationFee} / {viewingEvent.participationType==='Team'?'Team':'Ticket'}</span>
            </div>
          </div>
        </div>

        <div className="container" style={{paddingTop:'3rem'}}>
          {/* stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem',marginBottom:'2rem'}}>
            {[
              {icon:'📋',label:'Total Registrations',val:eventBookings.length,bg:'#fff7ed',color:'#f97316',sub:'registrations received'},
              {icon:'💰',label:'Total Revenue',val:`₹${revenue}`,bg:'#ecfdf5',color:'#16a34a',sub:'gross collection'},
              {icon:'🎫',label:'Capacity Left',val:viewingEvent.availableTickets,bg:'#eff6ff',color:'#2563eb',sub:'seats remaining'},
            ].map(s=>(
              <div key={s.label} className="analytics-card">
                <div className="analytics-card-icon" style={{background:s.bg}}>{s.icon}</div>
                <div>
                  <div className="analytics-card-value">{s.val}</div>
                  <div className="analytics-card-label">{s.label}</div>
                  <div className="analytics-card-sub" style={{color:s.color}}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{padding:0,overflow:'hidden'}}>
            <div style={{padding:'1.25rem 1.5rem',borderBottom:'1px solid #f3f4f6',display:'flex',alignItems:'center',gap:'0.75rem'}}>
              <div className="section-heading-icon">📋</div>
              <h3 style={{fontSize:'1.1rem',fontWeight:800,color:'#111827',margin:0}}>Registration List</h3>
              <span className="badge badge-orange" style={{marginLeft:'0.1rem'}}>{eventBookings.length}</span>
            </div>
            {eventBookings.length===0
              ? <div style={{textAlign:'center',padding:'3rem',color:'#9ca3af'}}>
                  <div style={{fontSize:'3rem',marginBottom:'0.6rem'}}>📭</div>
                  <div style={{fontWeight:700,color:'#374151',fontSize:'1rem'}}>No registrations yet.</div>
                  <div style={{fontSize:'0.85rem',marginTop:'0.3rem'}}>Students haven't booked this event yet.</div>
                </div>
              : <div style={{overflowX:'auto'}}>
                  <table>
                    <thead><tr>{['#','Booked By','Team Name','Members / Tickets','Amount'].map(h=><th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {eventBookings.map((b,i)=>(
                        <tr key={b.id}>
                          <td style={{color:'#9ca3af',fontWeight:700}}>{i+1}</td>
                          <td style={{fontWeight:600}}>{b.user?.email}</td>
                          <td>{b.teamName||<span style={{color:'#d1d5db',fontSize:'0.8rem'}}>Solo</span>}</td>
                          <td>{b.teamMembers?b.teamMembers:`${b.numberOfTickets} ticket${b.numberOfTickets!==1?'s':''}`}</td>
                          <td><span style={{background:'#fff7ed',color:'#f97316',fontWeight:800,borderRadius:'8px',padding:'0.2rem 0.65rem',fontSize:'0.85rem'}}>₹{b.totalAmount}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }

  /* ── Main admin dashboard ── */
  return(
    <div className="dash-bg dash-bg-admin">

      {/* ── Admin Hero Header ── */}
      <div className="dashboard-hero">
        <div style={{maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1}}>
          {/* top row: badge + title + actions */}
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem',marginBottom:'1.75rem'}}>
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:'0.45rem',background:'rgba(255,255,255,0.16)',borderRadius:'999px',padding:'0.3rem 1rem',fontSize:'0.73rem',fontWeight:800,color:'rgba(255,255,255,0.95)',marginBottom:'0.85rem',border:'1px solid rgba(255,255,255,0.28)',letterSpacing:'0.5px'}}>
                🛡️ ADMIN CONTROL PANEL
              </div>
              <h1 style={{color:'#fff',fontSize:'2.1rem',fontWeight:800,lineHeight:1.2,marginBottom:'0.4rem',textShadow:'0 2px 10px rgba(0,0,0,0.18)'}}>Event Management</h1>
              <p style={{color:'rgba(255,255,255,0.80)',fontSize:'0.9rem',fontWeight:400}}>Publish, manage and monitor campus events in real time.</p>
            </div>
            <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',alignSelf:'center'}}>
              <button onClick={()=>document.getElementById('publish-form')?.scrollIntoView({behavior:'smooth'})}
                style={{padding:'0.72rem 1.5rem',fontWeight:800,fontSize:'0.88rem',borderRadius:'10px',border:'none',background:'#fff',color:'#f97316',cursor:'pointer',boxShadow:'0 4px 18px rgba(0,0,0,0.14)',letterSpacing:'0.2px'}}>
                ✚ Publish Event
              </button>
              <button onClick={()=>document.getElementById('events-registry')?.scrollIntoView({behavior:'smooth'})}
                style={{padding:'0.72rem 1.5rem',fontWeight:700,fontSize:'0.88rem',borderRadius:'10px',border:'2px solid rgba(255,255,255,0.48)',background:'transparent',color:'#fff',cursor:'pointer'}}>
                📅 View Events
              </button>
            </div>
          </div>
          {/* bottom row: live stat chips */}
          <div style={{display:'flex',gap:'0.85rem',flexWrap:'wrap'}}>
            {[
              {icon:'📅',label:'Active Events',val:events.length},
              {icon:'🎫',label:'Tickets Booked',val:events.reduce((s,e)=>s+((e.totalCapacity||0)-(e.availableTickets||0)),0)},
              {icon:'💰',label:'Est. Revenue',val:`₹${events.reduce((s,e)=>s+(((e.totalCapacity||0)-(e.availableTickets||0))*(e.registrationFee||0)),0)}`},
              {icon:'📊',label:'Avg Fill',val:events.length?`${Math.round(events.reduce((s,e)=>s+(e.totalCapacity?((e.totalCapacity-e.availableTickets)/e.totalCapacity)*100:0),0)/events.length)}%`:'0%'},
            ].map(s=>(
              <div key={s.label} className="hero-stat-chip">
                <div className="hero-stat-chip-val">{s.val}</div>
                <div className="hero-stat-chip-lbl">{s.icon} {s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop:'2rem'}}>


        {/* ── Featured Event Quick-View ── */}
        {events.length > 0 && (() => {
          const f = events[0];
          const sold = (f.totalCapacity||0)-(f.availableTickets||0);
          const pct  = f.totalCapacity ? Math.round((sold/f.totalCapacity)*100) : 0;
          return (
            <div className="featured-strip">
              <div className="featured-strip-accent" />
              <div style={{ flex:1, padding:'1.35rem 1.6rem', display:'flex', gap:'1.5rem', alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ flex:'1 1 200px' }}>
                  <div style={{ fontSize:'0.68rem', color:'#f97316', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.65px', marginBottom:'0.35rem' }}>⭐ Latest Event</div>
                  <div style={{ fontSize:'1.15rem', fontWeight:800, color:'#111827', lineHeight:1.3 }}>{f.name}</div>
                  <div style={{ fontSize:'0.82rem', color:'#9ca3af', marginTop:'0.3rem', fontWeight:500 }}>{f.category} &nbsp;·&nbsp; {f.eventDate}</div>
                </div>
                <div style={{ display:'flex', gap:'1.75rem', flexWrap:'wrap' }}>
                  {[{l:'Capacity',v:f.totalCapacity||f.availableTickets},{l:'Booked',v:sold},{l:'Revenue',v:`₹${sold*(f.registrationFee||0)}`},{l:'Filled',v:`${pct}%`}]
                    .map(s => (
                      <div key={s.l} style={{ textAlign:'center' }}>
                        <div style={{ fontSize:'1.25rem', fontWeight:800, color:'#111827' }}>{s.v}</div>
                        <div style={{ fontSize:'0.68rem', color:'#9ca3af', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.45px', marginTop:'2px' }}>{s.l}</div>
                      </div>
                    ))}
                </div>
                <button onClick={() => handleViewRegistrations(f)}
                  style={{ padding:'0.68rem 1.35rem', fontWeight:700, fontSize:'0.85rem', whiteSpace:'nowrap', borderRadius:'10px', flexShrink:0 }}>
                  📋 View Registrations
                </button>
              </div>
            </div>
          );
        })()}

        {/* ── Publish Event Form ── */}
        <div id="publish-form" className="card" style={{marginBottom:'2.5rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem',paddingBottom:'1.25rem',borderBottom:'1.5px solid #f3f4f6',marginBottom:'1.5rem'}}>
            <div style={{background:OG,color:'#fff',borderRadius:'12px',width:'46px',height:'46px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',flexShrink:0}}>✚</div>
            <div>
              <h2 style={{fontSize:'1.2rem',fontWeight:800,color:'#111827'}}>Publish New Event</h2>
              <p style={{fontSize:'0.82rem',color:'#9ca3af',marginTop:'0.15rem'}}>Fill in the details to create and publish a new campus event.</p>
            </div>
          </div>

          {msg.text && <div className={msg.type==='error'?'error-msg':'success-msg'} style={{marginBottom:'1.25rem'}}>{msg.text}</div>}

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="form-section">
              <div className="form-section-title">📌 Basic Information</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div><div style={lbl}>Event Name</div><input type="text" name="name" placeholder="e.g. Annual Hackathon 2026" value={formData.name} onChange={handleChange} required /></div>
                <div><div style={lbl}>Category</div><input type="text" name="category" placeholder="e.g. Hackathon, Workshop" value={formData.category} onChange={handleChange} required /></div>
              </div>
              <div><div style={lbl}>Description</div><textarea name="description" placeholder="Describe the event…" value={formData.description} onChange={handleChange} required rows="3" /></div>
              <div><div style={lbl}>Guidelines &amp; Rules</div><textarea name="guidelines" placeholder="List rules and eligibility…" value={formData.guidelines} onChange={handleChange} required rows="2" /></div>
            </div>

            {/* Participation */}
            <div className="form-section">
              <div className="form-section-title">👥 Participation</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div><div style={lbl}>Type</div>
                  <select name="participationType" value={formData.participationType} onChange={handleChange} required>
                    <option value="Solo">Solo</option><option value="Team">Team</option>
                  </select>
                </div>
                <div><div style={lbl}>Team Size (1 for Solo)</div><input type="number" name="teamSize" value={formData.teamSize} onChange={handleChange} min="1" required /></div>
              </div>
            </div>

            {/* Logistics */}
            <div className="form-section">
              <div className="form-section-title">📅 Event Logistics</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div><div style={lbl}>Date</div><input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required /></div>
                <div><div style={lbl}>Time</div><input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} required /></div>
                <div><div style={lbl}>Venue</div><input type="text" name="venue" placeholder="e.g. Main Auditorium" value={formData.venue} onChange={handleChange} required /></div>
                <div><div style={lbl}>Organizer Contact</div><input type="text" name="organizerContact" placeholder="Phone / Email" value={formData.organizerContact} onChange={handleChange} required /></div>
              </div>
            </div>

            {/* Ticketing */}
            <div className="form-section">
              <div className="form-section-title">🎫 Ticketing</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div><div style={lbl}>Registration Fee (₹)</div><input type="number" name="registrationFee" placeholder="0 for free" value={formData.registrationFee} onChange={handleChange} min="0" required /></div>
                <div><div style={lbl}>Total Capacity</div><input type="number" name="availableTickets" placeholder="e.g. 100" value={formData.availableTickets} onChange={handleChange} min="1" required /></div>
              </div>
            </div>

            <button type="submit" style={{width:'100%',padding:'0.95rem',fontWeight:800,fontSize:'1rem'}}>🚀 Publish Event</button>
          </form>
        </div>

        {/* ── Analytics Strip ── */}
        {events.length > 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
            {[
              { icon:'📅', label:'Active Events',   value: events.length,  bg:'#fff7ed', color:'#f97316', sub: `${events.filter(e=>new Date(e.eventDate)>=new Date()).length} upcoming` },
              { icon:'🎟️', label:'Tickets Booked',  value: events.reduce((s,e)=>s+((e.totalCapacity||0)-(e.availableTickets||0)),0), bg:'#ecfdf5', color:'#16a34a', sub:'across all events' },
              { icon:'💰', label:'Total Revenue',   value: `₹${events.reduce((s,e)=>s+(((e.totalCapacity||0)-(e.availableTickets||0))*(e.registrationFee||0)),0)}`, bg:'#faf5ff', color:'#7c3aed', sub:'gross collection' },
              { icon:'📊', label:'Avg Fill Rate',   value: events.length ? `${Math.round(events.reduce((s,e)=>s+(e.totalCapacity?((e.totalCapacity-e.availableTickets)/e.totalCapacity)*100:0),0)/events.length)}%` : '0%', bg:'#eff6ff', color:'#2563eb', sub:'capacity utilized' },
            ].map(s => (
              <div key={s.label} className="analytics-card">
                <div className="analytics-card-icon" style={{ background: s.bg }}>{s.icon}</div>
                <div>
                  <div className="analytics-card-value">{s.value}</div>
                  <div className="analytics-card-label">{s.label}</div>
                  <div className="analytics-card-sub" style={{ color: s.color }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Active Events ── */}
        <div id="events-registry" className="section-heading">
          <div className="section-heading-icon">📅</div>
          <h2>Active Events Registry</h2>
          <span className="badge badge-orange" style={{ marginLeft:'0.1rem' }}>{events.length}</span>
        </div>

        {events.length===0
          ? <div className="card" style={{textAlign:'center',padding:'3rem',color:'#9ca3af',marginBottom:'3rem'}}>
              <div style={{fontSize:'3rem',marginBottom:'0.75rem'}}>📭</div>
              <div style={{fontWeight:700,fontSize:'1rem',color:'#374151'}}>No events published yet.</div>
              <div style={{fontSize:'0.85rem',color:'#9ca3af',marginTop:'0.4rem'}}>Use the form above to create your first event.</div>
            </div>
          : <div className="events-grid" style={{marginBottom:'3rem'}}>
              {events.map(event=>{
                const filled=(event.totalCapacity||0)-(event.availableTickets||0);
                const pct=event.totalCapacity?Math.round((filled/event.totalCapacity)*100):0;
                const [imgErr,setImgErr2]=[false,()=>{}];
                return(
                  <div key={event.id} className="event-card">
                    {/* image */}
                    <div className="event-card-image">
                      <img src={getEventImage(event.category,event.id)} alt={event.name} onError={e=>{e.target.style.display='none';}} />
                      <div className="event-card-overlay"/>
                      <div style={{position:'absolute',top:'0.75rem',left:'0.75rem',display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
                        <span className="badge badge-white">{getCatEmoji(event.category)} {event.category||'Event'}</span>
                        <span className="badge" style={{background:event.participationType==='Team'?'rgba(124,58,237,0.88)':'rgba(5,150,105,0.88)',color:'#fff'}}>
                          {event.participationType==='Team'?`👥 Team(${event.teamSize})`:'🧍 Solo'}
                        </span>
                      </div>
                      <div style={{position:'absolute',bottom:'0.75rem',right:'0.75rem',background:OG,color:'#fff',borderRadius:'10px',padding:'0.25rem 0.85rem',fontWeight:800,fontSize:'1.1rem'}}>
                        ₹{event.registrationFee}
                      </div>
                      <div style={{position:'absolute',bottom:'0.75rem',left:'0.75rem',right:'5rem'}}>
                        <h3 style={{color:'#fff',fontWeight:800,fontSize:'1rem',lineHeight:1.3,textShadow:'0 1px 4px rgba(0,0,0,0.6)'}}>{event.name}</h3>
                      </div>
                    </div>

                    <div className="event-card-body">
                      <div style={{display:'flex',flexDirection:'column',gap:'0.28rem',marginBottom:'0.9rem'}}>
                        <div style={{fontSize:'0.82rem',color:'#6b7280'}}>📅 {event.eventDate} @ {event.eventTime||'—'}</div>
                        <div style={{fontSize:'0.82rem',color:'#6b7280'}}>📍 {event.venue}</div>
                      </div>

                      {/* fill bar */}
                      <div style={{marginBottom:'1rem'}}>
                        <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.76rem',fontWeight:600,marginBottom:'4px'}}>
                          <span style={{color:'#9ca3af'}}>Capacity Filled</span>
                          <span style={{color:'#374151',fontWeight:700}}>{event.availableTickets} left / {event.totalCapacity||'?'}</span>
                        </div>
                        <div style={{height:'6px',background:'#f3f4f6',borderRadius:'999px',overflow:'hidden'}}>
                          <div style={{width:`${pct}%`,height:'100%',background:OG,borderRadius:'999px',transition:'width 0.5s'}}/>
                        </div>
                        <div style={{textAlign:'right',fontSize:'0.7rem',color:'#9ca3af',marginTop:'3px'}}>{pct}% filled</div>
                      </div>

                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
                        <button onClick={()=>handleViewRegistrations(event)} className="btn-outline" style={{fontWeight:700,padding:'0.65rem',fontSize:'0.85rem'}}>📋 View Regs</button>
                        <button onClick={()=>deleteEvent(event.id)} className="btn-danger" style={{fontWeight:700,padding:'0.65rem',fontSize:'0.85rem'}}>🗑️ Terminate</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
