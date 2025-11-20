export interface ActionResult<T> {
  isSuccess: boolean
  message: string
  data?: T
}

export type BlogStatus = 'published' | 'draft' | 'scheduled'

export interface BlogPost {
  id: string
  title: string
  slug: string
  content?: string
  excerpt: string
  status: BlogStatus
  author: string
  authorId: string
  publishedAt: string | null
  scheduledFor?: string | null
  views: number
  category: string
  tags: string[]
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
  readingTime: number
  createdAt: string
  updatedAt: string
}

export interface BlogStats {
  totalPosts: number
  published: number
  drafts: number
  scheduled: number
  totalViews: number
  thisMonth: number
  avgViews: number
  topCategory: string
  popularTags: Array<{ tag: string; count: number }>
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  postCount: number
  description?: string
}

export interface BlogAuthor {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  postCount: number
  totalViews: number
}

export type CreateBlogPostInput = Omit<BlogPost, 'id' | 'views' | 'createdAt' | 'updatedAt'>
export type UpdateBlogPostInput = Partial<Omit<BlogPost, 'id' | 'createdAt'>>

export interface BlogDataProvider {
  getPosts: () => Promise<BlogPost[]>
  getStats?: () => Promise<BlogStats>
  getCategories?: () => Promise<BlogCategory[]>
  getAuthors?: () => Promise<BlogAuthor[]>
  createPost?: (post: CreateBlogPostInput) => Promise<BlogPost>
  updatePost?: (postId: string, updates: UpdateBlogPostInput) => Promise<BlogPost>
  deletePost?: (postId: string) => Promise<void>
}

export interface BlogExperienceConfig {
  provider?: BlogDataProvider
}

export interface BlogExperienceActions {
  getBlogStatsAction: () => Promise<ActionResult<BlogStats>>
  getBlogPostsAction: (
    status?: BlogStatus,
    limit?: number
  ) => Promise<ActionResult<BlogPost[]>>
  getBlogCategoriesAction: () => Promise<ActionResult<BlogCategory[]>>
  getBlogAuthorsAction: () => Promise<ActionResult<BlogAuthor[]>>
  createBlogPostAction: (
    post: CreateBlogPostInput
  ) => Promise<ActionResult<BlogPost>>
  updateBlogPostAction: (
    postId: string,
    updates: UpdateBlogPostInput
  ) => Promise<ActionResult<BlogPost>>
  deleteBlogPostAction: (postId: string) => Promise<ActionResult<void>>
}

