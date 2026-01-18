import React, { useState, useMemo, useRef, useEffect } from 'react';

// Comprehensive pain data structure with location-specific options
const PAIN_DATA = {
  locations: {
    head: {
      label: 'Head',
      painTerm: 'headache',
      subLocations: ['Frontal', 'Temporal (unilateral)', 'Temporal (bilateral)', 'Occipital', 'Vertex', 'Periorbital', 'Hemicranial (left)', 'Hemicranial (right)', 'Global/Holocephalic', 'Retro-orbital'],
      qualities: ['Throbbing', 'Pulsating', 'Pressure-like', 'Tight/Band-like', 'Sharp', 'Stabbing', 'Piercing', 'Dull', 'Aching', 'Burning', 'Electric/Shock-like', 'Drilling', 'Exploding'],
      radiations: ['Neck', 'Jaw', 'Eye', 'Face', 'Shoulder', 'None'],
      associatedSymptoms: ['Photophobia', 'Phonophobia', 'Nausea', 'Vomiting', 'Visual aura', 'Sensory aura', 'Lacrimation', 'Conjunctival injection', 'Rhinorrhea', 'Ptosis', 'Scalp tenderness', 'Neck stiffness', 'Dizziness', 'None']
    },
    face: {
      label: 'Face',
      painTerm: 'facial pain',
      subLocations: ['Maxillary', 'Mandibular', 'Periorbital', 'Forehead', 'Cheek', 'Jaw', 'Temporomandibular joint', 'Sinus'],
      qualities: ['Sharp', 'Stabbing', 'Electric/Shock-like', 'Dull', 'Aching', 'Pressure-like', 'Burning', 'Throbbing', 'Lancinating'],
      radiations: ['Ear', 'Teeth', 'Neck', 'Head', 'Eye', 'None'],
      associatedSymptoms: ['Facial numbness', 'Facial weakness', 'Lacrimation', 'Nasal congestion', 'Tooth sensitivity', 'Trismus', 'Trigger points', 'None']
    },
    neck: {
      label: 'Neck',
      painTerm: 'neck pain',
      subLocations: ['Anterior', 'Posterior', 'Left lateral', 'Right lateral', 'Bilateral', 'Suboccipital', 'Supraclavicular'],
      qualities: ['Stiff', 'Aching', 'Sharp', 'Dull', 'Burning', 'Throbbing', 'Tight', 'Cramping'],
      radiations: ['Head', 'Shoulder', 'Arm', 'Upper back', 'Interscapular region', 'None'],
      associatedSymptoms: ['Limited range of motion', 'Headache', 'Arm numbness', 'Arm weakness', 'Dizziness', 'Dysphagia', 'None']
    },
    chest: {
      label: 'Chest',
      painTerm: 'chest pain',
      subLocations: ['Retrosternal', 'Precordial', 'Left-sided', 'Right-sided', 'Bilateral', 'Anterior chest wall', 'Lateral'],
      qualities: ['Squeezing', 'Pressure-like', 'Crushing', 'Tight', 'Sharp', 'Stabbing', 'Pleuritic', 'Burning', 'Aching', 'Dull', 'Tearing'],
      radiations: ['Left arm', 'Right arm', 'Both arms', 'Jaw', 'Neck', 'Back', 'Epigastrium', 'Shoulder', 'Interscapular area', 'None'],
      associatedSymptoms: ['Dyspnea', 'Diaphoresis', 'Palpitations', 'Nausea', 'Vomiting', 'Syncope', 'Presyncope', 'Cough', 'Hemoptysis', 'Orthopnea', 'Worsening with inspiration', 'None']
    },
    abdomen: {
      label: 'Abdomen',
      painTerm: 'abdominal pain',
      subLocations: ['Epigastric', 'Periumbilical', 'Right upper quadrant', 'Left upper quadrant', 'Right lower quadrant', 'Left lower quadrant', 'Suprapubic', 'Diffuse', 'Right flank', 'Left flank', 'Right iliac fossa', 'Left iliac fossa'],
      qualities: ['Crampy', 'Colicky', 'Sharp', 'Dull', 'Aching', 'Burning', 'Gnawing', 'Boring', 'Pressure-like', 'Distending', 'Stabbing'],
      radiations: ['Back', 'Groin', 'Shoulder (referred)', 'Chest', 'Flank', 'Pelvis', 'None'],
      associatedSymptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating', 'Loss of appetite', 'Fever', 'Hematochezia', 'Melena', 'Hematemesis', 'Jaundice', 'Dysuria', 'Hematuria', 'Rebound tenderness', 'Guarding', 'None']
    },
    back: {
      label: 'Back',
      painTerm: 'back pain',
      subLocations: ['Cervical', 'Upper thoracic', 'Mid-thoracic', 'Lower thoracic', 'Lumbar', 'Lumbosacral', 'Sacral', 'Left paraspinal', 'Right paraspinal', 'Interscapular'],
      qualities: ['Aching', 'Dull', 'Sharp', 'Stabbing', 'Burning', 'Electric/Shooting', 'Stiff', 'Tight', 'Throbbing', 'Deep'],
      radiations: ['Buttock', 'Leg (unilateral)', 'Leg (bilateral)', 'Groin', 'Abdomen', 'Chest', 'Foot', 'None'],
      associatedSymptoms: ['Leg numbness', 'Leg weakness', 'Bowel incontinence', 'Bladder incontinence', 'Saddle anesthesia', 'Limited mobility', 'Morning stiffness', 'None']
    },
    upperExtremity: {
      label: 'Upper Extremity',
      painTerm: 'upper extremity pain',
      subLocations: ['Shoulder', 'Upper arm', 'Elbow', 'Forearm', 'Wrist', 'Hand', 'Fingers', 'Multiple joints'],
      qualities: ['Aching', 'Sharp', 'Dull', 'Burning', 'Throbbing', 'Stiff', 'Cramping', 'Tingling', 'Electric/Shooting', 'Deep', 'Superficial'],
      radiations: ['Neck', 'Shoulder', 'Arm', 'Hand', 'Fingers', 'Chest', 'None'],
      associatedSymptoms: ['Numbness', 'Weakness', 'Swelling', 'Redness', 'Warmth', 'Limited range of motion', 'Grip weakness', 'Paresthesias', 'None']
    },
    lowerExtremity: {
      label: 'Lower Extremity',
      painTerm: 'lower extremity pain',
      subLocations: ['Hip', 'Anterior thigh', 'Posterior thigh', 'Knee', 'Lower leg', 'Calf', 'Ankle', 'Foot', 'Toes', 'Multiple joints'],
      qualities: ['Aching', 'Sharp', 'Dull', 'Burning', 'Throbbing', 'Stiff', 'Cramping', 'Tingling', 'Electric/Shooting', 'Deep', 'Superficial', 'Claudicating'],
      radiations: ['Back', 'Hip', 'Thigh', 'Knee', 'Foot', 'Toes', 'None'],
      associatedSymptoms: ['Numbness', 'Weakness', 'Swelling', 'Redness', 'Warmth', 'Limited range of motion', 'Limping', 'Paresthesias', 'Calf tenderness', 'None']
    },
    pelvis: {
      label: 'Pelvis/Perineum',
      painTerm: 'pelvic pain',
      subLocations: ['Suprapubic', 'Left inguinal', 'Right inguinal', 'Perineal', 'Sacral', 'Coccygeal', 'Vaginal', 'Testicular/Scrotal', 'Penile', 'Rectal'],
      qualities: ['Crampy', 'Dull', 'Sharp', 'Pressure-like', 'Aching', 'Burning', 'Throbbing', 'Colicky'],
      radiations: ['Back', 'Thigh', 'Groin', 'Rectum', 'None'],
      associatedSymptoms: ['Dysuria', 'Urinary frequency', 'Urinary urgency', 'Hematuria', 'Vaginal bleeding', 'Vaginal discharge', 'Dyspareunia', 'Testicular swelling', 'Constipation', 'Tenesmus', 'None']
    },
    throat: {
      label: 'Throat',
      painTerm: 'throat pain',
      subLocations: ['Pharyngeal', 'Laryngeal', 'Tonsillar', 'Anterior neck', 'Thyroid region'],
      qualities: ['Sore', 'Scratchy', 'Burning', 'Sharp', 'Dull', 'Tight', 'Pressure-like'],
      radiations: ['Ear', 'Neck', 'Chest', 'None'],
      associatedSymptoms: ['Dysphagia', 'Odynophagia', 'Hoarseness', 'Cough', 'Fever', 'Lymphadenopathy', 'Stridor', 'None']
    },
    ear: {
      label: 'Ear',
      painTerm: 'ear pain',
      subLocations: ['External ear', 'Middle ear', 'Deep/Inner ear', 'Periauricular', 'Unilateral', 'Bilateral'],
      qualities: ['Sharp', 'Dull', 'Aching', 'Throbbing', 'Pressure-like', 'Fullness', 'Burning'],
      radiations: ['Jaw', 'Neck', 'Temple', 'Throat', 'None'],
      associatedSymptoms: ['Hearing loss', 'Tinnitus', 'Vertigo', 'Otorrhea', 'Fever', 'Facial weakness', 'None']
    },
    eye: {
      label: 'Eye',
      painTerm: 'eye pain',
      subLocations: ['Retro-orbital', 'Periorbital', 'Conjunctival', 'Corneal', 'Unilateral', 'Bilateral'],
      qualities: ['Sharp', 'Dull', 'Aching', 'Burning', 'Gritty', 'Pressure-like', 'Stabbing', 'Throbbing'],
      radiations: ['Temple', 'Forehead', 'Cheek', 'None'],
      associatedSymptoms: ['Vision changes', 'Photophobia', 'Lacrimation', 'Redness', 'Discharge', 'Foreign body sensation', 'Floaters', 'Flashes', 'None']
    },
    diffuse: {
      label: 'Diffuse/Generalized',
      painTerm: 'generalized pain',
      subLocations: ['Whole body', 'Multiple sites', 'Migratory'],
      qualities: ['Aching', 'Dull', 'Burning', 'Deep', 'Superficial', 'Fatiguing'],
      radiations: ['N/A'],
      associatedSymptoms: ['Fatigue', 'Fever', 'Malaise', 'Joint stiffness', 'Muscle weakness', 'Sleep disturbance', 'None']
    }
  },
  
  onsetTypes: [
    { value: 'sudden', label: 'Sudden (seconds)' },
    { value: 'acute', label: 'Acute (minutes)' },
    { value: 'gradual', label: 'Gradual (hours)' },
    { value: 'insidious', label: 'Insidious (days to weeks)' }
  ],
  
  durations: ['Seconds', 'Minutes', 'Less than 30 minutes', '30-60 minutes', '1-4 hours', '4-12 hours', '12-24 hours', '1-3 days', 'More than 3 days', 'Continuous', 'Variable'],
  
  frequencies: ['Constant', 'Intermittent', 'Episodic', 'Daily', 'Several times daily', 'Weekly', 'Monthly', 'Sporadic', 'First episode'],
  
  temporalPatterns: ['Worsening', 'Improving', 'Stable', 'Fluctuating', 'Crescendo', 'Waxing and waning', 'Peaked and now resolving'],
  
  severities: Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} - ${i < 3 ? 'Mild' : i < 6 ? 'Moderate' : i < 8 ? 'Severe' : 'Very Severe'}`
  })),
  
  aggravatingFactors: {
    general: ['Movement', 'Activity', 'Rest', 'Lying down', 'Sitting', 'Standing', 'Walking', 'Coughing', 'Sneezing', 'Straining', 'Stress', 'Fatigue', 'Cold', 'Heat', 'Touch/Pressure', 'Nothing specific'],
    head: ['Bright lights', 'Loud sounds', 'Bending forward', 'Physical exertion', 'Alcohol', 'Certain foods', 'Lack of sleep', 'Menstruation'],
    chest: ['Deep breathing', 'Exertion', 'Lying flat', 'Eating', 'Swallowing', 'Arm movement', 'Position change'],
    abdomen: ['Eating', 'Fasting', 'Specific foods', 'Alcohol', 'Lying down', 'Defecation', 'Urination'],
    back: ['Bending', 'Lifting', 'Twisting', 'Prolonged sitting', 'Prolonged standing', 'Getting up from bed'],
    lowerExtremity: ['Weight-bearing', 'Climbing stairs', 'Walking distance', 'Prolonged standing']
  },
  
  relievingFactors: {
    general: ['Rest', 'Sleep', 'Analgesics', 'NSAIDs', 'Acetaminophen', 'Heat application', 'Cold/Ice application', 'Massage', 'Position change', 'Distraction', 'Nothing'],
    head: ['Dark quiet room', 'Sleep', 'Caffeine', 'Triptans', 'Lying down', 'Pressure on temples'],
    chest: ['Sitting forward', 'Nitroglycerin', 'Antacids', 'Rest', 'Shallow breathing'],
    abdomen: ['Eating', 'Fasting', 'Antacids', 'Bowel movement', 'Passing gas', 'Fetal position', 'Lying still'],
    back: ['Lying down', 'Flexion', 'Extension', 'Stretching', 'Muscle relaxants']
  }
};

// Helper to format lists naturally
const formatList = (items) => {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0].toLowerCase();
  if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`;
  return `${items.slice(0, -1).map(i => i.toLowerCase()).join(', ')}, and ${items[items.length - 1].toLowerCase()}`;
};

