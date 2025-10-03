import { Clapperboard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Clapperboard className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">AnimeSpring</span>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AnimeSpring. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
