import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { COUNTRIES } from './data/countries';


const COUNTRY_BIOS = {
  USA: {
    bio: "Known for exporting high-fructose corn syrup and superhero movies.",
    note: "Agent Note: Subject has an irrational fear of unflavored water."
  },
  CHN: {
    bio: "World leader in grand strategy games and high-speed rail enthusiasts.",
    note: "Warning: Subject's social credit score is too high to measure."
  },
  RUS: {
    bio: "Specializes in chess grandmasters and tactical winter wear.",
    note: "Dossier Detail: Subject thinks window safety is merely a suggestion."
  },
  BRA: {
    bio: "Excellent at producing coffee and football players. Strong defense against memes.",
    note: "Warning: Do not mention the 7-1 score. Ever."
  },
  GBR: {
    bio: "Empire builders turned professional queue-standers.",
    note: "Intel: Subject's power is derived entirely from lukewarm tea."
  },
  IND: {
    bio: "Master of spice-based diplomacy and zero-indexed logic.",
    note: "Status: Capable of fixing your server while making the perfect chai."
  }
};

const getCountryBio = (code) => {
  return COUNTRY_BIOS[code] || {
    bio: "Mysterious entity with unknown strategic intentions.",
    note: "Agent Note: Subject is a wildcard in the Global Graph."
  };
};

const FUNNY_NOTES = [
  "Agent last seen at Taco Bell. Intel compromised?",
  "Intercepted meme shows high levels of irony.",
  "Coffee rings on original doc. Likely a long night.",
  "Redacted: [The pizza was cold]. Highly suspicious.",
  "Subject B seen wearing socks with sandals. Critical threat.",
  "Diplomatic pouches actually contain gourmet chocolate.",
  "Code name 'Fluffy Bunny' activated.",
  "Internal memo: Stop using Comic Sans for war rooms.",
  "Found a sticky note: 'Buy milk'. Geopolitical impact TBD.",
  "Satellite shows Agent 007 is just taking a nap.",
  "Intercepted signal: Just a bird sitting on a wire. Disappointing.",
  "Top secret budget mostly spent on artisanal salt.",
  "Evidence suggests the 'secret base' is a cat cafe.",
  "Classification: ULTRA-OMEGA-BURRITO level secret."
];

