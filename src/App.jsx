import React, { useState } from "react";

// 2026 VA Compensation Rates (Effective December 1, 2025)
const COMPENSATION_RATES = {
  0: 0,
  10: 180.42,
  20: 356.66,
  30: {
    alone: 552.47,
    spouse: 617.47,
    spouse1Parent: 669.47,
    spouse2Parents: 721.47,
    oneParent: 604.47,
    twoParents: 656.47,
    child: 596.47,
    childSpouse: 666.47,
    childSpouse1Parent: 718.47,
    childSpouse2Parents: 770.47,
    child1Parent: 648.47,
    child2Parents: 700.47,
  },
  40: {
    alone: 795.84,
    spouse: 882.84,
    spouse1Parent: 952.84,
    spouse2Parents: 1022.84,
    oneParent: 865.84,
    twoParents: 935.84,
    child: 853.84,
    childSpouse: 947.84,
    childSpouse1Parent: 1017.84,
    childSpouse2Parents: 1087.84,
    child1Parent: 923.84,
    child2Parents: 993.84,
  },
  50: {
    alone: 1132.9,
    spouse: 1241.9,
    spouse1Parent: 1329.9,
    spouse2Parents: 1417.9,
    oneParent: 1220.9,
    twoParents: 1308.9,
    child: 1205.9,
    childSpouse: 1322.9,
    childSpouse1Parent: 1410.9,
    childSpouse2Parents: 1498.9,
    child1Parent: 1293.9,
    child2Parents: 1381.9,
  },
  60: {
    alone: 1435.02,
    spouse: 1566.02,
    spouse1Parent: 1671.02,
    spouse2Parents: 1776.02,
    oneParent: 1540.02,
    twoParents: 1645.02,
    child: 1523.02,
    childSpouse: 1663.02,
    childSpouse1Parent: 1768.02,
    childSpouse2Parents: 1873.02,
    child1Parent: 1628.02,
    child2Parents: 1733.02,
  },
  70: {
    alone: 1808.45,
    spouse: 1961.45,
    spouse1Parent: 2084.45,
    spouse2Parents: 2207.45,
    oneParent: 1931.45,
    twoParents: 2054.45,
    child: 1910.45,
    childSpouse: 2074.45,
    childSpouse1Parent: 2197.45,
    childSpouse2Parents: 2320.45,
    child1Parent: 2033.45,
    child2Parents: 2156.45,
  },
  80: {
    alone: 2102.15,
    spouse: 2277.15,
    spouse1Parent: 2417.15,
    spouse2Parents: 2557.15,
    oneParent: 2242.15,
    twoParents: 2382.15,
    child: 2219.15,
    childSpouse: 2406.15,
    childSpouse1Parent: 2546.15,
    childSpouse2Parents: 2686.15,
    child1Parent: 2359.15,
    child2Parents: 2499.15,
  },
  90: {
    alone: 2362.3,
    spouse: 2559.3,
    spouse1Parent: 2717.3,
    spouse2Parents: 2875.3,
    oneParent: 2520.3,
    twoParents: 2678.3,
    child: 2494.3,
    childSpouse: 2704.3,
    childSpouse1Parent: 2862.3,
    childSpouse2Parents: 3020.3,
    child1Parent: 2652.3,
    child2Parents: 2810.3,
  },
  100: {
    alone: 3938.58,
    spouse: 4158.17,
    spouse1Parent: 4334.41,
    spouse2Parents: 4510.65,
    oneParent: 4114.82,
    twoParents: 4291.06,
    child: 4085.43,
    childSpouse: 4318.99,
    childSpouse1Parent: 4495.23,
    childSpouse2Parents: 4671.47,
    child1Parent: 4261.67,
    child2Parents: 4437.91,
  },
};

const ADDITIONAL_CHILD_RATES = {
  30: { under18: 32, over18School: 105 },
  40: { under18: 43, over18School: 140 },
  50: { under18: 54, over18School: 176 },
  60: { under18: 65, over18School: 211 },
  70: { under18: 76, over18School: 246 },
  80: { under18: 87, over18School: 281 },
  90: { under18: 98, over18School: 317 },
  100: { under18: 109.11, over18School: 352.45 },
};

const RATING_GROUPS = {
  mental_health: {
    name: "Mental Health",
    description:
      "All mental health conditions are rated together as one evaluation",
    conditions: ["ptsd", "depression", "anxiety", "bipolar", "ocd"],
  },
};

