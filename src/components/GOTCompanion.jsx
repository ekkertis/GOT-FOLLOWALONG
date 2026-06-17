import { useState, useEffect } from "react";

const LOCATIONS = {
  winterfell:   { x: 310, y: 148, label: "Winterfell" },
  thewall:      { x: 300, y: 82,  label: "The Wall" },
  kingslanding: { x: 355, y: 390, label: "King's Landing" },
  pentos:       { x: 620, y: 310, label: "Pentos" },
  vaesdothrak:  { x: 730, y: 340, label: "Vaes Dothrak" },
  eyrie:        { x: 310, y: 305, label: "The Eyrie" },
  twins:        { x: 285, y: 265, label: "The Twins" },
  casterly:     { x: 225, y: 335, label: "Casterly Rock" },
  dothraki:     { x: 680, y: 380, label: "Dothraki Sea" },
};

const HOUSE_COLORS = {
  Stark:     { bg: "#1e2a35", accent: "#7ecee3", badge: "#2c3e50" },
  Lannister: { bg: "#2a2000", accent: "#f1c40f", badge: "#3d2f00" },
  Baratheon: { bg: "#1a1a2e", accent: "#e67e22", badge: "#2d2d44" },
  Targaryen: { bg: "#2a0000", accent: "#e74c3c", badge: "#3d0000" },
  Arryn:     { bg: "#001a2a", accent: "#85c1e9", badge: "#002a3d" },
  Frey:      { bg: "#1a1a1a", accent: "#95a5a6", badge: "#2a2a2a" },
  "—":       { bg: "#1a1a1a", accent: "#bdc3c7", badge: "#2a2a2a" },
};

