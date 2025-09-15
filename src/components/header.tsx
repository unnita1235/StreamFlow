import { Film, Upload } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="font-bold font-headline text-lg">StreamFlow</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline">Upload Video</DialogTitle>
                <DialogDescription>
                  Select a video file and provide a title and description.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="video-file">Video File</Label>
                  <Input id="video-file" type="file" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="My awesome video" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea placeholder="A description of my video." id="description" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
