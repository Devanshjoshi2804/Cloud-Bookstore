export interface Book {
  id: string
  title: string
  author: string
  description: string
  cover_image: string
  price: number
  rating: number
  published_date: string
  page_count: number
  genre: string
  language: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserLibrary {
  id: string
  user_id: string
  book_id: string
  progress: number
  last_read: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  book_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface BookCategory {
  id: string
  book_id: string
  category_id: string
  created_at: string
} 