const CONDITIONS = {
  ptsd: {
    name: "PTSD",
    category: "Mental Health",
    ratingGroup: "mental_health",
    questions: [
      {
        id: "severity",
        text: "How much do the mental health symptoms affect their daily life?",
        options: [
          {
            label:
              "Symptoms are present but don't really interfere with work or relationships",
            value: 0,
          },
          {
            label:
              "Mild problems - occasional bad days, some trouble sleeping, but generally managing okay",
            value: 10,
          },
          {
            label:
              "Noticeable problems - trouble at work sometimes, relationship strain, anxiety or depression affecting daily activities",
            value: 30,
          },
          {
            label:
              "Significant problems - difficulty keeping jobs, major relationship issues, memory problems, frequent anxiety or panic",
            value: 50,
          },
          {
            label:
              "Severe problems - can barely work, very isolated, thoughts of self-harm, major gaps in memory or thinking",
            value: 70,
          },
          {
            label:
              "Cannot function - unable to work at all, cannot take care of themselves, completely isolated",
            value: 100,
          },
        ],
      },
    ],
  },
  depression: {
    name: "Depression",
    category: "Mental Health",
    ratingGroup: "mental_health",
    questions: [
      {
        id: "severity",
        text: "How much do the mental health symptoms affect their daily life?",
        options: [
          {
            label:
              "Symptoms are present but don't really interfere with work or relationships",
            value: 0,
          },
          {
            label:
              "Mild problems - occasional bad days, some trouble sleeping, but generally managing okay",
            value: 10,
          },
          {
            label:
              "Noticeable problems - trouble at work sometimes, relationship strain, anxiety or depression affecting daily activities",
            value: 30,
          },
          {
            label:
              "Significant problems - difficulty keeping jobs, major relationship issues, memory problems, frequent anxiety or panic",
            value: 50,
          },
          {
            label:
              "Severe problems - can barely work, very isolated, thoughts of self-harm, major gaps in memory or thinking",
            value: 70,
          },
          {
            label:
              "Cannot function - unable to work at all, cannot take care of themselves, completely isolated",
            value: 100,
          },
        ],
      },
    ],
  },
  anxiety: {
    name: "Anxiety Disorder",
    category: "Mental Health",
    ratingGroup: "mental_health",
    questions: [
      {
        id: "severity",
        text: "How much do the mental health symptoms affect their daily life?",
        options: [
          {
            label:
              "Symptoms are present but don't really interfere with work or relationships",
            value: 0,
          },
          {
            label:
              "Mild problems - occasional bad days, some trouble sleeping, but generally managing okay",
            value: 10,
          },
          {
            label:
              "Noticeable problems - trouble at work sometimes, relationship strain, anxiety or depression affecting daily activities",
            value: 30,
          },
          {
            label:
              "Significant problems - difficulty keeping jobs, major relationship issues, memory problems, frequent anxiety or panic",
            value: 50,
          },
          {
            label:
              "Severe problems - can barely work, very isolated, thoughts of self-harm, major gaps in memory or thinking",
            value: 70,
          },
          {
            label:
              "Cannot function - unable to work at all, cannot take care of themselves, completely isolated",
            value: 100,
          },
        ],
      },
    ],
  },
  bipolar: {
    name: "Bipolar Disorder",
    category: "Mental Health",
    ratingGroup: "mental_health",
    questions: [
      {
        id: "severity",
        text: "How much do the mental health symptoms affect their daily life?",
        options: [
          {
            label:
              "Symptoms are present but don't really interfere with work or relationships",
            value: 0,
          },
          {
            label:
              "Mild problems - occasional bad days, some trouble sleeping, but generally managing okay",
            value: 10,
          },
          {
            label:
              "Noticeable problems - trouble at work sometimes, relationship strain, mood swings affecting daily activities",
            value: 30,
          },
          {
            label:
              "Significant problems - difficulty keeping jobs, major relationship issues, unpredictable mood episodes",
            value: 50,
          },
          {
            label:
              "Severe problems - can barely work, very isolated, dangerous behavior during episodes",
            value: 70,
          },
          {
            label:
              "Cannot function - unable to work at all, cannot take care of themselves",
            value: 100,
          },
        ],
      },
    ],
  },
  ocd: {
    name: "OCD",
    category: "Mental Health",
    ratingGroup: "mental_health",
    questions: [
      {
        id: "severity",
        text: "How much do the mental health symptoms affect their daily life?",
        options: [
          {
            label:
              "Symptoms are present but don't really interfere with work or relationships",
            value: 0,
          },
          {
            label:
              "Mild problems - occasional bad days, rituals don't take much time",
            value: 10,
          },
          {
            label:
              "Noticeable problems - compulsions or obsessions regularly affect work or relationships",
            value: 30,
          },
          {
            label:
              "Significant problems - rituals take hours, difficulty maintaining normal life",
            value: 50,
          },
          {
            label:
              "Severe problems - can barely function due to obsessions/compulsions",
            value: 70,
          },
          {
            label: "Cannot function - completely controlled by symptoms",
            value: 100,
          },
        ],
      },
    ],
  },
  back_cervical: {
    name: "Neck (Cervical Spine) Condition",
    category: "Back & Spine",
    questions: [
      {
        id: "mobility",
        text: "How limited is their neck movement?",
        options: [
          {
            label: "Mostly normal movement with occasional stiffness",
            value: 0,
          },
          {
            label:
              "Some limitation - can't turn head all the way, some pain with movement",
            value: 10,
          },
          {
            label:
              "Moderate limitation - noticeably restricted movement, regular pain",
            value: 20,
          },
          {
            label:
              "Severe limitation - very little neck movement, constant pain",
            value: 30,
          },
          {
            label:
              "Neck is basically frozen/fused - almost no movement possible",
            value: 40,
          },
        ],
      },
    ],
  },
  back_thoracolumbar: {
    name: "Lower Back Condition",
    category: "Back & Spine",
    questions: [
      {
        id: "mobility",
        text: "How far can they bend forward at the waist?",
        options: [
          { label: "Almost normal bending", value: 0 },
          {
            label: "Can bend forward but not all the way - some limitation",
            value: 10,
          },
          {
            label: "Can only bend about halfway - moderate limitation",
            value: 20,
          },
          {
            label: "Can barely bend forward at all - severe limitation",
            value: 40,
          },
          { label: "Spine is fused - cannot bend", value: 50 },
        ],
      },
      {
        id: "flareups",
        text: "Do they have flare-ups that put them in bed?",
        options: [
          { label: "No, or rarely", value: 0 },
          { label: "Yes, a week or two total per year", value: 10 },
          { label: "Yes, about a month total per year", value: 20 },
          { label: "Yes, a month and a half or more per year", value: 40 },
          { label: "Yes, almost half the year or more", value: 60 },
        ],
      },
    ],
  },
  radiculopathy_upper: {
    name: "Arm Nerve Pain/Numbness (from neck)",
    category: "Nerve Conditions",
    bilateral: true,
    questions: [
      {
        id: "severity",
        text: "How bad is the nerve pain, numbness, or tingling going into the arm?",
        options: [
          { label: "No symptoms going into arm", value: 0 },
          { label: "Mild - occasional tingling or numbness", value: 20 },
          {
            label:
              "Moderate - regular pain or numbness, affects use of arm/hand",
            value: 40,
          },
          {
            label:
              "Severe - significant weakness, constant pain, difficulty using hand",
            value: 50,
          },
          {
            label: "Very severe - arm is nearly useless, major muscle loss",
            value: 70,
          },
        ],
      },
    ],
  },
  radiculopathy_lower: {
    name: "Leg Nerve Pain/Numbness (from back)",
    category: "Nerve Conditions",
    bilateral: true,
    questions: [
      {
        id: "severity",
        text: "How bad is the nerve pain, numbness, or tingling going into the leg?",
        options: [
          { label: "No symptoms going into leg", value: 0 },
          { label: "Mild - occasional tingling or numbness", value: 10 },
          {
            label: "Moderate - regular pain or numbness, affects walking",
            value: 20,
          },
          {
            label: "Moderately severe - significant pain and weakness",
            value: 40,
          },
          {
            label: "Severe - major weakness, foot drop, can barely use leg",
            value: 60,
          },
        ],
      },
    ],
  },
  knee: {
    name: "Knee Condition",
    category: "Joints",
    bilateral: true,
    questions: [
      {
        id: "instability",
        text: "Does the knee feel unstable or give out?",
        options: [
          { label: "No, knee is stable", value: 0 },
          { label: "Sometimes feels unstable but no brace needed", value: 10 },
          { label: "Unstable - needs a brace or cane", value: 20 },
          { label: "Very unstable - needs brace AND cane/walker", value: 30 },
        ],
      },
      {
        id: "motion",
        text: "How well does the knee bend and straighten?",
        options: [
          { label: "Normal or almost normal movement", value: 0 },
          {
            label: "Some limitation - can't bend or straighten all the way",
            value: 10,
          },
          {
            label: "Moderate limitation - significant loss of movement",
            value: 20,
          },
          {
            label: "Severe limitation - very little bending possible",
            value: 30,
          },
          { label: "Knee is locked or fused", value: 40 },
        ],
      },
    ],
  },
  hip: {
    name: "Hip Condition",
    category: "Joints",
    bilateral: true,
    questions: [
      {
        id: "motion",
        text: "How limited is the hip movement?",
        options: [
          { label: "Normal or near-normal movement", value: 0 },
          {
            label: "Some limitation - can't lift leg as high, some pain",
            value: 10,
          },
          {
            label: "Moderate limitation - noticeable difficulty with movement",
            value: 20,
          },
          { label: "Severe limitation - very restricted movement", value: 30 },
          { label: "Cannot move hip, or hip replacement", value: 40 },
        ],
      },
    ],
  },
  ankle: {
    name: "Ankle Condition",
    category: "Joints",
    bilateral: true,
    questions: [
      {
        id: "motion",
        text: "How limited is the ankle movement?",
        options: [
          { label: "Normal or near-normal movement", value: 0 },
          {
            label: "Moderate limitation - some stiffness, affects walking",
            value: 10,
          },
          {
            label:
              "Significant limitation - major stiffness, limp when walking",
            value: 20,
          },
          { label: "Ankle is fused or barely moves", value: 30 },
        ],
      },
    ],
  },
  shoulder: {
    name: "Shoulder Condition",
    category: "Joints",
    bilateral: true,
    questions: [
      {
        id: "motion",
        text: "How high can they raise their arm?",
        options: [
          { label: "Can raise arm all the way up normally", value: 0 },
          {
            label: "Can raise arm to shoulder level but not higher",
            value: 20,
          },
          { label: "Can only raise arm halfway to shoulder", value: 30 },
          { label: "Can barely raise arm away from body", value: 40 },
        ],
      },
    ],
  },
  tinnitus: {
    name: "Tinnitus (Ringing in Ears)",
    category: "Hearing",
    questions: [
      {
        id: "presence",
        text: "Do they have constant or frequent ringing, buzzing, or other sounds in their ears?",
        options: [
          { label: "No", value: 0 },
          { label: "Yes", value: 10 },
        ],
      },
    ],
  },
  hearing_loss: {
    name: "Hearing Loss",
    category: "Hearing",
    bilateral: true,
    questions: [
      {
        id: "severity",
        text: "How much hearing have they lost?",
        options: [
          { label: "Mild - can usually follow conversations", value: 0 },
          { label: "Moderate - difficulty hearing in noisy places", value: 10 },
          {
            label:
              "Moderately severe - needs hearing aids for most conversations",
            value: 30,
          },
          { label: "Severe - struggles even with hearing aids", value: 50 },
          {
            label: "Profound - almost no hearing or completely deaf",
            value: 70,
          },
        ],
      },
    ],
  },
  migraine: {
    name: "Migraines",
    category: "Neurological",
    questions: [
      {
        id: "frequency",
        text: "How often do they get migraines bad enough to stop what they're doing?",
        options: [
          { label: "Rarely - a few times a year", value: 0 },
          { label: "Every couple months", value: 10 },
          { label: "About once a month", value: 30 },
          {
            label:
              "Several times a month, really affects their ability to work",
            value: 50,
          },
        ],
      },
    ],
  },
  tbi: {
    name: "Traumatic Brain Injury (TBI)",
    category: "Neurological",
    questions: [
      {
        id: "severity",
        text: "What ongoing problems do they have from the head injury?",
        options: [
          { label: "Had a TBI but no real ongoing problems", value: 0 },
          {
            label: "Mild - occasional headaches, mild memory issues",
            value: 10,
          },
          {
            label:
              "Moderate - regular headaches, concentration problems, mood changes",
            value: 40,
          },
          {
            label:
              "Severe - significant memory loss, personality changes, difficulty with daily tasks",
            value: 70,
          },
          {
            label: "Very severe - needs help with most daily activities",
            value: 100,
          },
        ],
      },
    ],
  },
  sleep_apnea: {
    name: "Sleep Apnea",
    category: "Sleep & Respiratory",
    questions: [
      {
        id: "treatment",
        text: "How is the sleep apnea treated?",
        options: [
          { label: "Diagnosed but no symptoms or treatment needed", value: 0 },
          {
            label: "Causes daytime tiredness, managed with lifestyle changes",
            value: 30,
          },
          { label: "Uses a CPAP or BiPAP machine", value: 50 },
          {
            label: "Requires surgery or has chronic breathing problems",
            value: 100,
          },
        ],
      },
    ],
  },
  diabetes: {
    name: "Diabetes",
    category: "Systemic Conditions",
    questions: [
      {
        id: "management",
        text: "How is the diabetes managed?",
        options: [
          { label: "Controlled with diet alone", value: 10 },
          {
            label: "Takes pills or insulin, no major lifestyle restrictions",
            value: 20,
          },
          { label: "Takes insulin and has to limit activities", value: 40 },
          {
            label: "Takes insulin multiple times daily, has frequent problems",
            value: 60,
          },
          {
            label:
              "Severe - requires constant monitoring, has serious complications",
            value: 100,
          },
        ],
      },
    ],
  },
  hypertension: {
    name: "High Blood Pressure",
    category: "Systemic Conditions",
    questions: [
      {
        id: "control",
        text: "How well controlled is the blood pressure?",
        options: [
          { label: "Controlled with medication", value: 10 },
          {
            label: "Still high even with medication (regularly over 160/100)",
            value: 20,
          },
          { label: "Poorly controlled, causing other symptoms", value: 40 },
          { label: "Very high and causing serious problems", value: 60 },
        ],
      },
    ],
  },
  gerd: {
    name: "GERD / Acid Reflux",
    category: "Digestive",
    questions: [
      {
        id: "severity",
        text: "How bad is the acid reflux?",
        options: [
          {
            label: "Occasional heartburn, controlled with diet or antacids",
            value: 0,
          },
          { label: "Regular symptoms needing daily medication", value: 10 },
          {
            label: "Frequent symptoms affecting eating, pain, regurgitation",
            value: 30,
          },
          {
            label: "Severe - vomiting, weight loss, other serious problems",
            value: 60,
          },
        ],
      },
    ],
  },
  eczema: {
    name: "Eczema / Skin Condition",
    category: "Skin",
    questions: [
      {
        id: "coverage",
        text: "How much of the body is affected?",
        options: [
          {
            label: "Small area (less than 5% of body), minimal treatment",
            value: 0,
          },
          {
            label: "Moderate area (5-20% of body) or needs regular creams",
            value: 10,
          },
          {
            label:
              "Large area (20-40% of body) or needs prescription pills/shots",
            value: 30,
          },
          {
            label:
              "Very large area (over 40% of body) or constant strong medication",
            value: 60,
          },
        ],
      },
    ],
  },
  flatfoot: {
    name: "Flat Feet",
    category: "Feet",
    bilateral: true,
    questions: [
      {
        id: "severity",
        text: "How bad are the flat feet?",
        options: [
          { label: "Mild - insoles/orthotics help, not much pain", value: 0 },
          {
            label: "Moderate - pain when standing/walking, some swelling",
            value: 10,
          },
          {
            label:
              "Severe - marked deformity, significant pain, trouble walking",
            value: 30,
          },
          {
            label: "Very severe - extreme pain, orthotics don't help",
            value: 50,
          },
        ],
      },
    ],
  },
};

