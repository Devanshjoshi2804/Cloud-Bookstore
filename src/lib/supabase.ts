import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Helper functions for common database operations
export const getBooks = async (options?: {
  category?: string
  search?: string
  limit?: number
  offset?: number
}) => {
  let query = supabase
    .from('books')
    .select('*, book_categories(category:categories(*))')

  if (options?.category) {
    query = query.eq('book_categories.category.name', options.category)
  }

  if (options?.search) {
    query = query.or(`title.ilike.%${options.search}%,author.ilike.%${options.search}%`)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export const getBookById = async (id: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*, book_categories(category:categories(*)), reviews(*, user:users(*))')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getUserLibrary = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_library')
    .select('*, book:books(*)')
    .eq('user_id', userId)
    .order('last_read', { ascending: false })

  if (error) throw error
  return data
}

export const addToLibrary = async (userId: string, bookId: string) => {
  const { data, error } = await supabase
    .from('user_library')
    .insert({ user_id: userId, book_id: bookId })
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateReadingProgress = async (
  userId: string,
  bookId: string,
  progress: number
) => {
  const { data, error } = await supabase
    .from('user_library')
    .update({ progress, last_read: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const addReview = async (
  userId: string,
  bookId: string,
  rating: number,
  comment?: string
) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      user_id: userId,
      book_id: bookId,
      rating,
      comment,
    })
    .select('*, user:users(*)')
    .single()

  if (error) throw error
  return data
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export const getBooksByCategory = async (categoryId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*, book_categories!inner(*)')
    .eq('book_categories.category_id', categoryId)

  if (error) throw error
  return data
} 