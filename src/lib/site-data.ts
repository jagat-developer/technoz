import type {
  BusinessProfile,
  BookingExtraWorkGroup,
  ContentPage,
  GalleryItem,
  LocalSeoCity,
  LocalSeoPage,
  LocalSeoService,
  SeoPage,
  ServiceAddOn,
  ServiceCategory,
  ServicePackage,
  SupplierProduct,
  Testimonial,
} from "@/lib/types";

export const business: BusinessProfile = {
  name: "Techno Car Studio",
  legalName: "Techno Car Studio Ltd.",
  email: "TECHNOCARSTUDIO@gmail.com",
  phone: "+15483338897",
  phoneDisplay: "(548) 333-8897",
  address: "412 Queen Street",
  city: "Cambridge",
  region: "ON",
  postalCode: "N3C 1H1",
  country: "CA",
  instagram: "techno_car_studio",
  instagramUrl: "https://www.instagram.com/techno_car_studio/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=412%20Queen%20Street%2C%20Cambridge%2C%20ON%20N3C%201H1%2C%20Canada",
  baseUrl: "https://technocarstudio.ca",
  description:
    "Cambridge automotive studio with Techno Wheels and Tires for wheels, tires, and maintenance, plus Tint and Customs for detailing, tint, protection, and vehicle upgrades.",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Wheels & Tires", href: "/wheels-and-tires" },
  { label: "Tint & Customs", href: "/tint-and-customs" },
  { label: "About", href: "/about-us" },
  { label: "Work", href: "/our-work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

export const wheelAndTireBrands: string[] = [];

export const wheelAndTireServices = [
  {
    id: "custom-rims",
    title: "Custom Rims",
    price: "Starting at $199",
    description: "Custom rim options for your vehicle. All brands available.",
  },
  {
    id: "new-used-tires",
    title: "New / Used Tires",
    price: "Starting at $39",
    description: "New and used tire options available for different vehicles and budgets.",
  },
  {
    id: "oil-change",
    title: "Oil Change",
    price: "$69",
    description: "Oil change service for routine vehicle maintenance.",
  },
  {
    id: "rustproofing",
    title: "Rustproofing",
    price: "$79",
    description: "Rustproofing service to help protect vulnerable vehicle surfaces.",
  },
  {
    id: "brake-change",
    title: "Brake Change",
    price: "$99",
    description: "Brake change service with vehicle details confirmed before booking.",
  },
] as const;

const detailingPackageNote =
  "*Prices before tax. Packages are based on average vehicle condition; excess soiling, stains, or pet hair may require an additional fee.";

export const detailingPackages: ServicePackage[] = [
  {
    id: "express",
    slug: "express-package",
    name: "Express Package",
    eyebrow: "Basic becomes Express",
    summary: "A quick interior refresh for lightly soiled vehicles that need a cleaner cabin without exterior detailing.",
    idealFor: "Lightly soiled interiors that need vacuuming, panel wipe-down, interior glass, and basic cabin cleanup.",
    time: "1 to 1.5 hours",
    note: detailingPackageNote,
    prices: [
      { vehicle: "Sedan", price: "$49" },
      { vehicle: "Small / Mid SUV", price: "$59" },
      { vehicle: "7-Seat SUV / Pickup", price: "$69" },
      { vehicle: "Minivan", price: "$79" },
    ],
    interior: [
      "Interior vacuum for seats, carpets, mats, and trunk",
      "Dashboard, console, and door panel wipe-down",
      "Interior window and mirror cleaning",
      "Light vent and crevice dust removal",
      "Trash removal",
    ],
    expectations: [
      { label: "Time commitment", value: 35, caption: "1 to 1.5 hours" },
      { label: "Interior depth", value: 35, caption: "Quick cabin refresh" },
      { label: "Stain attention", value: 20, caption: "Upgrade for heavier soil" },
      { label: "Cabin finish", value: 35, caption: "Vacuum, wipe-down, and interior glass" },
    ],
    cta: "Book Express",
    image: "/images/interior-detailing-service.webp",
  },
  {
    id: "premium",
    slug: "premium-package",
    name: "Premium Package",
    eyebrow: "Advanced becomes Premium",
    summary: "A deeper interior cleaning package with shampoo, seat cleaning, door jamb care, and interior conditioning.",
    idealFor: "Daily drivers that need more than a quick refresh, especially carpets, mats, seats, and high-touch surfaces.",
    time: "1.5 to 2 hours",
    note: detailingPackageNote,
    prices: [
      { vehicle: "Sedan", price: "$139" },
      { vehicle: "Small / Mid SUV", price: "$149" },
      { vehicle: "7-Seat SUV / Pickup", price: "$179" },
      { vehicle: "Minivan", price: "$199" },
    ],
    interior: [
      "Everything in the Express Package",
      "Deep vacuuming of seats, carpets, and trunk",
      "Carpet and floor mat shampoo",
      "Seat cleaning for leather or fabric",
      "Door jamb cleaning",
      "Interior plastic and vinyl conditioning",
    ],
    expectations: [
      { label: "Time commitment", value: 55, caption: "1.5 to 2 hours" },
      { label: "Interior depth", value: 72, caption: "Deep vacuum, shampoo, and seat cleaning" },
      { label: "Stain attention", value: 68, caption: "Carpet and floor mat shampoo" },
      { label: "Cabin finish", value: 62, caption: "Door jambs and interior conditioning" },
    ],
    cta: "Book Premium",
    image: "/images/interior-red-mercedes-detail.jpg",
  },
  {
    id: "ultimate",
    slug: "ultimate-package",
    name: "Ultimate Package",
    eyebrow: "Diamond becomes Ultimate",
    summary: "The highest interior clean with steam disinfection, steam cleaning, odor and germ attention, stain work, and leather conditioning.",
    idealFor: "Owners who want the most complete interior-focused package with disinfection and deeper stain treatment.",
    time: "3.5 to 4.5 hours",
    note: detailingPackageNote,
    prices: [
      { vehicle: "Sedan", price: "$169" },
      { vehicle: "Small / Mid SUV", price: "$179" },
      { vehicle: "7-Seat SUV / Pickup", price: "$219" },
      { vehicle: "Minivan", price: "$249" },
    ],
    interior: [
      "Steam disinfection of interior surfaces",
      "Steam cleaning of seats, carpets, and mats",
      "Steam cleaning for odor and germ attention",
      "Deep stain and spill treatment",
      "Leather conditioning, if applicable",
    ],
    expectations: [
      { label: "Time commitment", value: 95, caption: "3.5 to 4.5 hours" },
      { label: "Interior depth", value: 95, caption: "Most complete interior package" },
      { label: "Disinfection", value: 90, caption: "Steam disinfection and germ attention" },
      { label: "Stain attention", value: 86, caption: "Deep stain and spill treatment" },
    ],
    cta: "Book Ultimate",
    image: "/images/interior-porsche-clean-cabin.jpg",
  },
];

export const exteriorWashPackages: ServicePackage[] = [
  {
    id: "express-hand-wash",
    name: "Express Hand Wash",
    eyebrow: "Exterior wash",
    summary:
      "A dedicated exterior hand wash package with simple vehicle-size pricing for customers who only need the outside cleaned.",
    idealFor: "Drivers who want a clean exterior without booking a full interior detail.",
    note:
      "Exterior wash pricing is client-provided. Clay bar treatment and iron decontamination are separate paint-surface add-ons.",
    prices: [
      { vehicle: "Sedan", price: "$49" },
      { vehicle: "SUV / Pickup", price: "$59" },
      { vehicle: "Minivan", price: "$69" },
    ],
    interior: [
      "Express exterior hand wash",
      "Vehicle-size pricing for sedan, SUV/pickup, and minivan",
      "Optional clay bar treatment available",
      "Iron decontamination can be paired with clay bar treatment after quote confirmation",
    ],
    exterior: [
      "Express hand wash",
      "Exterior-only service path",
      "Clay bar add-on available",
      "Iron decontamination details to confirm",
    ],
    expectations: [
      { label: "Wash depth", value: 48, caption: "Exterior-only hand wash" },
      { label: "Paint prep", value: 35, caption: "Base wash, with clay bar available as add-on" },
      { label: "Add-on flexibility", value: 72, caption: "Clay bar and iron decontamination options" },
    ],
    cta: "Book Exterior Wash",
    image: "/images/exterior-g-wagon-wash.jpg",
  },
];

export const exteriorWashAddOns: ServiceAddOn[] = [
  {
    name: "Clay Bar Treatment",
    price: "+$40",
    description:
      "Add clay bar treatment to the exterior hand wash for bonded surface contaminants and a smoother paint feel.",
  },
  {
    name: "Iron Decontamination",
    price: "Request a Quote",
    description:
      "Pair iron decontamination with clay bar treatment when the paint needs deeper surface cleaning. Final price and steps are confirmed after inspection.",
  },
];

export const tintPackages: ServicePackage[] = [
  {
    id: "front-side-window-tint",
    name: "Front Side Window Tint",
    eyebrow: "Window tint",
    summary: "Tint for the front side windows, with film selection and legal fitment confirmed before installation.",
    idealFor: "Drivers looking for front side window tinting.",
    prices: [{ vehicle: "Starting price", price: "$149" }],
    interior: ["Front side window tint", "Film shade and legal fitment consultation"],
    cta: "Enquire About Tint",
    image: "/images/window-tint-install.webp",
  },
  {
    id: "light-tint",
    name: "Headlight / Taillight Tint",
    eyebrow: "Light tint",
    summary: "Tint application for headlights or taillights, subject to vehicle and legal fitment review.",
    idealFor: "Drivers requesting a darker lighting appearance.",
    prices: [{ vehicle: "Starting price", price: "$199" }],
    interior: ["Headlight or taillight tint", "Vehicle-specific fitment confirmation"],
    cta: "Enquire About Light Tint",
    image: "/images/window-tint-install.webp",
  },
  {
    id: "full-window-tint",
    name: "Full Coverage Window Tint",
    eyebrow: "Window tint",
    summary: "Full coverage window tint package excluding the windshield.",
    idealFor: "Drivers seeking broader window coverage without windshield tinting.",
    prices: [{ vehicle: "Starting price", price: "$399" }],
    interior: ["Full coverage window tint", "Windshield excluded", "Film shade and legal fitment consultation"],
    cta: "Enquire About Full Tint",
    image: "/images/ceramic-window-tint.webp",
  },
];

export const ceramicCoatingPackages: ServicePackage[] = [
  {
    id: "fabric-ceramic-coating",
    name: "Fabric Ceramic Coating",
    eyebrow: "Interior protection",
    summary: "Interior protection intended for compatible fabric surfaces. Exact product, covered surfaces, benefits, and preparation are confirmed before service.",
    idealFor: "Drivers asking about protection for compatible fabric interior surfaces.",
    prices: [{ vehicle: "Price", price: "Request a Quote" }],
    interior: ["Compatible fabric surfaces", "Product and coverage confirmed before application"],
    cta: "Request a Fabric Coating Quote",
    image: "/images/interior-detailing-service.webp",
  },
  {
    id: "leather-coating",
    name: "Leather Coating",
    eyebrow: "Interior protection",
    summary: "Interior protection intended for compatible leather surfaces. Exact product, covered surfaces, benefits, and preparation are confirmed before service.",
    idealFor: "Drivers asking about protection for compatible leather interior surfaces.",
    prices: [{ vehicle: "Price", price: "Request a Quote" }],
    interior: ["Compatible leather surfaces", "Product and coverage confirmed before application"],
    cta: "Request a Leather Coating Quote",
    image: "/images/interior-porsche-clean-cabin.jpg",
  },
  {
    id: "exterior-ceramic-coating",
    name: "Exterior Ceramic Coating",
    eyebrow: "Exterior protection",
    summary: "Exterior ceramic coating for paint protection, gloss, hydrophobic performance, and easier maintenance.",
    idealFor: "Drivers seeking exterior paint protection and easier wash maintenance.",
    prices: [{ vehicle: "Starting price", price: "$299" }],
    interior: ["Exterior paint coating", "Surface preparation confirmed after inspection"],
    cta: "Enquire About Exterior Coating",
    image: "/images/premium-auto-care-bay.webp",
  },
];

const ppfPackageNote =
  "*PPF prices are starting points before tax and may change by vehicle size, panel complexity, film availability, and final fitment. Film brand, warranty, and exact installation time are confirmed before booking.";

export const ppfPackages: ServicePackage[] = [
  {
    id: "ppf-basic",
    name: "Basic PPF Package",
    eyebrow: "Entry coverage",
    summary: "Focused protection for the leading hood and fender area most exposed to road debris.",
    idealFor: "Drivers who want a lower-entry clear film option for the front paint impact zone.",
    note: ppfPackageNote,
    prices: [{ vehicle: "Starting price", price: "$400" }],
    interior: [
      "24-inch coverage up the hood",
      "24-inch coverage up the front fenders",
      "Clear urethane film protection",
      "Final pattern, edge wrap, warranty, and film brand to confirm",
    ],
    expectations: [
      { label: "Coverage", value: 28, caption: "Hood and fender leading edge" },
      { label: "Paint prep", value: 42, caption: "Vehicle condition reviewed first" },
      { label: "Quote certainty", value: 68, caption: "Starting quote range" },
    ],
    cta: "Ask About Basic PPF",
    image: "/images/paint-protection-film-install.webp",
  },
  {
    id: "ppf-partial-front",
    name: "Partial Front Package",
    eyebrow: "Front impact coverage",
    summary: "A stronger front-end package for daily drivers that need bumper, mirror, hood, and fender impact protection.",
    idealFor: "Highway commuters and owners who want front-end protection without wrapping the full hood and fenders.",
    note: ppfPackageNote,
    prices: [{ vehicle: "Starting price", price: "$1,050" }],
    interior: [
      "24-inch hood and front fender coverage",
      "Full wrap front bumper",
      "Side mirror coverage",
      "One-step paint correction review before film",
      "Flexible film layer; final product line confirmed during booking",
    ],
    expectations: [
      { label: "Coverage", value: 58, caption: "Front bumper plus partial hood and fenders" },
      { label: "Paint prep", value: 64, caption: "One-step correction review" },
      { label: "Daily protection", value: 76, caption: "Road debris and front-end impact zones" },
    ],
    cta: "Ask About Partial Front",
    image: "/images/paint-protection-film-install.webp",
  },
  {
    id: "ppf-full-front",
    name: "Full Front Package",
    eyebrow: "Full front protection",
    summary: "Expanded front-end PPF coverage for owners who want the hood, fenders, bumper, and mirrors protected.",
    idealFor: "Newer vehicles, premium paint, and drivers who want fewer visible film transition lines on front panels.",
    note: ppfPackageNote,
    prices: [{ vehicle: "Starting price", price: "$1,750" }],
    interior: [
      "Full wrap hood and front fenders",
      "Full wrap front bumper",
      "Side mirror coverage",
      "One-step paint correction review before film",
      "Flexible film layer; final product line confirmed during booking",
    ],
    expectations: [
      { label: "Coverage", value: 76, caption: "Full front panel focus" },
      { label: "Paint prep", value: 68, caption: "One-step correction review" },
      { label: "Visual finish", value: 78, caption: "Reduced front-panel transition lines" },
    ],
    cta: "Ask About Full Front",
    image: "/images/paint-protection-film-install.webp",
  },
  {
    id: "ppf-full-wrap",
    name: "Full Wrap Package",
    eyebrow: "Maximum paint coverage",
    summary: "A full-body PPF package for exposed painted surfaces and high-value paint preservation.",
    idealFor: "Owners who want the most complete paint protection film path for premium, new, or enthusiast vehicles.",
    note: ppfPackageNote,
    prices: [{ vehicle: "Starting price", price: "$4,550" }],
    interior: [
      "Every exposed painted surface",
      "Two-step paint correction review before film",
      "Correction timing depends on the vehicle condition",
      "Flexible film layer; final product line confirmed during booking",
    ],
    expectations: [
      { label: "Coverage", value: 96, caption: "Every exposed painted surface" },
      { label: "Paint prep", value: 90, caption: "Two-step correction review" },
      { label: "Protection depth", value: 94, caption: "Maximum PPF coverage path" },
    ],
    cta: "Ask About Full Wrap",
    image: "/images/paint-protection-film-install.webp",
  },
];

export const ppfAddOns: ServiceAddOn[] = [
  {
    name: "Lighting Film Areas",
    price: "Quote",
    description: "Optional PPF coverage can be quoted for headlights and rear lights when the vehicle pattern allows.",
  },
  {
    name: "Door Edge & Cup Protection",
    price: "Quote",
    description: "Door edges and door cups can be quoted for daily-use scratch protection around handles and entry points.",
  },
  {
    name: "Rear Bumper Strip",
    price: "Quote",
    description: "Rear bumper luggage-area protection can be quoted for vehicles that need cargo loading protection.",
  },
];

export const bookingExtraWorkGroups: BookingExtraWorkGroup[] = [
  {
    title: "Detailing condition",
    options: [
      {
        label: "Pet hair / heavy soiling",
        value: "Pet hair / heavy soiling",
        description: "Flag extra cleanup time for carpets, seats, or cargo areas.",
      },
      {
        label: "Stain or spill treatment",
        value: "Stain or spill treatment",
        description: "Request focused attention for visible stains or spills.",
      },
      {
        label: "Odor / germ treatment",
        value: "Odor / germ treatment",
        description: "Add odor attention or deeper sanitizing discussion.",
      },
      {
        label: "Steam disinfection",
        value: "Steam disinfection",
        description: "Add steam disinfection to the requested service path.",
      },
    ],
  },
  {
    title: "Exterior and protection",
    options: [
      ...exteriorWashAddOns.map((item) => ({
        label: `${item.name} (${item.price})`,
        value: `${item.name} (${item.price})`,
        description: item.description,
      })),
      {
        label: "Ceramic coating quote",
        value: "Ceramic coating quote",
        description: "Ask for interior or exterior coating recommendations.",
      },
      {
        label: "Window tint quote",
        value: "Window tint quote",
        description: "Ask about tint shade, legal fitment, and coverage options.",
      },
      ...ppfAddOns.map((item) => ({
        label: `${item.name} (${item.price})`,
        value: `${item.name} (${item.price})`,
        description: item.description,
      })),
    ],
  },
  {
    title: "Accessory add-ons",
    options: [
      {
        label: "Dashcam hardwire",
        value: "Dashcam hardwire",
        description: "Add clean wiring or parking-mode install discussion.",
      },
      {
        label: "CarPlay / Android Auto",
        value: "CarPlay / Android Auto",
        description: "Ask for screen, compatibility, and install options.",
      },
      {
        label: "Remote starter",
        value: "Remote starter",
        description: "Request vehicle-specific remote starter pricing.",
      },
      {
        label: "Audio / subwoofer",
        value: "Audio / subwoofer",
        description: "Add audio upgrade or subwoofer installation interest.",
      },
      {
        label: "Ambient / starlight / underglow lighting",
        value: "Ambient / starlight / underglow lighting",
        description: "Ask about cabin, headliner, or exterior lighting installs.",
      },
    ],
  },
];

export const accessoryPackages: ServicePackage[] = [
  {
    id: "supplier-dashcam-retail",
    name: "Dashcam Retail Products",
    eyebrow: "Dashcam",
    summary: "Selected supplier retail dashcams and hardwire accessories with visible Yodha catalog prices.",
    idealFor: "Drivers comparing product-only dashcam, hardwire, and cable options before installation.",
    prices: [
      { vehicle: "REDTIGER ACC Hardwire Kit", price: "C$29.99" },
      { vehicle: "YODHA X35 4K + 1080P + 1080P", price: "C$139.99" },
      { vehicle: "REDTIGER F7NP 4K + 1080P: 128GB", price: "C$159.99" },
      { vehicle: "YODHA M8 4K + 1080P + 1080P + GPS + ADAS", price: "C$189.99" },
    ],
    interior: ["Selected retail product pricing from Yodha", "Product-only and accessory options", "Install fitment confirmed before booking"],
    expectations: [
      { label: "Camera coverage", value: 82, caption: "2-channel and 3-channel options" },
      { label: "Retail clarity", value: 92, caption: "Supplier prices from Yodha" },
      { label: "Install planning", value: 55, caption: "Vehicle fitment confirmed during booking" },
    ],
    cta: "Ask About Dashcams",
    image: "/images/yodha-x35-dashcam.jpg",
  },
  {
    id: "supplier-installation-bundles",
    name: "Installation Bundles",
    eyebrow: "Installed accessories",
    summary: "Supplier-listed installation bundle retail prices for dashcams and audio upgrades, with photo cards shown where images are available.",
    idealFor: "Drivers who want the product and installation path priced together before booking.",
    prices: [
      { vehicle: "YODHA X35 Installation", price: "C$189.99" },
      { vehicle: "YODHA M8 Installation", price: "C$249.99" },
      { vehicle: "YODHA X3P Installation", price: "C$279.99" },
      { vehicle: "Azdome M350 Installation SPECIAL", price: "C$440.00" },
      { vehicle: "Subwoofer Installation Bundle", price: "C$500.00" },
    ],
    interior: [
      "Supplier installation bundle pricing",
      "Azdome M350 listed as text pricing because no product image is available",
      "Clean routing and fitment planning",
      "Warranty and exact install time to confirm",
    ],
    expectations: [
      { label: "Install complexity", value: 82, caption: "Dashcam and audio bundle options" },
      { label: "Retail clarity", value: 88, caption: "Bundle prices from Yodha" },
      { label: "Feature depth", value: 86, caption: "4K, GPS, ADAS, and audio options" },
    ],
    cta: "Plan My Install",
    image: "/images/yodha-subwoofer-installation.jpg",
  },
  {
    id: "supplier-lighting",
    name: "Lighting Accessories",
    eyebrow: "Ambient, starlight, underglow",
    summary: "Selected supplier retail lighting kits for cabin ambience, starlight headliners, and exterior underglow.",
    idealFor: "Drivers who want a visual interior or exterior lighting upgrade with retail pricing visible up front.",
    prices: [
      { vehicle: "Exterior Car Underglow LED Strip Lights", price: "C$54.99" },
      { vehicle: "YODHA 10PC Ambient Lightning Kit", price: "C$99.99" },
      { vehicle: "650 Starlight Twinkle Headliner Kit", price: "C$189.99" },
      { vehicle: "1000 Starlight Twinkle Headliner Kit", price: "C$289.99" },
    ],
    interior: ["Ambient lighting kit options", "Starlight headliner kit options", "Underglow kit option", "Install requirements confirmed by vehicle"],
    expectations: [
      { label: "Visual impact", value: 90, caption: "Cabin, headliner, and exterior lighting" },
      { label: "Retail clarity", value: 92, caption: "Sale prices from Yodha" },
      { label: "Install planning", value: 78, caption: "Vehicle layout confirmed before install" },
    ],
    cta: "Ask About Lighting",
    image: "/images/yodha-22pc-ambient-lighting.webp",
  },
];

export const supplierProducts: SupplierProduct[] = [
  {
    id: "redtiger-f7np",
    name: "REDTIGER F7NP 4K+1080P: 128GB",
    category: "Dashcams",
    price: "C$159.99",
    image: "/images/yodha-redtiger-f7np-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/REDTIGER-F7NP-4K-1080P-128GB-p824671839",
    badges: ["Retail product", "128GB"],
    details: ["4K + 1080P camera setup", "Supplier retail price from Yodha", "Installation quoted after vehicle fitment check"],
  },
  {
    id: "redtiger-f17",
    name: "REDTIGER F17 4K+1080P+1080P: 64GB",
    category: "Dashcams",
    price: "C$219.00",
    image: "/images/yodha-redtiger-f17-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/REDRTIGER-F17-4K-1080P-1080P-64GB-p824697548",
    badges: ["Retail product", "64GB"],
    details: ["4K + 1080P + 1080P coverage", "64GB retail dashcam option", "Installation quoted after vehicle fitment check"],
  },
  {
    id: "redtiger-f17-elite",
    name: "REDTIGER F17 Elite 4K+1080P+2.5K: 128GB",
    category: "Dashcams",
    price: "C$389.99",
    image: "/images/yodha-redtiger-f17-elite-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/REDTIGER-F17-Elite-4K-1080P-2-5K-128GB-p824710260",
    badges: ["Retail product", "128GB"],
    details: ["4K + 1080P + 2.5K coverage", "Highest listed REDTIGER retail dashcam", "Installation quoted after vehicle fitment check"],
  },
  {
    id: "redtiger-acc-hardwire",
    name: "REDTIGER Dashcam ACC Hardwire Kit",
    category: "Dashcams",
    price: "C$29.99",
    image: "/images/yodha-redtiger-acc-hardwire-kit.jpg",
    sourceUrl: "https://yodha.ca/products/REDTIGER-Dashcam-ACC-Hardwire-Kit-p824712510",
    badges: ["Hardwire accessory"],
    details: ["ACC hardwire kit", "Supplier retail price from Yodha", "Compatibility confirmed before install"],
  },
  {
    id: "redtiger-obd-hardwire",
    name: "REDTIGER Dashcam OBD Hardwire Cable",
    category: "Dashcams",
    price: "C$29.99",
    image: "/images/yodha-redtiger-obd-hardwire-cable.jpg",
    sourceUrl: "https://yodha.ca/products/REDTIGER-Dashcam-OBD-Hardwire-Cable-p824710270",
    badges: ["Hardwire accessory"],
    details: ["OBD hardwire cable", "Supplier retail price from Yodha", "Compatibility confirmed before install"],
  },
  {
    id: "yodha-x35",
    name: "YODHA X35 4K+1080P+1080P",
    category: "Dashcams",
    price: "C$139.99",
    compareAtPrice: "C$199.99",
    status: "In stock",
    image: "/images/yodha-x35-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/YODHA-X35-4K-1080P-1080P-p826169073",
    badges: ["On sale", "3-channel"],
    details: ["4K + 1080P + 1080P coverage", "Sale retail price from Yodha", "Product-only price; installation bundle listed separately"],
  },
  {
    id: "yodha-x3p",
    name: "YODHA X3P 4K+1080P+1080P",
    category: "Dashcams",
    price: "C$219.99",
    compareAtPrice: "C$399.99",
    status: "In stock",
    image: "/images/yodha-x3p-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/YODHA-X3P-4K-1080P-1080P-p826209506",
    badges: ["On sale", "3-channel"],
    details: ["4K + 1080P + 1080P coverage", "Sale retail price from Yodha", "Product-only price; installation bundle listed separately"],
  },
  {
    id: "yodha-m8",
    name: "YODHA M8: 4K+1080P+1080P+GPS+ADAS 64GB",
    category: "Dashcams",
    price: "C$189.99",
    compareAtPrice: "C$399.99",
    status: "In stock",
    image: "/images/yodha-m8-dashcam.webp",
    sourceUrl: "https://yodha.ca/products/YODHA-M8-4K-1080P-1080P-GPS-ADAS-64GB-p826928656",
    badges: ["On sale", "GPS + ADAS"],
    details: ["4K + 1080P + 1080P coverage", "GPS and ADAS listed by supplier", "Product-only price; installation bundle listed separately"],
  },
  {
    id: "yodha-x35-install",
    name: "YODHA X35 4K+1080P+1080P Installation",
    category: "Installation Bundles",
    price: "C$189.99",
    compareAtPrice: "C$299.99",
    image: "/images/yodha-x35-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/YODHA-X35-4K-1080P-1080P-Installation-p828024630",
    badges: ["On sale", "Installation bundle"],
    details: ["Supplier-listed installed X35 bundle", "Sale retail price from Yodha", "Confirm vehicle-specific routing before booking"],
  },
  {
    id: "yodha-x3p-install",
    name: "YODHA X3P 4K+1080P+1080P Installation",
    category: "Installation Bundles",
    price: "C$279.99",
    compareAtPrice: "C$399.99",
    image: "/images/yodha-x3p-dashcam.jpg",
    sourceUrl: "https://yodha.ca/products/YODHA-X3P-4K-1080P-1080P-Installation-p828024631",
    badges: ["On sale", "Installation bundle"],
    details: ["Supplier-listed installed X3P bundle", "Sale retail price from Yodha", "Confirm vehicle-specific routing before booking"],
  },
  {
    id: "yodha-m8-install",
    name: "YODHA M8: 4K+1080P+1080P+GPS+ADAS 64GB Installation",
    category: "Installation Bundles",
    price: "C$249.99",
    compareAtPrice: "C$399.99",
    image: "/images/yodha-m8-dashcam.webp",
    sourceUrl: "https://yodha.ca/products/YODHA-M8-4K-1080P-1080P-GPS-ADAS-64GB-Installation-p828228011",
    badges: ["On sale", "Installation bundle"],
    details: ["Supplier-listed installed M8 bundle", "GPS and ADAS listed by supplier", "Confirm vehicle-specific routing before booking"],
  },
  {
    id: "subwoofer-install",
    name: "Subwoofer Installation Bundle",
    category: "Installation Bundles",
    price: "C$500.00",
    image: "/images/yodha-subwoofer-installation.jpg",
    sourceUrl: "https://yodha.ca/products/Subwoofer-Installation-Bundle-p840532575",
    badges: ["Audio bundle"],
    details: ["Supplier-listed audio installation bundle", "Retail price from Yodha", "Vehicle audio fitment confirmed before booking"],
  },
  {
    id: "ambient-10pc",
    name: "YODHA 10PC Ambient Lightning Kit",
    category: "Lighting",
    price: "C$99.99",
    compareAtPrice: "C$199.99",
    image: "/images/yodha-10pc-ambient-lighting.webp",
    sourceUrl: "https://yodha.ca/products/YODHA-10PC-Ambient-Lightning-Kit-p825644976",
    badges: ["On sale", "Ambient lighting"],
    details: ["10-piece ambient lighting kit", "Sale retail price from Yodha", "Install layout confirmed by vehicle"],
  },
  {
    id: "ambient-18pc",
    name: "YODHA 18PC Ambient Lightning Kit",
    category: "Lighting",
    price: "C$149.99",
    compareAtPrice: "C$249.99",
    image: "/images/yodha-18pc-ambient-lighting.webp",
    sourceUrl: "https://yodha.ca/products/YODHA-18PC-Ambient-Lightning-Kit-p825883904",
    badges: ["On sale", "Ambient lighting"],
    details: ["18-piece ambient lighting kit", "Sale retail price from Yodha", "Install layout confirmed by vehicle"],
  },
  {
    id: "ambient-22pc",
    name: "YODHA 22PC Ambient Lightning Kit",
    category: "Lighting",
    price: "C$189.99",
    compareAtPrice: "C$289.99",
    image: "/images/yodha-22pc-ambient-lighting.webp",
    sourceUrl: "https://yodha.ca/products/YODHA-22PC-Ambient-Lightning-Kit-p825909509",
    badges: ["On sale", "Ambient lighting"],
    details: ["22-piece ambient lighting kit", "Sale retail price from Yodha", "Install layout confirmed by vehicle"],
  },
  {
    id: "ambient-26pc",
    name: "YODHA 26PC Ambient Lightning Kit",
    category: "Lighting",
    price: "C$219.99",
    compareAtPrice: "C$399.99",
    image: "/images/yodha-26pc-ambient-lighting.webp",
    sourceUrl: "https://yodha.ca/products/YODHA-26PC-Ambient-Lightning-Kit-p825909510",
    badges: ["On sale", "Ambient lighting"],
    details: ["26-piece ambient lighting kit", "Sale retail price from Yodha", "Install layout confirmed by vehicle"],
  },
  {
    id: "starlight-650",
    name: "650 Starlight Twinkle Headliner Kit (2 Year Warranty)",
    category: "Lighting",
    price: "C$189.99",
    compareAtPrice: "C$269.99",
    image: "/images/yodha-650-starlight-headliner.jpg",
    sourceUrl: "https://yodha.ca/products/650-Starlight-Twinkle-Headliner-Kit-2-Year-Warranty-p825957220",
    badges: ["On sale", "2 year warranty"],
    details: ["650 starlight twinkle headliner kit", "Warranty term shown in supplier title", "Install layout confirmed by vehicle"],
  },
  {
    id: "starlight-1000",
    name: "1000 Starlight Twinkle Headliner Kit (2 Year Warranty)",
    category: "Lighting",
    price: "C$289.99",
    compareAtPrice: "C$499.99",
    image: "/images/yodha-1000-starlight-headliner.jpg",
    sourceUrl: "https://yodha.ca/products/1000-Starlight-Twinkle-Headliner-Kit-2-Year-Warranty-p825957239",
    badges: ["On sale", "2 year warranty"],
    details: ["1000 starlight twinkle headliner kit", "Warranty term shown in supplier title", "Install layout confirmed by vehicle"],
  },
  {
    id: "starlight-1000-shooting",
    name: "1000 Starlight Twinkle + 240 Shooting Stars Headliner Kit (2 Year Warranty)",
    category: "Lighting",
    price: "C$359.99",
    compareAtPrice: "C$599.99",
    image: "/images/yodha-1000-240-shooting-stars-headliner.jpg",
    sourceUrl: "https://yodha.ca/products/1000-Starlight-Twinkle-240-Shooting-Stars-Headliner-Kit-2-Year-Warranty-p827443445",
    badges: ["On sale", "Shooting stars"],
    details: ["1000 starlight twinkle + 240 shooting stars kit", "Warranty term shown in supplier title", "Install layout confirmed by vehicle"],
  },
  {
    id: "underglow",
    name: "Exterior Car Underglow LED Strip Lights, 16 Million Colors",
    category: "Lighting",
    price: "C$54.99",
    compareAtPrice: "C$79.99",
    image: "/images/yodha-underglow-led-strip-lights.jpg",
    sourceUrl: "https://yodha.ca/products/Exterior-Car-Underglow-LED-Strip-Lights-16-Million-Colors-p825979501",
    badges: ["On sale", "16 million colors"],
    details: ["Exterior underglow LED strip lights", "Sale retail price from Yodha", "Install layout confirmed by vehicle"],
  },
];

export const services: ServiceCategory[] = [
  {
    id: "detailing",
    title: "Interior Detailing",
    shortTitle: "Detailing",
    summary:
      "Interior-only detailing packages for cabin restoration, including vacuuming, shampooing, panel cleaning, steam disinfection, glass cleaning, and conditioning.",
    startingAt: "$49",
    time: "1 to 4.5 hours",
    image: "/images/interior-red-mercedes-detail.jpg",
    benefits: [
      "Interior package pricing by vehicle type",
      "Vacuuming, shampooing, panel cleaning, steam disinfection, glass cleaning, and conditioning",
      "Kitchener-Waterloo service for daily drivers, family vehicles, pickups, and vans",
    ],
    process: [
      "Inspect vehicle condition and select the right interior package",
      "Clean interior surfaces, fabrics, mats, panels, and glass",
      "Apply package-specific shampooing, steam disinfection, leather cleaning, and conditioning",
      "Review final finish before pickup",
    ],
    packages: detailingPackages,
  },
  {
    id: "exterior-wash",
    title: "Exterior Hand Wash",
    shortTitle: "Exterior Wash",
    summary:
      "Express exterior hand wash for sedan, SUV/pickup, and minivan customers, with clay bar treatment and iron decontamination add-ons available.",
    startingAt: "$49",
    image: "/images/exterior-g-wagon-wash.jpg",
    benefits: [
      "Sedan exterior hand wash for $49",
      "SUV/pickup exterior hand wash for $59",
      "Minivan exterior hand wash for $69",
      "Clay bar treatment available for +$40",
      "Iron decontamination quoted after inspection",
    ],
    process: [
      "Confirm vehicle type and exterior condition",
      "Complete the Express exterior hand wash",
      "Add clay bar treatment when requested",
      "Quote-confirm iron decontamination when deeper paint-surface cleaning is needed",
    ],
    packages: exteriorWashPackages,
  },
  {
    id: "window-tint",
    title: "Window Tint",
    shortTitle: "Tinting",
    summary:
      "Premium window tinting for privacy, heat reduction, UV protection, glare control, and a sharper vehicle profile.",
    startingAt: "$149",
    image: "/images/ceramic-window-tint.webp",
    benefits: [
      "Front side window tinting from $149",
      "Headlight and taillight tinting from $199",
      "Full coverage window tinting from $399, excluding windshield",
      "Film shade and legal fitment consultation before installation",
    ],
    process: [
      "Consultation and film selection",
      "Professional installation with careful edge and glass preparation",
      "Quality assurance inspection",
      "Aftercare instructions for tint longevity",
    ],
    packages: tintPackages,
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    shortTitle: "Ceramic Coating",
    summary:
      "Gloss-focused ceramic coating for paint protection, easier maintenance, hydrophobic performance, and long-lasting shine.",
    startingAt: "$149",
    image: "/images/premium-auto-care-bay.webp",
    benefits: [
      "Interior coating from $149",
      "Exterior coating from $299",
      "UV, oxidation, contaminant, and environmental protection",
      "High-gloss finish with easier wash maintenance",
    ],
    process: [
      "Wash and surface decontamination",
      "Paint correction where required",
      "Professional coating application",
      "Curing and final quality inspection",
    ],
    packages: ceramicCoatingPackages,
  },
  {
    id: "ppf",
    title: "Paint Protection Film",
    shortTitle: "PPF",
    summary:
      "Clear paint protection film coverage packages for front-end impact zones, exposed painted surfaces, and high-value paint preservation.",
    startingAt: "$400",
    image: "/images/paint-protection-film-install.webp",
    benefits: [
      "Basic PPF package starts at $400",
      "Partial Front package starts at $1,050",
      "Full Front package starts at $1,750",
      "Full Wrap package starts at $4,550",
      "Final film brand, warranty, pattern, and fitment confirmed during booking",
    ],
    process: [
      "Select the right coverage area for the vehicle and driving habits",
      "Inspect paint condition and confirm correction needs before film",
      "Prepare the surface and apply clear paint protection film",
      "Inspect edges, wrapped areas, and aftercare details before handoff",
    ],
    packages: ppfPackages,
    ctaHref: "/paint-protection-film",
    ctaLabel: "View PPF Packages",
  },
  {
    id: "accessories",
    title: "Audio, Video & Accessories",
    shortTitle: "Accessories",
    summary:
      "Supplier catalog pricing for dashcams, hardwire accessories, installation bundles, ambient lighting, starlight kits, underglow, and audio upgrades.",
    startingAt: "C$29.99",
    image: "/images/yodha-x35-dashcam.jpg",
    benefits: [
      "REDTIGER hardwire accessories from C$29.99",
      "YODHA X35 dashcam retail from C$139.99",
      "YODHA X35 installation bundle from C$189.99",
      "Azdome M350 installation special listed at C$440.00 as text-only pricing",
      "Lighting kits from C$54.99",
      "Remote starter installation for all-season comfort",
    ],
    process: [
      "Confirm vehicle compatibility",
      "Select accessory, camera, screen, or audio setup",
      "Perform clean installation and cable routing",
      "Test feature operation before handoff",
    ],
    packages: accessoryPackages,
  },
];

export const localSeoCities: LocalSeoCity[] = [
  {
    name: "Cambridge",
    slug: "cambridge",
    region: "ON",
    serviceArea: "Cambridge, Galt, Hespeler, Preston, and nearby neighbourhoods",
    localContext:
      "Our studio is located at 412 Queen Street in Cambridge and serves drivers across Galt, Hespeler, Preston, and the surrounding Waterloo Region.",
  },
  {
    name: "Kitchener",
    slug: "kitchener",
    region: "ON",
    serviceArea: "Kitchener, Downtown Kitchener, Victoria Park, Forest Heights, and nearby neighbourhoods",
    localContext:
      "Kitchener customers are served from our Cambridge studio at 412 Queen Street. Share your vehicle and preferred service before travelling so the team can confirm timing and availability.",
  },
  {
    name: "Waterloo",
    slug: "waterloo",
    region: "ON",
    serviceArea: "Waterloo, Uptown Waterloo, University District, Beechwood, and nearby neighbourhoods",
    localContext:
      "Waterloo customers are served from our Cambridge studio at 412 Queen Street. Booking ahead lets the team confirm the right service, vehicle fitment, and appointment window.",
  },
];

export const localSeoServices: LocalSeoService[] = [
  {
    id: "detailing",
    slug: "car-detailing",
    label: "Car Detailing",
    keyword: "car detailing",
    headline: "Interior detailing packages plus exterior hand wash options for daily drivers, family vehicles, pickups, and vans.",
    summary:
      "Choose Express, Premium, or Ultimate interior detailing, or book an Express exterior hand wash with optional clay bar treatment.",
    sourceFact: "Interior Express starts at $49, Premium starts at $139, Ultimate starts at $169, and exterior hand wash starts at $49.",
    conversionAngle: "Best for drivers comparing clear detailing packages before booking.",
    startingAt: "$49",
    time: "1 to 4.5 hours",
    image: "/images/interior-red-mercedes-detail.jpg",
    proofPoints: [
      "Interior package pricing by vehicle type",
      "Interior vacuuming, shampooing, glass cleaning, and panel care",
      "Exterior hand wash pricing for sedan, SUV/pickup, and minivan",
      "Clay bar treatment add-on for +$40",
      "Customer feedback mentions vehicles returning clean enough to feel new",
    ],
  },
  {
    id: "exterior-wash",
    slug: "exterior-car-wash",
    label: "Exterior Car Wash",
    keyword: "exterior car wash",
    headline: "Exterior hand wash pricing with clay bar and iron decontamination add-ons.",
    summary:
      "Book an Express exterior hand wash by vehicle type, then add clay bar treatment or ask about iron decontamination when paint needs deeper surface prep.",
    sourceFact: "Express exterior hand wash is $49 for sedans, $59 for SUV/pickup, and $69 for minivans. Clay bar treatment is +$40.",
    conversionAngle: "Best for drivers who want the outside cleaned without booking a full interior detail.",
    startingAt: "$49",
    image: "/images/exterior-g-wagon-wash.jpg",
    proofPoints: [
      "Sedan exterior hand wash for $49",
      "SUV/pickup exterior hand wash for $59",
      "Minivan exterior hand wash for $69",
      "Clay bar treatment add-on for +$40",
      "Iron decontamination quoted after inspection",
    ],
  },
  {
    id: "window-tint",
    slug: "window-tint",
    label: "Window Tint",
    keyword: "window tint",
    headline: "Privacy, heat control, UV protection, glare reduction, and a sharper vehicle profile.",
    summary:
      "Window tint options include front side tint, headlight and taillight tint, and full coverage tint excluding the windshield.",
    sourceFact: "Front side window tint starts at $149 and full coverage tint starts at $399.",
    conversionAngle: "Best for car owners comparing tint fitment, shade, finish, and legal comfort.",
    startingAt: "$149",
    image: "/images/ceramic-window-tint.webp",
    proofPoints: [
      "Front side tinting from $149",
      "Headlight and taillight tinting from $199",
      "Full coverage tinting from $399, excluding windshield",
      "Customer feedback highlights professional tint work and reasonable pricing",
    ],
  },
  {
    id: "ceramic-coating",
    slug: "ceramic-coating",
    label: "Ceramic Coating",
    keyword: "ceramic coating",
    headline: "Gloss-focused protection for easier maintenance and a cleaner finish between washes.",
    summary:
      "Ceramic coating is positioned for paint protection, hydrophobic performance, UV resistance, and long-lasting shine.",
    sourceFact: "Interior coating starts at $149 and exterior coating starts at $299.",
    conversionAngle: "Best for drivers who want a glossier vehicle with easier wash maintenance.",
    startingAt: "$149",
    image: "/images/premium-auto-care-bay.webp",
    proofPoints: [
      "Interior ceramic coating from $149",
      "Exterior ceramic coating from $299",
      "Built around gloss, UV protection, and easier cleaning",
      "Paint correction and warranty confirmed during booking",
    ],
  },
  {
    id: "ppf",
    slug: "paint-protection-film",
    label: "Paint Protection Film",
    keyword: "paint protection film",
    headline: "Clear film coverage packages for high-impact paint areas and premium daily-driven vehicles.",
    summary:
      "PPF package options include Basic, Partial Front, Full Front, and Full Wrap coverage paths with starting prices.",
    sourceFact:
      "PPF package pricing starts at $400 for Basic, $1,050 for Partial Front, $1,750 for Full Front, and $4,550 for Full Wrap. Tax, film brand, warranty, fitment, and final availability are confirmed during booking.",
    conversionAngle: "Best for new vehicles, highway commuters, and owners protecting higher-value paint.",
    startingAt: "$400",
    image: "/images/paint-protection-film-install.webp",
    proofPoints: [
      "Basic PPF package from $400 for 24-inch hood and fender coverage",
      "Partial Front package from $1,050 with bumper, mirrors, and partial hood/fender coverage",
      "Full Front package from $1,750 with full hood, fenders, bumper, and mirrors",
      "Full Wrap package from $4,550 for exposed painted surfaces",
      "Optional headlights, rear lights, door edges, door cups, and rear bumper strip can be quoted",
    ],
  },
  {
    id: "dashcam",
    slug: "dashcam-installation",
    label: "Dashcam Installation",
    keyword: "dashcam installation",
    headline: "Discreet dashcam, hardwire accessory, 4K camera, GPS, ADAS, and installation bundle options.",
    summary:
      "Dashcam options use Yodha catalog pricing, including product-only prices and installation bundle pricing where listed.",
    sourceFact:
      "Yodha lists REDTIGER hardwire accessories at C$29.99, YODHA X35 at C$139.99, YODHA M8 at C$189.99, X35 installation at C$189.99, and Azdome M350 Installation SPECIAL at C$440.00.",
    conversionAngle: "Best for drivers who want security, incident recording, and cleaner cable routing.",
    startingAt: "C$189.99",
    image: "/images/yodha-x35-dashcam.jpg",
    proofPoints: [
      "Hardwire accessories from C$29.99",
      "YODHA X35 product-only price at C$139.99",
      "YODHA M8 product-only price at C$189.99 with GPS and ADAS listed",
      "Installation bundle prices from the supplier catalog, including Azdome M350 text-only pricing",
    ],
  },
  {
    id: "audio",
    slug: "car-audio-installation",
    label: "Car Audio Installation",
    keyword: "car audio installation",
    headline: "Audio and video accessories for a cleaner, more connected drive.",
    summary:
      "Audio and video accessories now include supplier-listed installation bundle pricing where available.",
    sourceFact: "Yodha lists a Subwoofer Installation Bundle at C$500.00.",
    conversionAngle: "Best for owners upgrading sound, screens, connectivity, and accessory fitment.",
    startingAt: "C$500.00",
    image: "/images/yodha-subwoofer-installation.jpg",
    proofPoints: [
      "Subwoofer installation bundle listed at C$500.00",
      "Vehicle compatibility should be checked before quoting",
      "Clean installation and testing are positioned as part of the process",
      "Additional audio/video package timing and warranty confirmed during booking",
    ],
  },
  {
    id: "carplay",
    slug: "carplay-installation",
    label: "CarPlay Installation",
    keyword: "CarPlay installation",
    headline: "Apple CarPlay and Android Auto screen options for a more modern cabin.",
    summary:
      "CarPlay remains part of the accessory offer, but the supplier catalog currently gives stronger confirmed pricing for dashcams, lighting, and audio bundles.",
    sourceFact: "CarPlay recommendations are quoted after confirming the vehicle, screen option, install path, and warranty.",
    conversionAngle: "Best for drivers who want maps, calls, media, and camera support in one cleaner cabin setup.",
    image: "/images/yodha-x35-dashcam.jpg",
    proofPoints: [
      "CarPlay remains a client-listed service category",
      "Pairs naturally with dashcam and accessory installation requests",
      "Vehicle compatibility should be confirmed before booking",
      "Exact CarPlay model, price, install timing, and warranty confirmed during booking",
    ],
  },
  {
    id: "remote-starter",
    slug: "remote-starter-installation",
    label: "Remote Starter Installation",
    keyword: "remote starter installation",
    headline: "Remote starter service for all-season comfort and everyday convenience.",
    summary:
      "Remote starter installation is available as an accessory service, with exact pricing, vehicle fitment, warranty, and install timing confirmed during booking.",
    sourceFact: "Remote starter installation is available as a vehicle-specific accessory service.",
    conversionAngle: "Best for owners who want their vehicle ready before hot summers and cold Ontario mornings.",
    image: "/images/premium-auto-care-bay.webp",
    proofPoints: [
      "Remote starter service category confirmed",
      "Vehicle compatibility should be checked before quoting",
      "Useful for Ontario winter and summer comfort",
      "Exact package pricing, timing, and warranty confirmed during booking",
    ],
  },
];

export const localSeoPages: LocalSeoPage[] = localSeoServices.flatMap((service) =>
  localSeoCities.map((city) => {
    const slug = `${service.slug}-${city.slug}`;
    const path = `/${slug}`;
    const title = `${service.label} ${city.name}, ON${service.startingAt ? ` | From ${service.startingAt}` : " | Techno Car Studio"}`;
    const priceCopy = service.startingAt ? ` starting at ${service.startingAt}` : " with quote-based recommendations";

    return {
      slug,
      path,
      city,
      service,
      seo: {
        slug,
        path,
        title,
        description: `${service.label} for ${city.name} drivers${priceCopy}, provided from Techno Car Studio at 412 Queen Street in Cambridge. Compare options and request a booking.`,
        keywords: [
          `${service.keyword} ${city.name}`,
          `${service.keyword} ${city.region}`,
          `Techno Car Studio ${city.name}`,
          `${service.label} near me`,
          `${service.keyword} KWC`,
        ],
        image: service.image,
        priority: city.slug === "cambridge" ? 0.82 : 0.62,
      },
    };
  }),
);

export const memberships = [
  {
    name: "Basic Cleaning",
    label: "Essential Care",
    price: "$35",
    features: ["Exterior hand wash", "Interior quick clean", "Full in/out service"],
  },
  {
    name: "Premium Membership",
    label: "Advanced Protection",
    price: "$60",
    features: ["Exterior hand wash", "Interior quick clean", "Full in/out service"],
  },
  {
    name: "Elite Membership",
    label: "Ultimate Experience",
    price: "$120",
    features: ["Exterior hand wash", "Interior quick clean", "Full in/out service"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Tejeshwar Partap",
    service: "Window tint",
    quote:
      "Just got my windows tinted, and the work done was top-notch. They were professional, and the finish looks flawless.",
  },
  {
    name: "Jaspreet Singh",
    service: "Detailing",
    quote:
      "Got my car detailed and it was very dirty, but they cleaned it just like new. Very good service and recommended.",
  },
  {
    name: "Sumit Dhadwal",
    service: "Tinting",
    quote:
      "They did a great job with window tint and the price was reasonable. Had a great experience.",
  },
  {
    name: "Zeshaun Hasan",
    service: "Tinting",
    quote:
      "They did a wonderful job tinting my vehicle. Service was fast and friendly, and I would return for another vehicle.",
  },
  {
    name: "Savan Virdiya",
    service: "Window tint",
    quote:
      "The best place for window tinting in the KWC area. Affordable, excellent quality, and highly recommended.",
  },
];

const sourceGallery: GalleryItem[] = Array.from({ length: 12 }, (_, index) => {
  const number = index + 17;

  return {
    src: `/images/gallery-work-${number}.webp`,
    alt: `Techno Car Studio completed automotive service gallery image ${index + 1}`,
    service: index % 3 === 0 ? "Tinting" : index % 3 === 1 ? "Detailing" : "Protection",
  };
});

export const gallery: GalleryItem[] = [
  {
    src: "/images/studio-red-car-hero.jpg",
    alt: "Red coupe inside Techno Car Studio under premium lighting",
    service: "Studio Work",
  },
  {
    src: "/images/exterior-g-wagon-wash.jpg",
    alt: "Black SUV exterior at Techno Car Studio for hand wash service",
    service: "Exterior Wash",
  },
  {
    src: "/images/interior-red-mercedes-detail.jpg",
    alt: "Clean red Mercedes interior after Techno Car Studio interior detailing",
    service: "Interior Detail",
  },
  {
    src: "/images/interior-porsche-clean-cabin.jpg",
    alt: "Clean Porsche cabin after Techno Car Studio interior detailing",
    service: "Interior Detail",
  },
  ...sourceGallery,
];

export const clientQuestions = [
  "PPF film brand, installer authorization, warranty, final package names, and whether XPEL ULTIMATE PLUS, HALO Flexible Film, and self-healing claims can be published.",
  "Tint film brands or grades, package durations, warranty, and whether prices vary by vehicle type.",
  "Ceramic coating duration, coating lifespan, paint correction inclusion, warranty, and vehicle-size pricing.",
  "Iron decontamination price, exact included steps, and whether it always requires clay bar treatment.",
  "Supplier product inventory and sale prices if the Yodha catalog changes.",
  "Azdome M350 Installation SPECIAL is listed at C$440.00 on Yodha and is shown as text-only pricing until a product image is available.",
  "Dashcam, lighting, audio, and CarPlay install time, warranty, and vehicle compatibility.",
  "Remote starter and CarPlay package pricing.",
  "Whether membership pricing is monthly, per visit, or package-based.",
];

const corePageSeo: SeoPage[] = [
  {
    slug: "home",
    path: "/",
    title: "Techno Car Studio | Car Detailing, Tint & Ceramic Coating in Cambridge",
    description:
      "Premium interior detailing, exterior hand wash, window tint, ceramic coating, PPF, dashcam, remote starter, audio, and CarPlay installation in Kitchener-Waterloo-Cambridge.",
    keywords: [
      "car detailing Kitchener",
      "exterior car wash Kitchener",
      "window tint Kitchener",
      "ceramic coating Kitchener",
      "dashcam installation Kitchener",
    ],
    image: "/images/studio-red-car-hero.jpg",
    priority: 1,
  },
  {
    slug: "servicing-pricing",
    path: "/servicing-pricing",
    title: "Servicing & Pricing | Techno Car Studio Cambridge",
    description:
      "Compare Techno Car Studio interior detailing packages, exterior hand wash pricing, tinting, ceramic coating, dashcam, remote starter, audio, and CarPlay services.",
    keywords: ["car detailing Kitchener pricing", "exterior car wash Kitchener", "window tint Waterloo", "ceramic coating Cambridge"],
    image: "/images/exterior-g-wagon-wash.jpg",
    priority: 0.95,
  },
  {
    slug: "express-package",
    path: "/express-package",
    title: "Express Detailing Package | Techno Car Studio",
    description:
      "Express interior detailing from $49 with vacuuming, interior wipe-down, interior glass cleaning, and a 1 to 1.5 hour estimated service time.",
    keywords: ["express interior detailing Kitchener", "quick car detail KWC"],
    image: "/images/interior-detailing-service.webp",
    priority: 0.8,
  },
  {
    slug: "premium-package",
    path: "/premium-package",
    title: "Premium Detailing Package | Techno Car Studio",
    description:
      "Premium interior detailing from $139 with deep vacuuming, carpet and mat shampoo, seat cleaning, door jamb cleaning, and conditioning.",
    keywords: ["premium car detailing Kitchener", "interior shampoo Kitchener"],
    image: "/images/interior-red-mercedes-detail.jpg",
    priority: 0.8,
  },
  {
    slug: "ultimate-package",
    path: "/ultimate-package",
    title: "Ultimate Detailing Package | Techno Car Studio",
    description:
      "Ultimate interior detailing from $169 with steam disinfection, steam cleaning, odor and germ attention, stain treatment, and leather conditioning.",
    keywords: ["ultimate interior detailing Kitchener", "car interior cleaning KWC"],
    image: "/images/interior-porsche-clean-cabin.jpg",
    priority: 0.8,
  },
  {
    slug: "dashcam",
    path: "/dashcam",
    title: "Dashcam Installation | Techno Car Studio Cambridge",
    description:
      "Supplier-backed dashcam, hardwire, installation bundle, ambient lighting, starlight, underglow, and audio retail pricing for KWC drivers.",
    keywords: ["dashcam installation Kitchener", "YODHA dashcam Kitchener", "ambient lighting installation Waterloo"],
    image: "/images/yodha-x35-dashcam.jpg",
    priority: 0.75,
  },
  {
    slug: "paint-protection-film",
    path: "/paint-protection-film",
    title: "Paint Protection Film Packages | Techno Car Studio Cambridge",
    description:
      "Compare Techno Car Studio PPF coverage packages from $400, including Basic, Partial Front, Full Front, Full Wrap, and optional film coverage areas.",
    keywords: [
      "paint protection film Kitchener",
      "PPF Kitchener",
      "clear bra Kitchener",
      "paint protection film Waterloo",
    ],
    image: "/images/paint-protection-film-install.webp",
    priority: 0.82,
  },
  {
    slug: "about-us",
    path: "/about-us",
    title: "About Techno Car Studio | Premium Car Care in Cambridge",
    description:
      "Meet Techno Car Studio, a Cambridge automotive studio focused on detailing, tinting, ceramic coating, accessories, and precision service.",
    keywords: ["Techno Car Studio Kitchener", "auto detailing studio KWC"],
    image: "/images/premium-auto-care-bay.webp",
    priority: 0.7,
  },
  {
    slug: "our-work",
    path: "/our-work",
    title: "Our Work | Techno Car Studio Gallery",
    description:
      "Browse Techno Car Studio work across detailing, tinting, protection, accessories, and premium vehicle care.",
    keywords: ["car detailing gallery Kitchener", "window tint work KWC"],
    image: "/images/gallery-work-17.webp",
    priority: 0.7,
  },
  {
    slug: "membership",
    path: "/membership",
    title: "Membership Plans | Techno Car Studio",
    description:
      "Explore Techno Car Studio membership benefits, priority scheduling, exclusive discounts, VIP treatment, and repeat car-care tiers.",
    keywords: ["car care membership Kitchener", "detailing membership KWC"],
    image: "/images/garage-hero-detailing.webp",
    priority: 0.65,
  },
  {
    slug: "contact-us",
    path: "/contact-us",
    title: "Contact & Booking | Techno Car Studio Cambridge",
    description:
      "Book automotive detailing, tint, ceramic coating, PPF, dashcam, remote starter, audio, or CarPlay service at Techno Car Studio.",
    keywords: ["book car detailing Kitchener", "Techno Car Studio phone"],
    image: "/images/window-tint-install.webp",
    priority: 0.85,
  },
];

export const pageSeo: SeoPage[] = [...corePageSeo, ...localSeoPages.map((page) => page.seo)];

const seoBySlug = new Map(pageSeo.map((page) => [page.slug, page]));

export const contentPages: ContentPage[] = [
  {
    slug: "about-us",
    eyebrow: "About Techno Car Studio",
    title: "Precision car care with premium studio discipline.",
    summary:
      "Techno Car Studio combines advanced techniques, careful workmanship, and automotive passion to keep KWC vehicles looking sharp, protected, and enjoyable to drive.",
    heroImage: "/images/premium-auto-care-bay.webp",
    body: [
      "Techno Car Studio is positioned as a premium Cambridge automotive studio for drivers who want careful workmanship, clear service options, and a sharper vehicle finish.",
      "From detailing and tinting to ceramic coating, PPF, dashcam, remote starter, audio accessories, and CarPlay installations, the studio is built around high-quality work, attentive service, and practical upgrades that make every drive feel better.",
    ],
    sections: [
      {
        title: "What guides the work",
        body: "Every service should leave the vehicle cleaner, better protected, easier to maintain, or more comfortable to use.",
        points: ["Advanced techniques", "Exceptional quality", "Attention to detail", "Personalized service"],
      },
      {
        title: "Why drivers choose the studio",
        body: "Customer feedback consistently mentions professional tinting, reasonable pricing, friendly service, and vehicles returning with a like-new clean.",
        points: ["Showroom-ready detailing", "Fast and friendly tint service", "KWC-area customer trust", "Clear package options"],
      },
    ],
    seo: seoBySlug.get("about-us")!,
  },
  {
    slug: "our-work",
    eyebrow: "Our Work",
    title: "Finished vehicles, cleaner cabins, sharper glass, better protection.",
    summary:
      "A curated gallery of Techno Car Studio work, reframed for a dark, premium, image-led portfolio experience.",
    heroImage: "/images/gallery-work-17.webp",
    body: [
      "The gallery brings completed vehicle work into one place so drivers can quickly see detailing, tint, protection, and accessory-focused results.",
      "Each image is organized with descriptive alt text and placed in a responsive layout that feels like a premium studio portfolio.",
    ],
    sections: [
      {
        title: "Gallery use",
        body: "The gallery should build trust before a driver ever opens the booking form.",
        points: ["Real vehicle imagery", "Service tags", "Fast responsive image loading", "Descriptive alt text"],
      },
    ],
    seo: seoBySlug.get("our-work")!,
  },
  {
    slug: "servicing-pricing",
    eyebrow: "Servicing & Pricing",
    title: "Clear packages for daily drivers, enthusiasts, and protected vehicles.",
    summary:
      "Compare interior detailing, exterior hand wash, tinting, ceramic coating, PPF, dashcam, remote starter, audio, and CarPlay services with clear package details where available.",
    heroImage: "/images/exterior-g-wagon-wash.jpg",
    body: [
      "Compare service categories, starting prices, package inclusions, and estimated times for Express, Premium, and Ultimate interior detailing. Exterior detailing is kept separate from those three interior packages.",
      "Exterior hand wash pricing and clay bar treatment are organized as their own service path so drivers can choose outside-only cleaning when that is all they need.",
      "Accessory pricing uses Yodha retail listings for dashcams, hardwire accessories, installation bundles, lighting kits, starlight kits, underglow, and subwoofer installation. Final installed quotes confirm vehicle fitment, availability, tax, warranty, and install time.",
      "This page helps KWC car owners compare what service fits their vehicle and schedule.",
    ],
    sections: [
      {
        title: "Clear pricing paths",
        body: "Interior detailing packages, exterior hand wash pricing, tint, ceramic, PPF, and supplier accessory prices are organized so customers can compare the right starting point.",
        points: [
          "Express interior detailing starts at $49 and is estimated at 1 to 1.5 hours.",
          "Premium interior detailing starts at $139 and is estimated at 1.5 to 2 hours.",
          "Ultimate interior detailing starts at $169 and is estimated at 3.5 to 4.5 hours.",
          "Ultimate now starts with steam disinfection instead of brand-chemical language.",
          "Exterior detailing is excluded from Express, Premium, and Ultimate interior package inclusions.",
          "Express exterior hand wash is $49 for sedans, $59 for SUV/pickup, and $69 for minivans.",
          "Clay bar treatment is available as a +$40 exterior add-on.",
          "PPF packages start at $400 for Basic, $1,050 for Partial Front, $1,750 for Full Front, and $4,550 for Full Wrap.",
          "REDTIGER hardwire accessories start at C$29.99 from Yodha retail pricing.",
          "YODHA X35 product-only pricing is C$139.99 and X35 installation bundle pricing is C$189.99.",
          "Azdome M350 Installation SPECIAL is listed at C$440.00 and shown as text-only pricing because no product image is available.",
          "YODHA ambient lighting kits start at C$99.99 and underglow starts at C$54.99 from Yodha sale pricing.",
          "Tinting, ceramic coating, accessory install timing, and warranty details are confirmed during booking.",
        ],
      },
      {
        title: "Vehicle-specific quotes",
        body: "Some services depend on vehicle size, condition, product fitment, warranty preference, and package availability.",
        points: [
          "PPF film line, warranty, pattern, and final fitment are confirmed before booking.",
          "Tint film, shade, legal fitment, and warranty are confirmed before installation.",
          "Ceramic coating recommendations depend on paint condition and desired protection.",
          "Dashcam, lighting, audio, CarPlay, and remote starter installs are confirmed by vehicle compatibility.",
          "Membership cadence is confirmed directly with the studio.",
        ],
      },
    ],
    seo: seoBySlug.get("servicing-pricing")!,
  },
  {
    slug: "paint-protection-film",
    eyebrow: "Paint Protection Film",
    title: "Clear film coverage for the panels that take the hit first.",
    summary:
      "Compare PPF coverage paths for front-end impact zones, full front protection, full-body paint preservation, and optional high-wear areas.",
    heroImage: "/images/paint-protection-film-install.webp",
    body: [
      "Paint protection film is a transparent urethane film designed to protect automotive paint from road debris, stone chips, scratches, scuffs, and everyday high-impact wear.",
      "Four clear coverage levels make it easier to choose the right protection path: Basic, Partial Front, Full Front, and Full Wrap.",
      "Each PPF quote is confirmed by vehicle pattern, paint condition, tax, film availability, warranty, and final fitment before booking.",
    ],
    sections: [
      {
        title: "Why PPF matters",
        body: "PPF is built for the painted surfaces most likely to collect chips, pitting, scratches, and scuffs from daily driving.",
        points: [
          "Transparent film protection for paint preservation",
          "Useful for new vehicles, highway commuters, and premium paint",
          "Self-healing film availability can be confirmed with the studio",
          "Coverage can scale from leading-edge panels to every exposed painted surface",
        ],
      },
      {
        title: "Booking notes",
        body: "Starting prices help customers compare coverage levels, while final details are confirmed around the exact vehicle.",
        points: [
          "Starting prices are before tax and subject to change",
          "Vehicle size, panel complexity, and pattern availability can affect final quote",
          "Paint correction needs should be inspected before film installation",
          "Warranty, film brand, and exact installation time are confirmed during booking",
        ],
      },
    ],
    seo: seoBySlug.get("paint-protection-film")!,
  },
  {
    slug: "membership",
    eyebrow: "Membership",
    title: "Regular care, priority scheduling, and member-first savings.",
    summary:
      "Membership plans help repeat customers keep their vehicles fresh while unlocking scheduling priority, discounts, and VIP treatment.",
    heroImage: "/images/garage-hero-detailing.webp",
    body: [
      "Membership plans are built for drivers who want priority scheduling, exclusive discounts, VIP treatment, and a simpler repeat car-care rhythm.",
      "The studio can confirm whether the selected membership works best as a monthly, per-visit, or package-based plan.",
    ],
    sections: [
      {
        title: "Why become a member?",
        body: "Members get a smoother way to maintain a clean vehicle all year, with savings on services including tinting and ceramic coating.",
        points: ["Priority scheduling", "Exclusive discounts", "VIP treatment", "Regular detailing rhythm"],
      },
    ],
    seo: seoBySlug.get("membership")!,
  },
  {
    slug: "contact-us",
    eyebrow: "Contact & Booking",
    title: "Tell the studio what you drive and what it needs.",
    summary:
      "Use the booking form, call, email, Instagram, or maps CTA to start a detailing, tint, ceramic, PPF, dashcam, accessory, or CarPlay request.",
    heroImage: "/images/window-tint-install.webp",
    body: [
      "The contact experience is designed for real service intake: vehicle type, service interest, package, preferred timing, and message. If no email provider is configured, the form falls back to a prefilled email.",
    ],
    sections: [
      {
        title: "Studio location",
        body: "Techno Car Studio is located at 412 Queen Street, Cambridge, ON N3C 1H1, Canada.",
        points: [business.phoneDisplay, business.email, `Instagram: ${business.instagram}`],
      },
    ],
    seo: seoBySlug.get("contact-us")!,
  },
];

export function getSeo(slug: string) {
  return seoBySlug.get(slug);
}

export function getContentPage(slug: string) {
  return contentPages.find((page) => page.slug === slug);
}

export function getLocalSeoPage(slug: string) {
  return localSeoPages.find((page) => page.slug === slug);
}

export function getPackageBySlug(slug: string) {
  return detailingPackages.find((item) => item.slug === slug);
}

export const publicRoutes = pageSeo.map((page) => page.path);
