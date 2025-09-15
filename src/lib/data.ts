import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  imageHint: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

const placeholderImagesMap = new Map<string, ImagePlaceholder>(
  PlaceHolderImages.map(img => [img.id, img])
);

const getPlaceholderImage = (id: string) => {
    const img = placeholderImagesMap.get(id);
    if (!img) {
        return {
            imageUrl: "https://picsum.photos/seed/default/600/400",
            imageHint: "placeholder"
        }
    }
    return {
        imageUrl: img.imageUrl,
        imageHint: img.imageHint,
    }
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Exploring the Alps',
    description: 'A breathtaking journey through the scenic landscapes of the Swiss Alps. Experience the majestic mountains, serene lakes, and charming villages.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: getPlaceholderImage('video-1').imageUrl,
    imageHint: getPlaceholderImage('video-1').imageHint,
    likes: 1200,
    dislikes: 45,
    comments: [
      { id: 'c1', author: 'Alex', text: 'Absolutely stunning footage!', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: 'c2', author: 'Maria', text: 'Makes me want to go there right now.', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: '2',
    title: 'The Art of Minimalist Design',
    description: 'A deep dive into the principles of minimalist architecture and interior design. Learn how less can be more.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: getPlaceholderImage('video-2').imageUrl,
    imageHint: getPlaceholderImage('video-2').imageHint,
    likes: 850,
    dislikes: 12,
    comments: [
      { id: 'c3', author: 'John', text: 'Great insights! Very inspiring.', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: '3',
    title: 'A Day in the Life of a Panda',
    description: 'Get up close and personal with the adorable giant pandas. Watch them eat, play, and snooze in their natural habitat.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: getPlaceholderImage('video-3').imageUrl,
    imageHint: getPlaceholderImage('video-3').imageHint,
    likes: 3400,
    dislikes: 10,
    comments: [],
  },
  {
    id: '4',
    title: 'Mastering Sourdough Bread',
    description: 'A step-by-step guide to baking the perfect loaf of sourdough bread at home. From starter to a crispy crust.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: getPlaceholderImage('video-4').imageUrl,
    imageHint: getPlaceholderImage('video-4').imageHint,
    likes: 2100,
    dislikes: 20,
    comments: [
        { id: 'c4', author: 'BakerBen', text: 'This recipe is foolproof!', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
        { id: 'c5', author: 'FoodieFan', text: 'My bread turned out amazing, thanks!', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: '5',
    title: 'Tokyo After Dark',
    description: 'Explore the vibrant nightlife of Tokyo. Neon lights, bustling streets, and hidden gems in the world\'s largest metropolis.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: getPlaceholderImage('video-5').imageUrl,
    imageHint: getPlaceholderImage('video-5').imageHint,
    likes: 1800,
    dislikes: 55,
    comments: [],
  },
  {
    id: '6',
    title: 'The Ultimate Frisbee Highlights',
    description: 'Witness incredible plays, epic catches, and jaw-dropping throws from the world of Ultimate Frisbee.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: getPlaceholderImage('video-6').imageUrl,
    imageHint: getPlaceholderImage('video-6').imageHint,
    likes: 950,
    dislikes: 30,
    comments: [],
  },
];
