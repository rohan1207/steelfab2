/** @typedef {{ name: string, slug: string, image?: string }} Client */

const L = '/clients'

/** Real logos from Client Logos Drive folder (copied into public/clients). */
function client(name, slug, imageFile) {
  return imageFile
    ? { name, slug, image: `${L}/${imageFile}` }
    : { name, slug }
}

export const EXPORT_CLIENTS = {
  'Middle East': [
    client('Al Bahr Al Arabi Engineering Marine Service Co. (Saudi Arabia)', 'al-bahr-saudi', 'al-bahr-al-arabi-engineering-marine-service-co-saudi-arabia.jpg'),
    client('Quality International Co. Ltd. (UAE)', 'quality-intl-uae', 'quality-international-co-ltd-uae.png'),
    client('Ocean Oilfield (UAE)', 'ocean-oilfield-uae', 'ocean-oilfield-uae.png'),
    client('Hatco (UAE)', 'hatco-uae', 'hatco.jpg'),
    client('AZ Trading (Kuwait)', 'az-trading-kuwait'),
    client('Qatar Projects Supplies Co. (Doha, Qatar)', 'qatar-projects', 'qatar-projects-supplies-co.jpg'),
    client('ACS Flow Control (Dubai)', 'acs-flow-dubai'),
    client('Ganama Trading & Contracting Co. (Syria)', 'ganama-syria', 'ganama-trading-contracting-co-syria.jpg'),
    client('Helios Focus (Israel)', 'helios-israel'),
  ],
  Africa: [
    client('Tomorrows World Limited (Ghana)', 'tomorrows-world-ghana'),
    client('Sahara Bulk Storage Facilities Ltd. (Nigeria)', 'sahara-nigeria', 'sahara-bulk-storage-facilities-ltd-nigeria.jpg'),
    client('Star Best Nigeria (Nigeria)', 'star-best-nigeria'),
    client('Nile Bakri Aviation (Sudan)', 'nile-bakri-sudan', 'nile-bakri-aviation.jpg'),
    client('Gam Petroleum (Gambia)', 'gam-petroleum-gambia', 'gam-petroleum.jpg'),
    client('IFFCO Egypt SAE (Egypt)', 'iffco-egypt', 'iffco-egypt-sae.png'),
  ],
  'Europe & Others': [
    client('Huber S.A. (Greece)', 'huber-greece', 'huber-s-a.jpg'),
    client('Derol AG (Switzerland)', 'derol-switzerland'),
    client('CV. Mediterania (Indonesia)', 'cv-mediterania'),
    client('Pt. Global Mandira Shakti (Indonesia)', 'global-mandira'),
    client('Pt. Berkata Karunia (Indonesia)', 'berkata-karunia'),
    client('National Development Engineers (Bangladesh)', 'nde-bangladesh', 'national-development-engineers-bangladesh.png'),
    client('Khan Brothers (Bangladesh)', 'khan-brothers', 'khan-brothers-bangladesh.jpg'),
    client('Sierra Construction (Srilanka)', 'sierra-srilanka', 'sierra-construction-srilanka.jpg'),
    client('Townson Enterprises Co. Ltd. (Thailand)', 'townson-thailand', 'townson-enterprises-co-ltd-thailand.png'),
    client('Pars SazoKar Engineering Co. (Iran)', 'pars-sazokar-iran'),
    client('Green Engineered Systems, INC (California)', 'green-engineered-us', 'green-engineered-systems-inc-california.png'),
    client('AESSEAL (MCK) Ltd. (U.K. / India Operations)', 'aesseal-uk', 'aesseal-mck-ltd-u-k---india-operations.jpg'),
  ],
}

export const DOMESTIC_CLIENTS = {
  'Oil, Gas & Refinery': [
    client('Hindustan Petroleum Corporation Limited (HPCL)', 'hpcl', 'hp.png'),
    client('Indian Oil Corporation Ltd. (IOCL)', 'iocl'),
    client('Bharat Petroleum Corpn. Ltd. (BPCL)', 'bpcl'),
    client('Chennai Petroleum Corporation Ltd. (CPCL)', 'cpcl', 'cpcl.png'),
    client('Reliance Industries Ltd.', 'reliance'),
    client('GAIL India Ltd.', 'gail', 'gail-india-ltd.png'),
  ],
  'OEM Partners': [
    client('John Crane', 'john-crane', 'john-crane.png'),
    client('EagleBurgmann India Pvt. Ltd. (Pune)', 'eagleburgmann', 'eagleburgmann-india-pvt-ltd.jpg'),
    client('Flowserve Sanmar', 'flowserve-sanmar', 'flowserve-sanmar.jpg'),
    client('AESSEAL (MCK) Ltd.', 'aesseal', 'aesseal-mck-ltd-u-k---india-operations.jpg'),
    client('Honeywell', 'honeywell', 'honeywell.png'),
    client('Gilbarco', 'gilbarco', 'gilbarco.jpg'),
    client('KSB', 'ksb', 'ksb.png'),
    client('Kirloskar Brothers Ltd. (KBL)', 'kbl', 'kbl.png'),
    client('Rolon Seals (Hyderabad)', 'rolon-seals'),
    client('Leak Proof Engg. Pvt Ltd. (Mumbai)', 'leak-proof'),
    client('Standard Seals Pvt. Ltd. (Hyderabad)', 'standard-seals'),
    client('Ikon Industries (Boisar, Thane)', 'ikon-industries'),
  ],
  'Chemical & Industrial': [
    client('Deepak Fertilizers & Petrochemicals Corpn Ltd.', 'deepak-fertilizers', 'dipak-fertilizer.jpg'),
    client('Rashtriya Chemicals & Fertilizers Ltd. (RCF)', 'rcf', 'rcf.jpg'),
    client('Hindustan Zinc Ltd.', 'hindustan-zinc', 'hindustan-zinc-ltd.png'),
    client('Lubrizol India Pvt Ltd', 'lubrizol', 'lubrizol-india-pvt-ltd.jpg'),
    client('Pidilite', 'pidilite', 'pidilite.jpg'),
    client('Ganesh Benzoplast Ltd.', 'ganesh-benzoplast', 'ganesh-benzoplast-ltd.png'),
    client('Thermax Limited', 'thermax', 'thermax-limited.png'),
    client('Gujarat Fluorochemicals Ltd.', 'gujarat-fluoro'),
    client('Alkyl Amines Ltd.', 'alkyl-amines'),
    client('Praj Industries Ltd.', 'praj'),
    client('Zuari Industries Limited', 'zuari'),
    client('NALCO', 'nalco'),
    client('BHEL', 'bhel'),
    client('Walchandnagar Industries Limited', 'walchandnagar'),
  ],
}

/** Flat list of all clients that have logo files — for marquee / home strips */
export function getLogoClients() {
  const all = [...Object.values(EXPORT_CLIENTS).flat(), ...Object.values(DOMESTIC_CLIENTS).flat()]
  const seen = new Set()
  return all.filter((c) => {
    if (!c.image || seen.has(c.image)) return false
    seen.add(c.image)
    return true
  })
}

export function getClientInitials(name) {
  const clean = name.replace(/\(.*?\)/g, '').trim()
  const words = clean.split(/\s+/).filter((w) => w.length > 1 && !/^(ltd|limited|pvt|corpn|co)$/i.test(w))
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return clean.slice(0, 2).toUpperCase()
}
