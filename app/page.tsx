import { Movie } from "@/lib/types/movie";


async function fetchMovie(): Promise<Movie[]> {
  const _m: unknown = Object.values(await import('@/public/movie/data.json'));
  
  const data: Movie[] = [];
  for (let i = 0; i < 10; i++) {
    let movies: Movie[] = _m as Movie[];
    const randomIndex = Math.floor(Math.random() * movies.length);
    data.push(movies[randomIndex] as Movie);
  }
  
  return data;
}

export default async function Home() {
  let data = await fetchMovie();
  return (
    <div className="flex flex-col items-start ">
      <h1>Some random movies from the database:</h1>
      <ul className="list-disc list-inside px-6 py-4">
        {data.map(({ title, id } : Movie)=>{
          return <li key={id}><a href={`/movie/${id}`}>{title}</a></li>;
        })}
      </ul>
    </div>
  );
}
