// Rotating Testimonials
export const TESTIMONIALS = [
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

// 2026 VA Compensation Rates
export const COMPENSATION_RATES = {
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

export const CONDITIONS = {
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
