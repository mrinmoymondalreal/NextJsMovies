import { Movie } from "@/lib/types/movie";
import { redirect } from "next/navigation";

async function fetchMovie(id: string){
  let movies: Movie[] = await (await fetch("http://localhost:3000/movie/data.json")).json();
  let data: Movie | undefined = movies.find((movie: Movie) => movie.id == parseInt(id));
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
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
