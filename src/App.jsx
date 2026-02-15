import React, { useState, useEffect } from 'react';
import { theme } from './constants/theme';
import { CONDITIONS, TESTIMONIALS } from './constants/conditions';
import { calculateResults } from './utils/calculations';
import { initFacebookPixel, trackFBEvent, trackFBCustomEvent } from './utils/tracking';
import { isValidEmail, isValidPhone } from './utils/validation';

// Screens
import WelcomeScreen from './components/screens/WelcomeScreen';
import CurrentRatingScreen from './components/screens/CurrentRatingScreen';
import ZeroReassureScreen from './components/screens/ZeroReassureScreen';
import AppliedBeforeScreen from './components/screens/AppliedBeforeScreen';
import DeniedReassureScreen from './components/screens/DeniedReassureScreen';
import ToldIneligibleScreen from './components/screens/ToldIneligibleScreen';
import FirstTimeReassureScreen from './components/screens/FirstTimeReassureScreen';
import UnsureReassureScreen from './components/screens/UnsureReassureScreen';
import ActiveDutyScreen from './components/screens/ActiveDutyScreen';
import ThankServiceScreen from './components/screens/ThankServiceScreen';
import DischargeStatusScreen from './components/screens/DischargeStatusScreen';
import CurrentConditionScreen from './components/screens/CurrentConditionScreen';
import ServiceConnectionScreen from './components/screens/ServiceConnectionScreen';
import FirstNameScreen from './components/screens/FirstNameScreen';
import HundredPercentScreen from './components/screens/HundredPercentScreen';
import RatedReassureScreen from './components/screens/RatedReassureScreen';
import CurrentRatedConditionsScreen from './components/screens/CurrentRatedConditionsScreen';
import EnterCurrentRatingsScreen from './components/screens/EnterCurrentRatingsScreen';
import IncreasedRatingPromptScreen from './components/screens/IncreasedRatingPromptScreen';
import SelectIncreasedConditionsScreen from './components/screens/SelectIncreasedConditionsScreen';
import NewClaimsPromptScreen from './components/screens/NewClaimsPromptScreen';
import ConditionsScreen from './components/screens/ConditionsScreen';
import QuestionsScreen from './components/screens/QuestionsScreen';
import LeadGateScreen from './components/screens/LeadGateScreen';
import ResultsScreen from './components/screens/ResultsScreen';
import ExitPopup from './components/ExitPopup';
import DeadEndScreen from './components/shared/DeadEndScreen';

const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/26461290/ucytsdd/';

