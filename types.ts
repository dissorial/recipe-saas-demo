import Stripe from "stripe"

export interface UserDetails {
  id: string
  first_name: string
  last_name: string
  full_name?: string
  avatar_url?: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

export interface Product {
  id: string
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface Price {
  id: string
  product_id?: string
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: Stripe.Price.Type
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  products?: Product
}

export interface Customer {
  id: string
  stripe_customer_id?: string
}

export interface UserDetails {
  id: string
  first_name: string
  last_name: string
  full_name?: string
  avatar_url?: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface Subscription {
  id: string
  user_id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  price_id?: string
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: Price
}

export interface IngredientServingSize {
  units: string
  desc?: string
  qty: number
  grams?: number
  scale: number
}

export interface Ingredient {
  name: string
  servingSize: IngredientServingSize
}

export interface ServingSize {
  scale: number
  qty: number
  grams: number
  units: string
  originalWeight?: number
  originalWeightUnits?: string
}

export interface Nutrients {
  caloriesKCal: number
  caloriesKJ: number
  totalCarbs: number
  diabetesCarbsADA: number
  netCarbs: number
  diabetesCarbs: number
  fiber: number
  starch: number
  sugar: number
  addedSugar: number
  sugarAlcohols: number
  protein: number
  fat: number
  transFat: number
  monousatFat: number
  polyunsatFat: number
  omega3Fat: number
  omega6Fat: number
  saturatedFat: number
  cholesterol: number
  vitaminA: number
  vitaminC: number
  vitaminD: number
  vitaminE: number
  vitaminK: number
  vitaminB1: number
  vitaminB2: number
  vitaminB3: number
  vitaminB5: number
  vitaminB6: number
  vitaminB12: number
  potassium: number
  magnesium: number
  calcium: number
  iron: number
  zinc: number
  copper: number
  phosphorus: number
  sodium: number
  selenium: number
  folate: number
  choline: number
  alcohol: number
  caffeine: number
  gluten: number
  manganese: number
  conjugatedLinoleicAcid: number
  phyticAcid: number
  xylitol: number
  isomalt: number
  sorbitol: number
  maltitol: number
  lactitol: number
  erythritol: number
  pinitol: number
  inositol: number
  mannitol: number
}

export interface Nutrients {
  [key: string]: number
}

export interface Recipe {
  id: string
  name: string
  tags: string[]
  description: string
  prepareTime: number
  cookTime: number
  ingredients: Ingredient[]
  steps: string[]
  servings: number
  servingSizes: ServingSize[]
  nutrients: Nutrients
  image?: string
}

export type Recipes = Recipe[]

export const nutrientUnits: { [key: string]: string } = {
  caloriesKCal: "kcal",
  caloriesKJ: "kJ",
  totalCarbs: "g",
  diabetesCarbsADA: "g",
  netCarbs: "g",
  diabetesCarbs: "g",
  fiber: "g",
  starch: "g",
  sugar: "g",
  addedSugar: "g",
  sugarAlcohols: "g",
  protein: "g",
  fat: "g",
  transFat: "g",
  monousatFat: "g",
  polyunsatFat: "g",
  omega3Fat: "g",
  omega6Fat: "g",
  saturatedFat: "g",
  cholesterol: "mg",
  vitaminA: "IU",
  vitaminC: "mg",
  vitaminD: "IU",
  vitaminE: "mg",
  vitaminK: "mcg",
  vitaminB1: "mg",
  vitaminB2: "mg",
  vitaminB3: "mg",
  vitaminB5: "mg",
  vitaminB6: "mg",
  vitaminB12: "mcg",
  potassium: "mg",
  magnesium: "mg",
  calcium: "mg",
  iron: "mg",
  zinc: "mg",
  copper: "mg",
  phosphorus: "mg",
  sodium: "mg",
  selenium: "mcg",
  folate: "mcg",
  choline: "mg",
  alcohol: "g",
  caffeine: "mg",
  gluten: "mg",
  manganese: "mg",
  conjugatedLinoleicAcid: "mg",
  phyticAcid: "mg",
  xylitol: "g",
  isomalt: "g",
  sorbitol: "g",
  maltitol: "g",
  lactitol: "g",
  erythritol: "g",
  pinitol: "g",
  inositol: "g",
  mannitol: "g",
}

export const nutrientNames: { [key: string]: string } = {
  caloriesKCal: "Calories (kCal)",
  caloriesKJ: "Calories (kJ)",
  totalCarbs: "Total Carbohydrates",
  diabetesCarbsADA: "Diabetes Carbohydrates (ADA)",
  netCarbs: "Net Carbohydrates",
  diabetesCarbs: "Diabetes Carbohydrates",
  fiber: "Fiber",
  starch: "Starch",
  sugar: "Sugar",
  addedSugar: "Added Sugar",
  sugarAlcohols: "Sugar Alcohols",
  protein: "Protein",
  fat: "Fat",
  transFat: "Trans fat",
  monousatFat: "Monounsaturated fat",
  polyunsatFat: "Polyunsaturated fat",
  omega3Fat: "Omega-3 fatty acids",
  omega6Fat: "Omega-6 fatty acids",
  saturatedFat: "Saturated fat",
  cholesterol: "Cholesterol",
  vitaminA: "Vitamin A",
  vitaminC: "Vitamin C",
  vitaminD: "Vitamin D",
  vitaminE: "Vitamin E",
  vitaminK: "Vitamin K",
  vitaminB1: "Vitamin B1",
  vitaminB2: "Vitamin B2",
  vitaminB3: "Vitamin B3",
  vitaminB5: "Vitamin B5",
  vitaminB6: "Vitamin B6",
  vitaminB12: "Vitamin B12",
  potassium: "Potassium",
  magnesium: "Magnesium",
  calcium: "Calcium",
  iron: "Iron",
  zinc: "Zinc",
  copper: "Copper",
  phosphorus: "Phosphorus",
  sodium: "Sodium",
  selenium: "Selenium",
  folate: "Folate",
  choline: "Choline",
  alcohol: "Alcohol",
  caffeine: "Caffeine",
  gluten: "Gluten",
  manganese: "Manganese",
  conjugatedLinoleicAcid: "Conjugated linoleic acid (CLA)",
  phyticAcid: "Phytic acid",
  xylitol: "Xylitol",
  isomalt: "Isomalt",
  sorbitol: "Sorbitol",
  maltitol: "Maltitol",
  lactitol: "Lactitol",
  erythritol: "Erythritol",
  pinitol: "Pinitol",
  inositol: "Inositol",
  mannitol: "Mannitol",
}
