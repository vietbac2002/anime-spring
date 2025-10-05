
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function PaginationControls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <span>Page {page}</span>
      <Button onClick={() => handlePageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}
