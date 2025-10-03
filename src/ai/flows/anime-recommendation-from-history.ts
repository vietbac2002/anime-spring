'use server';
/**
 * @fileOverview A flow to provide anime recommendations based on viewing history.
 *
 * - animeRecommendationFromHistory - A function that handles the anime recommendation process.
 * - AnimeRecommendationFromHistoryInput - The input type for the animeRecommendationFromHistory function.
 * - AnimeRecommendationFromHistoryOutput - The return type for the animeRecommendationFromHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimeRecommendationFromHistoryInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe(
      'A list of anime titles the user has watched, separated by commas.'
    ),
});
export type AnimeRecommendationFromHistoryInput = z.infer<
  typeof AnimeRecommendationFromHistoryInputSchema
>;

const AnimeRecommendationFromHistoryOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of anime recommendations based on the viewing history, separated by commas.'
    ),
});
export type AnimeRecommendationFromHistoryOutput = z.infer<
  typeof AnimeRecommendationFromHistoryOutputSchema
>;

export async function animeRecommendationFromHistory(
  input: AnimeRecommendationFromHistoryInput
): Promise<AnimeRecommendationFromHistoryOutput> {
  return animeRecommendationFromHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'animeRecommendationFromHistoryPrompt',
  input: {schema: AnimeRecommendationFromHistoryInputSchema},
  output: {schema: AnimeRecommendationFromHistoryOutputSchema},
  prompt: `You are an AI anime recommendation expert.

  Based on the user's viewing history, provide a list of anime recommendations.
  The recommendations should be separated by commas.

  User's Viewing History: {{{viewingHistory}}}`,
});

const animeRecommendationFromHistoryFlow = ai.defineFlow(
  {
    name: 'animeRecommendationFromHistoryFlow',
    inputSchema: AnimeRecommendationFromHistoryInputSchema,
    outputSchema: AnimeRecommendationFromHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
