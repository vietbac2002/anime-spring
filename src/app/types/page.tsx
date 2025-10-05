import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAnimeList } from '@/lib/jikan-api';
import type { Anime } from '@/lib/types';
import AnimeCard from '@/components/anime-card';
import { AnimeGridSkeleton } from '@/components/anime-grid-skeleton';
import { Container } from '@/components/container';
import { Filters } from './components/filters';
import { PaginationControls } from '@/components/pagination-controls';

export const metadata: Metadata = {
  title: 'Anime by Type | AnimeSpring',
  description: 'Browse anime by type: TV, Movie, OVA, and more.',
};

async function FilteredAnimeList({ type, q, page }: { type?: string; q?: string, page?: number }) {
  try {
    const animeData = await getAnimeList({ type, q, limit: 20, page });
    if (animeData.data.length === 0) {
      return <p className="text-center col-span-full">No anime found for the selected filters.</p>;
    }
    return (
      <>
        {animeData.data.map((anime: Anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </>
    );
  } catch (error) {
    return (
      <p className="text-center col-span-full text-destructive">
        Failed to load anime. Please try adjusting the filters or try again later.
      </p>
    );
  }
}

export default function TypesPage({
  searchParams,
}: {
  searchParams: { type?: string; q?: string; page?: string };
}) {
  const { type, q } = searchParams;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  // A key is used to force re-mounting of Suspense boundary on search param change
  const suspenseKey = `${type}-${q}-${page}`;

  return (
    <Container>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold">Browse by Type</h1>
          <p className="text-lg text-muted-foreground">Find anime by format and keywords.</p>
        </div>
        <Filters />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Suspense key={suspenseKey} fallback={<AnimeGridSkeleton count={20} />}>
            <FilteredAnimeList type={type} q={q} page={page} />
          </Suspense>
        </div>
        <PaginationControls />
      </div>
    </Container>
  );
}