export function createBlogExperience(config: BlogExperienceConfig = {}): BlogExperienceActions {
  const provider = config.provider ?? createSampleBlogProvider()

  async function getBlogStatsAction(): Promise<ActionResult<BlogStats>> {
    try {
      if (provider.getStats) {
        const stats = await provider.getStats()
        return success('Blog stats retrieved successfully', stats)
      }

      const posts = await provider.getPosts()
      const published = posts.filter(post => post.status === 'published')
      const drafts = posts.filter(post => post.status === 'draft')
      const scheduled = posts.filter(post => post.status === 'scheduled')
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)
      const tagsCount: Record<string, number> = {}
      posts.forEach(post => {
        post.tags.forEach(tag => {
          tagsCount[tag] = (tagsCount[tag] || 0) + 1
        })
      })

      const popularTags = Object.entries(tagsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([tag, count]) => ({ tag, count }))

      const topCategory = posts.reduce<Record<string, number>>((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1
        return acc
      }, {})
      const [categoryName] = Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0] || ['-', 0]

      const stats: BlogStats = {
        totalPosts: posts.length,
        published: published.length,
        drafts: drafts.length,
        scheduled: scheduled.length,
        totalViews,
        thisMonth: published.filter(post => {
          if (!post.publishedAt) return false
          const date = new Date(post.publishedAt)
          const now = new Date()
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        }).length,
        avgViews: published.length ? Math.round(totalViews / published.length) : 0,
        topCategory: categoryName,
        popularTags
      }

      return success('Blog stats retrieved successfully', stats)
    } catch (error) {
      console.error('Error getting blog stats:', error)
      return failure('Failed to get blog stats')
    }
  }

  async function getBlogPostsAction(
    status?: BlogStatus,
    limit: number = 20
  ): Promise<ActionResult<BlogPost[]>> {
    try {
      const posts = await provider.getPosts()
      const filtered = status ? posts.filter(post => post.status === status) : posts
      return success(`Retrieved ${Math.min(filtered.length, limit)} blog posts`, filtered.slice(0, limit))
    } catch (error) {
      console.error('Error getting blog posts:', error)
      return failure('Failed to get blog posts')
    }
  }

  async function getBlogCategoriesAction(): Promise<ActionResult<BlogCategory[]>> {
    try {
      if (provider.getCategories) {
        const categories = await provider.getCategories()
        return success('Blog categories retrieved successfully', categories)
      }

      const posts = await provider.getPosts()
      const categoriesMap: Record<string, BlogCategory> = {}
      posts.forEach(post => {
        if (!categoriesMap[post.category]) {
          categoriesMap[post.category] = {
            id: `cat-${post.category}`,
            name: titleCase(post.category),
            slug: slugify(post.category),
            postCount: 0
          }
        }
        categoriesMap[post.category].postCount += 1
      })

      return success('Blog categories retrieved successfully', Object.values(categoriesMap))
    } catch (error) {
      console.error('Error getting blog categories:', error)
      return failure('Failed to get blog categories')
    }
  }

  async function getBlogAuthorsAction(): Promise<ActionResult<BlogAuthor[]>> {
    try {
      if (provider.getAuthors) {
        const authors = await provider.getAuthors()
        return success('Blog authors retrieved successfully', authors)
      }

      const posts = await provider.getPosts()
      const authorsMap: Record<string, BlogAuthor> = {}

      posts.forEach(post => {
        if (!authorsMap[post.authorId]) {
          authorsMap[post.authorId] = {
            id: post.authorId,
            name: post.author,
            email: `${slugify(post.author)}@example.com`,
            postCount: 0,
            totalViews: 0
          }
        }
        authorsMap[post.authorId].postCount += 1
        authorsMap[post.authorId].totalViews += post.views
      })

      return success('Blog authors retrieved successfully', Object.values(authorsMap))
    } catch (error) {
      console.error('Error getting blog authors:', error)
      return failure('Failed to get blog authors')
    }
  }

  async function createBlogPostAction(
    post: CreateBlogPostInput
  ): Promise<ActionResult<BlogPost>> {
    try {
      if (!provider.createPost) {
        throw new Error('Blog provider does not implement createPost')
      }

      const created = await provider.createPost(post)
      return success('Blog post created successfully', created)
    } catch (error) {
      console.error('Error creating blog post:', error)
      return failure('Failed to create blog post')
    }
  }

  async function updateBlogPostAction(
    postId: string,
    updates: UpdateBlogPostInput
  ): Promise<ActionResult<BlogPost>> {
    try {
      if (!provider.updatePost) {
        throw new Error('Blog provider does not implement updatePost')
      }

      const updated = await provider.updatePost(postId, updates)
      return success('Blog post updated successfully', updated)
    } catch (error) {
      console.error('Error updating blog post:', error)
      return failure('Failed to update blog post')
    }
  }

  async function deleteBlogPostAction(postId: string): Promise<ActionResult<void>> {
    try {
      if (!provider.deletePost) {
        throw new Error('Blog provider does not implement deletePost')
      }

      await provider.deletePost(postId)
      return success('Blog post deleted successfully', undefined)
    } catch (error) {
      console.error('Error deleting blog post:', error)
      return failure('Failed to delete blog post')
    }
  }

  return {
    getBlogStatsAction,
    getBlogPostsAction,
    getBlogCategoriesAction,
    getBlogAuthorsAction,
    createBlogPostAction,
    updateBlogPostAction,
    deleteBlogPostAction
  }
}

function success<T>(message: string, data: T): ActionResult<T> {
  return { isSuccess: true, message, data }
}

