export interface ListItem {
  url: string;
  statusCode: number;
  contentType: string;
  contentLength?: number;
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  favicon?: string;
}