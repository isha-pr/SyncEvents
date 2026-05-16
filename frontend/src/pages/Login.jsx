import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OG = 'linear-gradient(135deg,#f97316,#ea580c)';

const lbl = {
  display:'block', fontSize:'0.8rem', fontWeight:700,
  color:'#374151', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.35rem',
};

const Login = () => {
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [error, setError]             = useState('');
  const { login }    = useContext(AuthContext);
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      navigate(data.user.role === 'ROLE_ADMIN' ? '/admin' : '/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', fontFamily:"'Outfit',sans-serif" }}>

      {/* ── Left Panel ── */}
      <div style={{
        flex:'0 0 50%', position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding:'3rem',
      }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1501386761578-eaa54b05f7e4?w=900&h=1200&fit=crop&auto=format"
          alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
          onError={e => e.target.style.display='none'}
        />
        {/* Dark gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(17,24,39,0.3) 100%)', zIndex:1 }} />

        {/* Brand logo */}
        <div style={{ position:'absolute', top:'2.5rem', left:'2.5rem', zIndex:2, display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <div style={{ background:OG, color:'#fff', width:'38px', height:'38px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'1.2rem' }}>S</div>
          <span style={{ color:'#fff', fontWeight:800, fontSize:'1.15rem', letterSpacing:'-0.3px' }}>Sync Events</span>
        </div>

        {/* Bottom text */}
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'rgba(249,115,22,0.25)', color:'#fdba74', borderRadius:'999px', padding:'0.3rem 0.9rem', fontSize:'0.75rem', fontWeight:700, marginBottom:'1rem', border:'1px solid rgba(249,115,22,0.4)', backdropFilter:'blur(6px)' }}>
            🎓 Smart Campus Platform
          </div>
          <h2 style={{ color:'#fff', fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, lineHeight:1.2, marginBottom:'0.75rem', textShadow:'0 2px 16px rgba(0,0,0,0.5)' }}>
            Discover. Book.<br/>
            <span style={{ background:OG, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Experience.</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.92rem', lineHeight:1.7, maxWidth:'340px' }}>
            Your campus events, all in one place. Book tickets, register teams, and get AI-powered event assistance.
          </p>
          {/* Feature pills */}
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginTop:'1.25rem' }}>
            {['✅ QR Tickets','✅ Team Booking','✅ AI Assistant'].map(p => (
              <span key={p} style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'999px', padding:'0.28rem 0.75rem', fontSize:'0.75rem', color:'rgba(255,255,255,0.85)', fontWeight:500, backdropFilter:'blur(6px)' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div style={{
        flex:'0 0 50%', display:'flex', alignItems:'center', justifyContent:'center',
        padding:'3rem 2.5rem', background:'#f8f8f6',
        backgroundImage:'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        backgroundSize:'24px 24px',
        overflowY:'auto',
      }}>
        <div style={{ width:'100%', maxWidth:'420px' }}>

          {/* Heading */}
          <div style={{ marginBottom:'2rem' }}>
            <h1 style={{ fontSize:'1.9rem', fontWeight:800, color:'#111827', lineHeight:1.15, marginBottom:'0.4rem' }}>Welcome back 👋</h1>
            <p style={{ color:'#6b7280', fontSize:'0.92rem' }}>Sign in to your Sync Events account to continue.</p>
          </div>

          {/* Card */}
          <div style={{ background:'#fff', borderRadius:'20px', padding:'2.25rem', boxShadow:'0 8px 40px rgba(0,0,0,0.09)', border:'1px solid rgba(229,231,235,0.8)' }}>

            {error && <div className="error-msg" style={{ marginBottom:'1.25rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom:'1.1rem' }}>
                <label style={lbl}>📧 Email Address</label>
                <input type="email" placeholder="you@campus.edu" value={email} onChange={e=>setEmail(e.target.value)} required />
              </div>

              {/* Password */}
              <div style={{ marginBottom:'0.5rem' }}>
                <label style={lbl}>🔒 Password</label>
                <div style={{ position:'relative' }}>
                  <input type={showPassword?'text':'password'} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ paddingRight:'3rem' }} />
                  <button type="button" onClick={()=>setShowPassword(!showPassword)}
                    style={{ position:'absolute', right:'10px', top:'50%', transform:'translateY(-60%)', background:'none', border:'none', padding:'0', fontSize:'1rem', cursor:'pointer', boxShadow:'none', color:'#9ca3af' }}>
                    {showPassword?'👁️':'🙈'}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div style={{ textAlign:'right', marginBottom:'1.5rem' }}>
                <button type="button" onClick={()=>setShowForgotModal(true)}
                  style={{ background:'none', border:'none', color:'#f97316', fontSize:'0.83rem', padding:0, cursor:'pointer', fontWeight:600, boxShadow:'none', textTransform:'none', letterSpacing:'normal' }}>
                  Forgot Password?
                </button>
              </div>

              <button type="submit" style={{ width:'100%', padding:'0.9rem', fontSize:'1rem', fontWeight:800, borderRadius:'12px', letterSpacing:'0.2px' }}>
                Sign In →
              </button>
            </form>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0' }}>
              <div style={{ flex:1, height:'1px', background:'#e5e7eb' }} />
              <span style={{ fontSize:'0.78rem', color:'#9ca3af', fontWeight:500 }}>NEW TO SYNC EVENTS?</span>
              <div style={{ flex:1, height:'1px', background:'#e5e7eb' }} />
            </div>

            <Link to="/register" style={{ textDecoration:'none' }}>
              <button style={{ width:'100%', padding:'0.85rem', fontSize:'0.95rem', fontWeight:700, background:'transparent', color:'#f97316', border:'2px solid #f97316', borderRadius:'12px', boxShadow:'none', cursor:'pointer' }}>
                Create a Free Account
              </button>
            </Link>
          </div>

          {/* Trust row */}
          <div style={{ display:'flex', justifyContent:'center', gap:'1.5rem', marginTop:'1.5rem', flexWrap:'wrap' }}>
            {['🔒 Secure Login','🎓 Campus Verified','⚡ Instant Access'].map(t => (
              <span key={t} style={{ fontSize:'0.76rem', color:'#9ca3af', fontWeight:500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Forgot Password Modal ── */}
      {showForgotModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000, backdropFilter:'blur(4px)' }}>
          <div style={{ background:'#fff', borderRadius:'20px', padding:'2.5rem', maxWidth:'420px', width:'90%', textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width:'60px', height:'60px', background:'#ffedd5', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', margin:'0 auto 1rem' }}>🔐</div>
            <h3 style={{ fontSize:'1.25rem', fontWeight:800, color:'#111827', marginBottom:'0.75rem' }}>Reset Credentials</h3>
            <p style={{ color:'#6b7280', lineHeight:1.75, fontSize:'0.9rem', marginBottom:'1.75rem' }}>
              Please contact the System Administrator to reset your credentials. Secure internal networks do not support automated email recovery.
            </p>
            <button onClick={()=>setShowForgotModal(false)} style={{ width:'100%', padding:'0.85rem', fontWeight:700 }}>
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
