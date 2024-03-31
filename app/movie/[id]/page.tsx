import { Movie } from "@/lib/types/movie";
import { Metadata } from "next";
import { redirect } from "next/navigation";

async function fetchMovie(id: string) {
  const movies: Movie[] = Object.values(await import('@/public/movie/data.json')) as Movie[];
  let data: Movie | undefined = movies.find((movie: Movie) => movie.id == parseInt(id));
  return data;
}

type Props = {
  params: { id: string };
};


export default async function Page({ params }: Props) {
  let data: Movie | undefined = await fetchMovie(params.id);
  if(!data) return redirect('/');
  return (
    <main className="flex w-full gap-x-2">
      <div className="">
        <h1 className="text-3xl font-bold">{data.title} ({data.year})</h1>
        <div id="description" className="mt-4">
          {data.extract}
        </div>
      </div>
      <div className="flex-grow min-w-[40%] aspect-[2/3]">
        <img className="aspect-[2/3] object-cover" src={data.thumbnail} alt={`${data.title} (${data.year})`} />
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const movie: Movie | undefined =  await fetchMovie(params.id);
  return {
    title: movie?.title,
    description: movie?.extract,
  };
}