const episodes = {
  1: {
    1: {
      title: "Winter Is Coming", airdate: "April 17, 2011", runtime: 62,
      synopsis: "Lord Stark is troubled by disturbing news from the Night's Watch. King Robert arrives at Winterfell seeking Ned's counsel. Across the Narrow Sea, Viserys forges a dangerous alliance.",
      spoilerFree: "The realm stirs. A great house receives an unexpected honor — and an unwanted burden. Beyond the Wall, something ancient stirs in the frozen dark.",
      funFact: "The pilot was so poorly received internally that the entire episode was reshot with a new director and recast supporting roles.",
      deathsSpoiler: ["Will (deserter)", "Gared"],
      houses: ["Stark","Lannister","Baratheon","Targaryen"],
      activeLocations: ["winterfell","thewall","kingslanding","pentos"],
      focusLocation: "winterfell",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Lord of Winterfell" },
        { name: "Catelyn Stark",      house: "Stark",     role: "Lady of Winterfell" },
        { name: "Jon Snow",           house: "Stark",     role: "Ned's bastard" },
        { name: "Arya Stark",         house: "Stark",     role: "Youngest Stark daughter" },
        { name: "Sansa Stark",        house: "Stark",     role: "Eldest Stark daughter" },
        { name: "Bran Stark",         house: "Stark",     role: "Second Stark son" },
        { name: "Robert Baratheon",   house: "Baratheon", role: "King of the Seven Kingdoms" },
        { name: "Cersei Lannister",   house: "Lannister", role: "Queen" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "Youngest Lannister" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Exiled princess" },
        { name: "Viserys Targaryen",  house: "Targaryen", role: "Exiled prince" },
      ],
    },
    2: {
      title: "The Kingsroad", airdate: "April 24, 2011", runtime: 56,
      synopsis: "Bran's accident leaves him comatose. Ned and the girls head south while Jon travels north to the Wall. Daenerys begins to find her footing as a Dothraki khaleesi.",
      spoilerFree: "The Starks scatter to the winds. Old loyalties are tested on the road south while north of the Wall, new bonds are forged.",
      funFact: "Sean Bean reportedly lobbied hard to play Ned Stark — he is a massive fan of the books.",
      deathsSpoiler: ["Lady (Sansa's direwolf)"],
      houses: ["Stark","Lannister","Baratheon","Targaryen"],
      activeLocations: ["winterfell","thewall","kingslanding","dothraki"],
      focusLocation: "kingslanding",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Heading to King's Landing" },
        { name: "Jon Snow",           house: "Stark",     role: "Heading to the Wall" },
        { name: "Sansa Stark",        house: "Stark",     role: "Riding south" },
        { name: "Arya Stark",         house: "Stark",     role: "Riding south" },
        { name: "Bran Stark",         house: "Stark",     role: "Comatose in Winterfell" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "Visiting the Wall" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Khaleesi of the Dothraki" },
        { name: "Cersei Lannister",   house: "Lannister", role: "Queen" },
        { name: "Joffrey Baratheon",  house: "Baratheon", role: "Crown Prince" },
      ],
    },
    3: {
      title: "Lord Snow", airdate: "May 1, 2011", runtime: 58,
      synopsis: "Ned arrives at King's Landing and finds a treasury emptied by Robert's extravagance. Jon struggles to fit in among the Night's Watch recruits. Daenerys begins to embrace her Dothraki role.",
      spoilerFree: "Ned finds the capital a nest of vipers. Jon finds the Wall is no place for pride. The game of thrones reveals its true players.",
      funFact: "This is the first episode to show the Iron Throne in full — built from 200 custom prop swords.",
      deathsSpoiler: [],
      houses: ["Stark","Lannister","Baratheon"],
      activeLocations: ["kingslanding","thewall","dothraki"],
      focusLocation: "kingslanding",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Hand of the King" },
        { name: "Jon Snow",           house: "Stark",     role: "Night's Watch recruit" },
        { name: "Cersei Lannister",   house: "Lannister", role: "Queen" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "At the Wall" },
        { name: "Petyr Baelish",      house: "—",         role: "Master of Coin" },
        { name: "Varys",              house: "—",         role: "Master of Whisperers" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Learning to ride" },
        { name: "Robert Baratheon",   house: "Baratheon", role: "King" },
      ],
    },
    4: {
      title: "Cripples, Bastards, and Broken Things", airdate: "May 8, 2011", runtime: 56,
      synopsis: "Ned investigates Jon Arryn's death. Tyrion visits the Wall and gifts Bran a special saddle. Viserys grows dangerously impatient.",
      spoilerFree: "Secrets lurk beneath the surface in King's Landing. At the Wall, an unlikely friendship forms. Across the sea, a queen begins to find her voice.",
      funFact: "Tyrion's line 'I have a tender spot in my heart for cripples, bastards and broken things' became one of the most quoted lines of the series.",
      deathsSpoiler: [],
      houses: ["Stark","Lannister","Baratheon","Targaryen"],
      activeLocations: ["kingslanding","thewall","winterfell","vaesdothrak"],
      focusLocation: "thewall",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Investigating Arryn's death" },
        { name: "Jon Snow",           house: "Stark",     role: "Night's Watch recruit" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "At the Wall" },
        { name: "Bran Stark",         house: "Stark",     role: "Recovering in Winterfell" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "In Vaes Dothrak" },
        { name: "Viserys Targaryen",  house: "Targaryen", role: "Growing impatient" },
        { name: "Petyr Baelish",      house: "—",         role: "Master of Coin" },
      ],
    },
    5: {
      title: "The Wolf and the Lion", airdate: "May 15, 2011", runtime: 55,
      synopsis: "Robert's party hosts a tournament while Ned investigates further. Catelyn captures Tyrion. Varys warns Ned of deadly plots.",
      spoilerFree: "The tension in King's Landing snaps. A bold move in the Vale changes everything. The Lannisters and Starks collide in the open for the first time.",
      funFact: "The Robert/Cersei conversation was largely improvised by Mark Addy and Lena Headey on the day.",
      deathsSpoiler: ["Jory Cassel","Several Gold Cloaks"],
      houses: ["Stark","Lannister","Baratheon","Arryn"],
      activeLocations: ["kingslanding","eyrie"],
      focusLocation: "kingslanding",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Hand of the King" },
        { name: "Catelyn Stark",      house: "Stark",     role: "Captures Tyrion" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "Captured on the road" },
        { name: "Robert Baratheon",   house: "Baratheon", role: "Hosting tournament" },
        { name: "Cersei Lannister",   house: "Lannister", role: "Queen" },
        { name: "Jaime Lannister",    house: "Lannister", role: "Confronts Ned" },
        { name: "Varys",              house: "—",         role: "Spymaster" },
        { name: "Petyr Baelish",      house: "—",         role: "Master of Coin" },
      ],
    },
    6: {
      title: "A Golden Crown", airdate: "May 22, 2011", runtime: 52,
      synopsis: "Ned rules as Hand while Robert hunts. Viserys reaches his breaking point. Bran rides again. Ned discovers a shocking secret about the Baratheon line.",
      spoilerFree: "Crowns come in many forms. Not all of them are golden. A prince meets his end; a queen is finally born.",
      funFact: "The golden crown scene used a wax head filled with golden sugar solution that melted convincingly under staged heat.",
      deathsSpoiler: ["Viserys Targaryen"],
      houses: ["Stark","Lannister","Targaryen","Baratheon"],
      activeLocations: ["kingslanding","vaesdothrak","eyrie","winterfell"],
      focusLocation: "vaesdothrak",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Acting Hand" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Khaleesi" },
        { name: "Viserys Targaryen",  house: "Targaryen", role: "At his breaking point" },
        { name: "Khal Drogo",         house: "—",         role: "Khal of the Dothraki" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "In the Eyrie" },
        { name: "Lysa Arryn",         house: "Arryn",     role: "Lady of the Eyrie" },
        { name: "Bran Stark",         house: "Stark",     role: "Riding again" },
      ],
    },
    7: {
      title: "You Win or You Die", airdate: "May 29, 2011", runtime: 58,
      synopsis: "Ned confronts Cersei with what he knows. Robert is fatally wounded. Jon takes his Night's Watch vows. Drogo makes a vow of his own.",
      spoilerFree: "A king falls. A Hand is outmaneuvered. The true game begins in earnest — and Ned Stark is playing by rules that no longer apply.",
      funFact: "Charles Dance appears as Tywin Lannister for the first time, skinning a stag — Robert's sigil — while speaking. Entirely deliberate symbolism.",
      deathsSpoiler: ["Robert Baratheon"],
      houses: ["Stark","Lannister","Baratheon","Targaryen"],
      activeLocations: ["kingslanding","thewall","casterly","dothraki"],
      focusLocation: "kingslanding",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Hand of the King" },
        { name: "Cersei Lannister",   house: "Lannister", role: "Queen" },
        { name: "Robert Baratheon",   house: "Baratheon", role: "King, fatally wounded" },
        { name: "Jon Snow",           house: "Stark",     role: "Takes his vows" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Khaleesi" },
        { name: "Tywin Lannister",    house: "Lannister", role: "Lord of Casterly Rock" },
        { name: "Petyr Baelish",      house: "—",         role: "Master of Coin" },
      ],
    },
    8: {
      title: "The Pointy End", airdate: "June 5, 2011", runtime: 58,
      synopsis: "The Lannisters move against the Starks. Arya escapes while Sansa is captured. Robb calls his banners. The Night's Watch encounters the undead.",
      spoilerFree: "The knives come out. The Starks are scattered and besieged. War is no longer coming — it has arrived.",
      funFact: "This episode was written by George R.R. Martin himself — one of only two GoT episodes he wrote.",
      deathsSpoiler: ["Syrio Forel (implied)","Several Stark guards","Othor (wight)"],
      houses: ["Stark","Lannister","Baratheon"],
      activeLocations: ["kingslanding","winterfell","thewall"],
      focusLocation: "kingslanding",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Imprisoned" },
        { name: "Arya Stark",         house: "Stark",     role: "Escaping King's Landing" },
        { name: "Sansa Stark",        house: "Stark",     role: "Captured" },
        { name: "Robb Stark",         house: "Stark",     role: "Calling banners" },
        { name: "Jon Snow",           house: "Stark",     role: "Battles a wight" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "With hill clans" },
        { name: "Cersei Lannister",   house: "Lannister", role: "Queen Regent" },
        { name: "Joffrey Baratheon",  house: "Baratheon", role: "King" },
      ],
    },
    9: {
      title: "Baelor", airdate: "June 12, 2011", runtime: 56,
      synopsis: "Ned is given a chance to save his life. Robb must make a costly bargain to cross the Twins. Tyrion leads the hill clans into battle. Drogo's wound festers dangerously.",
      spoilerFree: "No one is safe. The episode that changed television. Westeros does not play by story rules.",
      funFact: "Sean Bean filmed his own execution scene. The show kept it so secret that even some cast members were shocked watching the episode air.",
      deathsSpoiler: ["Eddard Stark","Khal Drogo (effectively)"],
      houses: ["Stark","Lannister","Baratheon","Frey","Targaryen"],
      activeLocations: ["kingslanding","twins","dothraki"],
      focusLocation: "kingslanding",
      characters: [
        { name: "Eddard Stark",       house: "Stark",     role: "Prisoner" },
        { name: "Arya Stark",         house: "Stark",     role: "In King's Landing" },
        { name: "Sansa Stark",        house: "Stark",     role: "Pleading for her father" },
        { name: "Robb Stark",         house: "Stark",     role: "Crossing the Twins" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "Leads into battle" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Trying to save Drogo" },
        { name: "Joffrey Baratheon",  house: "Baratheon", role: "King" },
      ],
    },
    10: {
      title: "Fire and Blood", airdate: "June 19, 2011", runtime: 53,
      synopsis: "The realm reacts to Ned's death. Robb is proclaimed King in the North. Jon faces a critical choice. Daenerys walks into fire and emerges changed forever.",
      spoilerFree: "From ash and grief, new powers rise. A king is crowned in the north. A queen is born in fire. Winter and dragons are both coming.",
      funFact: "The dragon hatching scene used baby iguanas with prosthetics as on-set stand-ins before CGI was composited in post.",
      deathsSpoiler: ["Mirri Maz Duur"],
      houses: ["Stark","Lannister","Baratheon","Targaryen"],
      activeLocations: ["kingslanding","winterfell","thewall","dothraki"],
      focusLocation: "dothraki",
      characters: [
        { name: "Arya Stark",         house: "Stark",     role: "On the run" },
        { name: "Sansa Stark",        house: "Stark",     role: "Hostage in King's Landing" },
        { name: "Robb Stark",         house: "Stark",     role: "King in the North" },
        { name: "Jon Snow",           house: "Stark",     role: "Faces a choice" },
        { name: "Daenerys Targaryen", house: "Targaryen", role: "Mother of Dragons" },
        { name: "Tyrion Lannister",   house: "Lannister", role: "New Hand of the King" },
        { name: "Joffrey Baratheon",  house: "Baratheon", role: "King" },
      ],
    },
  },
};

