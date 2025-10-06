import type { JikanResponse, Anime, Genre, ScheduleData } from './types';

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

async function fetchJikan<T>(endpoint: string, params?: Record<string, any>): Promise<JikanResponse<T>> {
  const url = new URL(`${JIKAN_API_BASE_URL}/${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
  }

  // Add a delay to avoid hitting rate limits
  await new Promise(resolve => setTimeout(resolve, 500));

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!response.ok) {
    const errorBody = await response.json();
    console.error(`Jikan API Error: ${response.status} ${response.statusText}`, errorBody);
    throw new Error(`Failed to fetch from Jikan API: ${endpoint}`);
  }
  return response.json();
}

export async function getCurrentSeason(options: { page?: number; limit?: number } = {}): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<Anime[]>('seasons/now', { page: options.page, limit: options.limit });
}

export async function getAnimeList(options: { type?: string; q?: string; page?: number; limit?: number }): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<Anime[]>('anime?sfw=false', options);
}

export async function getGenres(): Promise<JikanResponse<Genre[]>> {
  return fetchJikan<Genre[]>('genres/anime', { filter: 'genres' });
}

export async function getAnimeByGenre(genreId: number, options: { page?: number; limit?: number } = {}): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<Anime[]>(`anime`, { genres: genreId, ...options });
}

export async function getSchedule(day: string): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<Anime[]>(`schedules`, { filter: day });
}

export async function getAnimeDetails(id: number): Promise<JikanResponse<Anime>> {
  return fetchJikan<Anime>(`anime/${id}/full`);
}
