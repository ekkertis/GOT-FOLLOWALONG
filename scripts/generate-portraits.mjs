// One-off generator for the static character portrait SVGs used on the
// Characters tab. Run with `node scripts/generate-portraits.mjs` whenever
// the roster below changes; output goes to public/portraits/<slug>.svg.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { slugify } from "../src/utils/slug.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/portraits");

const HOUSE_COLORS = {
  Stark:     { bg: "#1e2a35", accent: "#7ecee3", badge: "#2c3e50" },
  Lannister: { bg: "#2a2000", accent: "#f1c40f", badge: "#3d2f00" },
  Baratheon: { bg: "#1a1a2e", accent: "#e67e22", badge: "#2d2d44" },
  Targaryen: { bg: "#2a0000", accent: "#e74c3c", badge: "#3d0000" },
  Arryn:     { bg: "#001a2a", accent: "#85c1e9", badge: "#002a3d" },
  "—":       { bg: "#1a1a1a", accent: "#bdc3c7", badge: "#2a2a2a" },
};

const CHARACTERS = [
  { name: "Eddard Stark",       house: "Stark",     gender: "m", skin: "#d2a679", hair: "#2b1b12", hairStyle: "shortM",       beard: "#2b1b12", facialHair: "beard" },
  { name: "Catelyn Stark",      house: "Stark",     gender: "f", skin: "#e0b08c", hair: "#6b3a23", hairStyle: "longF" },
  { name: "Jon Snow",           house: "Stark",     gender: "m", skin: "#caa07c", hair: "#161616", hairStyle: "curlyM" },
  { name: "Arya Stark",         house: "Stark",     gender: "f", skin: "#d2a679", hair: "#2b1b12", hairStyle: "shortF" },
  { name: "Sansa Stark",        house: "Stark",     gender: "f", skin: "#e3b48d", hair: "#8a3324", hairStyle: "longF" },
  { name: "Bran Stark",         house: "Stark",     gender: "m", skin: "#e0b08c", hair: "#7a5230", hairStyle: "shortM" },
  { name: "Robb Stark",         house: "Stark",     gender: "m", skin: "#d2a679", hair: "#6b3a23", hairStyle: "shortM",       beard: "#6b3a23", facialHair: "stubble" },
  { name: "Robert Baratheon",   house: "Baratheon", gender: "m", skin: "#c08552", hair: "#5a4a42", hairStyle: "shortM",       beard: "#5a4a42", facialHair: "beard", accessory: "crown" },
  { name: "Joffrey Baratheon",  house: "Baratheon", gender: "m", skin: "#e3b48d", hair: "#d4af37", hairStyle: "shortM", accessory: "crown" },
  { name: "Cersei Lannister",   house: "Lannister", gender: "f", skin: "#e3b48d", hair: "#d4af37", hairStyle: "longF", accessory: "circlet" },
  { name: "Tyrion Lannister",   house: "Lannister", gender: "m", skin: "#d2a679", hair: "#b8945a", hairStyle: "shortM",       beard: "#b5651d", facialHair: "beard" },
  { name: "Jaime Lannister",    house: "Lannister", gender: "m", skin: "#d2a679", hair: "#d4af37", hairStyle: "shortM" },
  { name: "Tywin Lannister",    house: "Lannister", gender: "m", skin: "#caa07c", hair: "#a89968", hairStyle: "shortM",       beard: "#a89968", facialHair: "sideburns" },
  { name: "Daenerys Targaryen", house: "Targaryen", gender: "f", skin: "#e8c39e", hair: "#e8e3d3", hairStyle: "longBraidF", accessory: "circlet" },
  { name: "Viserys Targaryen",  house: "Targaryen", gender: "m", skin: "#e8c39e", hair: "#e8e3d3", hairStyle: "longM",        beard: "#e8e3d3", facialHair: "mustache" },
  { name: "Petyr Baelish",      house: "—",         gender: "m", skin: "#caa07c", hair: "#1c1c1c", hairStyle: "shortM",       beard: "#1c1c1c", facialHair: "goatee", accessory: "pin" },
  { name: "Varys",              house: "—",         gender: "m", skin: "#e0b08c", hair: "#1c1c1c", hairStyle: "bald" },
  { name: "Khal Drogo",         house: "—",         gender: "m", skin: "#8a5a35", hair: "#161616", hairStyle: "longBraidM",   beard: "#161616", facialHair: "mustache", accessory: "braidBells" },
  { name: "Lysa Arryn",         house: "Arryn",     gender: "f", skin: "#e3b48d", hair: "#a98358", hairStyle: "longF" },
];

