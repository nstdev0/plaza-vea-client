// --- 1. Tipos Genéricos de la Respuesta API ---

export interface PaginatedResponse<T> {
  totalData: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalRecords: number;
  records: T[];
}

// --- 2. El Registro Principal (Flattened Product) ---

export interface ProductRecord {
  skuId: string;
  name: string;
  ean: string;
  price: string; // Nota: La API lo devuelve como string ("31.9")
  imageUrl: string;
  brand: string;
  category: string[];
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  rawJson: ProductRawData;
}

// --- 3. Estructura Interna Compleja (VTEX/Legacy Data) ---

export interface ProductRawData {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  linkText: string;
  productReference: string;
  categoryId: string;
  categories: string[];
  categoriesIds: string[];
  productClusters: Record<string, string>;
  items: ProductItem[];
  link: string;
  description: string;
  releaseDate: string;

  // Especificaciones dinámicas (ej: "Tipo de envío", "Descuentos", etc.)
  // Usamos un index signature para propiedades desconocidas que vienen como array de strings
  [key: string]: any;
}

// --- 4. Sub-Tipos Detallados ---

export interface ProductItem {
  itemId: string;
  name: string;
  nameComplete: string;
  ean: string;
  measurementUnit: string; // ej: "kg", "un"
  unitMultiplier: number;
  images: ProductImage[];
  sellers: Seller[];
  // Otros campos opcionales
  modalType?: string | null;
  estimatedDateArrival?: string | null;
}

export interface ProductImage {
  imageId: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
}

export interface Seller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  // Nota: La API tiene un error tipográfico "commertial" en lugar de "commercial"
  // Debemos respetar el nombre exacto que viene del backend.
  commertialOffer: CommercialOffer;
}

export interface CommercialOffer {
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  Tax: number;
  IsAvailable: boolean;
  AvailableQuantity: number;
  PriceToken: string;
  RewardValue: number;
  PriceValidUntil?: string;
  CacheVersionUsedToCallCheckout?: string;
  Installments: Installment[];
  PaymentOptions: PaymentOptions;
  // Arrays vacíos o variantes
  Teasers: any[];
  BuyTogether: any[];
  GiftSkuIds: any[];
  PromotionTeasers?: any[];
}

export interface Installment {
  Name: string;
  Value: number;
  InterestRate: number;
  NumberOfInstallments: number;
  TotalValuePlusInterestRate: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
}

export interface PaymentOptions {
  installmentOptions: InstallmentOption[];
  paymentSystems: PaymentSystem[];
  payments: any[];
  giftCards: any[];
  availableTokens: any[];
}

export interface PaymentSystem {
  id: number;
  name: string;
  groupName: string;
  validator?: any;
  stringId: string;
  template: string;
  requiresDocument: boolean;
  isCustom: boolean;
  description?: string | null;
  requiresAuthentication: boolean;
  dueDate: string;
}

export interface InstallmentOption {
  paymentName: string;
  paymentGroupName: string;
  paymentSystem: string; // string ID
  value: number;
  bin: string | null;
  installments: {
    count: number;
    hasInterestRate: boolean;
    interestRate: number;
    value: number;
    total: number;
    sellerMerchantInstallments?: Array<{
      id: string;
      count: number;
      hasInterestRate: boolean;
      interestRate: number;
      value: number;
      total: number;
    }>;
  }[];
}
