"use server"

import { createFaqExperience } from '@siso/experiences-faq'

const faqExperience = createFaqExperience()

export const {
  getFaqsAction,
  getFaqCategoriesAction,
  searchFaqsAction,
  createFaqAction,
  updateFaqAction,
  deleteFaqAction
} = faqExperience
