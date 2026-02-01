import React, { useState, useEffect } from 'react';

// Team photo - update this URL after uploading to your hosting
const TEAM_PHOTO_URL = '/team-photo.jpg';

// Facebook Pixel ID
const FB_PIXEL_ID = '733972183061275';

// Rotating Testimonials
const TESTIMONIALS = [
  {
    quote: "He took me from 10% to 100% in a short amount of time. Their entire staff fought ruthlessly to get me the back pay I deserved.",
    name: "Marcus M.",
    detail: "Army Veteran (Iraq)"
  },
  {
    quote: "After years of denials from the VA, they helped me get full service connection. I highly recommend them to any veterans struggling with a VA claim.",
    name: "Mike M.",
    detail: "Veteran"
  },
  {
    quote: "After 15 years of fighting with the VA, I received my back pay and 100% rating. Trust me, they are worth the call to talk to.",
    name: "Tom C.",
    detail: "Veteran"
  },
  {
    quote: "They worked on my claim for almost 3 years constantly getting me increases until they got me to 100%. First class operation.",
    name: "James",
    detail: "Veteran"
  },
  {
    quote: "This Team has been a Godsend, they took care of me as part of their Family. Very attentive and very Professional. I highly recommend 110%.",
    name: "Andrew D.",
    detail: "Veteran"
  },
  {
    quote: "I tried to navigate the VA system alone and all I ended up with was being angry and frustrated with all the denial letters. They got me to 100%.",
    name: "Patrick L.",
    detail: "Veteran"
  },
  {
    quote: "The countless hours and dedication they put in and direct communication with me was unparalleled to anyone I've ever worked with.",
    name: "Rocky G.",
    detail: "Veteran"
  }
];

