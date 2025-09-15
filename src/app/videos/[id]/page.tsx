import { videos } from '@/lib/data';
import { notFound } from 'next/navigation';
import VideoPlayerAndDetails from '@/components/video-player-and-details';

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = videos.find(v => v.id === params.id);

  if (!video) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <VideoPlayerAndDetails video={video} />
    </div>
  );
}

export async function generateStaticParams() {
  return videos.map(video => ({
    id: video.id,
  }));
}