function hairPath(style, color) {
  switch (style) {
    case "bald":
      return `<ellipse cx="55" cy="40" rx="6" ry="3" fill="#ffffff" opacity="0.08"/>`;
    case "shortM":
      return `<path d="M38,48 C38,24 82,24 82,48 C82,35 73,29 60,29 C47,29 38,35 38,48Z" fill="${color}"/>`;
    case "shortF":
      return `<path d="M36,50 C34,24 86,24 84,50 L80,68 C78,50 70,45 60,45 C50,45 42,50 40,68 Z" fill="${color}"/>`;
    case "curlyM": {
      const arc = "M38,48 C38,24 82,24 82,48 C82,35 73,29 60,29 C47,29 38,35 38,48Z";
      const curls = [40, 48, 56, 64, 72, 80]
        .map((cx) => `<circle cx="${cx}" cy="${30 + (cx % 16 === 0 ? 2 : 0)}" r="5" fill="${color}"/>`)
        .join("");
      return `<path d="${arc}" fill="${color}"/>${curls}`;
    }
    case "longF":
      return `<path d="M34,54 C30,20 90,20 86,54 L92,128 L70,122 L60,138 L50,122 L28,128 Z" fill="${color}"/>` +
        `<path d="M38,48 C38,24 82,24 82,48 C82,35 73,29 60,29 C47,29 38,35 38,48Z" fill="${color}"/>`;
    case "longBraidF":
      return `<path d="M34,54 C30,20 90,20 86,54 L90,130 L78,126 L74,98 L70,128 L60,138 L50,128 L46,98 L42,126 L30,130 Z" fill="${color}"/>` +
        `<path d="M38,48 C38,24 82,24 82,48 C82,35 73,29 60,29 C47,29 38,35 38,48Z" fill="${color}"/>` +
        `<circle cx="74" cy="100" r="2.5" fill="#c9a84c"/><circle cx="46" cy="100" r="2.5" fill="#c9a84c"/>`;
    case "longM":
      return `<path d="M36,50 C32,22 88,22 84,50 L86,90 L74,84 L60,92 L46,84 L34,90 Z" fill="${color}"/>` +
        `<path d="M38,48 C38,24 82,24 82,48 C82,35 73,29 60,29 C47,29 38,35 38,48Z" fill="${color}"/>`;
    case "longBraidM":
      return `<path d="M38,48 C38,24 82,24 82,48 C82,35 73,29 60,29 C47,29 38,35 38,48Z" fill="${color}"/>` +
        `<path d="M78,46 C84,44 88,40 86,34" stroke="${color}" stroke-width="4" fill="none"/>`;
    default:
      return "";
  }
}

function facialHairPath(style, color) {
  switch (style) {
    case "beard":
      return `<path d="M44,66 C44,82 52,93 60,93 C68,93 76,82 76,66 L72,80 C68,87 52,87 48,80 Z" fill="${color}"/>`;
    case "stubble":
      return `<path d="M44,66 C44,80 52,90 60,90 C68,90 76,80 76,66 L72,76 C68,82 52,82 48,76 Z" fill="${color}" opacity="0.45"/>`;
    case "goatee":
      return `<path d="M53,72 L67,72 L60,87 Z" fill="${color}"/>`;
    case "mustache":
      return `<path d="M51,62 Q60,67 69,62 Q60,60 51,62Z" fill="${color}"/>`;
    case "sideburns":
      return `<rect x="37" y="50" width="4" height="20" fill="${color}"/><rect x="79" y="50" width="4" height="20" fill="${color}"/>`;
    default:
      return "";
  }
}

