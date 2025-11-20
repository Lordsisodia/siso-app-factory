"use server"

import { createBlogExperience } from '@siso/experiences-blog'

const blogExperience = createBlogExperience()

export const {
  getBlogStatsAction,
  getBlogPostsAction,
  getBlogCategoriesAction,
  getBlogAuthorsAction,
  createBlogPostAction,
  updateBlogPostAction,
  deleteBlogPostAction
} = blogExperience