// Initialize Facebook Pixel
const initFacebookPixel = () => {
  if (window.fbq) return;
  
  (function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Track Facebook events
const trackFBEvent = (eventName, params = {}) => {
  if (window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Track custom Facebook events
const trackFBCustomEvent = (eventName, params = {}) => {
  if (window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
};

// 2026 VA Compensation Rates
const COMPENSATION_RATES = {
  0: 0, 10: 180.42, 20: 356.66,
  30: { alone: 552.47, spouse: 617.47, child: 596.47, childSpouse: 666.47 },
  40: { alone: 795.84, spouse: 882.84, child: 853.84, childSpouse: 947.84 },
  50: { alone: 1132.90, spouse: 1241.90, child: 1205.90, childSpouse: 1322.90 },
  60: { alone: 1435.02, spouse: 1566.02, child: 1523.02, childSpouse: 1663.02 },
  70: { alone: 1808.45, spouse: 1961.45, child: 1910.45, childSpouse: 2074.45 },
  80: { alone: 2102.15, spouse: 2277.15, child: 2219.15, childSpouse: 2406.15 },
  90: { alone: 2362.30, spouse: 2559.30, child: 2494.30, childSpouse: 2704.30 },
  100: { alone: 3938.58, spouse: 4158.17, child: 4085.43, childSpouse: 4318.99 }
};

const CONDITIONS = {
  ptsd: { name: 'PTSD / Anxiety / Depression', category: 'Mental Health', icon: '🧠',
    question: 'How much do these symptoms affect daily life?',
    options: [
      { label: 'Mild - I manage day to day but have some bad days', value: 30 },
      { label: 'Moderate - It affects my work and relationships regularly', value: 50 },
      { label: 'Severe - I struggle to work or maintain relationships', value: 70 },
      { label: 'Total - I cannot work or care for myself', value: 100 }
    ]},
  back: { name: 'Back / Neck Pain', category: 'Musculoskeletal', icon: '🦴',
    question: 'How limited is your movement?',
    options: [
      { label: 'Some stiffness and pain but I can move around', value: 20 },
      { label: 'Moderate - Pain limits my activities significantly', value: 40 },
      { label: 'Severe - Very limited movement, constant pain', value: 50 }
    ]},
  knee: { name: 'Knee Problems', category: 'Musculoskeletal', icon: '🦵', bilateral: true,
    question: 'How bad is the knee condition?',
    options: [
      { label: 'Some pain and stiffness', value: 10 },
      { label: 'Unstable or limited movement', value: 20 },
      { label: 'Severe - need brace or very limited', value: 30 }
    ]},
  shoulder: { name: 'Shoulder Problems', category: 'Musculoskeletal', icon: '💪', bilateral: true,
    question: 'How high can you raise your arm?',
    options: [
      { label: 'To shoulder level but not overhead', value: 20 },
      { label: 'Only halfway up', value: 30 },
      { label: 'Barely away from my body', value: 40 }
    ]},
  tinnitus: { name: 'Ringing in Ears (Tinnitus)', category: 'Hearing', icon: '👂',
    question: 'Do you have constant ringing or buzzing?',
    options: [
      { label: 'Yes, constant ringing/buzzing', value: 10 }
    ]},
  hearing: { name: 'Hearing Loss', category: 'Hearing', icon: '🔇',
    question: 'How much hearing have you lost?',
    options: [
      { label: 'Mild - some difficulty in noisy places', value: 10 },
      { label: 'Moderate - need hearing aids', value: 30 },
      { label: 'Severe - struggle even with hearing aids', value: 50 }
    ]},
  sleep_apnea: { name: 'Sleep Apnea', category: 'Sleep', icon: '😴',
    question: 'How is it treated?',
    options: [
      { label: 'CPAP machine', value: 50 },
      { label: 'Surgery or severe symptoms', value: 100 }
    ]},
  migraine: { name: 'Migraines', category: 'Neurological', icon: '🤕',
    question: 'How often do you get severe migraines?',
    options: [
      { label: 'A few times a year', value: 10 },
      { label: 'Monthly', value: 30 },
      { label: 'Several times a month - affects work', value: 50 }
    ]},
  diabetes: { name: 'Diabetes', category: 'Systemic', icon: '💉',
    question: 'How is it managed?',
    options: [
      { label: 'Diet or oral medication', value: 20 },
      { label: 'Insulin required', value: 40 }
    ]},
  scars: { name: 'Scars', category: 'Skin', icon: '🩹',
    question: 'How significant are the scars?',
    options: [
      { label: 'Visible but not painful', value: 10 },
      { label: 'Painful or limit movement', value: 20 },
      { label: 'Disfiguring or very large', value: 30 }
    ]},
  nerve: { name: 'Nerve Pain / Numbness', category: 'Neurological', icon: '⚡', bilateral: true,
    question: 'How severe is the nerve pain or numbness?',
    options: [
      { label: 'Mild tingling sometimes', value: 10 },
      { label: 'Regular pain or numbness', value: 20 },
      { label: 'Severe - affects use of limb', value: 40 }
    ]},
  gerd: { name: 'GERD / Acid Reflux', category: 'Digestive', icon: '🔥',
    question: 'How severe is it?',
    options: [
      { label: 'Controlled with medication', value: 10 },
      { label: 'Frequent symptoms despite medication', value: 30 }
    ]}
};

function combinedRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sorted = [...ratings].sort((a, b) => b - a);
  let combined = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    combined = combined + ((100 - combined) * sorted[i]) / 100;
  }
  return Math.min(Math.round(combined / 10) * 10, 100);
}

function getMonthlyRate(rating, hasSpouse, hasChildren) {
  if (rating === 0) return 0;
  if (rating < 30) return COMPENSATION_RATES[rating] || 0;
  const rates = COMPENSATION_RATES[rating];
  if (!rates) return 0;
  if (hasChildren && hasSpouse) return rates.childSpouse;
  if (hasChildren) return rates.child;
  if (hasSpouse) return rates.spouse;
  return rates.alone;
}

export default function VACalculator() {
  const [step, setStep] = useState('welcome');
  const [currentRating, setCurrentRating] = useState(0);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId] = useState(() => Date.now().toString(36) + Math.random().toString(36).substr(2));
  const [trackedSteps, setTrackedSteps] = useState(new Set());
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Facebook Pixel on mount
  useEffect(() => {
    initFacebookPixel();
  }, []);

  // Track user progress through funnel
  const trackStep = async (stepName, extraData = {}) => {
    // Only track each step once per session
    if (trackedSteps.has(stepName)) return;
    setTrackedSteps(prev => new Set([...prev, stepName]));

    const trackingData = {
      type: 'funnel_tracking',
      sessionId,
      step: stepName,
      timestamp: new Date().toISOString(),
      currentRating: currentRating || 0,
      conditionsSelected: selectedConditions.length,
      conditionNames: selectedConditions.map(c => c.name).join(', ') || 'none',
      ...extraData
    };

    try {
      await fetch('https://hooks.zapier.com/hooks/catch/26188750/uqgkpei/', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackingData)
      });
    } catch (e) {
      console.error('Tracking error:', e);
    }
  };

  // Track when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const lastStep = step === 'questions' 
        ? `questions_${currentQuestionIndex + 1}_of_${selectedConditions.length}`
        : step;
      
      // Use sendBeacon for reliable tracking on page exit
      const data = JSON.stringify({
        type: 'exit_tracking',
        sessionId,
        exitStep: lastStep,
        timestamp: new Date().toISOString(),
        completedLead: leadSubmitted,
        conditionsSelected: selectedConditions.length
      });
      
      navigator.sendBeacon && navigator.sendBeacon(
        'https://hooks.zapier.com/hooks/catch/26188750/uqgkpei/',
        data
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step, currentQuestionIndex, selectedConditions, leadSubmitted, sessionId]);

  // Calculate results
  const calculateResults = () => {
    const newRatings = selectedConditions.map(cond => {
      const answer = answers[cond.id];
      if (!answer) return 0;
      // For bilateral, count both sides
      if (cond.bilateral && cond.side === 'Both') {
        return [answer, answer];
      }
      return answer;
    }).flat();

    const allRatings = currentRating > 0 ? [currentRating, ...newRatings] : newRatings;
    const projectedRating = combinedRating(allRatings);
    const currentMonthly = getMonthlyRate(currentRating, hasSpouse, hasChildren);
    const projectedMonthly = getMonthlyRate(projectedRating, hasSpouse, hasChildren);
    const monthlyIncrease = projectedMonthly - currentMonthly;
    const annualIncrease = monthlyIncrease * 12;
    const fiveYearValue = annualIncrease * 5;

    return { currentRating, projectedRating, currentMonthly, projectedMonthly, monthlyIncrease, annualIncrease, fiveYearValue, newRatings };
  };

  const results = (step === 'results') ? calculateResults() : null;

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Only trigger if mouse leaves through the top of the page
      // Only show once, only if they haven't submitted, only if they've seen results
      if (
        e.clientY < 10 && 
        !exitPopupShown && 
        !leadSubmitted && 
        step === 'results'
      ) {
        const currentResults = calculateResults();
        if (currentResults?.monthlyIncrease > 0) {
          setShowExitPopup(true);
          setExitPopupShown(true);
          trackStep('exit_popup_shown');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitPopupShown, leadSubmitted, step]);

  const currentQuestion = selectedConditions[currentQuestionIndex];
  const progress = selectedConditions.length > 0 
    ? Math.round(((currentQuestionIndex + 1) / selectedConditions.length) * 100)
    : 0;

  const toggleCondition = (key) => {
    const cond = CONDITIONS[key];
    const existing = selectedConditions.find(c => c.key === key);
    if (existing) {
      setSelectedConditions(selectedConditions.filter(c => c.key !== key));
      const newAnswers = { ...answers };
      delete newAnswers[existing.id];
      setAnswers(newAnswers);
    } else {
      setSelectedConditions([...selectedConditions, {
        id: Date.now(),
        key,
        ...cond,
        side: cond.bilateral ? null : undefined
      }]);
    }
  };

  const setBilateralSide = (condId, side) => {
    setSelectedConditions(selectedConditions.map(c => 
      c.id === condId ? { ...c, side } : c
    ));
  };

  const answerQuestion = (value) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    if (currentQuestionIndex < selectedConditions.length - 1) {
      trackStep(`4_question_${currentQuestionIndex + 1}_answered`);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      trackStep('5_all_questions_completed');
      const res = calculateResults();
      trackStep('6_viewed_results', { 
        projectedRating: res.projectedRating,
        monthlyIncrease: res.monthlyIncrease.toFixed(2)
      });
      // Facebook: Track as ViewContent with value
      trackFBEvent('ViewContent', {
        content_name: 'VA Calculator Results',
        content_category: 'Calculator',
        value: res.monthlyIncrease * 12,
        currency: 'USD'
      });
      trackFBCustomEvent('ResultsViewed', {
        current_rating: res.currentRating,
        projected_rating: res.projectedRating,
        monthly_increase: res.monthlyIncrease,
        annual_increase: res.annualIncrease
      });
      setStep('results');
    }
  };

  const submitLead = async () => {
    setIsSubmitting(true);
    const res = calculateResults();
    const leadData = {
      type: 'lead_submission',
      ...leadInfo,
      sessionId,
      currentRating: res.currentRating,
      projectedRating: res.projectedRating,
      monthlyIncrease: res.monthlyIncrease.toFixed(2),
      annualIncrease: res.annualIncrease.toFixed(2),
      fiveYearValue: res.fiveYearValue.toFixed(2),
      conditions: selectedConditions.map(c => c.name).join(', '),
      submittedAt: new Date().toISOString(),
      source: 'facebook_ad'
    };

    try {
      await fetch('https://hooks.zapier.com/hooks/catch/26188750/uqgkpei/', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      trackStep('8_lead_submitted');
      
      // Facebook: Track as Lead with value
      trackFBEvent('Lead', {
        content_name: 'VA Disability Case Review',
        content_category: 'Lead Form',
        value: res.annualIncrease,
        currency: 'USD'
      });
    } catch (e) {
      console.error('Submit error:', e);
    }
    
    setLeadSubmitted(true);
    setShowLeadForm(false);
    setIsSubmitting(false);
  };

  const canProceedFromConditions = selectedConditions.length > 0 && 
    selectedConditions.every(c => !c.bilateral || c.side);

  // Styles
  const theme = {
    purple: '#5D3A8E',
    purpleDark: '#4A2D72',
    purpleLight: '#F5F0FF',
    green: '#22C55E',
    greenDark: '#16A34A',
    greenLight: '#DCFCE7',
    gray: '#6B7280',
    grayLight: '#F3F4F6',
    grayDark: '#1F2937',
    white: '#FFFFFF',
    gold: '#F59E0B'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${theme.purpleLight} 0%, ${theme.white} 100%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '16px',
      position: 'relative'
    }}>
      {/* Background with attorneys - visible on larger screens */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '400px',
        backgroundImage: `url(${TEAM_PHOTO_URL})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        opacity: 0.95
      }} />
      
      {/* Gradient overlay to fade the background */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '450px',
        background: 'linear-gradient(to bottom, rgba(245,240,255,1) 0%, rgba(245,240,255,0) 25%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Header - Always visible */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ 
              width: '40px', height: '40px', 
              background: theme.grayDark, 
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ color: theme.gray, fontWeight: '800', fontSize: '16px' }}>HC</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '700', color: theme.purple, fontSize: '14px', lineHeight: 1.1 }}>HILLER COMERFORD</div>
              <div style={{ fontSize: '9px', color: theme.green, letterSpacing: '0.5px' }}>INJURY & DISABILITY LAW</div>
            </div>
          </div>
        </div>

        {/* ============ WELCOME ============ */}
        {step === 'welcome' && (
          <div style={{ 
            background: theme.white, 
            borderRadius: '20px', 
            padding: '28px 24px',
            boxShadow: '0 10px 40px rgba(93,58,142,0.15)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎖️</div>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '800', 
                color: theme.grayDark,
                marginBottom: '8px',
                lineHeight: 1.2
              }}>
                Are You Getting the VA Benefits You've <span style={{ color: theme.purple }}>Earned?</span>
              </h1>
              <p style={{ color: theme.gray, fontSize: '15px', lineHeight: 1.5 }}>
                Find out in 60 seconds if you qualify for a higher rating and more compensation.
              </p>
            </div>

            <div style={{ 
              background: theme.greenLight, 
              borderRadius: '12px', 
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>💰</div>
                <div>
                  <div style={{ fontWeight: '700', color: theme.greenDark, fontSize: '15px' }}>
                    Veterans Leave Money on the Table
                  </div>
                  <div style={{ color: theme.greenDark, fontSize: '13px' }}>
                    The average increase we find is worth $15,000+ over 5 years
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#FEF3C7', 
              borderRadius: '12px', 
              padding: '16px',
              marginBottom: '20px',
              border: '2px solid #F59E0B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>🛡️</div>
                <div>
                  <div style={{ fontWeight: '700', color: '#92400E', fontSize: '15px' }}>
                    No Fee Guarantee
                  </div>
                  <div style={{ color: '#92400E', fontSize: '13px' }}>
                    You'll never owe us a penny. If we win, the VA pays us directly.
                  </div>
                </div>
              </div>
            </div>

            {/* Rotating Testimonial on Welcome Screen */}
            <div style={{ 
              background: theme.grayLight, 
              borderRadius: '12px', 
              padding: '16px',
              marginBottom: '24px',
              minHeight: '85px'
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#FBBF24', fontSize: '14px' }}>★</span>)}
              </div>
              <p style={{ 
                fontSize: '13px', 
                color: theme.grayDark, 
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: '8px'
              }}>
                "{TESTIMONIALS[testimonialIndex].quote}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: theme.gray, fontWeight: '600' }}>
                  — {TESTIMONIALS[testimonialIndex].name}, {TESTIMONIALS[testimonialIndex].detail}
                </div>
                {/* Dots indicator */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {TESTIMONIALS.map((_, i) => (
                    <div 
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      style={{ 
                        width: '5px', 
                        height: '5px', 
                        borderRadius: '50%', 
                        background: i === testimonialIndex ? theme.purple : '#D1D5DB',
                        cursor: 'pointer'
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => { 
                trackStep('1_started'); 
                trackFBCustomEvent('CalculatorStarted');
                setStep('current-rating'); 
              }}
              style={{
                width: '100%',
                padding: '18px',
                background: `linear-gradient(135deg, ${theme.purple}, ${theme.purpleDark})`,
                color: theme.white,
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(93,58,142,0.3)'
              }}
            >
              Check My Benefits →
            </button>

            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: theme.gray }}>
              ✓ Free &nbsp; ✓ Takes 60 seconds &nbsp; ✓ No obligation
            </p>
          </div>
        )}

        {/* ============ CURRENT RATING ============ */}
        {step === 'current-rating' && (
          <div style={{ 
            background: theme.white, 
            borderRadius: '20px', 
            padding: '24px',
            boxShadow: '0 10px 40px rgba(93,58,142,0.15)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: theme.purple, fontWeight: '600', marginBottom: '4px' }}>STEP 1 OF 3</div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: theme.grayDark, marginBottom: '8px' }}>
                What's your current VA disability rating?
              </h2>
              <p style={{ color: theme.gray, fontSize: '14px' }}>Select 0% if you don't have a rating yet.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map(rating => (
                <button
                  key={rating}
                  onClick={() => setCurrentRating(rating)}
                  style={{
                    padding: '14px 8px',
                    border: currentRating === rating ? `2px solid ${theme.purple}` : '2px solid #E5E7EB',
                    borderRadius: '10px',
                    background: currentRating === rating ? theme.purpleLight : theme.white,
                    color: currentRating === rating ? theme.purple : theme.grayDark,
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  {rating}%
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={hasSpouse} 
                  onChange={e => setHasSpouse(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: theme.purple }}
                />
                <span style={{ fontSize: '15px', color: theme.grayDark }}>I'm married</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={hasChildren} 
                  onChange={e => setHasChildren(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: theme.purple }}
                />
                <span style={{ fontSize: '15px', color: theme.grayDark }}>I have dependent children</span>
              </label>
            </div>

            <button 
              onClick={() => { 
                trackStep('2_rating_selected', { rating: currentRating }); 
                trackFBCustomEvent('RatingSelected', { current_rating: currentRating });
                setStep('conditions'); 
              }}
              style={{
                width: '100%',
                padding: '16px',
                background: theme.purple,
                color: theme.white,
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ============ SELECT CONDITIONS ============ */}
        {step === 'conditions' && (
          <div style={{ 
            background: theme.white, 
            borderRadius: '20px', 
            padding: '24px',
            boxShadow: '0 10px 40px rgba(93,58,142,0.15)'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: theme.purple, fontWeight: '600', marginBottom: '4px' }}>STEP 2 OF 3</div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: theme.grayDark, marginBottom: '8px' }}>
                What conditions affect you?
              </h2>
              <p style={{ color: theme.gray, fontSize: '14px' }}>Select all that apply. These should be connected to your service.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
              {Object.entries(CONDITIONS).map(([key, cond]) => {
                const isSelected = selectedConditions.find(c => c.key === key);
                return (
                  <div key={key}>
                    <button
                      onClick={() => toggleCondition(key)}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: isSelected ? `2px solid ${theme.purple}` : '2px solid #E5E7EB',
                        borderRadius: '12px',
                        background: isSelected ? theme.purpleLight : theme.white,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{cond.icon}</span>
                      <span style={{ 
                        flex: 1, 
                        fontWeight: '500', 
                        color: isSelected ? theme.purple : theme.grayDark,
                        fontSize: '15px'
                      }}>
                        {cond.name}
                      </span>
                      {isSelected && <span style={{ color: theme.green, fontSize: '20px' }}>✓</span>}
                    </button>
                    
                    {/* Bilateral selector */}
                    {isSelected && cond.bilateral && (
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginTop: '8px', 
                        marginLeft: '48px',
                        marginBottom: '4px'
                      }}>
                        {['Left', 'Right', 'Both'].map(side => (
                          <button
                            key={side}
                            onClick={() => setBilateralSide(isSelected.id, side)}
                            style={{
                              padding: '8px 16px',
                              border: isSelected.side === side ? `2px solid ${theme.purple}` : '1px solid #E5E7EB',
                              borderRadius: '8px',
                              background: isSelected.side === side ? theme.purpleLight : theme.white,
                              color: isSelected.side === side ? theme.purple : theme.gray,
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            {side}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedConditions.length > 0 && (
              <div style={{ 
                background: theme.greenLight, 
                padding: '12px 16px', 
                borderRadius: '10px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: theme.greenDark, fontWeight: '500' }}>
                  {selectedConditions.length} condition{selectedConditions.length > 1 ? 's' : ''} selected
                </span>
                <span style={{ color: theme.green, fontSize: '20px' }}>✓</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setStep('current-rating')}
                style={{
                  padding: '16px 24px',
                  background: theme.grayLight,
                  color: theme.gray,
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              <button 
                onClick={() => { 
                  trackStep('3_conditions_selected'); 
                  trackFBCustomEvent('ConditionsSelected', { 
                    num_conditions: selectedConditions.length,
                    conditions: selectedConditions.map(c => c.name).join(', ')
                  });
                  setCurrentQuestionIndex(0); 
                  setStep('questions'); 
                }}
                disabled={!canProceedFromConditions}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: canProceedFromConditions ? theme.purple : '#D1D5DB',
                  color: theme.white,
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: canProceedFromConditions ? 'pointer' : 'not-allowed'
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ============ QUESTIONS ============ */}
        {step === 'questions' && currentQuestion && (
          <div style={{ 
            background: theme.white, 
            borderRadius: '20px', 
            padding: '24px',
            boxShadow: '0 10px 40px rgba(93,58,142,0.15)'
          }}>
            {/* Progress bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: theme.purple, fontWeight: '600' }}>STEP 3 OF 3</span>
                <span style={{ fontSize: '12px', color: theme.gray }}>{currentQuestionIndex + 1} of {selectedConditions.length}</span>
              </div>
              <div style={{ height: '8px', background: theme.grayLight, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${progress}%`, 
                  background: `linear-gradient(90deg, ${theme.purple}, ${theme.green})`,
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '40px' }}>{currentQuestion.icon}</span>
            </div>
            
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: theme.grayDark, 
              marginBottom: '6px',
              textAlign: 'center'
            }}>
              {currentQuestion.name}
              {currentQuestion.side && ` (${currentQuestion.side})`}
            </h2>
            
            <p style={{ 
              color: theme.gray, 
              fontSize: '15px', 
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {CONDITIONS[currentQuestion.key].question}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CONDITIONS[currentQuestion.key].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(opt.value)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '12px',
                    background: theme.white,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = theme.purple;
                    e.currentTarget.style.background = theme.purpleLight;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = theme.white;
                  }}
                >
                  <span style={{ color: theme.grayDark, fontSize: '15px', fontWeight: '500' }}>{opt.label}</span>
                  <span style={{ 
                    background: theme.greenLight, 
                    color: theme.greenDark, 
                    padding: '4px 10px', 
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {opt.value}%
                  </span>
                </button>
              ))}
            </div>

            {currentQuestionIndex > 0 && (
              <button 
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '12px',
                  background: 'transparent',
                  color: theme.gray,
                  border: 'none',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                ← Previous question
              </button>
            )}
          </div>
        )}

        {/* ============ RESULTS ============ */}
        {step === 'results' && results && (
          <div>
            {/* Main Results Card */}
            <div style={{ 
              background: `linear-gradient(135deg, ${theme.purple}, ${theme.purpleDark})`,
              borderRadius: '20px', 
              padding: '28px 24px',
              marginBottom: '16px',
              color: theme.white,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '16px' }}>YOUR POTENTIAL RATING</div>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Current</div>
                  <div style={{ fontSize: '42px', fontWeight: '800' }}>{results.currentRating}%</div>
                </div>
                <div style={{ fontSize: '28px' }}>→</div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Potential</div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#4ADE80' }}>{results.projectedRating}%</div>
                </div>
              </div>

              {results.monthlyIncrease > 0 ? (
                <div style={{ 
                  background: 'rgba(255,255,255,0.15)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '8px'
                }}>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Potential Monthly Increase</div>
                  <div style={{ fontSize: '36px', fontWeight: '800' }}>+${results.monthlyIncrease.toFixed(0)}</div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
                    That's <strong>${results.annualIncrease.toFixed(0)}/year</strong>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  background: 'rgba(255,255,255,0.15)', 
                  borderRadius: '12px', 
                  padding: '16px'
                }}>
                  <div style={{ fontSize: '16px' }}>
                    Based on your answers, you may already be at your correct rating. But there could be other factors we can review.
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            {!leadSubmitted ? (
              <div style={{ 
                background: theme.white,
                borderRadius: '16px', 
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}>
                {!showLeadForm ? (
                  <>
                    {/* Compact Urgency + CTA */}
                    <div style={{ 
                      background: `linear-gradient(135deg, ${theme.purple}, ${theme.purpleDark})`,
                      borderRadius: '12px', 
                      padding: '20px',
                      marginBottom: '16px',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      {/* Urgency line */}
                      <div style={{ 
                        fontSize: '13px', 
                        marginBottom: '12px',
                        opacity: 0.95
                      }}>
                        ⚠️ Waiting 6 months costs you <strong>${(results.monthlyIncrease * 6).toFixed(0)}</strong> in back pay
                      </div>

                      <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
                        Let Us Fight For You
                      </h3>
                      
                      {/* No Fee - inline */}
                      <div style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.95 }}>
                        🛡️ <strong>No Fee Guarantee</strong> — You pay $0. If we win, the VA pays us.
                      </div>

                      <button 
                        onClick={() => { 
                          trackStep('7_clicked_get_review'); 
                          trackFBEvent('InitiateCheckout', {
                            content_name: 'VA Disability Case Review',
                            content_category: 'Lead Form'
                          });
                          setShowLeadForm(true); 
                        }}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: theme.green,
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '17px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Have Us Call You — Free Consult →
                      </button>
                    </div>

                    {/* Rotating Testimonial */}
                    <div style={{ 
                      background: theme.grayLight, 
                      borderRadius: '10px', 
                      padding: '14px',
                      minHeight: '90px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ fontSize: '24px' }}>⭐</div>
                        <div style={{ 
                          transition: 'opacity 0.3s ease',
                          opacity: 1 
                        }}>
                          <p style={{ 
                            fontSize: '13px', 
                            color: theme.grayDark, 
                            fontStyle: 'italic',
                            lineHeight: 1.5,
                            marginBottom: '6px'
                          }}>
                            "{TESTIMONIALS[testimonialIndex].quote}"
                          </p>
                          <div style={{ fontSize: '12px', color: theme.gray, fontWeight: '600' }}>
                            — {TESTIMONIALS[testimonialIndex].name}, {TESTIMONIALS[testimonialIndex].detail}
                          </div>
                        </div>
                      </div>
                      {/* Dots indicator */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '6px', 
                        marginTop: '10px' 
                      }}>
                        {TESTIMONIALS.map((_, i) => (
                          <div 
                            key={i}
                            onClick={() => setTestimonialIndex(i)}
                            style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              background: i === testimonialIndex ? theme.purple : '#D1D5DB',
                              cursor: 'pointer',
                              transition: 'background 0.3s ease'
                            }} 
                          />
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep('welcome')}
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        padding: '10px',
                        background: 'transparent',
                        color: theme.gray,
                        border: 'none',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Start Over
                    </button>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.grayDark, marginBottom: '6px', textAlign: 'center' }}>
                      We'll Call You Soon
                    </h3>
                    <p style={{ fontSize: '13px', color: theme.gray, marginBottom: '16px', textAlign: 'center' }}>
                      Usually within a few hours during business hours.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={leadInfo.firstName}
                        onChange={e => setLeadInfo({ ...leadInfo, firstName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #E5E7EB',
                          borderRadius: '10px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (10 digits)"
                        value={leadInfo.phone}
                        onChange={e => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setLeadInfo({ ...leadInfo, phone: digits });
                        }}
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: `2px solid ${leadInfo.phone && leadInfo.phone.length !== 10 && leadInfo.phone.length > 0 ? '#EF4444' : '#E5E7EB'}`,
                          borderRadius: '10px',
                          fontSize: '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                      {leadInfo.phone && leadInfo.phone.length > 0 && leadInfo.phone.length !== 10 && (
                        <div style={{ color: '#EF4444', fontSize: '12px', marginTop: '-6px' }}>
                          Please enter 10 digits ({leadInfo.phone.length}/10)
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={submitLead}
                      disabled={!leadInfo.firstName || leadInfo.phone.length !== 10 || isSubmitting}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: (!leadInfo.firstName || leadInfo.phone.length !== 10 || isSubmitting) ? '#D1D5DB' : theme.green,
                        color: theme.white,
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '17px',
                        fontWeight: '700',
                        cursor: (!leadInfo.firstName || leadInfo.phone.length !== 10 || isSubmitting) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Free Consult →'}
                    </button>

                    <button 
                      onClick={() => setShowLeadForm(false)}
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '10px',
                        background: 'transparent',
                        color: theme.gray,
                        border: 'none',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      ← Back
                    </button>

                    <div style={{ 
                      marginTop: '12px', 
                      padding: '10px', 
                      background: '#FEF3C7', 
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '16px' }}>🛡️</span>
                      <span style={{ fontSize: '11px', color: '#92400E' }}>
                        <strong>No Fee Guarantee.</strong> You pay nothing. If we win, the VA pays us.
                      </span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ 
                background: theme.greenLight,
                borderRadius: '16px', 
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: theme.greenDark, marginBottom: '8px' }}>
                  Thank You, {leadInfo.firstName}!
                </h3>
                <p style={{ color: theme.greenDark, fontSize: '15px', marginBottom: '16px' }}>
                  One of our VA disability experts will contact you within 24 hours to discuss your case.
                </p>
                <p style={{ color: theme.greenDark, fontSize: '14px' }}>
                  <strong>Questions?</strong> Call us at <a href="tel:1-866-445-5375" style={{ color: theme.greenDark }}>1-866-HILLER LAW</a>
                </p>
              </div>
            )}

            {/* Trust Badges */}
            <div style={{ 
              marginTop: '20px', 
              textAlign: 'center',
              color: theme.gray,
              fontSize: '12px'
            }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px',
                background: '#FEF3C7',
                padding: '8px 16px',
                borderRadius: '20px',
                marginBottom: '16px'
              }}>
                <span>🛡️</span>
                <span style={{ color: '#92400E', fontWeight: '600' }}>No Fee Guarantee</span>
              </div>
              
              <div>Trusted by thousands of veterans</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px', color: theme.gray, fontSize: '11px' }}>
          <p>© 2026 Hiller Comerford Injury & Disability Law</p>
          <p style={{ marginTop: '4px' }}>This calculator provides estimates only and is not legal advice.</p>
        </div>
      </div>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px 24px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowExitPopup(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: theme.gray,
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>

            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
            
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: theme.grayDark,
              marginBottom: '12px'
            }}>
              Wait - You Could Be Leaving Money Behind
            </h2>
            
            <div style={{
              background: theme.greenLight,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '14px', color: theme.gray, marginBottom: '4px' }}>
                Based on your results
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: theme.green }}>
                +${results?.monthlyIncrease?.toFixed(0) || '0'}/month
              </div>
            </div>
            
            <p style={{ 
              color: theme.gray, 
              fontSize: '15px', 
              marginBottom: '24px',
              lineHeight: 1.5
            }}>
              Every month you wait is money lost. Let us help you get what you've earned.
            </p>

            <button
              onClick={() => {
                setShowExitPopup(false);
                setShowLeadForm(true);
                trackStep('exit_popup_clicked_cta');
              }}
              style={{
                width: '100%',
                padding: '18px',
                background: theme.green,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '12px'
              }}
            >
              Have Someone Call Me →
            </button>
            
            <button
              onClick={() => {
                setShowExitPopup(false);
                trackStep('exit_popup_dismissed');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: theme.gray,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              No thanks, I'll leave
            </button>

            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#FEF3C7',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#92400E'
            }}>
              🛡️ <strong>No Fee Guarantee</strong> - You pay nothing. Ever.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
