-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create tables
create table if not exists public.categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.books (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    author text not null,
    isbn text,
    description text,
    cover_image text,
    price decimal(10,2) not null,
    rating decimal(3,1) not null default 0,
    published_date date,
    page_count integer,
    genre text,
    publisher text,
    language text not null default 'English',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.book_categories (
    id uuid primary key default uuid_generate_v4(),
    book_id uuid references public.books(id) on delete cascade not null,
    category_id uuid references public.categories(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(book_id, category_id)
);

create table if not exists public.users (
    id uuid references auth.users on delete cascade primary key,
    email text not null unique,
    full_name text not null,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.user_library (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    book_id uuid references public.books(id) on delete cascade not null,
    progress integer not null default 0,
    last_read timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, book_id)
);

create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    book_id uuid references public.books(id) on delete cascade not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, book_id)
);

-- Create indexes
create index if not exists books_title_idx on public.books using gin (to_tsvector('english', title));
create index if not exists books_author_idx on public.books using gin (to_tsvector('english', author));
create index if not exists user_library_user_id_idx on public.user_library(user_id);
create index if not exists user_library_book_id_idx on public.user_library(book_id);
create index if not exists reviews_book_id_idx on public.reviews(book_id);
create index if not exists book_categories_book_id_idx on public.book_categories(book_id);
create index if not exists book_categories_category_id_idx on public.book_categories(category_id);

-- Create updated_at triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger handle_books_updated_at
    before update on public.books
    for each row
    execute function public.handle_updated_at();

create trigger handle_users_updated_at
    before update on public.users
    for each row
    execute function public.handle_updated_at();

create trigger handle_user_library_updated_at
    before update on public.user_library
    for each row
    execute function public.handle_updated_at();

create trigger handle_reviews_updated_at
    before update on public.reviews
    for each row
    execute function public.handle_updated_at();

create trigger handle_categories_updated_at
    before update on public.categories
    for each row
    execute function public.handle_updated_at();

-- Set up Row Level Security (RLS)
alter table public.books enable row level security;
alter table public.users enable row level security;
alter table public.user_library enable row level security;
alter table public.reviews enable row level security;
alter table public.categories enable row level security;
alter table public.book_categories enable row level security;

-- Create policies
create policy "Books are viewable by everyone"
    on public.books for select
    using (true);

create policy "Books can be inserted by anyone"
    on public.books for insert
    with check (true);

create policy "Users can view their own profile"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.users for update
    using (auth.uid() = id);

create policy "Users can view their own library"
    on public.user_library for select
    using (auth.uid() = user_id);

create policy "Users can add books to their library"
    on public.user_library for insert
    with check (auth.uid() = user_id);

create policy "Users can update their library"
    on public.user_library for update
    using (auth.uid() = user_id);

create policy "Users can remove books from their library"
    on public.user_library for delete
    using (auth.uid() = user_id);

create policy "Reviews are viewable by everyone"
    on public.reviews for select
    using (true);

create policy "Users can create reviews"
    on public.reviews for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
    on public.reviews for update
    using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
    on public.reviews for delete
    using (auth.uid() = user_id);

create policy "Categories are viewable by everyone"
    on public.categories for select
    using (true);

create policy "Categories can be inserted by anyone"
    on public.categories for insert
    with check (true);

create policy "Book categories are viewable by everyone"
    on public.book_categories for select
    using (true);

create policy "Book categories can be inserted by anyone"
    on public.book_categories for insert
    with check (true);

-- Insert some initial categories
insert into public.categories (name, description) values
    ('Fiction', 'Explore imaginative worlds and compelling stories'),
    ('Non-Fiction', 'Discover real-world knowledge and insights'),
    ('Mystery', 'Unravel intriguing puzzles and suspenseful plots'),
    ('Romance', 'Fall in love with heartwarming stories'),
    ('Science Fiction', 'Journey through futuristic worlds and technologies'),
    ('Fantasy', 'Enter magical realms and epic adventures')
on conflict (name) do nothing; 