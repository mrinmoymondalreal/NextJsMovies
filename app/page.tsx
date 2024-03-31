import { Movie } from "@/lib/types/movie";

async function fetchMovie(){
  let data: Movie[] = [];
  let movies: Movie[] = await (await fetch("http://localhost:3000/movie/data.json")).json();
  for(let i = 0;i < 10;i++){
    data.push(movies[Math.floor(Math.random() * movies.length)]);
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