export default function VACalculator() {
  // ─── Navigation ───
  const [step, setStep] = useState('welcome');
  const [stepHistory, setStepHistory] = useState([]);

  // ─── Core State ───
  const [currentRating, setCurrentRating] = useState(0);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);

  // ─── New Conditions (0% flow + new claims for 10-90%) ───
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ─── 0% Eligibility Screening ───
  const [hasAppliedBefore, setHasAppliedBefore] = useState(null);
  const [wasToldIneligible, setWasToldIneligible] = useState(null);
  const [servedActiveDuty, setServedActiveDuty] = useState(null);
  const [dischargeStatus, setDischargeStatus] = useState(null);
  const [hasCurrentCondition, setHasCurrentCondition] = useState(null);
  const [serviceConnectionTypes, setServiceConnectionTypes] = useState([]);

  // ─── 10-90% Rated Flow ───
  const [currentRatedConditions, setCurrentRatedConditions] = useState([]);
  const [wantsIncreasedRating, setWantsIncreasedRating] = useState(null);
  const [increasedRatingConditions, setIncreasedRatingConditions] = useState([]);
  const [increasedRatingAnswers, setIncreasedRatingAnswers] = useState({});
  const [wantsNewClaims, setWantsNewClaims] = useState(null);
  const [increasedQuestionIndex, setIncreasedQuestionIndex] = useState(0);

  // ─── Shared ───
  const [veteranFirstName, setVeteranFirstName] = useState('');
  const [leadInfo, setLeadInfo] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId] = useState(() => Date.now().toString(36) + Math.random().toString(36).substr(2));
  const [trackedSteps, setTrackedSteps] = useState(new Set());
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // ─── Navigation helpers ───
  const goToStep = (newStep) => {
    setStepHistory(prev => [...prev, step]);
    setStep(newStep);
  };

  const goBack = () => {
    if (stepHistory.length === 0) return;
    const prevStep = stepHistory[stepHistory.length - 1];
    setStepHistory(h => h.slice(0, -1));
    setStep(prevStep);
  };

  // ─── Reset everything ───
  const resetAll = () => {
    setStep('welcome');
    setStepHistory([]);
    setCurrentRating(0);
    setHasSpouse(false);
    setHasChildren(false);
    setSelectedConditions([]);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setHasAppliedBefore(null);
    setWasToldIneligible(null);
    setServedActiveDuty(null);
    setDischargeStatus(null);
    setHasCurrentCondition(null);
    setServiceConnectionTypes([]);
    setCurrentRatedConditions([]);
    setWantsIncreasedRating(null);
    setIncreasedRatingConditions([]);
    setIncreasedRatingAnswers({});
    setWantsNewClaims(null);
    setIncreasedQuestionIndex(0);
    setVeteranFirstName('');
    setLeadInfo({ firstName: '', lastName: '', phone: '', email: '' });
    setLeadSubmitted(false);
    setIsSubmitting(false);
    setShowExitPopup(false);
    setExitPopupShown(false);
  };

  // ─── Reset flow-specific state when rating changes ───
  const handleRatingChange = (rating) => {
    setCurrentRating(rating);
    // Clear flow-specific state
    setSelectedConditions([]);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setHasAppliedBefore(null);
    setWasToldIneligible(null);
    setServedActiveDuty(null);
    setDischargeStatus(null);
    setHasCurrentCondition(null);
    setServiceConnectionTypes([]);
    setCurrentRatedConditions([]);
    setWantsIncreasedRating(null);
    setIncreasedRatingConditions([]);
    setIncreasedRatingAnswers({});
    setWantsNewClaims(null);
    setIncreasedQuestionIndex(0);
  };

  // ─── Testimonial rotation ───
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ─── Facebook Pixel ───
  useEffect(() => {
    initFacebookPixel();
  }, []);

  // ─── Tracking ───
  // All funnel tracking is handled by Facebook Pixel only.
  // Zapier is only used for lead submissions (in submitLead).
  const trackStep = (stepName, extraData = {}) => {
    if (trackedSteps.has(stepName)) return;
    setTrackedSteps(prev => new Set([...prev, stepName]));
    console.log('Step tracked:', stepName, extraData);
  };

  // ─── Calculate results ───
  const getResults = () => {
    return calculateResults({
      currentRating,
      hasSpouse,
      hasChildren,
      selectedConditions,
      answers,
      currentRatedConditions,
      increasedRatingConditions,
      increasedRatingAnswers,
    });
  };

  const results = (step === 'results') ? getResults() : null;

  // ─── Exit intent ───
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (
        e.clientY < 10 &&
        !exitPopupShown &&
        !leadSubmitted &&
        step === 'results'
      ) {
        const currentResults = getResults();
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

  // ─── Condition toggling (for new claims) ───
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

  // ─── Toggle for currentRatedConditions (10-90% flow) ───
  const toggleRatedCondition = (key) => {
    const cond = CONDITIONS[key];
    const existing = currentRatedConditions.find(c => c.key === key);
    if (existing) {
      setCurrentRatedConditions(currentRatedConditions.filter(c => c.key !== key));
    } else {
      setCurrentRatedConditions([...currentRatedConditions, {
        key,
        name: cond.name,
        icon: cond.icon,
        currentRating: 0
      }]);
    }
  };

  // ─── Toggle for increased rating conditions ───
  const toggleIncreasedCondition = (key) => {
    const existing = increasedRatingConditions.find(c => c.key === key);
    if (existing) {
      setIncreasedRatingConditions(increasedRatingConditions.filter(c => c.key !== key));
    } else {
      const cond = currentRatedConditions.find(c => c.key === key);
      if (cond) {
        setIncreasedRatingConditions([...increasedRatingConditions, cond]);
      }
    }
  };

  // ─── Handle severity answer for new conditions ───
  const answerQuestion = (value) => {
    const currentQuestion = selectedConditions[currentQuestionIndex];
    setAnswers({ ...answers, [currentQuestion.id]: value });
    if (currentQuestionIndex < selectedConditions.length - 1) {
      trackStep(`4_question_${currentQuestionIndex + 1}_answered`);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      trackStep('5_all_questions_completed');
      goToStep('lead-gate');
    }
  };

  // ─── Handle severity answer for increased rating conditions ───
  const answerIncreasedQuestion = (value) => {
    const currentCond = increasedRatingConditions[increasedQuestionIndex];
    setIncreasedRatingAnswers({ ...increasedRatingAnswers, [currentCond.key]: value });
    if (increasedQuestionIndex < increasedRatingConditions.length - 1) {
      setIncreasedQuestionIndex(increasedQuestionIndex + 1);
    } else {
      goToStep('new-claims-prompt');
    }
  };

  // ─── Submit lead ───
  const submitLead = async () => {
    setIsSubmitting(true);
    const res = getResults();

    // Build full conditions list for Zapier
    const allConditions = [
      ...(currentRatedConditions || []).map(c => ({
        name: c.name,
        type: increasedRatingConditions.find(ic => ic.key === c.key) ? 'increased' : 'existing',
        currentRating: c.currentRating,
        newRating: (increasedRatingAnswers || {})[c.key] || null
      })),
      ...(selectedConditions || []).map(c => ({
        name: c.name,
        type: 'new_claim',
        currentRating: 0,
        newRating: answers[c.id] || null
      }))
    ];

    const leadData = {
      type: 'lead_submission',
      sendEmail: true,
      email: leadInfo.email,
      firstName: veteranFirstName || leadInfo.firstName,
      lastName: leadInfo.lastName,
      phone: leadInfo.phone,
      sessionId,
      currentRating: res.currentRating,
      projectedRating: res.projectedRating,
      monthlyIncrease: res.monthlyIncrease.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      annualIncrease: res.annualIncrease.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      fiveYearValue: res.fiveYearValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      conditions: allConditions,
      conditionNames: allConditions.map(c => c.name).join('  |  '),
      qualifiesForIncrease: res.qualifiesForIncrease,
      bannerImageUrl: '/team-photo1.jpg',
      submittedAt: new Date().toISOString(),
      source: 'facebook_ad'
    };

    /*
     * Zapier Email Template Notes:
     * The Zapier workflow should:
     * 1. Receive this payload
     * 2. Send a branded HTML email to leadData.email containing:
     *    - Team photo banner (bannerImageUrl)
     *    - Personalized greeting using firstName
     *    - Current rating → Projected rating
     *    - Monthly/annual/5-year increase amounts
     *    - List of conditions with their ratings
     *    - CTA to call 1-866-HILLER LAW
     *    - No Fee Guarantee badge
     */

    try {
      await fetch(ZAPIER_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      trackStep('8_lead_submitted');
      trackStep('6_viewed_results', {
        projectedRating: res.projectedRating,
        monthlyIncrease: res.monthlyIncrease.toFixed(2)
      });
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
    setIsSubmitting(false);
    goToStep('results');
  };

  // ─── Progress calculation ───
  // Estimate progress as percentage based on flow
  const getProgress = () => {
    const stepProgressMap = {
      'welcome': 0,
      'current-rating': 5,
      // 0% flow
      'zero-reassure': 10,
      'applied-before': 15,
      'denied-reassure': 20,
      'told-ineligible': 25,
      'first-time-reassure': 20,
      'unsure-reassure': 20,
      'active-duty': 30,
      'thank-service': 35,
      'discharge-status': 40,
      'current-condition': 50,
      'service-connection': 55,
      'first-name': 60,
      // 10-90% flow
      'rated-reassure': 10,
      'current-rated-conditions': 20,
      'enter-current-ratings': 30,
      'first-name-rated': 40,
      'increased-rating-prompt': 50,
      'select-increased-conditions': 55,
      'increased-questions': 60,
      'new-claims-prompt': 65,
      // Shared
      'conditions': 70,
      'questions': 80,
      'lead-gate': 90,
      'results': 100,
      // Dead ends
      'dead-ineligible': 100,
      'dead-no-active-duty': 100,
      'dead-dishonorable': 100,
      'dead-no-condition': 100,
      'dead-no-connection': 100,
      'hundred-percent': 100,
    };
    return stepProgressMap[step] || 0;
  };

  const progress = getProgress();

  // ─── Render ───
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${theme.purple} 0%, ${theme.purpleLight} 40%, ${theme.white} 100%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '16px',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ═══════ WELCOME ═══════ */}
        {step === 'welcome' && (
          <WelcomeScreen
            testimonialIndex={testimonialIndex}
            setTestimonialIndex={setTestimonialIndex}
            onStart={() => {
              trackStep('1_started');
              trackFBCustomEvent('CalculatorStarted');
              goToStep('current-rating');
            }}
          />
        )}

        {/* ═══════ CURRENT RATING ═══════ */}
        {step === 'current-rating' && (
          <CurrentRatingScreen
            currentRating={currentRating}
            setCurrentRating={handleRatingChange}
            hasSpouse={hasSpouse}
            setHasSpouse={setHasSpouse}
            hasChildren={hasChildren}
            setHasChildren={setHasChildren}
            progress={progress}
            onBack={goBack}
            onContinue={() => {
              trackStep('2_rating_selected', { rating: currentRating });
              trackFBCustomEvent('RatingSelected', { current_rating: currentRating });
              if (currentRating === 100) {
                goToStep('hundred-percent');
              } else if (currentRating === 0) {
                goToStep('zero-reassure');
              } else {
                goToStep('rated-reassure');
              }
            }}
          />
        )}

        {/* ═══════ 100% DEAD END ═══════ */}
        {step === 'hundred-percent' && (
          <HundredPercentScreen onStartOver={resetAll} />
        )}

        {/* ═══════════════════════════════════════ */}
        {/* ═══════ 0% ELIGIBILITY FLOW ═══════════ */}
        {/* ═══════════════════════════════════════ */}

        {step === 'zero-reassure' && (
          <ZeroReassureScreen
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('applied-before')}
          />
        )}

        {step === 'applied-before' && (
          <AppliedBeforeScreen
            progress={progress}
            onBack={goBack}
            onAnswer={(value) => {
              setHasAppliedBefore(value);
              if (value === 'yes') {
                goToStep('denied-reassure');
              } else if (value === 'no') {
                goToStep('first-time-reassure');
              } else {
                goToStep('unsure-reassure');
              }
            }}
          />
        )}

        {step === 'denied-reassure' && (
          <DeniedReassureScreen
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('told-ineligible')}
          />
        )}

        {step === 'told-ineligible' && (
          <ToldIneligibleScreen
            progress={progress}
            onBack={goBack}
            onAnswer={(wasIneligible) => {
              setWasToldIneligible(wasIneligible);
              if (wasIneligible) {
                goToStep('dead-ineligible');
              } else {
                goToStep('active-duty');
              }
            }}
          />
        )}

        {step === 'dead-ineligible' && (
          <DeadEndScreen
            icon="📞"
            title="We May Still Be Able to Help"
            message="If you were told you were ineligible, our attorneys may be able to review your case and find options. Give us a call for a free consultation."
            ctaText="Call 1-866-HILLER LAW"
            ctaHref="tel:1-866-445-5375"
            onStartOver={resetAll}
          />
        )}

        {step === 'first-time-reassure' && (
          <FirstTimeReassureScreen
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('active-duty')}
          />
        )}

        {step === 'unsure-reassure' && (
          <UnsureReassureScreen
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('active-duty')}
          />
        )}

        {step === 'active-duty' && (
          <ActiveDutyScreen
            progress={progress}
            onBack={goBack}
            onAnswer={(served) => {
              setServedActiveDuty(served);
              if (served) {
                goToStep('thank-service');
              } else {
                goToStep('dead-no-active-duty');
              }
            }}
          />
        )}

        {step === 'dead-no-active-duty' && (
          <DeadEndScreen
            icon="⚠️"
            title="Eligibility Requires Active Duty Service"
            message="VA disability benefits require service on active duty or active duty for training. If you believe this is incorrect, please contact us for guidance."
            ctaText="Call 1-866-HILLER LAW"
            ctaHref="tel:1-866-445-5375"
            onStartOver={resetAll}
          />
        )}

        {step === 'thank-service' && (
          <ThankServiceScreen
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('discharge-status')}
          />
        )}

        {step === 'discharge-status' && (
          <DischargeStatusScreen
            progress={progress}
            onBack={goBack}
            onAnswer={(status) => {
              setDischargeStatus(status);
              if (status === 'dishonorable') {
                goToStep('dead-dishonorable');
              } else {
                goToStep('current-condition');
              }
            }}
          />
        )}

        {step === 'dead-dishonorable' && (
          <DeadEndScreen
            icon="⚖️"
            title="Discharge Upgrade May Be Needed"
            message="A dishonorable discharge generally prevents VA disability benefits. However, a discharge upgrade attorney may be able to help change your discharge status. We recommend consulting with a specialist."
            ctaText="Call 1-866-HILLER LAW"
            ctaHref="tel:1-866-445-5375"
            onStartOver={resetAll}
          />
        )}

        {step === 'current-condition' && (
          <CurrentConditionScreen
            progress={progress}
            onBack={goBack}
            onAnswer={(hasCond) => {
              setHasCurrentCondition(hasCond);
              if (hasCond) {
                goToStep('service-connection');
              } else {
                goToStep('dead-no-condition');
              }
            }}
          />
        )}

        {step === 'dead-no-condition' && (
          <DeadEndScreen
            icon="ℹ️"
            title="A Current Condition Is Required"
            message="VA disability compensation requires a current diagnosed or diagnosable condition. If you develop symptoms in the future that may be connected to your service, don't hesitate to reach out."
            ctaText="Call 1-866-HILLER LAW"
            ctaHref="tel:1-866-445-5375"
            onStartOver={resetAll}
          />
        )}

        {step === 'service-connection' && (
          <ServiceConnectionScreen
            progress={progress}
            onBack={goBack}
            onContinue={(selected) => {
              setServiceConnectionTypes(selected);
              if (selected.includes('none') && selected.length === 1) {
                goToStep('dead-no-connection');
              } else {
                goToStep('first-name');
              }
            }}
          />
        )}

        {step === 'dead-no-connection' && (
          <DeadEndScreen
            icon="🔗"
            title="Service Connection Needed"
            message="VA disability benefits require a connection between your condition and military service. If you're unsure whether your condition qualifies, our team can help evaluate your situation."
            ctaText="Call 1-866-HILLER LAW"
            ctaHref="tel:1-866-445-5375"
            onStartOver={resetAll}
          />
        )}

        {step === 'first-name' && (
          <FirstNameScreen
            title="Everything Looks Good!"
            subtitle="What is your first name?"
            veteranFirstName={veteranFirstName}
            progress={progress}
            onBack={goBack}
            onContinue={(name) => {
              setVeteranFirstName(name);
              setLeadInfo(prev => ({ ...prev, firstName: name }));
              goToStep('conditions');
            }}
          />
        )}

        {/* ═══════════════════════════════════════ */}
        {/* ═══════ 10-90% RATED FLOW ═════════════ */}
        {/* ═══════════════════════════════════════ */}

        {step === 'rated-reassure' && (
          <RatedReassureScreen
            currentRating={currentRating}
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('current-rated-conditions')}
          />
        )}

        {step === 'current-rated-conditions' && (
          <CurrentRatedConditionsScreen
            currentRatedConditions={currentRatedConditions}
            onToggleCondition={toggleRatedCondition}
            progress={progress}
            onBack={goBack}
            onContinue={() => goToStep('enter-current-ratings')}
          />
        )}

        {step === 'enter-current-ratings' && (
          <EnterCurrentRatingsScreen
            currentRatedConditions={currentRatedConditions}
            progress={progress}
            onBack={goBack}
            onComplete={(ratings) => {
              // Store individual ratings on each condition
              setCurrentRatedConditions(prev =>
                prev.map(c => ({ ...c, currentRating: ratings[c.key] || 0 }))
              );
              goToStep('first-name-rated');
            }}
          />
        )}

        {step === 'first-name-rated' && (
          <FirstNameScreen
            title="Thank You!"
            subtitle="What is your first name?"
            veteranFirstName={veteranFirstName}
            progress={progress}
            onBack={goBack}
            onContinue={(name) => {
              setVeteranFirstName(name);
              setLeadInfo(prev => ({ ...prev, firstName: name }));
              goToStep('increased-rating-prompt');
            }}
          />
        )}

        {step === 'increased-rating-prompt' && (
          <IncreasedRatingPromptScreen
            veteranFirstName={veteranFirstName}
            progress={progress}
            onBack={goBack}
            onAnswer={(wants) => {
              setWantsIncreasedRating(wants);
              if (wants) {
                goToStep('select-increased-conditions');
              } else {
                goToStep('new-claims-prompt');
              }
            }}
          />
        )}

        {step === 'select-increased-conditions' && (
          <SelectIncreasedConditionsScreen
            currentRatedConditions={currentRatedConditions}
            increasedRatingConditions={increasedRatingConditions}
            onToggleCondition={toggleIncreasedCondition}
            progress={progress}
            onBack={goBack}
            onContinue={() => {
              setIncreasedQuestionIndex(0);
              goToStep('increased-questions');
            }}
          />
        )}

        {step === 'increased-questions' && (
          <QuestionsScreen
            conditions={increasedRatingConditions.map(c => ({
              ...c,
              ...CONDITIONS[c.key]
            }))}
            currentQuestionIndex={increasedQuestionIndex}
            answers={increasedRatingAnswers}
            progress={progress}
            onAnswer={answerIncreasedQuestion}
            onPrevious={() => {
              if (increasedQuestionIndex > 0) {
                setIncreasedQuestionIndex(increasedQuestionIndex - 1);
              }
            }}
          />
        )}

        {step === 'new-claims-prompt' && (
          <NewClaimsPromptScreen
            veteranFirstName={veteranFirstName}
            progress={progress}
            onBack={goBack}
            onAnswer={(wants) => {
              setWantsNewClaims(wants);
              if (wants) {
                goToStep('conditions');
              } else {
                // Go straight to lead gate
                goToStep('lead-gate');
              }
            }}
          />
        )}

        {/* ═══════════════════════════════════════ */}
        {/* ═══════ SHARED SCREENS ════════════════ */}
        {/* ═══════════════════════════════════════ */}

        {step === 'conditions' && (
          <ConditionsScreen
            selectedConditions={selectedConditions}
            excludeKeys={currentRatedConditions.map(c => c.key)}
            onToggleCondition={toggleCondition}
            onSetBilateralSide={setBilateralSide}
            progress={progress}
            onBack={goBack}
            onContinue={() => {
              trackStep('3_conditions_selected');
              trackFBCustomEvent('ConditionsSelected', {
                num_conditions: selectedConditions.length,
                conditions: selectedConditions.map(c => c.name).join(', ')
              });
              setCurrentQuestionIndex(0);
              goToStep('questions');
            }}
          />
        )}

        {step === 'questions' && (
          <QuestionsScreen
            conditions={selectedConditions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            progress={progress}
            onAnswer={answerQuestion}
            onPrevious={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }
            }}
          />
        )}

        {step === 'lead-gate' && (
          <LeadGateScreen
            leadInfo={leadInfo}
            setLeadInfo={setLeadInfo}
            veteranFirstName={veteranFirstName}
            isSubmitting={isSubmitting}
            qualifiesForIncrease={(() => {
              const res = getResults();
              return res.qualifiesForIncrease;
            })()}
            onSubmit={submitLead}
            onBack={goBack}
            testimonialIndex={testimonialIndex}
            progress={progress}
          />
        )}

        {step === 'results' && results && (
          <ResultsScreen
            results={results}
            leadInfo={leadInfo}
            veteranFirstName={veteranFirstName}
          />
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px', color: theme.gray, fontSize: '11px' }}>
          <p>© 2026 Hiller Comerford Injury & Disability Law</p>
          <p style={{ marginTop: '4px' }}>This calculator provides estimates only and is not legal advice.</p>
        </div>
      </div>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <ExitPopup
          results={results || getResults()}
          onCTA={() => {
            setShowExitPopup(false);
            trackStep('exit_popup_clicked_cta');
          }}
          onDismiss={() => {
            setShowExitPopup(false);
            trackStep('exit_popup_dismissed');
          }}
        />
      )}
    </div>
  );
}
