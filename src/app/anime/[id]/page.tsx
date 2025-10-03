import { getAnimeDetails } from "@/lib/jikan-api";
import { Container } from "@/components/container";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  const animeId = parseInt(params.id, 10);

  try {
    const { data: anime } = await getAnimeDetails(animeId);
    
    return (
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              width={350}
              height={500}
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-headline font-bold text-primary">{anime.title_english || anime.title}</h1>
            <p className="text-lg text-muted-foreground">{anime.title_japanese}</p>
            <div className="flex flex-wrap gap-2">
              {anime.genres.map(genre => <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>)}
            </div>
            <div className="flex items-center gap-4 text-lg">
              {anime.score && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{anime.score.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">({anime.scored_by?.toLocaleString()} users)</span>
                </div>
              )}
              <span>{anime.type} ({anime.episodes} eps)</span>
              <span>{anime.rating}</span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="font-headline text-2xl">Synopsis</h2>
              <p>{anime.synopsis || "No synopsis available."}</p>
            </div>
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    return (
      <Container>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Anime Not Found</h1>
          <p>Sorry, we couldn&apos;t find the details for this anime.</p>
        </div>
      </Container>
    );
  }
}
