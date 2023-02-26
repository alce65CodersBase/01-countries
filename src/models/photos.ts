export type BasePhoto = {
  id: string;
  width: number;
  height: number;
  color: string;
  description: string;
  altDescription: string;
  urls: Urls;
};

export interface FullPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship?: any;
  topic_submissions: Topicsubmissions;
  user: User;
  tags: Tag[];
}

interface Tag {
  type: string;
  title: string;
  source?: Source;
}

interface Source {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: Coverphoto;
}

interface Coverphoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship?: any;
  topic_submissions: Topicsubmissions2;
  premium: boolean;
  user: User2;
}

interface User2 {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: any;
  portfolio_url: string;
  bio?: any;
  location?: any;
  links: Links2;
  profile_image: Profileimage;
  instagram_username?: any;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social2;
}

interface Social2 {
  instagram_username?: any;
  portfolio_url: string;
  twitter_username?: any;
  paypal_email?: any;
}

interface Topicsubmissions2 {}

interface Ancestry {
  type: Type;
  category: Type;
  subcategory: Type;
}

interface Type {
  slug: string;
  pretty_slug: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: Links2;
  profile_image: Profileimage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email?: any;
}

interface Profileimage {
  small: string;
  medium: string;
  large: string;
}

interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface Topicsubmissions {
  'color-of-water': Colorofwater;
  wallpapers: Colorofwater;
}

interface Colorofwater {
  status: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