// Searchable Multi-Select Component
const MultiSelect = ({ options, selected, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter(opt => 
      opt.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);
  
  const noneOptions = ['None', 'Nothing specific', 'Nothing', 'N/A'];
  
  const toggleOption = (option) => {
    if (noneOptions.includes(option)) {
      onChange([option]);
    } else {
      const filtered = selected.filter(s => !noneOptions.includes(s));
      if (filtered.includes(option)) {
        onChange(filtered.filter(s => s !== option));
      } else {
        onChange([...filtered, option]);
      }
    }
    setSearch('');
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      toggleOption(filteredOptions[0]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    } else if (e.key === 'Backspace' && !search && selected.length > 0) {
      onChange(selected.slice(0, -1));
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div
        className={`min-h-[42px] p-2 border rounded-lg bg-white transition-colors flex flex-wrap gap-1 items-center cursor-text ${
          isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300 hover:border-slate-400'
        }`}
        onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
      >
        {selected.map(item => (
          <span 
            key={item} 
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
          >
            {item}
            <button
              onClick={(e) => { e.stopPropagation(); toggleOption(item); }}
              className="hover:text-blue-600"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selected.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
        />
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-slate-500 text-sm">No matches found</div>
          ) : (
            filteredOptions.map((option, idx) => (
              <div
                key={option}
                className={`px-3 py-2 cursor-pointer transition-colors text-sm ${
                  selected.includes(option) 
                    ? 'bg-blue-50 text-blue-800' 
                    : idx === 0 && search 
                      ? 'bg-slate-100' 
                      : 'hover:bg-slate-100'
                }`}
                onClick={(e) => { e.stopPropagation(); toggleOption(option); }}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => {}}
                    className="rounded text-blue-600 pointer-events-none"
                  />
                  <span>{option}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Searchable Single-Select Component
const Select = ({ options, value, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  
  const normalizedOptions = options.map(opt => 
    typeof opt === 'object' ? opt : { value: opt, label: opt }
  );
  
  const filteredOptions = useMemo(() => {
    if (!search) return normalizedOptions;
    return normalizedOptions.filter(opt => 
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [normalizedOptions, search]);
  
  const selectedOption = normalizedOptions.find(opt => opt.value === value);
  
  const handleSelect = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
    setSearch('');
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelect(filteredOptions[0].value);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    } else if (e.key === 'Backspace' && !search && value) {
      onChange('');
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div
        className={`h-[42px] px-3 border rounded-lg bg-white transition-colors flex items-center cursor-text ${
          isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300 hover:border-slate-400'
        }`}
        onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
      >
        {!isOpen && selectedOption ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm">{selectedOption.label}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selectedOption ? selectedOption.label : placeholder}
            className="w-full outline-none text-sm bg-transparent"
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-slate-500 text-sm">No matches found</div>
          ) : (
            filteredOptions.map((opt, idx) => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer transition-colors text-sm ${
                  opt.value === value 
                    ? 'bg-blue-50 text-blue-800' 
                    : idx === 0 && search 
                      ? 'bg-slate-100' 
                      : 'hover:bg-slate-100'
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const SeveritySlider = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Severity: {value ? `${value}/10 (${value <= 3 ? 'mild' : value <= 6 ? 'moderate' : value <= 8 ? 'severe' : 'very severe'})` : 'Not specified'}
    </label>
    <input
      type="range"
      min="0"
      max="10"
      value={value || 0}
      onChange={(e) => onChange(e.target.value === '0' ? null : parseInt(e.target.value))}
      className="w-full h-2 bg-gradient-to-r from-green-300 via-yellow-300 via-orange-400 to-red-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent"
    />
    <div className="flex justify-between text-xs text-slate-500 mt-1">
      <span>None</span>
      <span>Mild</span>
      <span>Moderate</span>
      <span>Severe</span>
      <span>Worst</span>
    </div>
  </div>
);

export default function PainDescriptor() {
  const [painData, setPainData] = useState({
    location: '',
    subLocation: '',
    qualities: [],
    severity: null,
    onset: '',
    duration: '',
    frequency: '',
    temporalPattern: '',
    radiation: [],
    aggravating: [],
    relieving: [],
    associated: []
  });
  
  const [copied, setCopied] = useState(false);

  const locationData = painData.location ? PAIN_DATA.locations[painData.location] : null;
  
  const aggravatingOptions = useMemo(() => {
    const general = PAIN_DATA.aggravatingFactors.general;
    const specific = PAIN_DATA.aggravatingFactors[painData.location] || [];
    return [...new Set([...specific, ...general])];
  }, [painData.location]);
  
  const relievingOptions = useMemo(() => {
    const general = PAIN_DATA.relievingFactors.general;
    const specific = PAIN_DATA.relievingFactors[painData.location] || [];
    return [...new Set([...specific, ...general])];
  }, [painData.location]);

  // Generate natural language description
  const generateDescription = () => {
    if (!painData.location) return 'Select pain characteristics above to generate description.';
    
    const parts = [];
    const painTerm = locationData?.painTerm || 'pain';
    
    // Build the main pain descriptor: "[Quality] [sublocation] [painTerm]"
    let mainDescriptor = '';
    
    // Add qualities as adjectives
    const validQualities = painData.qualities.filter(q => q !== 'None');
    if (validQualities.length > 0) {
      mainDescriptor += formatList(validQualities) + ' ';
    }
    
    // Add sublocation
    if (painData.subLocation) {
      mainDescriptor += painData.subLocation.toLowerCase() + ' ';
    }
    
    mainDescriptor += painTerm;
    
    // Capitalize first letter
    mainDescriptor = mainDescriptor.charAt(0).toUpperCase() + mainDescriptor.slice(1);
    parts.push(mainDescriptor);
    
    // Severity
    if (painData.severity) {
      const sevDesc = painData.severity <= 3 ? 'mild' : painData.severity <= 6 ? 'moderate' : painData.severity <= 8 ? 'severe' : 'very severe';
      parts.push(`${sevDesc} in intensity (${painData.severity}/10)`);
    }
    
    // Onset
    if (painData.onset) {
      const onsetData = PAIN_DATA.onsetTypes.find(o => o.value === painData.onset);
      if (onsetData) {
        parts.push(`${onsetData.value} in onset`);
      }
    }
    
    // Build timing phrase
    const timingParts = [];
    if (painData.duration) {
      timingParts.push(`lasting ${painData.duration.toLowerCase()}`);
    }
    if (painData.frequency && painData.frequency !== 'Constant') {
      timingParts.push(painData.frequency.toLowerCase() + ' in frequency');
    } else if (painData.frequency === 'Constant') {
      timingParts.push('constant');
    }
    if (timingParts.length > 0) {
      parts.push(timingParts.join(' and '));
    }
    
    // Temporal pattern
    if (painData.temporalPattern) {
      parts.push(painData.temporalPattern.toLowerCase() + ' over time');
    }
    
    // Radiation
    const validRadiation = painData.radiation.filter(r => r !== 'None' && r !== 'N/A');
    if (validRadiation.length > 0) {
      parts.push(`radiating to the ${formatList(validRadiation)}`);
    }
    
    // Aggravating factors
    const validAggravating = painData.aggravating.filter(a => a !== 'Nothing specific');
    if (validAggravating.length > 0) {
      parts.push(`aggravated by ${formatList(validAggravating)}`);
    }
    
    // Relieving factors
    const validRelieving = painData.relieving.filter(r => r !== 'Nothing');
    if (validRelieving.length > 0) {
      parts.push(`relieved by ${formatList(validRelieving)}`);
    }
    
    // Associated symptoms
    const validAssociated = painData.associated.filter(a => a !== 'None');
    if (validAssociated.length > 0) {
      parts.push(`associated with ${formatList(validAssociated)}`);
    }
    
    // Join parts with appropriate punctuation
    // First part stands alone, subsequent parts joined with commas
    if (parts.length === 1) {
      return parts[0] + '.';
    }
    
    return parts[0] + ', ' + parts.slice(1).join(', ') + '.';
  };

  const description = generateDescription();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleReset = () => {
    setPainData({
      location: '',
      subLocation: '',
      qualities: [],
      severity: null,
      onset: '',
      duration: '',
      frequency: '',
      temporalPattern: '',
      radiation: [],
      aggravating: [],
      relieving: [],
      associated: []
    });
  };

  const handleLocationChange = (newLocation) => {
    setPainData(prev => ({
      ...prev,
      location: newLocation,
      subLocation: '',
      qualities: [],
      radiation: [],
      associated: [],
      aggravating: [],
      relieving: []
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
            <h1 className="text-2xl font-bold text-white">Pain Descriptor</h1>
            <p className="text-blue-100 mt-1">Generate natural pain descriptions for clinical documentation</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Location Section */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Primary Location"
                  placeholder="Type or select body region..."
                  options={Object.entries(PAIN_DATA.locations).map(([key, val]) => ({ value: key, label: val.label }))}
                  value={painData.location}
                  onChange={handleLocationChange}
                />
                {locationData && (
                  <Select
                    label="Specific Site"
                    placeholder="Type or select specific location..."
                    options={locationData.subLocations}
                    value={painData.subLocation}
                    onChange={(v) => setPainData(prev => ({ ...prev, subLocation: v }))}
                  />
                )}
              </div>
              {locationData && (
                <MultiSelect
                  label="Radiation"
                  placeholder="Type or select radiation sites..."
                  options={locationData.radiations}
                  selected={painData.radiation}
                  onChange={(v) => setPainData(prev => ({ ...prev, radiation: v }))}
                />
              )}
            </div>
            
            {/* Character Section */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                Character & Severity
              </h2>
              {locationData ? (
                <MultiSelect
                  label="Quality/Character"
                  placeholder="Type or select pain qualities..."
                  options={locationData.qualities}
                  selected={painData.qualities}
                  onChange={(v) => setPainData(prev => ({ ...prev, qualities: v }))}
                />
              ) : (
                <p className="text-slate-500 italic">Select a location first to see relevant pain qualities</p>
              )}
              <SeveritySlider
                value={painData.severity}
                onChange={(v) => setPainData(prev => ({ ...prev, severity: v }))}
              />
            </div>
            
            {/* Timing Section */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                Timing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Onset"
                  placeholder="Type or select onset..."
                  options={PAIN_DATA.onsetTypes}
                  value={painData.onset}
                  onChange={(v) => setPainData(prev => ({ ...prev, onset: v }))}
                />
                <Select
                  label="Duration"
                  placeholder="Type or select duration..."
                  options={PAIN_DATA.durations}
                  value={painData.duration}
                  onChange={(v) => setPainData(prev => ({ ...prev, duration: v }))}
                />
                <Select
                  label="Frequency"
                  placeholder="Type or select frequency..."
                  options={PAIN_DATA.frequencies}
                  value={painData.frequency}
                  onChange={(v) => setPainData(prev => ({ ...prev, frequency: v }))}
                />
                <Select
                  label="Temporal Pattern"
                  placeholder="Type or select pattern..."
                  options={PAIN_DATA.temporalPatterns}
                  value={painData.temporalPattern}
                  onChange={(v) => setPainData(prev => ({ ...prev, temporalPattern: v }))}
                />
              </div>
            </div>
            
            {/* Modifying Factors Section */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                Modifying Factors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiSelect
                  label="Aggravating Factors"
                  placeholder="Type or select aggravating factors..."
                  options={painData.location ? aggravatingOptions : PAIN_DATA.aggravatingFactors.general}
                  selected={painData.aggravating}
                  onChange={(v) => setPainData(prev => ({ ...prev, aggravating: v }))}
                />
                <MultiSelect
                  label="Relieving Factors"
                  placeholder="Type or select relieving factors..."
                  options={painData.location ? relievingOptions : PAIN_DATA.relievingFactors.general}
                  selected={painData.relieving}
                  onChange={(v) => setPainData(prev => ({ ...prev, relieving: v }))}
                />
              </div>
            </div>
            
            {/* Associated Symptoms Section */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
                Associated Symptoms
              </h2>
              {locationData ? (
                <MultiSelect
                  label="Associated Symptoms"
                  placeholder="Type or select associated symptoms..."
                  options={locationData.associatedSymptoms}
                  selected={painData.associated}
                  onChange={(v) => setPainData(prev => ({ ...prev, associated: v }))}
                />
              ) : (
                <p className="text-slate-500 italic">Select a location first to see relevant associated symptoms</p>
              )}
            </div>
            
            {/* Output Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3">Generated Description</h2>
              <div className="bg-white rounded-lg p-4 min-h-[80px] text-slate-700 leading-relaxed border border-emerald-200">
                {description}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCopy}
                  disabled={description.startsWith('Select')}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-4 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Reset
                </button>
              </div>
            </div>
            
            {/* Quick Tips */}
            <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
              <strong>Tips:</strong> Type in any field to filter options, then press Enter to select the first match. Select a body region first to unlock location-specific qualities and symptoms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
