/**
 * Prices in CHF per month, excl. VAT. Texts are in the dictionary
 * (`home.pricing`); the yearly discount badge is derived from these values.
 */
export const PRICING = {
  /** Per connected bexio company. */
  company: {
    monthly: 59,
    yearly: 49,
  },
  /** Every additional user (the first user per company is free). */
  extraUser: 8,
} as const

export type Billing = keyof typeof PRICING.company
