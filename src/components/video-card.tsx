import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/videos/${video.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={video.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl leading-tight">
            {video.title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
