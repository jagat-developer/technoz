export type VehiclePrice = {
  vehicle: string;
  price: string;
};

export type PackageExpectation = {
  label: string;
  value: number;
  caption: string;
};

export type ServiceAddOn = {
  name: string;
  price: string;
  description: string;
};

export type SupplierProduct = {
  id: string;
  name: string;
  category: "Dashcams" | "Installation Bundles" | "Lighting";
  price: string;
  compareAtPrice?: string;
  status?: "In stock" | "Sold out" | "Image pending";
  image: string;
  sourceUrl: string;
  badges: string[];
  details: string[];
};

export type BusinessProfile = {
  name: string;
  legalName: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  instagram: string;
  instagramUrl: string;
  mapsUrl: string;
  baseUrl: string;
  description: string;
};

export type SeoPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image: string;
  priority: number;
};

export type ServicePackage = {
  id: string;
  slug?: string;
  name: string;
  eyebrow: string;
  summary: string;
  idealFor: string;
  time?: string;
  note?: string;
  prices?: VehiclePrice[];
  interior: string[];
  exterior?: string[];
  features?: string[];
  expectations?: PackageExpectation[];
  cta: string;
  image: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  startingAt?: string;
  time?: string;
  image: string;
  benefits: string[];
  process: string[];
  packages?: ServicePackage[];
  quoteRequired?: boolean;
};

export type Testimonial = {
  name: string;
  quote: string;
  service: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  service: string;
};

export type LeadFormSubmission = {
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehicle: string;
  serviceInterest: string;
  packageInterest: string;
  preferredDate: string;
  message: string;
  website?: string;
};

export type ContentPage = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  heroImage: string;
  body: string[];
  sections: Array<{
    title: string;
    body: string;
    points?: string[];
  }>;
  seo: SeoPage;
};

export type LocalSeoCity = {
  name: string;
  slug: string;
  region: string;
  serviceArea: string;
};

export type LocalSeoService = {
  id: string;
  slug: string;
  label: string;
  keyword: string;
  headline: string;
  summary: string;
  sourceFact: string;
  conversionAngle: string;
  startingAt?: string;
  time?: string;
  image: string;
  proofPoints: string[];
};

export type LocalSeoPage = {
  slug: string;
  path: string;
  city: LocalSeoCity;
  service: LocalSeoService;
  seo: SeoPage;
};
