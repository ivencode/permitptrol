"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Shield, AlertTriangle, CheckCircle, Clock, Users, TrendingDown, Zap } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scanCount, setScanCount] = useState(87);
  const [showSticky, setShowSticky] = useState(false);

  // Simulate live activity
  useEffect(() => {
    const interval = setInterval(() => {
      setScanCount(prev => Math.min(prev + 1, 99));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Show sticky button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !city || !country) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, city, country })
      });

      if (response.ok) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showSuccess) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-scale" style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ width: '80px', height: '80px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Free Report is On Its Way!</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Check your inbox for your personalized STR Compliance Risk Report for <strong>{city}</strong>.
            It should arrive within 60 seconds.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
            Didn't receive it? Check your spam folder or <a href="#" style={{ color: 'var(--primary)' }}>contact us</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {/* Sticky CTA Button */}
      {showSticky && (
        <button
          onClick={scrollToForm}
          className="sticky-cta animate-pulse-slow"
          style={{
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '50px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)'
          }}
        >
          Get My Report <ArrowRight size={18} />
        </button>
      )}

      {/* Minimal Header */}
      <header className="animate-fade-up" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 'bold' }}>
          <Shield size={24} color="var(--primary)" /> PermitPatrol
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>5,247</span> hosts protected
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        padding: '3rem 2rem 5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        {/* Left: Copy + Form */}
        <div>
          {/* Urgency Badge */}
          <div className="animate-fade-left delay-100" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FEF2F2',
            color: 'var(--primary)',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Zap size={14} /> Only {100 - scanCount} free scans left today
          </div>

          <h1 className="animate-fade-left delay-200" style={{
            fontSize: '3.25rem',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem'
          }}>
            Is Your STR at Risk<br />of a <span style={{ color: 'var(--primary)' }}>$5,000 Fine</span>?
          </h1>

          <p className="animate-fade-left delay-300" style={{
            fontSize: '1.125rem',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '480px'
          }}>
            Get your <strong>free compliance risk report</strong> in 60 seconds.
            We scan city council databases so you don't get surprised by new bans or permit issues.
          </p>

          {/* Lead Capture Form */}
          <form onSubmit={handleSubmit} className="animate-fade-left delay-400" style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '6px' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '6px' }}>
                  Property City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Austin, TX"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '6px' }}>
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. United States"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: isSubmitting ? '#999' : 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                {isSubmitting ? (
                  <>Scanning 147 databases...</>
                ) : (
                  <>Get My Free Risk Report <ArrowRight size={18} /></>
                )}
              </button>
            </div>

            {/* Trust Signals */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '1rem',
              fontSize: '0.75rem',
              color: 'var(--muted)'
            }}>
              <span>✓ No credit card</span>
              <span>✓ Instant results</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </form>
        </div>

        {/* Right: Risk Gauge Visual */}
        <div className="animate-fade-right delay-300" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
            border: '1px solid var(--border)',
            width: '100%',
            maxWidth: '400px'
          }}>
            {/* Risk Score */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                border: '12px solid #FEE2E2',
                borderTopColor: 'var(--primary)',
                borderRightColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                position: 'relative'
              }}>
                <div>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>85</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--muted)' }}>/100</span>
                </div>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FEF2F2',
                color: 'var(--primary)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginTop: '1rem'
              }}>
                <AlertTriangle size={16} /> HIGH RISK
              </div>
            </div>

            {/* Risk Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#FEF2F2', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.875rem' }}>Estimated Fine Exposure</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>$5,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#FEF7ED', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.875rem' }}>Pending City Council Items</span>
                <span style={{ fontWeight: 'bold', color: '#D97706' }}>2</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#F5F5F5', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.875rem' }}>Permit Expiring Soon</span>
                <span style={{ fontWeight: 'bold' }}>12 days</span>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
              * Example report for Austin, TX
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="animate-fade-up delay-500" style={{
        background: '#1A1A1A',
        color: 'white',
        padding: '3rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { icon: Users, value: '5,247', label: 'Hosts Protected' },
            { icon: Shield, value: '152', label: 'Cities Monitored' },
            { icon: TrendingDown, value: '$2.5M+', label: 'Fines Prevented' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <stat.icon size={28} style={{ marginBottom: '8px', opacity: 0.7 }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="animate-fade-up" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>
          Trusted by Hosts Like You
        </h2>
        <p className="animate-fade-up delay-100" style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem' }}>
          Real stories from property managers who avoided costly surprises
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            {
              quote: "PermitPatrol warned me about a Zone B ban proposal two weeks before it passed. I grandfathered my permit and saved my business.",
              name: "Sarah M.",
              role: "Austin, TX · 3 properties",
              saved: "$5,000"
            },
            {
              quote: "I had no idea my permit was about to expire. The reminder saved me from a potential shutdown and $500/day fines.",
              name: "James K.",
              role: "Nashville, TN · 1 property",
              saved: "$3,500"
            },
            {
              quote: "The free report showed I was missing a fire safety cert. Fixed it in 2 days. Without this, I'd have been shut down.",
              name: "Maria L.",
              role: "San Diego, CA · 5 properties",
              saved: "$10,000+"
            }
          ].map((testimonial, i) => (
            <div key={i} className={`animate-fade-up delay-${(i + 2) * 100}`} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                background: '#ECFDF5',
                color: '#10B981',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                alignSelf: 'flex-start',
                marginBottom: '1rem'
              }}>
                Saved {testimonial.saved}
              </div>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                "{testimonial.quote}"
              </p>
              <div>
                <p style={{ fontWeight: 600 }}>{testimonial.name}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: '#FAFAFA', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 className="animate-fade-up" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem' }}>
            How It Works
          </h2>
          <p className="animate-fade-up delay-100" style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem' }}>
            Get protected in under 60 seconds
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              {
                step: '1',
                title: 'Enter Your Info',
                desc: 'Just your email and property city. No credit card or lengthy forms.'
              },
              {
                step: '2',
                title: 'We Scan Databases',
                desc: 'Our AI checks 152+ city council agendas, permit records, and ordinances.'
              },
              {
                step: '3',
                title: 'Get Your Report',
                desc: 'Receive a personalized risk score, threats, and action plan via email.'
              }
            ].map((item, i) => (
              <div key={i} className={`animate-fade-up delay-${(i + 2) * 100}`} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="animate-fade-left">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              What You'll Get in Your Free Report
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              A comprehensive compliance snapshot for your property, delivered instantly to your inbox.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Shield, title: 'Permit Status', desc: 'Current permit validity and expiration date' },
                { icon: AlertTriangle, title: 'Active Threats', desc: 'Pending city council items that could affect you' },
                { icon: TrendingDown, title: 'Fine Exposure', desc: 'Estimated cost if you remain non-compliant' },
                { icon: CheckCircle, title: 'Action Plan', desc: '3-5 specific steps to get fully compliant' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#FEF2F2',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <item.icon size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, marginBottom: '2px' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Mockup */}
          <div className="animate-fade-right" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <Shield size={24} color="var(--primary)" />
              <div>
                <p style={{ fontWeight: 600 }}>STR Compliance Report</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Generated for Austin, TX</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: '#ECFDF5', borderRadius: '8px' }}>
                <CheckCircle size={16} color="#10B981" />
                <span style={{ fontSize: '0.875rem' }}><strong>Permit Status:</strong> Active - Expires Feb 2026</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: '#FEF2F2', borderRadius: '8px' }}>
                <AlertTriangle size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.875rem' }}><strong>Threat:</strong> Zone B Ban Proposal (Item #42)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: '#FEF7ED', borderRadius: '8px' }}>
                <Clock size={16} color="#D97706" />
                <span style={{ fontSize: '0.875rem' }}><strong>Fine Exposure:</strong> $5,000 estimated</span>
              </div>
              <div style={{ padding: '10px 12px', background: '#F5F5F5', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>Action Items:</p>
                <ul style={{ fontSize: '0.8125rem', color: 'var(--muted)', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Submit fire safety certificate</li>
                  <li>Attend Feb 15 council meeting</li>
                  <li>Renew permit before Mar 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#1A1A1A', color: 'white', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>
            Frequently Asked Questions
          </h2>

          {[
            { q: 'Is this really free?', a: 'Yes, 100% free. No credit card required. We believe in giving value first.' },
            { q: 'How do you get the data?', a: 'We monitor public city records, council meeting agendas, and permit databases across 152+ cities.' },
            { q: 'What if I\'m already compliant?', a: 'Great! Your report will confirm that and show any upcoming changes to watch for.' },
            { q: 'Do you sell my email?', a: 'Never. We only send compliance alerts and occasional product updates. Unsubscribe anytime.' }
          ].map((faq, i) => (
            <div key={i} style={{
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              padding: '1.5rem 0'
            }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{faq.q}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 className="animate-fade-up" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Don't Wait for a Fine to Take Action
        </h2>
        <p className="animate-fade-up delay-100" style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join 5,247 hosts who sleep better knowing their STR is protected.
        </p>

        <form
          onSubmit={handleSubmit}
          className="animate-fade-up delay-200"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '400px',
            margin: '0 auto',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)'
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              fontSize: '1rem'
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              fontSize: '1rem'
            }}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Austin, TX"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              fontSize: '1rem'
            }}
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. United States"
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              background: isSubmitting ? '#999' : 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isSubmitting ? 'Scanning...' : <>Get Free Report <ArrowRight size={18} /></>}
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
            No credit card required · Unsubscribe anytime
          </p>
        </form>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: 'var(--muted)'
      }}>
        <p>© 2026 PermitPatrol. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
          <a href="#" style={{ color: 'var(--muted)' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--muted)' }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--muted)' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
