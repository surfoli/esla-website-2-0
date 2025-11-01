export type Brand = {
  name: string;
  logo: string;
  url?: string;
};

export type BrandsData = {
  sponsors: Brand[];
  partners: Brand[];
  goenner: string[];
  updatedAt?: string;
};

const FALLBACK_DATA: BrandsData = {
  sponsors: [
    { name: 'MAGAS', logo: '/images/esla-sponsor-logo-magas-black-logo.png', url: 'https://magas.ch' },
    { name: 'Go Gemba', logo: '/images/esla-sponsor-logo-go-gemba.png', url: 'https://gogemba.ch' },
    { name: 'TEKO', logo: '/images/esla-sponsor-logo-teko-schweizer-fachschule.png', url: 'https://www.teko.ch/' },
    { name: 'ZK Automobile AG', logo: '/images/esla-sponsor-logo-zk-automobile-ag.png', url: 'https://zk-automobile-ag.ch/' },
  ],
  partners: [
    { name: 'Superheldenwerkstatt Flavio Räber', logo: '/images/superheldenwerkstatt-flavio-raeber-logo.png', url: 'https://www.superheldenwerkstatt.ch/' },
    { name: 'D3 Webstudio Olivier Durand', logo: '/images/d3webstudio-olivier-durand.png', url: 'https://d3webstudio.ch/' },
  ],
  goenner: [
    'Eva Marti, Winznau',
    'Familie Völlmin, Ormalingen',
    'Edi Häusler, Olten',
    'Nikola Ivanovic, Küttingen',
    'Anton Balaj, Dagmersellen',
  ],
};

function isBrandsData(data: any): data is BrandsData {
  return (
    data &&
    Array.isArray(data.sponsors) &&
    Array.isArray(data.partners) &&
    Array.isArray(data.goenner)
  );
}

export async function getBrandsData(): Promise<BrandsData> {
  const url = process.env.BRANDS_JSON_URL;
  if (!url) return FALLBACK_DATA;

  try {
    const res = await fetch(url, {
      // Revalidate every 10 minutes; adjust as needed
      next: { revalidate: 600 },
      headers: { 'accept': 'application/json' },
      // Avoid caching errors caused by GitHub aggressive caching
      // cache: 'no-store',
    });

    if (!res.ok) {
      return FALLBACK_DATA;
    }
    const json = await res.json();

    // Some repos may wrap payload under a root key
    const data = isBrandsData(json)
      ? json
      : isBrandsData(json?.data)
      ? json.data
      : null;

    if (!data) return FALLBACK_DATA;

    // Basic normalization: ensure arrays exist
    return {
      sponsors: Array.isArray(data.sponsors) ? data.sponsors : [],
      partners: Array.isArray(data.partners) ? data.partners : [],
      goenner: Array.isArray(data.goenner) ? data.goenner : [],
      updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : undefined,
    };
  } catch (e) {
    return FALLBACK_DATA;
  }
}
