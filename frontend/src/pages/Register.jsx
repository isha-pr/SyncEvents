import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OG = 'linear-gradient(135deg,#f97316,#ea580c)';

const lbl = {
  display:'block', fontSize:'0.8rem', fontWeight:700,
  color:'#374151', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.35rem',
};

const Register = () => {
  const [formData, setFormData] = useState({ name:'', email:'', password:'', department:'', adminSecret:'' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', fontFamily:"'Outfit',sans-serif" }}>

      {/* ── Left Panel ── */}
      <div style={{
        flex:'0 0 42%', position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding:'3rem',
      }}>
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=1200&fit=crop&auto=format"
          alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
          onError={e => e.target.style.display='none'}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.5) 50%, rgba(17,24,39,0.35) 100%)', zIndex:1 }} />

        {/* Brand */}
        <div style={{ position:'absolute', top:'2.5rem', left:'2.5rem', zIndex:2, display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <div style={{ background:OG, color:'#fff', width:'38px', height:'38px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'1.2rem' }}>S</div>
          <span style={{ color:'#fff', fontWeight:800, fontSize:'1.15rem', letterSpacing:'-0.3px' }}>Sync Events</span>
        </div>

        {/* Bottom text */}
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'rgba(249,115,22,0.22)', color:'#fdba74', borderRadius:'999px', padding:'0.3rem 0.9rem', fontSize:'0.75rem', fontWeight:700, marginBottom:'1rem', border:'1px solid rgba(249,115,22,0.4)', backdropFilter:'blur(6px)' }}>
            🎓 Join the Campus Community
          </div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.5rem,2.5vw,2.2rem)', fontWeight:800, lineHeight:1.25, marginBottom:'0.75rem', textShadow:'0 2px 16px rgba(0,0,0,0.5)' }}>
            Your First Step to<br/>
            <span style={{ background:OG, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Campus Events.</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.9rem', lineHeight:1.75, maxWidth:'300px' }}>
            Register to discover hackathons, workshops, cultural fests, and more. Book instantly, download tickets, join teams.
          </p>

          {/* Benefit list */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginTop:'1.25rem' }}>
            {['🎫 Instant Ticket Booking','👥 Team Registration','🤖 AI Campus Assistant','📄 QR-coded PDF Tickets'].map(b => (
              <div key={b} style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.78)', fontWeight:500, display:'flex', alignItems:'center', gap:'0.4rem' }}>{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div style={{
        flex:'1', display:'flex', alignItems:'center', justifyContent:'center',
        padding:'2.5rem 2rem', background:'#f8f8f6',
        backgroundImage:'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        backgroundSize:'24px 24px', overflowY:'auto',
      }}>
        <div style={{ width:'100%', maxWidth:'500px' }}>

          {/* Heading */}
          <div style={{ marginBottom:'1.75rem' }}>
            <h1 style={{ fontSize:'1.8rem', fontWeight:800, color:'#111827', lineHeight:1.15, marginBottom:'0.4rem' }}>Create your account 🚀</h1>
            <p style={{ color:'#6b7280', fontSize:'0.92rem' }}>Join thousands of students already using Sync Events.</p>
          </div>

          {/* Card */}
          <div style={{ background:'#fff', borderRadius:'20px', padding:'2.25rem', boxShadow:'0 8px 40px rgba(0,0,0,0.09)', border:'1px solid rgba(229,231,235,0.8)' }}>

            {error && <div className="error-msg" style={{ marginBottom:'1.25rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Row: Name + Department */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <label style={lbl}>👤 Full Name</label>
                  <input type="text" name="name" placeholder="Your full name" onChange={handleChange} required style={{ marginBottom:0 }} />
                </div>
                <div>
                  <label style={lbl}>🏫 Department</label>
                  <input type="text" name="department" placeholder="e.g. CSE, ECE" onChange={handleChange} required style={{ marginBottom:0 }} />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom:'1rem' }}>
                <label style={lbl}>📧 Campus Email</label>
                <input type="email" name="email" placeholder="you@campus.edu" onChange={handleChange} required style={{ marginBottom:0 }} />
              </div>

              {/* Password */}
              <div style={{ marginBottom:'1rem' }}>
                <label style={lbl}>🔒 Password</label>
                <div style={{ position:'relative' }}>
                  <input type={showPassword?'text':'password'} name="password" placeholder="Choose a strong password" onChange={handleChange} required style={{ paddingRight:'3rem', marginBottom:0 }} />
                  <button type="button" onClick={()=>setShowPassword(!showPassword)}
                    style={{ position:'absolute', right:'10px', top:'50%', transform:'translateY(-60%)', background:'none', border:'none', padding:'0', fontSize:'1rem', cursor:'pointer', boxShadow:'none', color:'#9ca3af' }}>
                    {showPassword?'👁️':'🙈'}
                  </button>
                </div>
              </div>

              {/* Admin Section */}
              <div style={{ background:'linear-gradient(135deg,#fff7ed,#ffedd5)', border:'1.5px solid #fdba74', borderRadius:'12px', padding:'1rem 1.25rem', marginBottom:'1.5rem' }}>
                <label style={{ display:'block', fontSize:'0.8rem', fontWeight:700, color:'#c2410c', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.6rem' }}>
                  🛡️ Admin Key <span style={{ fontWeight:400, color:'#9a3412', textTransform:'none', letterSpacing:'normal' }}>(Optional)</span>
                </label>
                <input type="password" name="adminSecret" placeholder="Enter admin secret key — leave blank for student" onChange={handleChange} style={{ marginBottom:0, background:'#fff' }} />
                <p style={{ fontSize:'0.76rem', color:'#9a3412', marginTop:'0.5rem', lineHeight:1.6 }}>
                  Leave blank to register as a student. Provide the admin key to unlock admin privileges.
                </p>
              </div>

              <button type="submit" style={{ width:'100%', padding:'0.9rem', fontSize:'1rem', fontWeight:800, borderRadius:'12px', letterSpacing:'0.2px' }}>
                Create Account →
              </button>
            </form>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0' }}>
              <div style={{ flex:1, height:'1px', background:'#e5e7eb' }} />
              <span style={{ fontSize:'0.78rem', color:'#9ca3af', fontWeight:500 }}>ALREADY A MEMBER?</span>
              <div style={{ flex:1, height:'1px', background:'#e5e7eb' }} />
            </div>

            <Link to="/login" style={{ textDecoration:'none' }}>
              <button style={{ width:'100%', padding:'0.85rem', fontSize:'0.95rem', fontWeight:700, background:'transparent', color:'#f97316', border:'2px solid #f97316', borderRadius:'12px', boxShadow:'none', cursor:'pointer' }}>
                Sign In Instead
              </button>
            </Link>
          </div>

          {/* Trust row */}
          <div style={{ display:'flex', justifyContent:'center', gap:'1.5rem', marginTop:'1.5rem', flexWrap:'wrap' }}>
            {['🔒 Secure','📧 Campus Verified','⚡ Instant Access'].map(t => (
              <span key={t} style={{ fontSize:'0.76rem', color:'#9ca3af', fontWeight:500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