// Brand colors from logo
const COLORS = {
  purple: "#5D3A8E",
  purpleLight: "#7B52AB",
  purpleDark: "#4A2D72",
  green: "#4CAF50",
  greenLight: "#6BC96F",
  greenDark: "#3D8B40",
  gray: "#6B7280",
  grayLight: "#9CA3AF",
  grayDark: "#374151",
  white: "#FFFFFF",
  offWhite: "#F9FAFB",
  border: "#E5E7EB",
};

function combinedRatingExact(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  if (ratings.length === 1) return ratings[0];
  const sorted = [...ratings].sort((a, b) => b - a);
  let combined = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    combined = combined + ((100 - combined) * sorted[i]) / 100;
  }
  return combined;
}

function combinedRating(ratings) {
  return Math.min(Math.round(combinedRatingExact(ratings) / 10) * 10, 100);
}

function getMonthlyRate(rating, dependents) {
  if (rating === 0) return 0;
  if (rating < 30) return COMPENSATION_RATES[rating] || 0;
  const rates = COMPENSATION_RATES[rating];
  if (!rates) return 0;
  const { hasSpouse, numParents, hasChildren } = dependents;
  let key = "alone";
  if (hasChildren && hasSpouse && numParents === 2) key = "childSpouse2Parents";
  else if (hasChildren && hasSpouse && numParents === 1)
    key = "childSpouse1Parent";
  else if (hasChildren && hasSpouse) key = "childSpouse";
  else if (hasChildren && numParents === 2) key = "child2Parents";
  else if (hasChildren && numParents === 1) key = "child1Parent";
  else if (hasChildren) key = "child";
  else if (hasSpouse && numParents === 2) key = "spouse2Parents";
  else if (hasSpouse && numParents === 1) key = "spouse1Parent";
  else if (hasSpouse) key = "spouse";
  else if (numParents === 2) key = "twoParents";
  else if (numParents === 1) key = "oneParent";
  let base = rates[key] || rates.alone;
  if (rating >= 30 && ADDITIONAL_CHILD_RATES[rating] && hasChildren) {
    const childRates = ADDITIONAL_CHILD_RATES[rating];
    const extraChildren =
      (dependents.numChildrenUnder18 || 0) > 1
        ? (dependents.numChildrenUnder18 || 0) - 1
        : 0;
    base += extraChildren * childRates.under18;
    base += (dependents.numChildrenOver18School || 0) * childRates.over18School;
  }
  return base;
}

function getRatingGroup(conditionKey) {
  const cond = CONDITIONS[conditionKey];
  return cond?.ratingGroup || null;
}

function getRatingGroupInfo(groupKey) {
  return RATING_GROUPS[groupKey] || null;
}

