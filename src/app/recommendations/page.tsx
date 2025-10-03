import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { RecommendationForm } from './components/recommendation-form';

export const metadata: Metadata = {
  title: 'AI Recommendations | AnimeSpring',
  description: 'Get AI-powered anime recommendations based on your viewing history.',
};

export default function RecommendationsPage() {
  return (
    <Container className="max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold">AI Recommendation Tool</h1>
          <p className="text-lg text-muted-foreground">
            Enter anime you&apos;ve enjoyed, and our AI will suggest what to watch next!
          </p>
        </div>
        <RecommendationForm />
      </div>
    </Container>
  );
}