// ── SVG MAP ───────────────────────────────────────────────────────────────────

function WesterosMap({ activeLocations, focusLocation }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#060d18", borderRadius: 8, overflow: "hidden", border: "1px solid #1a2a3a", position: "relative" }}>
      <svg viewBox="0 0 800 520" style={{ width: "100%", display: "block" }}>
        {/* Deep ocean */}
        <rect width="800" height="520" fill="#060d18"/>
        {[...Array(20)].map((_,i) => (
          <line key={i} x1={0} y1={i*27} x2={800} y2={i*27} stroke="#0c1a2a" strokeWidth="1"/>
        ))}

        {/* WESTEROS */}
        <path d="M160,28 C205,22 290,18 345,34 C385,46 425,58 438,84
          C450,108 454,140 456,170 C458,200 456,232 448,268
          C440,298 420,325 400,352 C378,378 362,405 355,434
          C348,462 344,492 338,512
          L175,512 C168,482 164,452 161,418
          C157,378 159,342 161,308 C163,268 164,232 161,196
          C157,156 148,118 148,82 Z"
          fill="#14200d" stroke="#1f3014" strokeWidth="2"/>
        {/* Westeros texture / hills */}
        <path d="M250,120 C260,110 275,115 280,125 C285,115 300,108 308,118 C295,128 265,130 250,120Z" fill="#1a2a10" opacity="0.5"/>
        <path d="M200,280 C212,268 228,272 234,284 C240,270 258,265 265,276 C252,290 215,292 200,280Z" fill="#1a2a10" opacity="0.5"/>
        <path d="M330,200 C342,188 358,192 364,204 C340,218 318,212 330,200Z" fill="#1a2a10" opacity="0.4"/>

        {/* ESSOS */}
        <path d="M480,48 C525,38 590,33 648,42 C708,52 765,68 792,95
          C800,112 800,138 797,165 C793,198 782,232 765,262
          C748,292 722,318 692,338 C661,358 628,370 596,376
          C566,382 536,379 510,368 C484,356 465,338 455,315
          C444,290 441,262 444,237 C447,212 457,190 464,166
          C472,140 476,110 477,82 Z"
          fill="#1e1508" stroke="#2a1e0a" strokeWidth="2"/>

        {/* Narrow Sea label */}
        <text x="505" y="228" fill="#0c1e30" fontSize="12" fontStyle="italic" textAnchor="middle" letterSpacing="1">Narrow Sea</text>

        {/* Region labels — subtle */}
        <text x="295" y="165" fill="#1c3018" fontSize="9" textAnchor="middle" letterSpacing="2" fontStyle="italic">THE NORTH</text>
        <text x="305" y="320" fill="#1c3018" fontSize="8" textAnchor="middle" letterSpacing="1" fontStyle="italic">THE VALE</text>
        <text x="218" y="362" fill="#1c3018" fontSize="8" textAnchor="middle" letterSpacing="1" fontStyle="italic">WESTERLANDS</text>
        <text x="665" y="210" fill="#2a1e0e" fontSize="9" textAnchor="middle" letterSpacing="2" fontStyle="italic">ESSOS</text>

        {/* The Wall */}
        <line x1="195" y1="100" x2="420" y2="94" stroke="#4a7a9b" strokeWidth="4" strokeLinecap="round"/>
        <line x1="195" y1="100" x2="420" y2="94" stroke="#85c1e9" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.7"/>
        <text x="305" y="88" fill="#4a7a9b" fontSize="8" textAnchor="middle" letterSpacing="3">THE WALL</text>

        {/* Location pins */}
        {Object.entries(LOCATIONS).map(([key, loc]) => {
          const active = activeLocations.includes(key);
          const focus = key === focusLocation;
          if (!active && !focus) return null;
          const color = focus ? "#f1c40f" : "#7ecee3";
          const r = focus ? 8 : 6;
          const pulse = tick % 2 === 0;
          return (
            <g key={key}>
              {/* Outer pulse */}
              <circle cx={loc.x} cy={loc.y} r={r + 8 + (focus && pulse ? 3 : 0)}
                fill="none" stroke={color} strokeWidth="1" opacity={focus ? 0.25 : 0.12}/>
              {/* Mid ring */}
              <circle cx={loc.x} cy={loc.y} r={r + 4}
                fill="none" stroke={color} strokeWidth="1" opacity={focus ? 0.4 : 0.2}/>
              {/* Glow */}
              <circle cx={loc.x} cy={loc.y} r={r + 2} fill={color} opacity="0.12"/>
              {/* Pin body */}
              <circle cx={loc.x} cy={loc.y} r={r}
                fill={focus ? "#1a1400" : "#060d18"}
                stroke={color} strokeWidth={focus ? 2.5 : 1.8}/>
              {/* Inner dot */}
              <circle cx={loc.x} cy={loc.y} r={focus ? 3.5 : 2.5} fill={color}/>
              {/* Label */}
              <text x={loc.x} y={loc.y - r - 5} fill={color}
                fontSize={focus ? "10" : "8.5"} textAnchor="middle"
                fontWeight={focus ? "bold" : "normal"}>
                {loc.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(12,472)">
          <circle cx={6} cy={6} r={5} fill="#1a1400" stroke="#f1c40f" strokeWidth="2"/>
          <circle cx={6} cy={6} r={2.5} fill="#f1c40f"/>
          <text x={16} y={10} fill="#5a4a2a" fontSize="8">Episode focus</text>
          <circle cx={6} cy={22} r={4} fill="#060d18" stroke="#7ecee3" strokeWidth="1.5"/>
          <circle cx={6} cy={22} r={2} fill="#7ecee3"/>
          <text x={16} y={26} fill="#5a4a2a" fontSize="8">Active location</text>
        </g>
      </svg>
    </div>
  );
}

// ── AI CHARACTER PORTRAIT ─────────────────────────────────────────────────────

const portraitCache = {};

function Portrait({ character, autoLoad }) {
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [imgUrl, setImgUrl] = useState(null);
  const key = character.name;

  function load() {
    if (state === "loading") return;
    if (portraitCache[key]) { setImgUrl(portraitCache[key]); setState("done"); return; }
    setState("loading");
    const hc = HOUSE_COLORS[character.house] || HOUSE_COLORS["—"];
    fetch("/api/portrait", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: character.name,
        house: character.house,
        role: character.role,
        accent: hc.accent,
        badge: hc.badge,
      })
    })
    .then(r => r.ok ? r.json() : Promise.reject(new Error("request failed")))
    .then(data => {
      if (data.svg) {
        const blob = new Blob([data.svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        portraitCache[key] = url;
        setImgUrl(url);
        setState("done");
      } else {
        setState("error");
      }
    })
    .catch(() => setState("error"));
  }

  useEffect(() => { if (autoLoad) load(); }, [autoLoad, key]);

  const hc = HOUSE_COLORS[character.house] || HOUSE_COLORS["—"];
  const initials = character.name.split(" ").map(w => w[0]).join("").slice(0,2);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 88 }}>
      <div
        onClick={() => state === "idle" || state === "error" ? load() : null}
        style={{
          width: 68, height: 88, borderRadius: 6, overflow: "hidden",
          border: `2px solid ${hc.accent}50`,
          background: `linear-gradient(160deg, ${hc.bg}, #0d0d0d)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: state === "idle" || state === "error" ? "pointer" : "default",
          boxShadow: `0 0 10px ${hc.accent}15`,
          position: "relative",
        }}>
        {state === "done" && imgUrl && (
          <img src={imgUrl} alt={character.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        )}
        {state === "loading" && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${hc.accent}30`, borderTop: `2px solid ${hc.accent}`,
              animation: "spin 1s linear infinite", margin: "0 auto 3px",
            }}/>
            <div style={{ fontSize: 6, color: hc.accent, opacity: 0.7 }}>painting…</div>
          </div>
        )}
        {state === "idle" && (
          <div style={{ textAlign: "center", padding: 4 }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: hc.accent, opacity: 0.6, marginBottom: 2 }}>{initials}</div>
            <div style={{ fontSize: 7, color: hc.accent, opacity: 0.5 }}>tap for portrait</div>
          </div>
        )}
        {state === "error" && (
          <div style={{ textAlign: "center", padding: 4 }}>
            <div style={{ fontSize: 16, color: hc.accent, opacity: 0.4 }}>{initials}</div>
            <div style={{ fontSize: 6, color: "#8b2020" }}>retry</div>
          </div>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 9.5, color: "#c5b698", lineHeight: 1.35, fontWeight: "bold" }}>
          {character.name.split(" ").map((w,i) => <div key={i}>{w}</div>)}
        </div>
        {character.house !== "—" && (
          <div style={{ fontSize: 8, color: hc.accent, marginTop: 1, opacity: 0.75 }}>{character.house}</div>
        )}
        <div style={{ fontSize: 7.5, color: "#4a3a1a", marginTop: 1, fontStyle: "italic", lineHeight: 1.2 }}>{character.role}</div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

