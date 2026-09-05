export type CoatingTab = "exterior" | "interior";

export type CoatingAreaId =
  | "exterior-paint"
  | "leather"
  | "vinyl-plastic"
  | "fabric"
  | "glass"
  | "wheels"
  | "trim"
  | "headlights";

export type CoatingVehicleCategory = "Sedan" | "Small / Mid SUV" | "7-Seat SUV / Pickup" | "Minivan" | "Other";

export type InstallationPrice = Partial<Record<CoatingVehicleCategory, number>>;

export type CoatingProduct = {
  id: string;
  brand: string;
  name: string;
  areas: CoatingAreaId[];
  description: string;
  image: string;
  imageAlt: string;
  confirmedInclusions: string[];
  installationPrices: InstallationPrice;
  confirmationNote?: string;
};

export type CoatingArea = {
  id: CoatingAreaId;
  tab: CoatingTab;
  label: string;
  shortLabel: string;
  summary: string;
  available: boolean;
};

export const coatingAreas: CoatingArea[] = [
  {
    id: "exterior-paint",
    tab: "exterior",
    label: "Exterior Paint / Body",
    shortLabel: "Paint / Body",
    summary: "Compare professional coating options suitable for compatible exterior painted surfaces.",
    available: true,
  },
  {
    id: "leather",
    tab: "interior",
    label: "Leather Seats and Surfaces",
    shortLabel: "Leather",
    summary: "Protection options for compatible automotive leather, subject to an in-person material check.",
    available: true,
  },
  {
    id: "vinyl-plastic",
    tab: "interior",
    label: "Vinyl / Interior Plastic",
    shortLabel: "Vinyl / Plastic",
    summary: "A dedicated interior option for compatible vinyl and plastic surfaces.",
    available: true,
  },
  {
    id: "fabric",
    tab: "interior",
    label: "Fabric / Upholstery",
    shortLabel: "Fabric",
    summary: "Fabric protection is available by enquiry while the installed product and package details are confirmed.",
    available: true,
  },
  { id: "glass", tab: "exterior", label: "Glass", shortLabel: "Glass", summary: "Prepared for future release.", available: false },
  { id: "wheels", tab: "exterior", label: "Wheels", shortLabel: "Wheels", summary: "Prepared for future release.", available: false },
  { id: "trim", tab: "exterior", label: "Exterior Trim", shortLabel: "Trim", summary: "Prepared for future release.", available: false },
  { id: "headlights", tab: "exterior", label: "Headlights", shortLabel: "Headlights", summary: "Prepared for future release.", available: false },
];

// Installation prices are intentionally empty until the client approves a price
// for each product and vehicle category. Add confirmed dollar amounts here only.
export const coatingProducts: CoatingProduct[] = [
  {
    id: "carpro-cquartz-uk-3",
    brand: "CARPRO",
    name: "CQUARTZ UK 3.0",
    areas: ["exterior-paint"],
    description: "A professional exterior coating option for compatible painted body surfaces.",
    image: "https://static.wixstatic.com/media/988534_2ca08625596b47d48e069d3d21722783~mv2.jpg/v1/fill/w_1639,h_1619,al_c,q_90,quality_auto/988534_2ca08625596b47d48e069d3d21722783~mv2.jpg",
    imageAlt: "CARPRO CQUARTZ UK 3.0 coating packaging",
    confirmedInclusions: [],
    installationPrices: {},
  },
  {
    id: "3d-ceramic-coating",
    brand: "3D",
    name: "Ceramic Coating",
    areas: ["exterior-paint"],
    description: "A professional ceramic coating option intended for exterior vehicle protection.",
    image: "https://static.wixstatic.com/media/988534_4e88b9d12ff0456997b3b692d759cae6~mv2.png/v1/fill/w_1998,h_2002,al_c,q_95,quality_auto/988534_4e88b9d12ff0456997b3b692d759cae6~mv2.png",
    imageAlt: "3D Ceramic Coating product packaging",
    confirmedInclusions: [],
    installationPrices: {},
  },
  {
    id: "system-x-pro",
    brand: "System X",
    name: "Pro",
    areas: ["exterior-paint"],
    description: "An exterior automotive-paint coating option pending confirmation of the exact installed version.",
    image: "https://auto-brite.ca/wp-content/uploads/2026/02/Screenshot-2024-12-02-163924.png",
    imageAlt: "System X Pro Plus coating packaging",
    confirmedInclusions: [],
    installationPrices: {},
    confirmationNote: "Version confirmation required: the supplied reference currently identifies this product as System X Pro+.",
  },
  {
    id: "gtechniq-exo",
    brand: "Gtechniq",
    name: "EXO",
    areas: ["exterior-paint"],
    description: "An exterior finish coating option pending confirmation of the exact version installed by the studio.",
    image: "https://auto-brite.ca/wp-content/uploads/2026/02/Screenshot-2025-08-24-103242.png",
    imageAlt: "Gtechniq EXO coating packaging",
    confirmedInclusions: [],
    installationPrices: {},
    confirmationNote: "Version confirmation required: the supplied reference currently describes EXOv5.",
  },
  {
    id: "gyeon-leather-shield-evo",
    brand: "GYEON",
    name: "Leather Shield EVO",
    areas: ["leather"],
    description: "For compatible modern automotive leather, subject to a material and condition check before installation.",
    image: "https://static.wixstatic.com/media/988534_52d09a7360f440ae9984575d0beb61ef~mv2.png/v1/fill/w_1998,h_2002,al_c,q_95,quality_auto/988534_52d09a7360f440ae9984575d0beb61ef~mv2.png",
    imageAlt: "GYEON Leather Shield EVO product packaging",
    confirmedInclusions: [],
    installationPrices: {},
  },
  {
    id: "carpro-cquartz-leather",
    brand: "CARPRO",
    name: "CQUARTZ Leather & Vinyl Coating",
    areas: ["leather"],
    description: "A leather protection option pending confirmation of the exact product version used by the studio.",
    image: "https://static.wixstatic.com/media/988534_a260bb45bc2d4d55a1baf0d2872ffa61~mv2.jpg/v1/fill/w_1817,h_1673,al_c,q_90,quality_auto/988534_a260bb45bc2d4d55a1baf0d2872ffa61~mv2.jpg",
    imageAlt: "CARPRO CQUARTZ Leather 2.0 product packaging",
    confirmedInclusions: [],
    installationPrices: {},
    confirmationNote: "Product and surface confirmation required: the supplied reference now identifies CQUARTZ Leather 2.0 and does not confirm vinyl in its current application list.",
  },
  {
    id: "system-x-lvp",
    brand: "System X",
    name: "LVP",
    areas: ["leather", "vinyl-plastic"],
    description: "An interior coating option identified for compatible leather, vinyl, and plastic surfaces.",
    image: "https://auto-brite.ca/wp-content/uploads/2026/02/Screenshot-2024-11-26-150456.png",
    imageAlt: "System X LVP coating packaging",
    confirmedInclusions: [],
    installationPrices: {},
  },
];

export const coatingBrands = ["Gtechniq", "Auto-Brite", "System X", "CARPRO", "3D", "GYEON"];
