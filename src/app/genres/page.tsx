import Link from 'next/link';
import type { Metadata } from 'next';
import { getGenres } from '@/lib/jikan-api';
import { Container } from '@/components/container';
import { Card } from '@/components/ui/card';
import { Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Genres | AnimeSpring',
  description: 'Explore a wide variety of anime genres.',
};

export default async function GenresPage() {
  try {
    const genresData = await getGenres();
    const genres = genresData.data || [];

    return (
      <Container>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-headline font-bold">Explore Genres</h1>
            <p className="text-lg text-muted-foreground">Discover anime from your favorite genres.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <Link key={genre.mal_id} href={`/genres/${genre.mal_id}?name=${encodeURIComponent(genre.name)}`}>
                <Card className="p-4 text-center font-semibold transition-transform hover:scale-105 hover:bg-primary/10 hover:text-primary flex flex-col items-center justify-center gap-2 h-full">
                  <Tag className="w-6 h-6" />
                  <span>{genre.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">({genre.count} anime)</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    return (
      <Container>
        <div className="text-center text-destructive">
          <h1 className="text-2xl font-bold">Could Not Load Genres</h1>
          <p>Please try again later.</p>
        </div>
      </Container>
    );
  }
}
