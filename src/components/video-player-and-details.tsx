'use client';

import { useState } from 'react';
import type { Video, Comment as CommentType } from '@/lib/data';
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { moderateContent } from '@/ai/flows/ai-content-moderation';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

const commentSchema = z.object({
  text: z.string().min(1, 'Comment cannot be empty.').max(500, 'Comment is too long.'),
});

export default function VideoPlayerAndDetails({ video }: { video: Video }) {
  const [likes, setLikes] = useState(video.likes);
  const [dislikes, setDislikes] = useState(video.dislikes);
  const [comments, setComments] = useState<CommentType[]>(video.comments);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    const moderationResult = await moderateContent({ text: values.text });
    if (moderationResult.isSafe) {
      const newComment: CommentType = {
        id: `c${Date.now()}`,
        author: 'GuestUser',
        text: values.text,
        timestamp: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Comment Flagged',
        description: `Your comment could not be posted. Reason: ${moderationResult.reason}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
        <video src={video.videoUrl} controls className="w-full h-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{video.title}</CardTitle>
          <CardDescription>{video.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setLikes(l => l + 1)}>
              <ThumbsUp className="mr-2" /> {likes.toLocaleString()}
            </Button>
            <Button variant="ghost" onClick={() => setDislikes(d => d + 1)}>
              <ThumbsDown className="mr-2" /> {dislikes.toLocaleString()}
            </Button>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex-col items-start gap-4 pt-6">
          <h2 className="text-2xl font-headline flex items-center">
            <MessageSquare className="mr-3" />
            Comments ({comments.length})
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>G</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <FormControl>
                          <Textarea placeholder="Add a comment..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Comment'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>

          <div className="w-full space-y-6 pt-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-4 animate-in fade-in duration-500">
                <Avatar>
                  <AvatarFallback>{comment.author.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