const ConspiracyBoard = ({ actor1, actor2, getCountryName, linkageRef }) => {
  const boardRef = useRef(null);
  const [positions, setPositions] = useState({
    subjectA: { x: 100, y: 100 },
    subjectB: { x: 900, y: 350 },
    linkage: { x: 500, y: 150 },
    note1: { x: 380, y: 60 },
    note2: { x: 720, y: 450 },
    stain: { x: 50, y: 50 }
  });
  const [flipped, setFlipped] = useState({ subjectA: false, subjectB: false, linkage: false });

  const getFlagUrl = (code) => `https://flagcdn.com/w640/${code.toLowerCase()}.png`;

  const handleDrag = (id, info) => {
    setPositions(prev => ({
      ...prev,
      [id]: { x: prev[id].x + info.delta.x, y: prev[id].y + info.delta.y }
    }));
  };

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const randomNote1 = useMemo(() => FUNNY_NOTES[Math.floor(Math.random() * FUNNY_NOTES.length)], []);
  const randomNote2 = useMemo(() => FUNNY_NOTES[(Math.floor(Math.random() * FUNNY_NOTES.length) + 1) % FUNNY_NOTES.length], []);

  // Calculate string paths based on positions
  // We offset to hit the "thumbtack" or center areas
  const stringAtoLink = `M ${positions.subjectA.x + 140} ${positions.subjectA.y + 20} Q ${positions.linkage.x} ${positions.subjectA.y - 100} ${positions.linkage.x + 140} ${positions.linkage.y + 20}`;
  const stringLinktoB = `M ${positions.linkage.x + 140} ${positions.linkage.y + 20} Q ${positions.subjectB.x} ${positions.linkage.y + 200} ${positions.subjectB.x + 140} ${positions.subjectB.y + 20}`;

  return (
    <div className="conspiracy-board" ref={boardRef}>
      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('stain', info)}
        className="coffee-stain"
        style={{ x: positions.stain.x, y: positions.stain.y, position: 'absolute', top: 0, left: 0, rotate: 15, cursor: 'grab' }}
        whileDrag={{ scale: 1.1, zIndex: 100 }}
      />
      <div className="coffee-ring" style={{ bottom: '20%', right: '10%' }}></div>
      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('subjectA', info)}
        className="handwritten-label"
        style={{ top: positions.subjectA.y - 40, left: positions.subjectA.x, transform: 'rotate(-5deg)', cursor: 'grab' }}
        whileDrag={{ scale: 1.1, zIndex: 100 }}
      >
        SUBJECT A: {getCountryName(actor1)}
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('subjectB', info)}
        className="handwritten-label"
        style={{ top: positions.subjectB.y + 350, left: positions.subjectB.x, transform: 'rotate(4deg)', cursor: 'grab' }}
        whileDrag={{ scale: 1.1, zIndex: 100 }}
      >
        SUBJECT B: {getCountryName(actor2)}
      </motion.div>

      <svg className="string-svg">
        <motion.path
          d={stringAtoLink}
          fill="none"
          className="conspiracy-string"
          animate={{ d: stringAtoLink }}
        />
        <motion.path
          d={stringLinktoB}
          fill="none"
          className="conspiracy-string"
          opacity="0.5"
          animate={{ d: stringLinktoB }}
        />
      </svg>

      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('subjectA', info)}
        onClick={() => toggleFlip('subjectA')}
        className="polaroid-card"
        style={{ x: positions.subjectA.x, y: positions.subjectA.y, rotate: -5, position: 'absolute', top: 0, left: 0, cursor: 'grab' }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ zIndex: 100, cursor: 'grabbing' }}
        animate={{ rotateY: flipped.subjectA ? 180 : 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <div className="thumbtack tack-red"></div>
        {flipped.subjectA ? (
          <div style={{ transform: 'rotateY(180deg)', padding: '1rem', textAlign: 'center', fontFamily: 'Special Elite', fontSize: '0.9rem', color: '#3d2b1f' }}>
            <strong>SECRET BIO:</strong><br /><br />
            {getCountryBio(actor1).bio}<br /><br />
            <em>{getCountryBio(actor1).note}</em>
          </div>
        ) : (
          <>
            <div className="polaroid-img">
              <img src={getFlagUrl(actor1)} alt={actor1} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.3) contrast(1.1)' }} />
            </div>
            <div className="polaroid-caption">{getCountryName(actor1)}</div>
          </>
        )}
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('note1', info)}
        className="sticky-note sticky-yellow"
        style={{ x: positions.note1.x, y: positions.note1.y, position: 'absolute', top: 0, left: 0, cursor: 'grab' }}
        whileHover={{ rotate: 10 }}
        whileDrag={{ zIndex: 100 }}
      >
        <div className="thumbtack tack-blue"></div>
        <strong>INTEL NOTE:</strong><br />
        {randomNote1}
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('linkage', info)}
        onClick={() => toggleFlip('linkage')}
        className="polaroid-card"
        style={{ x: positions.linkage.x, y: positions.linkage.y, rotate: 8, position: 'absolute', top: 0, left: 0, zIndex: 30, cursor: 'grab' }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ zIndex: 100 }}
        animate={{ rotateY: flipped.linkage ? 180 : 0 }}
      >
        <div className="thumbtack tack-yellow"></div>
        {flipped.linkage ? (
          <div style={{ transform: 'rotateY(180deg)', padding: '1rem', textAlign: 'center', fontFamily: 'Special Elite', fontSize: '0.8rem', color: '#a30000' }}>
            <strong>INTERCEPTION LOG:</strong><br /><br />
            "0x{linkageRef}" actually refers to the number of times the intern spilled coffee on the server rack.<br /><br />
            <strong>STATUS: STICKY</strong>
          </div>
        ) : (
          <>
            <div className="polaroid-img" style={{ fontSize: '1rem', padding: '1.5rem', textAlign: 'center', background: '#f8d7da', color: '#721c24', border: '2px solid #f5c6cb', display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
              <div style={{ fontSize: '3rem' }}>📁</div>
              <div style={{ fontFamily: 'Special Elite', fontWeight: 'bold' }}>CLASSIFIED<br />INTERSECTION</div>
            </div>
            <div className="polaroid-caption">LINKAGE REF: 0x{linkageRef}</div>
          </>
        )}
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('note2', info)}
        className="sticky-note sticky-pink"
        style={{ x: positions.note2.x, y: positions.note2.y, position: 'absolute', top: 0, left: 0, cursor: 'grab' }}
        whileHover={{ rotate: -10 }}
        whileDrag={{ zIndex: 100 }}
      >
        <div className="thumbtack tack-red"></div>
        <strong>LOG ENTRY:</strong><br />
        {randomNote2}
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => handleDrag('subjectB', info)}
        onClick={() => toggleFlip('subjectB')}
        className="polaroid-card"
        style={{ x: positions.subjectB.x, y: positions.subjectB.y, rotate: -3, position: 'absolute', top: 0, left: 0, cursor: 'grab' }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ zIndex: 100 }}
        animate={{ rotateY: flipped.subjectB ? 180 : 0 }}
      >
        <div className="thumbtack tack-blue"></div>
        {flipped.subjectB ? (
          <div style={{ transform: 'rotateY(180deg)', padding: '1rem', textAlign: 'center', fontFamily: 'Special Elite', fontSize: '0.9rem', color: '#1a1a1a' }}>
            <strong>SECRET DOSSIER:</strong><br /><br />
            {getCountryBio(actor2).bio}<br /><br />
            <em>{getCountryBio(actor2).note}</em>
          </div>
        ) : (
          <>
            <div className="polaroid-img">
              <img src={getFlagUrl(actor2)} alt={actor2} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.3) contrast(1.1)' }} />
            </div>
            <div className="polaroid-caption">{getCountryName(actor2)}</div>
          </>
        )}
      </motion.div>
    </div>
  );
};

