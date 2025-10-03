'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

const animeTypes = ['tv', 'movie', 'ova', 'special', 'ona', 'music'];

export function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState(searchParams.get('q') || '');
  const [debouncedText] = useDebounce(text, 500);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );
  
  useEffect(() => {
    router.push(`${pathname}?${createQueryString({ q: debouncedText || null })}`);
  }, [debouncedText, router, pathname, createQueryString]);

  const handleTypeChange = (type: string) => {
    router.push(`${pathname}?${createQueryString({ type: type === 'all' ? null : type })}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for anime..."
          className="pl-10"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <Tabs value={searchParams.get('type') || 'all'} onValueChange={handleTypeChange}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          {animeTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="capitalize">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
