import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAnimeByGenre } from '@/lib/jikan-api';
import AnimeCard from '@/components/anime-card';
import { AnimeGridSkeleton } from '@/components/anime-grid-skeleton';
import { Container } from '@/components/container';
import type { Anime } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ searchParams }: { searchParams: { name?: string } }): Promise<Metadata> {
  const genreName = searchParams.name || 'Genre';
  return {
    title: `${genreName} Anime | AnimeSpring`,
    description: `Browse ${genreName} anime.`,
  };
}

async function GenreAnimeList({ genreId }: { genreId: number }) {
  try {
    const animeData = await getAnimeByGenre(genreId, { limit: 20 });
    if (animeData.data.length === 0) {
      return <p className="text-center col-span-full">No anime found for this genre.</p>;
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeData.data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <p className="text-center col-span-full text-destructive">
        Failed to load anime for this genre. Please try again later.
      </p>
    );
  }
}

export default function GenrePage({ params, searchParams }: { params: { id: string }, searchParams: { name?: string } }) {
  const genreId = parseInt(params.id);
  const genreName = searchParams.name || 'Anime';

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/genres"><ArrowLeft /></Link>
          </Button>
          <h1 className="text-4xl font-headline font-bold">{genreName}</h1>
        </div>
        <Suspense fallback={<AnimeGridSkeleton count={20} />}>
          <GenreAnimeList genreId={genreId} />
        </Suspense>
      </div>
    </Container>
  );
}
