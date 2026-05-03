export type ProductType = 'PDF' | 'AUDIO' | 'COURSE';

export interface Lesson {
  title: string;
  type: 'video' | 'audio' | 'text';
  contentUrl?: string;
  textContent?: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  type: ProductType;
  preview: string;
  file_url: string;
  isPremium: boolean;
  lessons?: Lesson[];
}
