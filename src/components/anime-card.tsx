import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

import type { Anime } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const placeholderImage = PlaceHolderImages.find(p => p.id === 'anime-poster-placeholder');

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const imageUrl = anime.images?.jpg?.image_url || placeholderImage?.imageUrl || "https://picsum.photos/seed/anime/225/320";
  const imageHint = placeholderImage?.imageHint || "anime poster";

  return (
    <Link href={`/anime/${anime.mal_id}`} className="group outline-none">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:shadow-primary/40 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={imageUrl}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              data-ai-hint={imageHint}
            />
          </div>
        </CardContent>
        <CardHeader className="p-3">
          <CardTitle className="text-base font-headline font-semibold leading-tight line-clamp-2">
            {anime.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className="p-3 pt-0 flex justify-between items-center text-sm text-muted-foreground">
          <Badge variant="secondary" className="capitalize">{anime.type || 'N/A'}</Badge>
          {anime.score && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{anime.score.toFixed(2)}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