const HYPE = [
  "🐺 The North remembers.",
  "🐉 A Targaryen alone in the world is a terrible thing.",
  "⚔️ When you play the game of thrones, you win or you die.",
  "🌨️ Winter is coming. And it always keeps its promises.",
  "🦁 A Lannister always pays his debts.",
  "🔥 Dracarys.",
];

export default function GOTCompanion() {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [tab, setTab] = useState("overview");
  const [spoilers, setSpoilers] = useState(false);
  const [watched, setWatched] = useState(new Set());
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [hypeIdx, setHypeIdx] = useState(0);
  const [loadPortraits, setLoadPortraits] = useState(false);

  const ep = episodes[season]?.[episode];
  const epKey = `s${season}e${episode}`;
  const isWatched = watched.has(epKey);

  useEffect(() => {
    setTab("overview");
    setLoadPortraits(false);
    setHypeIdx(Math.floor(Math.random() * HYPE.length));
  }, [season, episode]);

  function markWatched() {
    setWatched(prev => {
      const n = new Set(prev);
      n.has(epKey) ? n.delete(epKey) : n.add(epKey);
      return n;
    });
  }

  function saveNote() {
    if (!noteInput.trim()) return;
    setNotes(prev => ({ ...prev, [epKey]: [...(prev[epKey] || []), { text: noteInput.trim(), time: new Date().toLocaleTimeString() }] }));
    setNoteInput("");
  }

  const TABS = ["overview","map","characters","notes"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0d0d 0%, #1a0a0a 50%, #0d0d1a 100%)",
      color: "#d4c5a9",
      fontFamily: "'Georgia','Times New Roman',serif",
      paddingBottom: 48,
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        select, input, button { font-family: inherit; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,#1a0000,#0d0d0d)", borderBottom: "2px solid #5a1010", padding: "18px 20px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "#7a5a14", textTransform: "uppercase", marginBottom: 5 }}>✦ Companion ✦</div>
        <h1 style={{ margin: 0, fontSize: 26, color: "#c9a84c", fontWeight: "bold", letterSpacing: 3, textShadow: "0 0 24px rgba(201,168,76,0.35)" }}>Game of Thrones</h1>
        <div style={{ fontSize: 12, color: "#5a4a2a", marginTop: 5, fontStyle: "italic" }}>{HYPE[hypeIdx]}</div>
      </div>

      <div style={{ padding: "16px 14px 0", maxWidth: 680, margin: "0 auto" }}>
        {/* Selectors */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 105 }}>
            <label style={{ fontSize: 8, color: "#7a5a14", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Season</label>
            <select value={season} onChange={e => { setSeason(Number(e.target.value)); setEpisode(1); }}
              style={{ width: "100%", background: "#1a1208", border: "1px solid #3d2b0a", color: "#d4c5a9", padding: "9px 10px", borderRadius: 4, fontSize: 13 }}>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Season {s}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 8, color: "#7a5a14", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Episode</label>
            <select value={episode} onChange={e => setEpisode(Number(e.target.value))}
              style={{ width: "100%", background: "#1a1208", border: "1px solid #3d2b0a", color: "#d4c5a9", padding: "9px 10px", borderRadius: 4, fontSize: 13 }}>
              {Object.keys(episodes[season] || {}).map(n => (
                <option key={n} value={n}>
                  Ep {n}{episodes[season]?.[Number(n)] ? `: ${episodes[season][Number(n)].title}` : ""}
                  {watched.has(`s${season}e${n}`) ? " ✓" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {ep && <>
          {/* Card */}
          <div style={{ background: "linear-gradient(135deg,#1a1208,#120d0d)", border: "1px solid #3d2b0a", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>

            {/* Ep header */}
            <div style={{ background: "linear-gradient(90deg,#2a1505,#1a0a00)", padding: "14px 16px", borderBottom: "1px solid #3d2b0a", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, color: "#7a5a14", letterSpacing: 3, textTransform: "uppercase" }}>
                  S{String(season).padStart(2,"0")} E{String(episode).padStart(2,"0")} · {ep.runtime} min · {ep.airdate}
                </div>
                <h2 style={{ margin: "4px 0 8px", fontSize: 19, color: "#c9a84c", fontWeight: "bold" }}>{ep.title}</h2>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {ep.houses.map(h => {
                    const hc = HOUSE_COLORS[h] || HOUSE_COLORS["—"];
                    return <span key={h} style={{ background: hc.badge, color: hc.accent, border: `1px solid ${hc.accent}30`, padding: "1px 8px", borderRadius: 10, fontSize: 9, fontWeight: "bold" }}>House {h}</span>;
                  })}
                </div>
              </div>
              <button onClick={markWatched} style={{
                background: isWatched ? "#1a3a1a" : "transparent",
                border: `1px solid ${isWatched ? "#2d6a2d" : "#5a1010"}`,
                color: isWatched ? "#5ab85a" : "#8b4a4a",
                padding: "6px 11px", borderRadius: 4, fontSize: 10, cursor: "pointer", flexShrink: 0,
              }}>{isWatched ? "✓ Watched" : "Mark Watched"}</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #2a1a0a" }}>
              {TABS.map(t => (
                <button key={t} onClick={() => { setTab(t); if (t === "characters") setLoadPortraits(true); }}
                  style={{
                    flex: 1, background: tab === t ? "#2a1505" : "transparent", border: "none",
                    borderBottom: tab === t ? "2px solid #8b6914" : "2px solid transparent",
                    color: tab === t ? "#c9a84c" : "#6b5c3e",
                    padding: "9px 4px", cursor: "pointer", fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
                  }}>{t}</button>
              ))}
            </div>

            <div style={{ padding: "16px" }}>

              {/* OVERVIEW */}
              {tab === "overview" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 8, color: "#6b5c3e", textTransform: "uppercase", letterSpacing: 2 }}>Summary</span>
                    <button onClick={() => setSpoilers(!spoilers)} style={{
                      background: spoilers ? "#3a1a1a" : "#1a1208",
                      border: `1px solid ${spoilers ? "#8b2020" : "#3d2b0a"}`,
                      color: spoilers ? "#e07070" : "#6b5c3e",
                      padding: "3px 10px", borderRadius: 4, fontSize: 9, cursor: "pointer",
                    }}>{spoilers ? "⚠ Spoilers ON" : "Spoiler-free"}</button>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 14px", color: "#c5b698" }}>
                    {spoilers ? ep.synopsis : ep.spoilerFree}
                  </p>
                  {spoilers && ep.deathsSpoiler.length > 0 && (
                    <div style={{ background: "#1a0808", border: "1px solid #5a1010", borderRadius: 6, padding: "12px 14px", marginBottom: 12 }}>
                      <div style={{ fontSize: 8, color: "#8b2020", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>⚔ Deaths This Episode</div>
                      {ep.deathsSpoiler.map(d => <div key={d} style={{ fontSize: 13, color: "#c08080", padding: "2px 0" }}>· {d}</div>)}
                    </div>
                  )}
                  <div style={{ background: "#0d1a0d", border: "1px solid #1a3a1a", borderRadius: 6, padding: "12px 14px" }}>
                    <div style={{ fontSize: 8, color: "#4a8b4a", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>📜 Behind the Scenes</div>
                    <p style={{ fontSize: 13, color: "#90a890", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>{ep.funFact}</p>
                  </div>
                </div>
              )}

              {/* MAP */}
              {tab === "map" && (
                <div>
                  <div style={{ fontSize: 8, color: "#6b5c3e", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Known World — Active This Episode</div>
                  <WesterosMap activeLocations={ep.activeLocations} focusLocation={ep.focusLocation}/>
                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {ep.activeLocations.map(key => {
                      const loc = LOCATIONS[key];
                      if (!loc) return null;
                      const focus = key === ep.focusLocation;
                      return (
                        <span key={key} style={{
                          background: focus ? "#1a1400" : "#060d18",
                          border: `1px solid ${focus ? "#f1c40f50" : "#1a3a4a"}`,
                          color: focus ? "#f1c40f" : "#7ecee3",
                          padding: "3px 10px", borderRadius: 10, fontSize: 11,
                        }}>{focus ? "★ " : ""}{loc.label}</span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CHARACTERS */}
              {tab === "characters" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 8, color: "#6b5c3e", textTransform: "uppercase", letterSpacing: 2 }}>Characters — AI Illustrated Portraits</div>
                    {!loadPortraits && (
                      <button onClick={() => setLoadPortraits(true)} style={{
                        background: "#2a1505", border: "1px solid #8b6914", color: "#c9a84c",
                        padding: "4px 10px", borderRadius: 4, fontSize: 9, cursor: "pointer",
                      }}>Generate All</button>
                    )}
                  </div>
                  <div style={{ fontSize: 9, color: "#3d2b0a", marginBottom: 12, fontStyle: "italic" }}>
                    {loadPortraits ? "Generating portraits via AI — each takes a moment…" : "Tap a portrait or click Generate All to paint the characters."}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                    {ep.characters.map(c => <Portrait key={c.name} character={c} autoLoad={loadPortraits}/>)}
                  </div>
                </div>
              )}

              {/* NOTES */}
              {tab === "notes" && (
                <div>
                  <div style={{ fontSize: 8, color: "#6b5c3e", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Your Reactions</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <input value={noteInput} onChange={e => setNoteInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && saveNote()}
                      placeholder="Reaction, theory, quote..."
                      style={{ flex: 1, background: "#0d0d0d", border: "1px solid #3d2b0a", color: "#d4c5a9", padding: "9px 12px", borderRadius: 4, fontSize: 13, outline: "none" }}/>
                    <button onClick={saveNote} style={{ background: "#2a1505", border: "1px solid #8b6914", color: "#c9a84c", padding: "9px 14px", borderRadius: 4, cursor: "pointer", fontSize: 13 }}>Add</button>
                  </div>
                  {(notes[epKey] || []).length === 0 ? (
                    <div style={{ fontSize: 13, color: "#3d2b0a", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>No notes yet. Jot your reactions as you watch.</div>
                  ) : (notes[epKey] || []).map((n, i) => (
                    <div key={i} style={{ background: "#0d0d0d", border: "1px solid #2a1a0a", borderRadius: 4, padding: "10px 12px", marginBottom: 8 }}>
                      <div style={{ fontSize: 13, color: "#c5b698", lineHeight: 1.5 }}>{n.text}</div>
                      <div style={{ fontSize: 9, color: "#3d2b0a", marginTop: 4 }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ padding: "12px 14px", background: "#0d0d0d", border: "1px solid #1a1208", borderRadius: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#4a3a1a", textTransform: "uppercase", letterSpacing: 2, marginBottom: 7 }}>
              <span>Season {season} Progress</span>
              <span>{[...watched].filter(k => k.startsWith(`s${season}`)).length} / {Object.keys(episodes[season] || {}).length} watched</span>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {Object.keys(episodes[season] || {}).map(n => {
                const k = `s${season}e${n}`, cur = Number(n) === episode, done = watched.has(k);
                return <div key={n} onClick={() => setEpisode(Number(n))} style={{ flex: 1, height: 5, borderRadius: 3, cursor: "pointer", background: cur ? "#c9a84c" : done ? "#4a8b4a" : "#2a1a0a", transition: "background 0.2s" }}/>;
              })}
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}
