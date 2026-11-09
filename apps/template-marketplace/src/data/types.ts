export type TemplateStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'TESTED' | 'FAILED';

export type LicenseTier = 'FREE' | 'STANDARD' | 'PREMIUM' | 'ENTERPRISE';

export interface TemplatePriceMetadata {
  tier: LicenseTier;
  isFree: boolean;
  priceVnd: number;
  originalPriceVnd: number;
  priceUsd: number;
  currency: 'VND';
}

export interface TemplateRegistryItem {
  id: string;              // e.g. "5SD-ECO-001"
  slug: string;            // e.g. "5sd-eco-001"
  name: string;            // e.g. "Aurelia Atelier — Luxury Fashion Flagship Store"
  nameVi: string;          // Vietnamese subtitle/name
  category: string;        // e.g. "ecommerce"
  categoryName: string;    // e.g. "E-commerce"
  categoryNameVi: string;  // e.g. "Thương mại điện tử"
  subNiche: string;        // e.g. "Fashion Store"
  designStyle: string;     // e.g. "luxury"
  designStyleName: string; // e.g. "Luxury"
  architecture: string;    // e.g. "commerce-flagship"
  description: string;
  heroImage?: string;
  galleryImages?: string[];
  thumbnail: string;       // e.g. "/templates/ecommerce/5sd-eco-001/assets/thumbnail.svg"
  previewRoute: string;    // e.g. "/preview/5sd-eco-001"
  detailsRoute: string;    // e.g. "/templates/5sd-eco-001"
  sourcePath: string;      // e.g. "templates/ecommerce/5sd-eco-001"
  techStack: string[];     // ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"]
  tags: string[];
  features: string[];
  sections: string[];
  version: string;
  status: TemplateStatus;
  price: TemplatePriceMetadata;
  primaryColor: string;
  secondaryColor: string;
  isDark: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isNewRelease: boolean;
  rating: number;
  downloadsCount: number;
  batchNumber: number;
  updatedAt: string;
}