function App() {
  const [query, setQuery] = useState({ actor1: 'USA', actor2: 'CHN', date: '2024-03-01', scenario: '' });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFuturistic, setIsFuturistic] = useState(false);
  const [authorizedIds, setAuthorizedIds] = useState(new Set());

  const handleForecast = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actor1: query.actor1,
          actor2: query.actor2,
          target_date: query.date,
          scenario: query.scenario || null,
        }),
      });
      const data = await response.json();

      const metadata = {
        archiveNo: Math.floor(Math.random() * 9999),
        extractionHash: Math.random().toString(16).substring(2, 10),
        entryNo: `${new Date().getFullYear()}-ARC-${Math.floor(Math.random() * 100)}`,
        linkageRef: Math.random().toString(16).substring(2, 6).toUpperCase()
      };

      setTimeout(() => {
        setReport({ ...data, _metadata: metadata });
        setLoading(false);
        setAuthorizedIds(new Set()); // Reset on new report
      }, 1500);
    } catch (error) {
      console.error('Forecast failed:', error);
      setLoading(false);
    }
  };

  const getCountryName = (code) => {
    return COUNTRIES.find(c => c.code === code)?.name || code;
  };

  const toggleAuthorization = (id) => {
    setAuthorizedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generateDetail = (id, a1, a2) => {
    const name1 = getCountryName(a1);
    const name2 = getCountryName(a2);

    const details = {
      forecast: [
        `Plain English: Things are getting bumpy. Our sources in ${name1} and ${name2} are seeing a lot of closed-door meetings and suddenly very quiet phone lines. The gut feeling here? A big shift in how they talk to each other is coming, and it might not be polite.`,
        `The vibe on the ground between ${name1} and ${name2} is shifting from "friendly handshakes" to "checking the exit signs." We're predicting a sudden change in how they handle their borders or their money. Keep your eyes peeled for a bold public statement soon.`,
        `Our "VANTAGE" crystal ball shows the ${name1}-${name2} friendship is on thin ice. Whatever they've been arguing about in private is about to leak out into the public. Expect some geopolitical fireworks in the next few weeks.`
      ],
      reasoning: [
        `Why do we think this? Simple: we've been listening to what ${name1} *isn't* saying about ${name2}. When two nations stop talking about trade and start talking about "security" every five minutes, you know a storm is brewing.`,
        `We looked at the math, and it doesn't look great for ${name1} and ${name2}. There's an old pattern repeating itself here—every time they start moving these specific assets around, a diplomatic chill follows. It's like watching a movie we've seen before.`,
        `The big hint was a weird spike in news reports coming out of the ${name1}-${name2} corridor. Our agents noticed that the local mood has turned sour, and historically, that's the first domino to fall before a real policy change.`
      ],
      action: [
        `Field Directives: If you've got business in the ${name1}-${name2} zone, stay alert. Watch the headlines for any "accidental" border incidents or sudden trade bans. Those will be your first real warning signs that the forecast is coming true.`,
        `The smart move? Start looking for a backup plan for anything involving ${name1} and ${name2}. We recommend keeping a close watch on their digital communication channels—if the internet goes quiet, the trouble is real.`,
        `Don't just sit there. Someone needs to keep a 24/7 watch on the ${name1}-${name2} diplomatic backchannel. If they stop picking up the phone, notify the Cabinet immediately. The situation is "developing" fast.`
      ]
    };

    const seed = (a1.charCodeAt(0) + a2.charCodeAt(1)) % 3;
    return details[id][seed];
  };

  const handleExport = () => {
    window.print();
  };

  const cards = report ? [
    {
      id: 'forecast',
      title: isFuturistic ? 'PREDICTIVE VECTOR' : 'Forecast Outcome',
      meta: isFuturistic ? `NODE_ID: ${report._metadata.extractionHash}` : `RECORD NO: ${report._metadata.archiveNo}`,
      body: report.final_answer.prediction.replace(query.actor1, getCountryName(query.actor1)).replace(query.actor2, getCountryName(query.actor2)),
      detail: generateDetail('forecast', query.actor1, query.actor2)
    },
    {
      id: 'reasoning',
      title: isFuturistic ? 'LOGIC SILICON TRACE' : 'Inference Engine Monologue',
      meta: isFuturistic ? 'SUBPROCESS: NEURAL_CONSENSUS' : 'LOG TYPE: STRATEGIC REASONING',
      body: report.thought,
      detail: generateDetail('reasoning', query.actor1, query.actor2)
    },
    {
      id: 'action',
      title: isFuturistic ? 'TACTICAL DIRECTIVES' : 'Operational Guidelines',
      meta: isFuturistic ? 'PRIORITY: CRITICAL_ALPHA' : 'SENSITIVITY: PRIORITY ALPHA',
      body: report.action,
      detail: generateDetail('action', query.actor1, query.actor2)
    }
  ] : [];

  return (
    <div className={`vibe-container ${isFuturistic ? 'theme-futuristic' : 'theme-vintage'}`}>
      {/* Mode Toggle */}
      <button
        className="theme-toggle"
        onClick={() => setIsFuturistic(!isFuturistic)}
      >
        {isFuturistic ? 'REVOKE TO ARCHIVE' : 'UPGRADE TO HUD'}
      </button>

      {/* Archive Inspector Modal */}
      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <motion.div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button className="modal-close" onClick={() => setSelectedCard(null)}>&times;</button>
            <div className="card-metadata" style={{ fontSize: '1.2rem' }}>{selectedCard.meta}</div>

            {authorizedIds.has(selectedCard.id) && (
              <motion.div
                className="huge-stamp"
                initial={{ scale: 2, opacity: 0, rotate: 10 }}
                animate={{ scale: 1, opacity: 0.8, rotate: -20 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              >
                {isFuturistic ? 'DECRYPTED' : 'APPROVED'}
              </motion.div>
            )}

            <h2 className="card-title" style={{ fontSize: '3.5rem', marginTop: '1rem', borderBottom: `3px double ${isFuturistic ? 'var(--neon-cyan)' : 'var(--ink)'}`, paddingBottom: '1rem' }}>{selectedCard.title}</h2>
            <div className="card-body" style={{ fontSize: '1.25rem', marginTop: '2.5rem', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>{selectedCard.body}</p>
              <div
                className="typewriter"
                style={{
                  background: isFuturistic ? 'rgba(0, 243, 255, 0.05)' : 'rgba(0,0,0,0.04)',
                  padding: '2rem',
                  borderLeft: `6px solid ${isFuturistic ? 'var(--neon-cyan)' : 'var(--sepia)'}`,
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}
              >
                <strong style={{ color: isFuturistic ? 'var(--neon-cyan)' : 'var(--sepia)' }}>
                  {isFuturistic ? 'ENCRYPTED DATA ADDENDUM:' : 'DETAILED INTELLIGENCE ADDENDUM:'}
                </strong><br /><br />
                {selectedCard.detail}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4rem' }}>
              <button
                className="card-confidence authorized-btn"
                style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}
                onClick={() => toggleAuthorization(selectedCard.id)}
              >
                {authorizedIds.has(selectedCard.id)
                  ? (isFuturistic ? 'ACCESS REVOCATION' : 'REVOKE AUTHORIZATION')
                  : (isFuturistic ? 'AUTHORIZED CLEARANCE: LEVEL 5' : 'AUTHORIZED FOR REVIEW')
                }
              </button>
              <button className="btn-dispatch" style={{ margin: 0, padding: '0.8rem 1.5rem', fontSize: '1rem' }} onClick={handleExport}>
                🖨️ FILE IN CABINET
              </button>
            </div>
          </motion.div>
        </div>
      )}


      {/* Main Journal */}
      <div className="archive-container">
        <header className="archive-header">
          <div className="stamp">{isFuturistic ? 'CLASSIFIED HUD' : 'TOP SECRET'}</div>
          <h1 style={{ fontSize: '4.5rem', letterSpacing: '12px' }}>VANTAGE</h1>
          <p className="typewriter" style={{ marginTop: '1rem', opacity: 0.8, fontSize: '1.1rem' }}>
            {isFuturistic ? 'Global Predictive Analysis & Tactical Interface' : 'Intelligence Retrospective & Geopolitical Archive'}
          </p>
          <div className="typewriter" style={{ fontSize: '0.9rem', marginTop: '2rem', color: isFuturistic ? 'var(--neon-cyan)' : 'var(--sepia)' }}>
            {isFuturistic ? 'SESSION_ID: ' : 'ENTRY NO. '}{report?._metadata?.entryNo || (isFuturistic ? 'WAITING_FOR_UPLINK' : 'AWAITING DISPATCH')}
          </div>
        </header>

        <section className="dispatch-form">
          <div className="ledger-input-group">
            <label className="input-label">I. PRIMARY ACTOR (NATION/ENTITY)</label>
            <input
              className="input-field"
              list="actor1-list"
              value={query.actor1}
              onChange={(e) => setQuery({ ...query, actor1: e.target.value.substring(0, 3).toUpperCase() })}
              placeholder="e.g. USA"
            />
            <datalist id="actor1-list">
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </datalist>
          </div>

          <div className="ledger-input-group">
            <label className="input-label">II. SECONDARY ACTOR (INTERSECTION)</label>
            <input
              className="input-field"
              list="actor2-list"
              value={query.actor2}
              onChange={(e) => setQuery({ ...query, actor2: e.target.value.substring(0, 3).toUpperCase() })}
              placeholder="e.g. CHN"
            />
            <datalist id="actor2-list">
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </datalist>
          </div>

          <div className="ledger-input-group">
            <label className="input-label">III. TEMPORAL HORIZON (TARGET DATE)</label>
            <input
              className="input-field"
              type="date"
              value={query.date}
              onChange={(e) => setQuery({ ...query, date: e.target.value })}
            />
          </div>

          <div className="ledger-input-group" style={{ gridColumn: 'span 3' }}>
            <label className="input-label">IV. STRATEGY SIMULATOR (HYPOTHETICAL VARIABLE)</label>
            <input
              className="input-field"
              style={{ width: '100%', fontStyle: 'italic' }}
              value={query.scenario}
              onChange={(e) => setQuery({ ...query, scenario: e.target.value })}
              placeholder="e.g. A major trade deal is signed, or a diplomatic sanctions are lifted..."
            />
          </div>

          <button className="btn-dispatch" onClick={handleForecast}>
            {isFuturistic ? 'START TACTICAL ANALYSIS' : 'SUBMIT FOR DISPATCH'}
          </button>
        </section>

        {loading && (
          <div className="loading-typewriter" style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>
            {isFuturistic ? 'UPLINKING TO GLOBAL GRAPH... [ELECTRONIC HUM]' : 'CONSULTING THE GLOBAL ARCHIVES... [TYPEWRITER SFX]'}
          </div>
        )}
      </div>

      {/* Grid Results */}
      {report && !loading && (
        <>
          <div className="masonry-grid" style={{ zIndex: 10 }}>
            {cards.map(card => (
              <div className="library-card" key={card.id} onClick={() => setSelectedCard(card)}>
                <div className="card-metadata">{card.meta}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-body">
                  {card.body.length > 250 ? card.body.substring(0, 250) + '...' : card.body}
                </p>
                <div className="card-confidence">
                  {card.id === 'forecast' ? `CONFIDENCE: ${report.final_answer.confidence}` : (isFuturistic ? 'STATUS: VERIFIED' : 'STATUS: ANALYZED')}
                </div>
              </div>
            ))}

            {/* Maintenance Card */}
            <div className="library-card" style={{ borderStyle: 'dashed', background: 'transparent' }}>
              <div className="card-metadata">{isFuturistic ? 'SYSTEM_CORE' : 'SYSTEM LOG'}</div>
              <h3 className="card-title">{isFuturistic ? 'Parameters Digest' : 'Metadata Digest'}</h3>
              <p className="card-body" style={{ fontFamily: 'Special Elite', fontSize: '0.85rem', opacity: 0.7 }}>
                Query: {getCountryName(query.actor1)} / {getCountryName(query.actor2)}<br />
                Temporal: {query.date}<br />
                {query.scenario && <><span style={{ color: 'var(--red)' }}>Scenario: {query.scenario}</span><br /></>}
                Project Output: Geopolitical Predictive Intelligence Model
              </p>
              <button
                className="btn-dispatch"
                style={{ marginTop: '1.5rem', width: '100%', fontSize: '0.9rem', padding: '1rem' }}
                onClick={() => setReport(null)}
              >
                {isFuturistic ? 'PURGE_SESSION_DATA' : 'PURGE LOCAL ARCHIVE'}
              </button>
            </div>
          </div>

          <ConspiracyBoard
            actor1={query.actor1}
            actor2={query.actor2}
            getCountryName={getCountryName}
            linkageRef={report._metadata.linkageRef}
          />
        </>
      )}

      <footer>
        &copy; 1894-2026 VANTAGE PROJECT &bull; VINTAGE ARCHIVE ENVIRONMENT
      </footer>
    </div>
  );
}

export default App;
