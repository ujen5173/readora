export const cardWidth = 230.5;
export const cardHeight = 1383;

export const bookWidth = cardWidth / 1.5;
export const bookHeight = cardHeight / 1.4;

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
] as const;

export const cuidRegex = /^c[a-z0-9]{24}$/;

export const chapterCollectionName = "Chapters";
export const chunkCollectionName = "Chunks";

export const STRIPE_YEARLY_PLAN =
  "https://buy.stripe.com/test_5kA15J1EsghY0U08wx";
export const STRIPE_MONTLY_PLAN =
  "https://buy.stripe.com/test_14k3dRdna0j046caEE";

export const STRIPE_YEARLY_PLAN_PRICE = 191.9;
export const STRIPE_MONTHLY_PLAN_PRICE = 19.99;

export const DEFAULT_COIN_AMOUNTS = [550, 1200, 2500, 6500] as const;
export const MIN_COINS = 500;
export const MAX_COINS = 10000;

export const COIN_PRICE = 0.0099;

export const READERSHIP_ANALYTICS_DEFAULT_VALUES = {
  total: 0,
  unique: 0,
};

export const METRICS_DEFAULT_VALUES = {
  wordCount: 0,
  readingTime: 0,
  commentsCount: 0,
  ratingCount: 0,
  ratingValue: 0,
  averageRating: 0,
};

// NOTE:
/**
 * Chapter price pool
 *
 * 50 coins ~ 0.50 USD --> short - medium chapter
 * 100 coins ~ 0.69 USD --> medium - long chapter
 * 110 coins ~ 1.09 USD --> long - very long chapter
 * 150 coins ~ 1.49 USD --> premium author chapter (for epic chapters)
 */
export const CHAPTER_PRICE_POOL = {
  POOL_50: 50,
  POOL_70: 70,
  POOL_110: 110,
  POOL_150: 150,
} as const;
