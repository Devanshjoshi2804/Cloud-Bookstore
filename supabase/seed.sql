-- Insert categories
-- Insert categories
INSERT INTO categories (name, description) VALUES
  ('Fiction', 'Imaginative and creative stories'),
  ('Non-Fiction', 'Factual and informative books'),
  ('Mystery', 'Thrilling detective and crime stories'),
  ('Romance', 'Love stories and romantic fiction'),
  ('Science Fiction', 'Futuristic and speculative fiction'),
  ('Fantasy', 'Magical and supernatural stories'),
  ('Biography', 'Life stories of notable people'),
  ('History', 'Books about historical events and periods'),
  ('Self-Help', 'Personal development and growth'),
  ('Business', 'Business and entrepreneurship books')
ON CONFLICT (name) DO NOTHING;

-- Insert sample books
INSERT INTO books (title, author, description, cover_image, price, rating, published_date, page_count, genre, language) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', 9.99, 4.5, '1925-04-10', 180, 'Fiction', 'English'),
  ('1984', 'George Orwell', 'A dystopian masterpiece that explores totalitarianism and surveillance society.', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop', 12.99, 4.8, '1949-06-08', 328, 'Science Fiction', 'English'),
  ('Pride and Prejudice', 'Jane Austen', 'A classic romance that explores love, marriage, and social class in Georgian-era England.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', 7.99, 4.6, '1813-01-28', 432, 'Romance', 'English'),
  ('The Hobbit', 'J.R.R. Tolkien', 'A fantasy adventure following Bilbo Baggins on his journey to help reclaim a dwarf kingdom.', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop', 14.99, 4.7, '1937-09-21', 310, 'Fantasy', 'English'),
  ('The Art of War', 'Sun Tzu', 'Ancient Chinese text on military strategy and tactics.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', 6.99, 4.3, '1910-01-01', 273, 'Non-Fiction', 'English'),
  ('The Da Vinci Code', 'Dan Brown', 'A fast-paced thriller involving art, religion, and conspiracy.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', 15.99, 4.2, '2003-03-18', 454, 'Mystery', 'English'),
  ('Steve Jobs', 'Walter Isaacson', 'The biography of Apple co-founder Steve Jobs.', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop', 19.99, 4.4, '2011-10-24', 656, 'Biography', 'English'),
  ('Sapiens', 'Yuval Noah Harari', 'A brief history of humankind from ancient humans to the present.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', 16.99, 4.6, '2011-01-01', 443, 'History', 'English'),
  ('The 7 Habits of Highly Effective People', 'Stephen R. Covey', 'A guide to personal and professional effectiveness.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', 13.99, 4.5, '1989-08-15', 372, 'Self-Help', 'English'),
  ('Good to Great', 'Jim Collins', 'Research on how companies transition from good to great performance.', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop', 17.99, 4.4, '2001-10-16', 320, 'Business', 'English');

-- Insert book categories
INSERT INTO book_categories (book_id, category_id)
SELECT b.id, c.id
FROM books b
CROSS JOIN categories c
WHERE b.genre = c.name; 