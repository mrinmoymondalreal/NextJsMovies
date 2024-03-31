import movies from '@/public/movie/data.json';
import { Movie } from '@/lib/types/movie';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest
) {
  let data = (movies as Movie[]).filter(({title}: Movie) => title.toLowerCase().indexOf(req.nextUrl.searchParams.get('q')?.toLowerCase()!) > -1);
  return new Response(JSON.stringify(data.slice(0,10) || []));
}
