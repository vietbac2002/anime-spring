import { Suspense } from 'react';
import { getCurrentSeason } from '@/lib/jikan-api';
import AnimeCard from '@/components/anime-card';
import { AnimeGridSkeleton } from '@/components/anime-grid-skeleton';
import { Container } from '@/components/container';
import type { Anime } from '@/lib/types';

async function CurrentSeasonAnime() {
  try {
    const animeData = await getCurrentSeason({ limit: 15 });
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeData.data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-destructive">
        <p>Failed to load current season anime. Please try again later.</p>
      </div>
    );
  }
}

export default function Home() {
  return (
    <Container>
      <div className="space-y-8">
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter">
            Welcome to AnimeSpring
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your modern gateway to the vibrant world of anime. Discover what&apos;s airing now.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-headline font-semibold mb-6 border-l-4 border-primary pl-4">
            Currently Airing
          </h2>
          <Suspense fallback={<AnimeGridSkeleton count={15} />}>
            <CurrentSeasonAnime />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
