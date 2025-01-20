export interface Application {
  id: number;
  title: string;
  company: string;
  location: string;
  image_url?: string;
  url: string;
  description?: string;
  platform?: string;
  boardId: number;
  status: string;
  isHover?: boolean;
  created_at: string;
}