export default function VADisabilityCalculator() {
  const [step, setStep] = useState("welcome");
  const [hasExisting, setHasExisting] = useState(null);
  const [existingConditions, setExistingConditions] = useState([]);
  const [selectedExistingCondition, setSelectedExistingCondition] =
    useState("");
  const [selectedExistingRating, setSelectedExistingRating] = useState("");
  const [selectedExistingSide, setSelectedExistingSide] = useState("");

  const [wantsIncrease, setWantsIncrease] = useState(null);
  const [increaseSelections, setIncreaseSelections] = useState([]);
  const [increaseAnswers, setIncreaseAnswers] = useState({});
  const [currentIncreaseIndex, setCurrentIncreaseIndex] = useState(0);

  const [wantsNew, setWantsNew] = useState(null);
  const [newConditions, setNewConditions] = useState([]);
  const [selectedNewCondition, setSelectedNewCondition] = useState("");
  const [selectedNewSide, setSelectedNewSide] = useState("");
  const [newAnswers, setNewAnswers] = useState({});
  const [currentNewIndex, setCurrentNewIndex] = useState(0);

  const [pyramidingWarnings, setPyramidingWarnings] = useState([]);
  const [dependents, setDependents] = useState({
    hasSpouse: false,
    numParents: 0,
    hasChildren: false,
    numChildrenUnder18: 0,
    numChildrenOver18School: 0,
  });

  const [leadInfo, setLeadInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bestTimeToCall: "",
    agreeToContact: false,
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const conditionsByCategory = {};
  Object.entries(CONDITIONS).forEach(([key, cond]) => {
    if (!conditionsByCategory[cond.category])
      conditionsByCategory[cond.category] = [];
    conditionsByCategory[cond.category].push({ key, ...cond });
  });

  const checkForPyramiding = (newConditionKey) => {
    const newGroup = getRatingGroup(newConditionKey);
    if (!newGroup) return null;
    for (const ec of existingConditions) {
      const existingGroup = getRatingGroup(ec.conditionKey);
      if (existingGroup === newGroup)
        return { existingCondition: ec, group: getRatingGroupInfo(newGroup) };
    }
    for (const nc of newConditions) {
      const ncGroup = getRatingGroup(nc.conditionKey);
      if (ncGroup === newGroup)
        return {
          existingCondition: nc,
          group: getRatingGroupInfo(newGroup),
          isNewCondition: true,
        };
    }
    return null;
  };

  const addExistingCondition = () => {
    if (!selectedExistingCondition || !selectedExistingRating) return;
    const cond = CONDITIONS[selectedExistingCondition];
    if (cond.bilateral && !selectedExistingSide) return;
    const pyramiding = checkForPyramiding(selectedExistingCondition);
    if (pyramiding && !pyramiding.isNewCondition) {
      alert(
        `${cond.name} is rated together with ${pyramiding.existingCondition.name}. You've already entered ${pyramiding.existingCondition.name}.`
      );
      return;
    }
    setExistingConditions([
      ...existingConditions,
      {
        id: Date.now(),
        conditionKey: selectedExistingCondition,
        name: cond.bilateral
          ? `${cond.name} (${selectedExistingSide})`
          : cond.name,
        rating: parseInt(selectedExistingRating),
        bilateral: cond.bilateral,
        side: selectedExistingSide,
        ratingGroup: cond.ratingGroup,
      },
    ]);
    setSelectedExistingCondition("");
    setSelectedExistingRating("");
    setSelectedExistingSide("");
  };

  const addNewCondition = () => {
    if (!selectedNewCondition) return;
    const cond = CONDITIONS[selectedNewCondition];
    if (cond.bilateral && !selectedNewSide) return;
    const pyramiding = checkForPyramiding(selectedNewCondition);
    if (pyramiding?.isNewCondition) {
      alert(
        `${cond.name} is rated together with ${pyramiding.existingCondition.name}. You've already added ${pyramiding.existingCondition.name}.`
      );
      return;
    }
    if (pyramiding) {
      setPyramidingWarnings([
        ...pyramidingWarnings,
        {
          newConditionKey: selectedNewCondition,
          existingConditionId: pyramiding.existingCondition.id,
          existingConditionName: pyramiding.existingCondition.name,
        },
      ]);
      setNewConditions([
        ...newConditions,
        {
          id: Date.now(),
          conditionKey: selectedNewCondition,
          name: cond.bilateral
            ? `${cond.name} (${selectedNewSide})`
            : cond.name,
          bilateral: cond.bilateral,
          side: selectedNewSide,
          ratingGroup: cond.ratingGroup,
          pyramidingWith: pyramiding.existingCondition.id,
        },
      ]);
    } else {
      setNewConditions([
        ...newConditions,
        {
          id: Date.now(),
          conditionKey: selectedNewCondition,
          name: cond.bilateral
            ? `${cond.name} (${selectedNewSide})`
            : cond.name,
          bilateral: cond.bilateral,
          side: selectedNewSide,
          ratingGroup: cond.ratingGroup,
        },
      ]);
    }
    setSelectedNewCondition("");
    setSelectedNewSide("");
  };

  const calculateNewRating = (conditionKey, answers) => {
    if (!answers) return 0;
    return Math.max(...Object.values(answers), 0);
  };

  const calculateResults = () => {
    const currentRatings = existingConditions.map((c) => c.rating);
    const currentCombined = combinedRating(currentRatings);
    const currentMonthly = getMonthlyRate(currentCombined, dependents);
    const groupRatings = {};
    const nonGroupRatings = [];
    const resultDetails = [];

    existingConditions.forEach((ec) => {
      const isIncreased = increaseSelections.includes(ec.id);
      let finalRating = ec.rating;
      if (isIncreased && increaseAnswers[ec.id])
        finalRating = Math.max(
          finalRating,
          calculateNewRating(ec.conditionKey, increaseAnswers[ec.id])
        );
      if (ec.ratingGroup) {
        if (!groupRatings[ec.ratingGroup])
          groupRatings[ec.ratingGroup] = {
            oldRating: ec.rating,
            newRating: finalRating,
            conditions: [ec.name],
            isIncrease: isIncreased && finalRating > ec.rating,
          };
        else {
          groupRatings[ec.ratingGroup].oldRating = Math.max(
            groupRatings[ec.ratingGroup].oldRating,
            ec.rating
          );
          groupRatings[ec.ratingGroup].newRating = Math.max(
            groupRatings[ec.ratingGroup].newRating,
            finalRating
          );
          groupRatings[ec.ratingGroup].conditions.push(ec.name);
        }
      } else
        nonGroupRatings.push({
          rating: finalRating,
          oldRating: ec.rating,
          name: ec.name,
          isIncrease: isIncreased && finalRating > ec.rating,
          isNew: false,
        });
    });

    newConditions.forEach((nc) => {
      const rating = calculateNewRating(nc.conditionKey, newAnswers[nc.id]);
      if (nc.ratingGroup) {
        if (!groupRatings[nc.ratingGroup])
          groupRatings[nc.ratingGroup] = {
            oldRating: 0,
            newRating: rating,
            conditions: [nc.name],
            isNew: true,
          };
        else {
          groupRatings[nc.ratingGroup].newRating = Math.max(
            groupRatings[nc.ratingGroup].newRating,
            rating
          );
          groupRatings[nc.ratingGroup].conditions.push(nc.name);
          groupRatings[nc.ratingGroup].hasPyramiding = true;
          groupRatings[nc.ratingGroup].pyramidingCondition = nc.name;
        }
      } else if (rating > 0)
        nonGroupRatings.push({
          rating,
          oldRating: null,
          name: nc.name,
          isIncrease: false,
          isNew: true,
        });
    });

    const newRatingsArray = [];
    Object.entries(groupRatings).forEach(([groupKey, data]) => {
      const groupInfo = getRatingGroupInfo(groupKey);
      newRatingsArray.push(data.newRating);
      resultDetails.push({
        name: groupInfo
          ? `${groupInfo.name} (${data.conditions.join(", ")})`
          : data.conditions.join(", "),
        oldRating: data.oldRating > 0 ? data.oldRating : null,
        newRating: data.newRating,
        isIncrease: data.oldRating > 0 && data.newRating > data.oldRating,
        isNew: data.oldRating === 0,
        isPyramiding: data.hasPyramiding,
      });
    });
    nonGroupRatings.forEach((item) => {
      if (item.rating > 0 || item.oldRating > 0) {
        newRatingsArray.push(item.rating);
        resultDetails.push({
          name: item.name,
          oldRating: item.oldRating,
          newRating: item.rating,
          isIncrease: item.isIncrease,
          isNew: item.isNew,
        });
      }
    });

    const newCombined = combinedRating(newRatingsArray);
    const newMonthly = getMonthlyRate(newCombined, dependents);
    return {
      currentCombined,
      currentMonthly,
      newCombined,
      newMonthly,
      monthlyIncrease: newMonthly - currentMonthly,
      annualIncrease: (newMonthly - currentMonthly) * 12,
      resultDetails,
    };
  };

  const currentIncreaseCondition = increaseSelections[currentIncreaseIndex]
    ? existingConditions.find(
        (c) => c.id === increaseSelections[currentIncreaseIndex]
      )
    : null;
  const currentNewCondition = newConditions[currentNewIndex];
  const allIncreaseQuestionsAnswered = () =>
    currentIncreaseCondition &&
    CONDITIONS[currentIncreaseCondition.conditionKey].questions.every(
      (q) => increaseAnswers[currentIncreaseCondition.id]?.[q.id] !== undefined
    );
  const allNewQuestionsAnswered = () =>
    currentNewCondition &&
    CONDITIONS[currentNewCondition.conditionKey].questions.every(
      (q) => newAnswers[currentNewCondition.id]?.[q.id] !== undefined
    );
  const results = step === "results" ? calculateResults() : null;
  const selectedNewPyramidingInfo = selectedNewCondition
    ? checkForPyramiding(selectedNewCondition)
    : null;

  const isLeadFormValid = () =>
    leadInfo.firstName.trim() &&
    leadInfo.lastName.trim() &&
    leadInfo.email.trim() &&
    leadInfo.phone.trim() &&
    leadInfo.agreeToContact;

  const submitLead = async () => {
    if (!isLeadFormValid()) return;
    setSubmitting(true);
    const calcResults = calculateResults();
    const leadData = {
      ...leadInfo,
      currentRating: calcResults.currentCombined,
      projectedRating: calcResults.newCombined,
      monthlyIncrease: calcResults.monthlyIncrease,
      annualIncrease: calcResults.annualIncrease,
      conditions: calcResults.resultDetails,
      existingConditions: existingConditions.map((c) => ({
        name: c.name,
        rating: c.rating,
      })),
      newConditions: newConditions.map((c) => c.name),
      increasedConditions: increaseSelections.map(
        (id) => existingConditions.find((c) => c.id === id)?.name
      ),
      submittedAt: new Date().toISOString(),
      source: "facebook_ad",
    };

try {
  await fetch('https://hooks.zapier.com/hooks/catch/26188750/uqgkpei/', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  
  setLeadSubmitted(true);
  setStep('results');
} catch (error) {
  console.error('Error submitting lead:', error);
  setLeadSubmitted(true);
  setStep('results');
}

  const resetForm = () => {
    setStep("welcome");
    setHasExisting(null);
    setExistingConditions([]);
    setSelectedExistingCondition("");
    setSelectedExistingRating("");
    setSelectedExistingSide("");
    setWantsIncrease(null);
    setIncreaseSelections([]);
    setIncreaseAnswers({});
    setCurrentIncreaseIndex(0);
    setWantsNew(null);
    setNewConditions([]);
    setSelectedNewCondition("");
    setSelectedNewSide("");
    setNewAnswers({});
    setCurrentNewIndex(0);
    setPyramidingWarnings([]);
    setDependents({
      hasSpouse: false,
      numParents: 0,
      hasChildren: false,
      numChildrenUnder18: 0,
      numChildrenOver18School: 0,
    });
    setLeadInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bestTimeToCall: "",
      agreeToContact: false,
    });
    setLeadSubmitted(false);
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .card { background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(93,58,142,0.08); border: 1px solid ${COLORS.border}; }
    .btn { padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.2s; border: none; font-family: inherit; }
    .btn-primary { background: ${COLORS.purple}; color: white; }
    .btn-primary:hover:not(:disabled) { background: ${COLORS.purpleDark}; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(93,58,142,0.3); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary { background: ${COLORS.offWhite}; border: 1px solid ${COLORS.border}; color: ${COLORS.grayDark}; }
    .btn-secondary:hover { background: ${COLORS.border}; }
    .btn-cta { background: linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark}); color: white; font-size: 17px; padding: 18px 36px; }
    .btn-cta:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(76,175,80,0.4); }
    .choice-card { flex: 1; padding: 28px; border-radius: 12px; border: 2px solid ${COLORS.border}; background: white; cursor: pointer; text-align: center; transition: all 0.2s; }
    .choice-card:hover { border-color: ${COLORS.purpleLight}; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(93,58,142,0.1); }
    .choice-card.selected { border-color: ${COLORS.purple}; background: linear-gradient(135deg, rgba(93,58,142,0.05), rgba(93,58,142,0.02)); }
    .option-btn { width: 100%; padding: 16px 20px; border-radius: 10px; border: 1px solid ${COLORS.border}; background: white; color: ${COLORS.grayDark}; text-align: left; cursor: pointer; transition: all 0.15s; font-size: 15px; line-height: 1.5; font-family: inherit; }
    .option-btn:hover { background: ${COLORS.offWhite}; border-color: ${COLORS.purpleLight}; }
    .option-btn.selected { border-color: ${COLORS.purple}; background: linear-gradient(135deg, rgba(93,58,142,0.08), rgba(93,58,142,0.03)); }
    select, input[type="text"], input[type="email"], input[type="tel"], input[type="number"] { width: 100%; background: white; border: 1px solid ${COLORS.border}; border-radius: 8px; padding: 12px 14px; color: ${COLORS.grayDark}; font-size: 15px; font-family: inherit; }
    select:focus, input:focus { outline: none; border-color: ${COLORS.purple}; box-shadow: 0 0 0 3px rgba(93,58,142,0.1); }
    input[type="checkbox"] { appearance: none; width: 22px; height: 22px; border: 2px solid ${COLORS.border}; border-radius: 5px; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
    input[type="checkbox"]:checked { background: ${COLORS.purple}; border-color: ${COLORS.purple}; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E"); }
    .condition-tag { display: inline-flex; align-items: center; gap: 10px; padding: 10px 14px; background: ${COLORS.offWhite}; border: 1px solid ${COLORS.border}; border-radius: 8px; font-size: 14px; }
    .remove-btn { background: #FEE2E2; border: none; color: #DC2626; width: 24px; height: 24px; border-radius: 5px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
    .remove-btn:hover { background: #FECACA; }
    .info-box { background: linear-gradient(135deg, rgba(93,58,142,0.08), rgba(93,58,142,0.03)); border: 1px solid rgba(93,58,142,0.2); border-radius: 10px; padding: 14px 16px; margin: 12px 0; color: ${COLORS.purpleDark}; }
    .success-box { background: linear-gradient(135deg, rgba(76,175,80,0.1), rgba(76,175,80,0.05)); border: 1px solid rgba(76,175,80,0.3); border-radius: 10px; padding: 14px 16px; color: ${COLORS.greenDark}; }
  `;

  // Logo component
  const Logo = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          background: COLORS.grayDark,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `3px solid ${COLORS.gray}`,
        }}
      >
        <span
          style={{
            color: COLORS.grayLight,
            fontSize: "22px",
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
          HC
        </span>
      </div>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: COLORS.purple,
            lineHeight: 1.1,
          }}
        >
          HILLER
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: COLORS.purple,
            lineHeight: 1.1,
          }}
        >
          COMERFORD
        </div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "600",
            color: COLORS.green,
            letterSpacing: "1px",
            marginTop: "2px",
          }}
        >
          INJURY & DISABILITY LAW
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.white} 0%, ${COLORS.offWhite} 100%)`,
        fontFamily: "Inter, system-ui, sans-serif",
        color: COLORS.grayDark,
        padding: "24px",
      }}
    >
      <style>{styles}</style>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Welcome */}
        {step === "welcome" && (
          <div className="card" style={{ textAlign: "center" }}>
            <Logo />
            <div style={{ fontSize: "42px", marginBottom: "16px" }}>🎖️</div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "12px",
                color: COLORS.purple,
              }}
            >
              Free VA Disability Calculator
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: COLORS.gray,
                marginBottom: "28px",
                lineHeight: 1.6,
              }}
            >
              Find out if you're getting the full VA disability benefits you've
              earned. This free tool estimates your rating and monthly
              compensation.
            </p>
            <div
              style={{
                background: COLORS.offWhite,
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "28px",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: COLORS.gray,
                  marginBottom: "16px",
                }}
              >
                Veterans we've helped have discovered:
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: COLORS.green,
                    }}
                  >
                    $500+
                  </div>
                  <div style={{ fontSize: "13px", color: COLORS.gray }}>
                    more per month
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: COLORS.green,
                    }}
                  >
                    20-40%
                  </div>
                  <div style={{ fontSize: "13px", color: COLORS.gray }}>
                    rating increase
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-cta"
              onClick={() => setStep("has-existing")}
              style={{ width: "100%" }}
            >
              Calculate My Benefits →
            </button>
            <p
              style={{
                fontSize: "12px",
                color: COLORS.grayLight,
                marginTop: "16px",
              }}
            >
              Takes about 3 minutes • No obligation • 100% free
            </p>
          </div>
        )}

        {/* Has existing? */}
        {step === "has-existing" && (
          <div className="card">
            <Logo />
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
                color: COLORS.purple,
              }}
            >
              Do you currently have a VA disability rating?
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "28px",
                textAlign: "center",
              }}
            >
              Let's start by understanding your current situation.
            </p>
            <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
              <button
                className={`choice-card ${
                  hasExisting === true ? "selected" : ""
                }`}
                onClick={() => setHasExisting(true)}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>✓</div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: COLORS.purple,
                  }}
                >
                  Yes
                </div>
                <div style={{ fontSize: "13px", color: COLORS.gray }}>
                  I have existing rated conditions
                </div>
              </button>
              <button
                className={`choice-card ${
                  hasExisting === false ? "selected" : ""
                }`}
                onClick={() => setHasExisting(false)}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>○</div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: COLORS.purple,
                  }}
                >
                  No
                </div>
                <div style={{ fontSize: "13px", color: COLORS.gray }}>
                  This would be my first claim
                </div>
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setStep("welcome")}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={hasExisting === null}
                onClick={() =>
                  setStep(hasExisting ? "enter-existing" : "wants-new")
                }
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Enter existing */}
        {step === "enter-existing" && (
          <div className="card">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                color: COLORS.purple,
              }}
            >
              What conditions are you currently rated for?
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Select each condition and its rating from your VA decision letter.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <select
                value={selectedExistingCondition}
                onChange={(e) => {
                  setSelectedExistingCondition(e.target.value);
                  setSelectedExistingSide("");
                }}
              >
                <option value="">Select condition...</option>
                {Object.entries(conditionsByCategory).map(([cat, conds]) => (
                  <optgroup key={cat} label={cat}>
                    {conds.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <div style={{ display: "flex", gap: "12px" }}>
                {selectedExistingCondition &&
                  CONDITIONS[selectedExistingCondition]?.bilateral && (
                    <select
                      value={selectedExistingSide}
                      onChange={(e) => setSelectedExistingSide(e.target.value)}
                      style={{ flex: 1 }}
                    >
                      <option value="">Which side?</option>
                      <option value="Left">Left</option>
                      <option value="Right">Right</option>
                      <option value="Both">Both</option>
                    </select>
                  )}
                <select
                  value={selectedExistingRating}
                  onChange={(e) => setSelectedExistingRating(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">Current rating</option>
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((r) => (
                    <option key={r} value={r}>
                      {r}%
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-secondary"
                onClick={addExistingCondition}
                disabled={
                  !selectedExistingCondition ||
                  !selectedExistingRating ||
                  (CONDITIONS[selectedExistingCondition]?.bilateral &&
                    !selectedExistingSide)
                }
                style={{ alignSelf: "flex-start" }}
              >
                + Add Condition
              </button>
            </div>

            {existingConditions.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                {existingConditions.map((c) => (
                  <div key={c.id} className="condition-tag">
                    <span>{c.name}</span>
                    <span style={{ color: COLORS.purple, fontWeight: "600" }}>
                      {c.rating}%
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        setExistingConditions(
                          existingConditions.filter((x) => x.id !== c.id)
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {existingConditions.length > 0 && (
              <div
                className="info-box"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <span>Your current combined rating:</span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: COLORS.purple,
                  }}
                >
                  {combinedRating(existingConditions.map((c) => c.rating))}%
                </span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setStep("has-existing")}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep("wants-increase")}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Wants increase? */}
        {step === "wants-increase" && (
          <div className="card">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
                color: COLORS.purple,
              }}
            >
              Have any of your conditions gotten worse?
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "28px",
                textAlign: "center",
              }}
            >
              If a condition has worsened since your last rating, you may
              qualify for an increase.
            </p>
            <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
              <button
                className={`choice-card ${
                  wantsIncrease === true ? "selected" : ""
                }`}
                onClick={() => setWantsIncrease(true)}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>↑</div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: COLORS.purple,
                  }}
                >
                  Yes
                </div>
                <div style={{ fontSize: "13px", color: COLORS.gray }}>
                  One or more have worsened
                </div>
              </button>
              <button
                className={`choice-card ${
                  wantsIncrease === false ? "selected" : ""
                }`}
                onClick={() => setWantsIncrease(false)}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>→</div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: COLORS.purple,
                  }}
                >
                  No
                </div>
                <div style={{ fontSize: "13px", color: COLORS.gray }}>
                  They're about the same
                </div>
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setStep("enter-existing")}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={wantsIncrease === null}
                onClick={() =>
                  setStep(wantsIncrease ? "select-increase" : "wants-new")
                }
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Select increase */}
        {step === "select-increase" && (
          <div className="card">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                color: COLORS.purple,
              }}
            >
              Which conditions have gotten worse?
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Select all that apply.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              {existingConditions.map((c) => (
                <label
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    background: increaseSelections.includes(c.id)
                      ? `linear-gradient(135deg, rgba(93,58,142,0.08), rgba(93,58,142,0.03))`
                      : COLORS.offWhite,
                    border: increaseSelections.includes(c.id)
                      ? `2px solid ${COLORS.purple}`
                      : `1px solid ${COLORS.border}`,
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={increaseSelections.includes(c.id)}
                    onChange={(e) =>
                      setIncreaseSelections(
                        e.target.checked
                          ? [...increaseSelections, c.id]
                          : increaseSelections.filter((x) => x !== c.id)
                      )
                    }
                  />
                  <span style={{ flex: 1, fontWeight: "500" }}>{c.name}</span>
                  <span style={{ color: COLORS.gray }}>
                    Currently: {c.rating}%
                  </span>
                </label>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setStep("wants-increase")}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={increaseSelections.length === 0}
                onClick={() => {
                  setCurrentIncreaseIndex(0);
                  setStep("increase-questions");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Increase questions */}
        {step === "increase-questions" && currentIncreaseCondition && (
          <div className="card">
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: COLORS.gray,
                  marginBottom: "4px",
                }}
              >
                Condition {currentIncreaseIndex + 1} of{" "}
                {increaseSelections.length}
              </div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: 0,
                  color: COLORS.purple,
                }}
              >
                {currentIncreaseCondition.name}
              </h2>
              <div
                style={{
                  fontSize: "14px",
                  color: COLORS.gray,
                  marginTop: "4px",
                }}
              >
                Current rating: {currentIncreaseCondition.rating}%
              </div>
            </div>

            {CONDITIONS[currentIncreaseCondition.conditionKey].questions.map(
              (q, qi) => (
                <div key={q.id} style={{ marginBottom: "24px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "14px",
                      color: COLORS.grayDark,
                    }}
                  >
                    {qi + 1}. {q.text}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        className={`option-btn ${
                          increaseAnswers[currentIncreaseCondition.id]?.[
                            q.id
                          ] === opt.value
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setIncreaseAnswers({
                            ...increaseAnswers,
                            [currentIncreaseCondition.id]: {
                              ...increaseAnswers[currentIncreaseCondition.id],
                              [q.id]: opt.value,
                            },
                          })
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>{opt.label}</span>
                          <span
                            style={{
                              color:
                                opt.value === 0
                                  ? COLORS.grayLight
                                  : COLORS.green,
                              fontWeight: "700",
                              marginLeft: "12px",
                            }}
                          >
                            {opt.value}%
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  currentIncreaseIndex > 0
                    ? setCurrentIncreaseIndex(currentIncreaseIndex - 1)
                    : setStep("select-increase")
                }
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!allIncreaseQuestionsAnswered()}
                onClick={() =>
                  currentIncreaseIndex < increaseSelections.length - 1
                    ? setCurrentIncreaseIndex(currentIncreaseIndex + 1)
                    : setStep("wants-new")
                }
              >
                {currentIncreaseIndex < increaseSelections.length - 1
                  ? "Next Condition"
                  : "Continue"}
              </button>
            </div>
          </div>
        )}

        {/* Wants new? */}
        {step === "wants-new" && (
          <div className="card">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
                color: COLORS.purple,
              }}
            >
              Do you have any new conditions to claim?
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "28px",
                textAlign: "center",
              }}
            >
              Conditions connected to your service that aren't currently rated.
            </p>
            <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
              <button
                className={`choice-card ${wantsNew === true ? "selected" : ""}`}
                onClick={() => setWantsNew(true)}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>+</div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: COLORS.purple,
                  }}
                >
                  Yes
                </div>
                <div style={{ fontSize: "13px", color: COLORS.gray }}>
                  I have new conditions
                </div>
              </button>
              <button
                className={`choice-card ${
                  wantsNew === false ? "selected" : ""
                }`}
                onClick={() => setWantsNew(false)}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>→</div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: COLORS.purple,
                  }}
                >
                  No
                </div>
                <div style={{ fontSize: "13px", color: COLORS.gray }}>
                  Just the ones I mentioned
                </div>
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (wantsIncrease && increaseSelections.length > 0) {
                    setCurrentIncreaseIndex(increaseSelections.length - 1);
                    setStep("increase-questions");
                  } else if (hasExisting) setStep("wants-increase");
                  else setStep("has-existing");
                }}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={wantsNew === null}
                onClick={() => setStep(wantsNew ? "enter-new" : "dependents")}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Enter new */}
        {step === "enter-new" && (
          <div className="card">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                color: COLORS.purple,
              }}
            >
              What new conditions do you want to claim?
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Select any conditions connected to your military service.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <select
                value={selectedNewCondition}
                onChange={(e) => {
                  setSelectedNewCondition(e.target.value);
                  setSelectedNewSide("");
                }}
              >
                <option value="">Select condition...</option>
                {Object.entries(conditionsByCategory).map(([cat, conds]) => (
                  <optgroup key={cat} label={cat}>
                    {conds.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              {selectedNewCondition &&
                CONDITIONS[selectedNewCondition]?.bilateral && (
                  <select
                    value={selectedNewSide}
                    onChange={(e) => setSelectedNewSide(e.target.value)}
                  >
                    <option value="">Which side?</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                    <option value="Both">Both</option>
                  </select>
                )}

              <button
                className="btn btn-secondary"
                onClick={addNewCondition}
                disabled={
                  !selectedNewCondition ||
                  (CONDITIONS[selectedNewCondition]?.bilateral &&
                    !selectedNewSide)
                }
                style={{ alignSelf: "flex-start" }}
              >
                + Add Condition
              </button>
            </div>

            {selectedNewPyramidingInfo &&
              !selectedNewPyramidingInfo.isNewCondition && (
                <div className="info-box" style={{ fontSize: "14px" }}>
                  <strong>Note:</strong>{" "}
                  {CONDITIONS[selectedNewCondition]?.name} will be evaluated
                  together with your existing{" "}
                  {selectedNewPyramidingInfo.existingCondition.name}. Adding
                  this diagnosis may support a higher rating.
                </div>
              )}

            {newConditions.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "20px",
                  marginTop: "16px",
                }}
              >
                {newConditions.map((c) => (
                  <div
                    key={c.id}
                    className="condition-tag"
                    style={
                      c.pyramidingWith
                        ? {
                            borderColor: COLORS.purple,
                            background: `linear-gradient(135deg, rgba(93,58,142,0.08), rgba(93,58,142,0.03))`,
                          }
                        : {}
                    }
                  >
                    <span>{c.name}</span>
                    {c.pyramidingWith && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: COLORS.purple,
                          fontWeight: "600",
                        }}
                      >
                        (combined)
                      </span>
                    )}
                    <button
                      className="remove-btn"
                      onClick={() =>
                        setNewConditions(
                          newConditions.filter((x) => x.id !== c.id)
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setStep("wants-new")}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={newConditions.length === 0}
                onClick={() => {
                  setCurrentNewIndex(0);
                  setStep("new-questions");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* New questions */}
        {step === "new-questions" && currentNewCondition && (
          <div className="card">
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: COLORS.gray,
                  marginBottom: "4px",
                }}
              >
                New Condition {currentNewIndex + 1} of {newConditions.length}
              </div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: 0,
                  color: COLORS.purple,
                }}
              >
                {currentNewCondition.name}
              </h2>
              {currentNewCondition.pyramidingWith && (
                <div
                  className="info-box"
                  style={{ marginTop: "12px", fontSize: "14px" }}
                >
                  This will be rated together with your existing{" "}
                  {
                    existingConditions.find(
                      (c) => c.id === currentNewCondition.pyramidingWith
                    )?.name
                  }
                  .
                </div>
              )}
            </div>

            {CONDITIONS[currentNewCondition.conditionKey].questions.map(
              (q, qi) => (
                <div key={q.id} style={{ marginBottom: "24px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "14px",
                      color: COLORS.grayDark,
                    }}
                  >
                    {qi + 1}. {q.text}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        className={`option-btn ${
                          newAnswers[currentNewCondition.id]?.[q.id] ===
                          opt.value
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setNewAnswers({
                            ...newAnswers,
                            [currentNewCondition.id]: {
                              ...newAnswers[currentNewCondition.id],
                              [q.id]: opt.value,
                            },
                          })
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>{opt.label}</span>
                          <span
                            style={{
                              color:
                                opt.value === 0
                                  ? COLORS.grayLight
                                  : COLORS.green,
                              fontWeight: "700",
                              marginLeft: "12px",
                            }}
                          >
                            {opt.value}%
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  currentNewIndex > 0
                    ? setCurrentNewIndex(currentNewIndex - 1)
                    : setStep("enter-new")
                }
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!allNewQuestionsAnswered()}
                onClick={() =>
                  currentNewIndex < newConditions.length - 1
                    ? setCurrentNewIndex(currentNewIndex + 1)
                    : setStep("dependents")
                }
              >
                {currentNewIndex < newConditions.length - 1
                  ? "Next Condition"
                  : "Continue"}
              </button>
            </div>
          </div>
        )}

        {/* Dependents */}
        {step === "dependents" && (
          <div className="card">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "8px",
                color: COLORS.purple,
              }}
            >
              Tell us about your family
            </h2>
            <p
              style={{
                color: COLORS.gray,
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Compensation increases at 30% or higher if you have dependents.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={dependents.hasSpouse}
                  onChange={(e) =>
                    setDependents({
                      ...dependents,
                      hasSpouse: e.target.checked,
                    })
                  }
                />
                <span>I am married</span>
              </label>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: COLORS.gray,
                    fontSize: "14px",
                  }}
                >
                  Dependent parents
                </label>
                <select
                  value={dependents.numParents}
                  onChange={(e) =>
                    setDependents({
                      ...dependents,
                      numParents: parseInt(e.target.value),
                    })
                  }
                  style={{ width: "150px" }}
                >
                  <option value={0}>None</option>
                  <option value={1}>1 parent</option>
                  <option value={2}>2 parents</option>
                </select>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={dependents.hasChildren}
                  onChange={(e) =>
                    setDependents({
                      ...dependents,
                      hasChildren: e.target.checked,
                      numChildrenUnder18: e.target.checked
                        ? Math.max(1, dependents.numChildrenUnder18)
                        : 0,
                    })
                  }
                />
                <span>I have dependent children</span>
              </label>

              {dependents.hasChildren && (
                <div
                  style={{
                    marginLeft: "34px",
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: COLORS.gray,
                        fontSize: "13px",
                      }}
                    >
                      Under 18
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={dependents.numChildrenUnder18}
                      onChange={(e) =>
                        setDependents({
                          ...dependents,
                          numChildrenUnder18: parseInt(e.target.value) || 1,
                        })
                      }
                      style={{ width: "80px" }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: COLORS.gray,
                        fontSize: "13px",
                      }}
                    >
                      18-23 in school
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={dependents.numChildrenOver18School}
                      onChange={(e) =>
                        setDependents({
                          ...dependents,
                          numChildrenOver18School:
                            parseInt(e.target.value) || 0,
                        })
                      }
                      style={{ width: "80px" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "28px",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (wantsNew && newConditions.length > 0) {
                    setCurrentNewIndex(newConditions.length - 1);
                    setStep("new-questions");
                  } else setStep("wants-new");
                }}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep("lead-capture")}
              >
                See My Results
              </button>
            </div>
          </div>
        )}

        {/* Lead Capture */}
        {step === "lead-capture" && (
          <div className="card">
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📊</div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  marginBottom: "8px",
                  color: COLORS.purple,
                }}
              >
                Your Results Are Ready!
              </h2>
              <p style={{ color: COLORS.gray, fontSize: "15px" }}>
                Enter your information below to see your estimated VA disability
                rating and potential monthly compensation.
              </p>
            </div>

            <div
              className="success-box"
              style={{ marginBottom: "24px", textAlign: "center" }}
            >
              <div style={{ fontSize: "14px" }}>
                One of our VA disability experts will also reach out to discuss
                your options — <strong>at no cost to you</strong>.
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: COLORS.grayDark,
                    }}
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={leadInfo.firstName}
                    onChange={(e) =>
                      setLeadInfo({ ...leadInfo, firstName: e.target.value })
                    }
                    placeholder="John"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: COLORS.grayDark,
                    }}
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={leadInfo.lastName}
                    onChange={(e) =>
                      setLeadInfo({ ...leadInfo, lastName: e.target.value })
                    }
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: COLORS.grayDark,
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  value={leadInfo.email}
                  onChange={(e) =>
                    setLeadInfo({ ...leadInfo, email: e.target.value })
                  }
                  placeholder="john.smith@email.com"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: COLORS.grayDark,
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={leadInfo.phone}
                  onChange={(e) =>
                    setLeadInfo({ ...leadInfo, phone: e.target.value })
                  }
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: COLORS.grayDark,
                  }}
                >
                  Best time to call
                </label>
                <select
                  value={leadInfo.bestTimeToCall}
                  onChange={(e) =>
                    setLeadInfo({ ...leadInfo, bestTimeToCall: e.target.value })
                  }
                >
                  <option value="">Select...</option>
                  <option value="morning">Morning (9am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 8pm)</option>
                </select>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={leadInfo.agreeToContact}
                  onChange={(e) =>
                    setLeadInfo({
                      ...leadInfo,
                      agreeToContact: e.target.checked,
                    })
                  }
                  style={{ marginTop: "2px" }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    color: COLORS.gray,
                    lineHeight: 1.5,
                  }}
                >
                  I agree to be contacted by Hiller Comerford Injury &
                  Disability Law regarding my VA disability claim. I understand
                  this is a free consultation with no obligation. *
                </span>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "28px",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setStep("dependents")}
              >
                Back
              </button>
              <button
                className="btn btn-cta"
                disabled={!isLeadFormValid() || submitting}
                onClick={submitLead}
              >
                {submitting ? "Submitting..." : "Show My Results →"}
              </button>
            </div>

            <p
              style={{
                fontSize: "11px",
                color: COLORS.grayLight,
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              By submitting, you agree to our Privacy Policy. We will never sell
              your information.
            </p>
          </div>
        )}

        {/* Results */}
        {step === "results" && results && (
          <div>
            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
                borderRadius: "16px",
                padding: "32px",
                marginBottom: "20px",
                color: "white",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    marginBottom: "8px",
                  }}
                >
                  Your Estimated Benefits
                </h2>
                <p style={{ fontSize: "14px", opacity: 0.85 }}>
                  Based on your answers, here's what you may be entitled to:
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    results.currentCombined > 0 ? "1fr auto 1fr" : "1fr",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                {results.currentCombined > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "13px",
                        opacity: 0.7,
                        marginBottom: "6px",
                      }}
                    >
                      Current Rating
                    </div>
                    <div
                      style={{
                        fontSize: "44px",
                        fontWeight: "800",
                        opacity: 0.6,
                      }}
                    >
                      {results.currentCombined}%
                    </div>
                    <div style={{ fontSize: "16px", opacity: 0.5 }}>
                      ${results.currentMonthly.toFixed(2)}/mo
                    </div>
                  </div>
                )}
                {results.currentCombined > 0 && (
                  <div style={{ fontSize: "28px", opacity: 0.6 }}>→</div>
                )}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      opacity: 0.9,
                      marginBottom: "6px",
                    }}
                  >
                    {results.currentCombined > 0
                      ? "Potential New Rating"
                      : "Estimated Rating"}
                  </div>
                  <div
                    style={{
                      fontSize: "56px",
                      fontWeight: "800",
                      color: COLORS.greenLight,
                    }}
                  >
                    {results.newCombined}%
                  </div>
                  <div style={{ fontSize: "20px", color: COLORS.greenLight }}>
                    ${results.newMonthly.toFixed(2)}/mo
                  </div>
                </div>
              </div>

              {results.monthlyIncrease > 0 && (
                <div
                  style={{
                    background: "rgba(76,175,80,0.25)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                      marginBottom: "8px",
                    }}
                  >
                    Potential Additional Compensation
                  </div>
                  <div
                    style={{
                      fontSize: "44px",
                      fontWeight: "800",
                      color: COLORS.greenLight,
                    }}
                  >
                    +${results.monthlyIncrease.toFixed(2)}/mo
                  </div>
                  <div
                    style={{ fontSize: "16px", opacity: 0.8, marginTop: "4px" }}
                  >
                    ${results.annualIncrease.toFixed(2)} per year
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                textAlign: "center",
                background: `linear-gradient(135deg, rgba(76,175,80,0.1), rgba(76,175,80,0.05))`,
                border: `1px solid rgba(76,175,80,0.3)`,
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: COLORS.greenDark,
                  marginBottom: "12px",
                }}
              >
                Want Help Getting These Benefits?
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: COLORS.grayDark,
                  marginBottom: "20px",
                }}
              >
                A VA disability attorney from Hiller Comerford will be in touch
                shortly to discuss your case —{" "}
                <strong>at no upfront cost</strong>. We only get paid if you
                win.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="tel:+1XXXXXXXXXX"
                  className="btn btn-primary"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  > Visit Our Website
                </a>
              </div>
            </div>

            {/* Breakdown */}
            <div className="card" style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: COLORS.purple,
                }}
              >
                Your Conditions
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {results.resultDetails.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 16px",
                      background: item.isNew
                        ? "rgba(76,175,80,0.08)"
                        : item.isIncrease
                        ? `rgba(93,58,142,0.08)`
                        : COLORS.offWhite,
                      borderRadius: "10px",
                      border: item.isNew
                        ? "1px solid rgba(76,175,80,0.25)"
                        : item.isIncrease
                        ? `1px solid rgba(93,58,142,0.2)`
                        : `1px solid ${COLORS.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.isNew && (
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: "4px",
                            background: "rgba(76,175,80,0.15)",
                            color: COLORS.greenDark,
                            fontSize: "11px",
                            fontWeight: "700",
                          }}
                        >
                          NEW
                        </span>
                      )}
                      {item.isIncrease && (
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: "4px",
                            background: `rgba(93,58,142,0.15)`,
                            color: COLORS.purple,
                            fontSize: "11px",
                            fontWeight: "700",
                          }}
                        >
                          INCREASE
                        </span>
                      )}
                      <span style={{ fontWeight: "500" }}>{item.name}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {item.oldRating !== null &&
                        item.oldRating !== item.newRating && (
                          <>
                            <span
                              style={{
                                color: COLORS.grayLight,
                                textDecoration: "line-through",
                              }}
                            >
                              {item.oldRating}%
                            </span>
                            <span style={{ color: COLORS.grayLight }}>→</span>
                          </>
                        )}
                      <span
                        style={{
                          fontWeight: "700",
                          color:
                            item.isNew || item.isIncrease
                              ? COLORS.green
                              : COLORS.grayDark,
                        }}
                      >
                        {item.newRating}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div
              style={{
                background: COLORS.offWhite,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "20px",
                fontSize: "12px",
                color: COLORS.gray,
              }}
            >
              <strong>Disclaimer:</strong> This calculator provides estimates
              only and does not guarantee any specific VA rating or compensation
              amount. Actual results depend on medical evidence, VA evaluation,
              and other factors. Consult with a qualified VA disability attorney
              for personalized advice.
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn btn-secondary" onClick={resetForm}>
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            paddingTop: "20px",
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: COLORS.gray,
              marginBottom: "8px",
            }}
          >
            © 2026 Hiller Comerford Injury & Disability Law
          </p>
          <p style={{ fontSize: "11px", color: COLORS.grayLight }}>
            <a
              href="https://hillercomerford.com/privacy"
              style={{ color: COLORS.gray }}
            >
              Privacy Policy
            </a>{" "}
            •{" "}
            <a
              href="https://hillercomerford.com/terms"
              style={{ color: COLORS.gray }}
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
