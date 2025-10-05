import type { Metadata } from 'next';
import { getSchedule } from '@/lib/jikan-api';
import { Container } from '@/components/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Anime } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Airing Schedule | AnimeSpring',
  description: 'Check the weekly airing schedule for current anime.',
};

const daysOfWeek = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

async function getAllSchedules() {
  const scheduleData: Record<string, Anime[]> = {};
  for (const day of daysOfWeek) {
    try {
      const { data } = await getSchedule(day);
      scheduleData[day] = data;
    } catch (error) {
      console.error(`Failed to fetch schedule for ${day}`, error);
      scheduleData[day] = [];
    }
  }
  return scheduleData;
}

export default async function SchedulePage() {
  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const defaultTab = daysOfWeek.includes(today) ? today : 'monday';
    
    const scheduleData = await getAllSchedules();

    return (
      <Container>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-headline font-bold">Weekly Schedule</h1>
            <p className="text-lg text-muted-foreground">Find out when your favorite anime are airing.</p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
              {daysOfWeek.map(day => (
                <TabsTrigger key={day} value={day} className="capitalize">{day}</TabsTrigger>
              ))}
            </TabsList>
            {daysOfWeek.map(day => (
              <TabsContent key={day} value={day}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(scheduleData[day] && scheduleData[day].length > 0) ? (
                    scheduleData[day].map((anime: Anime, index: number) => (
                      <Link key={`${anime.mal_id}-${index}`} href={`/anime/${anime.mal_id}`}>
                        <Card className="hover:bg-muted transition-colors">
                          <CardContent className="flex items-center gap-4 p-3">
                            <Image
                              src={anime.images.jpg.image_url}
                              alt={anime.title}
                              width={60}
                              height={90}
                              className="rounded-md aspect-[2/3] object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold line-clamp-2">{anime.title}</h3>
                              {anime.broadcast ? (
                                <p className="text-sm text-muted-foreground">
                                  {anime.broadcast.time} ({anime.broadcast.timezone})
                                </p>
                              ) : null}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-muted-foreground py-10">
                      No anime scheduled for {day.charAt(0).toUpperCase() + day.slice(1)}.
                    </p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Container>
    );
  } catch (error) {
    console.error(error);
    return (
      <Container>
        <div className="text-center text-destructive">
          <h1 className="text-2xl font-bold">Could Not Load Schedule</h1>
          <p>Please try again later.</p>
        </div>
      </Container>
    );
  }
}