function accessoryPath(style, accent) {
  switch (style) {
    case "crown":
      return `<path d="M44,30 L48,16 L54,28 L60,14 L66,28 L72,16 L76,30 Z" fill="#f1c40f" stroke="#a8780a" stroke-width="1"/><circle cx="60" cy="21" r="2" fill="#e74c3c"/>`;
    case "circlet":
      return `<path d="M40,38 Q60,29 80,38" stroke="${accent}" stroke-width="3" fill="none"/><circle cx="60" cy="33" r="2.5" fill="${accent}"/>`;
    case "pin":
      return `<rect x="56" y="104" width="8" height="8" fill="${accent}" transform="rotate(45 60 108)"/>`;
    case "braidBells":
      return `<line x1="84" y1="50" x2="90" y2="118" stroke="#161616" stroke-width="3"/><circle cx="90" cy="122" r="3" fill="#c9a84c"/><circle cx="90" cy="132" r="3" fill="#c9a84c"/>`;
    default:
      return "";
  }
}

function buildSvg(c) {
  const hc = HOUSE_COLORS[c.house] || HOUSE_COLORS["—"];
  const beard = c.beard || c.hair;
  const collar = c.gender === "f"
    ? `<path d="M48,98 Q60,112 72,98" stroke="${hc.accent}" stroke-width="3" fill="none"/>`
    : `<path d="M50,98 L60,106 L70,98" stroke="${hc.accent}" stroke-width="3" fill="none"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${hc.bg}"/>
      <stop offset="1" stop-color="#0d0d0d"/>
    </linearGradient>
  </defs>
  <rect width="120" height="160" fill="url(#bg)"/>
  <rect x="3" y="3" width="114" height="154" fill="none" stroke="${hc.accent}" stroke-width="2" opacity="0.55"/>
  <rect x="7" y="7" width="106" height="146" fill="none" stroke="${hc.accent}" stroke-width="0.75" opacity="0.3"/>
  <circle cx="3" cy="3" r="3" fill="${hc.accent}" opacity="0.55"/>
  <circle cx="117" cy="3" r="3" fill="${hc.accent}" opacity="0.55"/>
  <circle cx="3" cy="157" r="3" fill="${hc.accent}" opacity="0.55"/>
  <circle cx="117" cy="157" r="3" fill="${hc.accent}" opacity="0.55"/>

  <path d="${c.gender === "f" ? "M24,98 L96,98 L116,160 L4,160 Z" : "M30,98 L90,98 L106,160 L14,160 Z"}" fill="${hc.badge}"/>
  ${collar}

  ${c.hairStyle === "longF" || c.hairStyle === "longBraidF" || c.hairStyle === "longM" ? hairPath(c.hairStyle, c.hair) : ""}

  <rect x="50" y="74" width="20" height="18" fill="${c.skin}"/>
  <ellipse cx="39" cy="58" rx="3" ry="4" fill="${c.skin}"/>
  <ellipse cx="81" cy="58" rx="3" ry="4" fill="${c.skin}"/>
  <ellipse cx="60" cy="58" rx="19" ry="22" fill="${c.skin}"/>

  <ellipse cx="52" cy="55" rx="2.2" ry="3" fill="#1a1a1a"/>
  <ellipse cx="68" cy="55" rx="2.2" ry="3" fill="#1a1a1a"/>
  <path d="M47,49 q5,-3 10,0" stroke="${c.hair}" stroke-width="1.5" fill="none"/>
  <path d="M63,49 q5,-3 10,0" stroke="${c.hair}" stroke-width="1.5" fill="none"/>
  <path d="M53,66 q7,3 14,0" stroke="#3a1f14" stroke-width="1.5" fill="none"/>

  ${c.facialHair ? facialHairPath(c.facialHair, beard) : ""}

  ${c.hairStyle !== "longF" && c.hairStyle !== "longBraidF" && c.hairStyle !== "longM" ? hairPath(c.hairStyle, c.hair) : ""}

  ${c.accessory ? accessoryPath(c.accessory, hc.accent) : ""}
</svg>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const c of CHARACTERS) {
  const file = path.join(OUT_DIR, `${slugify(c.name)}.svg`);
  fs.writeFileSync(file, buildSvg(c));
}
console.log(`Generated ${CHARACTERS.length} portraits in ${OUT_DIR}`);
