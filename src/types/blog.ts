export type BlogCategory = 'Lease Basics' | 'Tenant Rights' | 'Moving Tips' | 'Financial Planning';
export type PostStatus = 'draft' | 'published' | 'archived';

export interface Author {
  id: string;
  email: string;
  role: 'normal' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: BlogCategory;
  image_url: string;
  read_time: string;
  tags: string[] | null;
  slug: string | null;
  status: PostStatus;
  published_at: string | null;
  views_count: number;
  created_at: string;
  updated_at: string;
  author_id: string | null;
  author?: Author | null;
}