function failure<T = never>(message: string): ActionResult<T> {
  return { isSuccess: false, message }
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function titleCase(value: string): string {
  return value.replace(/(^|_|-|\s)+(\w)/g, (_, __, char) => char.toUpperCase())
}

function createSampleBlogProvider(): BlogDataProvider {
  const posts: BlogPost[] = samplePosts()
  const categories: BlogCategory[] = sampleCategories()
  const authors: BlogAuthor[] = sampleAuthors()

  return {
    async getPosts() {
      return posts
    },
    async getStats() {
      return sampleStats()
    },
    async getCategories() {
      return categories
    },
    async getAuthors() {
      return authors
    },
    async createPost(post) {
      const newPost: BlogPost = {
        ...post,
        id: `blog-${Date.now()}`,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      posts.unshift(newPost)
      return newPost
    },
    async updatePost(postId, updates) {
      const index = posts.findIndex(post => post.id === postId)
      if (index === -1) {
        throw new Error('Blog post not found')
      }
      posts[index] = {
        ...posts[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      return posts[index]
    },
    async deletePost(postId) {
      const index = posts.findIndex(post => post.id === postId)
      if (index === -1) {
        throw new Error('Blog post not found')
      }
      posts.splice(index, 1)
    }
  }
}

function samplePosts(): BlogPost[] {
  const now = Date.now()
  return [
    {
      id: 'blog-1',
      title: 'Top 10 Adventure Activities in Mallorca',
      slug: 'top-10-adventure-activities-mallorca',
      excerpt: 'Discover the most thrilling outdoor activities Mallorca has to offer, from coasteering to mountain hiking...',
      status: 'published',
      author: "Sarah O'Connor",
      authorId: 'author-1',
      publishedAt: new Date(now - 2 * 86400000).toISOString(),
      views: 2847,
      category: 'Adventure',
      tags: ['hiking', 'adventure', 'mallorca', 'coasteering'],
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/v1234567890/blog/adventure-activities.jpg',
      seoTitle: 'Top 10 Adventure Activities in Mallorca | Ultimate Guide',
      seoDescription: 'Explore the best adventure activities in Mallorca with our comprehensive guide. From coasteering to hiking, discover your next thrill.',
      readingTime: 8,
      createdAt: new Date(now - 5 * 86400000).toISOString(),
      updatedAt: new Date(now - 2 * 86400000).toISOString()
    },
    {
      id: 'blog-2',
      title: 'Safety Tips for Mountain Hiking in Serra de Tramuntana',
      slug: 'safety-tips-mountain-hiking-serra-tramuntana',
      excerpt: 'Essential safety guidelines for a successful mountain hiking experience in Mallorca\'s UNESCO World Heritage site...',
      status: 'published',
      author: 'Mike Johnson',
      authorId: 'author-2',
      publishedAt: new Date(now - 5 * 86400000).toISOString(),
      views: 1892,
      category: 'Safety',
      tags: ['hiking', 'safety', 'serra-tramuntana', 'mountains'],
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/v1234567890/blog/hiking-safety.jpg',
      seoTitle: 'Mountain Hiking Safety Tips | Serra de Tramuntana Guide',
      seoDescription: 'Stay safe while hiking in Serra de Tramuntana with our expert safety tips and guidelines for mountain adventures.',
      readingTime: 6,
      createdAt: new Date(now - 8 * 86400000).toISOString(),
      updatedAt: new Date(now - 5 * 86400000).toISOString()
    },
    {
      id: 'blog-3',
      title: 'Best Kayaking Spots for Beginners in Mallorca',
      slug: 'best-kayaking-spots-beginners-mallorca',
      excerpt: 'A comprehensive guide to the most beginner-friendly kayaking locations around the island...',
      status: 'draft',
      author: 'Emma Walsh',
      authorId: 'author-3',
      publishedAt: null,
      views: 0,
      category: 'Water Sports',
      tags: ['kayaking', 'beginners', 'water-sports', 'mallorca'],
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/v1234567890/blog/kayaking-beginners.jpg',
      readingTime: 7,
      createdAt: new Date(now - 3 * 86400000).toISOString(),
      updatedAt: new Date(now - 86400000).toISOString()
    },
    {
      id: 'blog-4',
      title: 'Cultural Heritage Sites You Must Visit in Palma',
      slug: 'cultural-heritage-sites-palma-mallorca',
      excerpt: 'Explore the rich history and stunning architecture of Palma\'s most significant cultural landmarks...',
      status: 'published',
      author: 'Carlos Rodriguez',
      authorId: 'author-4',
      publishedAt: new Date(now - 7 * 86400000).toISOString(),
      views: 1456,
      category: 'Cultural',
      tags: ['cultural', 'palma', 'heritage', 'architecture'],
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/v1234567890/blog/palma-heritage.jpg',
      readingTime: 9,
      createdAt: new Date(now - 10 * 86400000).toISOString(),
      updatedAt: new Date(now - 7 * 86400000).toISOString()
    },
    {
      id: 'blog-5',
      title: "Sustainable Tourism: Protecting Mallorca's Natural Beauty",
      slug: 'sustainable-tourism-protecting-mallorca-environment',
      excerpt: 'Learn how to be a responsible tourist and help preserve Mallorca\'s stunning natural environment for future generations...',
      status: 'scheduled',
      author: "Sarah O'Connor",
      authorId: 'author-1',
      publishedAt: null,
      scheduledFor: new Date(now + 3 * 86400000).toISOString(),
      views: 0,
      category: 'Environment',
      tags: ['sustainability', 'environment', 'responsible-tourism', 'mallorca'],
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/v1234567890/blog/sustainable-tourism.jpg',
      readingTime: 5,
      createdAt: new Date(now - 86400000).toISOString(),
      updatedAt: new Date(now - 86400000).toISOString()
    }
  ]
}

function sampleCategories(): BlogCategory[] {
  return [
    {
      id: 'cat-1',
      name: 'Adventure',
      slug: 'adventure',
      postCount: 15,
      description: 'Thrilling outdoor activities and extreme sports'
    },
    {
      id: 'cat-2',
      name: 'Safety',
      slug: 'safety',
      postCount: 9,
      description: 'Safety tips and guidelines for outdoor activities'
    },
    {
      id: 'cat-3',
      name: 'Water Sports',
      slug: 'water-sports',
      postCount: 8,
      description: 'Kayaking, sailing, and other water-based activities'
    },
    {
      id: 'cat-4',
      name: 'Cultural',
      slug: 'cultural',
      postCount: 6,
      description: 'Cultural tours, heritage sites, and local traditions'
    },
    {
      id: 'cat-5',
      name: 'Environment',
      slug: 'environment',
      postCount: 4,
      description: 'Sustainable tourism and environmental conservation'
    }
  ]
}

function sampleAuthors(): BlogAuthor[] {
  return [
    {
      id: 'author-1',
      name: "Sarah O'Connor",
      email: 'sarah@example.com',
      avatar: 'https://res.cloudinary.com/demo/image/upload/v1234567890/authors/sarah.jpg',
      bio: 'Adventure enthusiast and outdoor activity expert with 10+ years of experience in Mallorca.',
      postCount: 18,
      totalViews: 12847
    },
    {
      id: 'author-2',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://res.cloudinary.com/demo/image/upload/v1234567890/authors/mike.jpg',
      bio: 'Safety instructor and mountain guide specializing in Serra de Tramuntana hiking.',
      postCount: 12,
      totalViews: 8934
    },
    {
      id: 'author-3',
      name: 'Emma Walsh',
      email: 'emma@example.com',
      avatar: 'https://res.cloudinary.com/demo/image/upload/v1234567890/authors/emma.jpg',
      bio: 'Water sports instructor and marine conservation advocate.',
      postCount: 9,
      totalViews: 5623
    },
    {
      id: 'author-4',
      name: 'Carlos Rodriguez',
      email: 'carlos@example.com',
      avatar: 'https://res.cloudinary.com/demo/image/upload/v1234567890/authors/carlos.jpg',
      bio: 'Local historian and cultural tour guide with deep knowledge of Mallorca\'s heritage.',
      postCount: 8,
      totalViews: 4892
    }
  ]
}

function sampleStats(): BlogStats {
  return {
    totalPosts: 47,
    published: 42,
    drafts: 4,
    scheduled: 1,
    totalViews: 28947,
    thisMonth: 12,
    avgViews: 616,
    topCategory: 'Adventure',
    popularTags: [
      { tag: 'hiking', count: 18 },
      { tag: 'adventure', count: 15 },
      { tag: 'mallorca', count: 12 },
      { tag: 'safety', count: 9 },
      { tag: 'water-sports', count: 8 },
      { tag: 'cultural', count: 6 }
    ]
  }
}
