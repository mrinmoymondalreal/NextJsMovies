"use client";

import { useEffect, useRef, useState } from "react";
import { Movie } from "./types/movie";
import Link from "next/link";

export default function SearchForm(){
  let [movie, setData] = useState<Movie[]>([]);
  let inputRef = useRef<HTMLInputElement>(null);

  const Search = async (e: any)=>{
    let data = await (await fetch(`/api/search?q=${e.target.value}`)).json();
    if(!Array.isArray(data)) data = [data];
    setData(data.slice(0, 10));
  }

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };  

  useEffect(()=>{
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
    <form className="group" action="/search">
      <input ref={inputRef} onChange={Search} className="border border-black px-2 py-1" type="text" name="movie" placeholder="Search (Ctrl+K)" />
    </form>
    {
    movie.length > 0 
    && 
    <div className="bg-white rounded-md absolute pt-4 min-w-64 max-w-80 max-h-64 overflow-y-scroll">
      {movie.map((data: Movie)=>(
      <Link href={`/movie/${data.id}`} onClick={()=>setData([])} className="flex px-4 py-2 hover:bg-gray-100" key={data.id}>
        <div>
          <h1 className="text-xl font-bold">{data.title} ({data.year})</h1>
          <div id="description">
            {data.extract.trim().slice(0, 50)}
          </div>
        </div>
        <div className="flex-grow max-w-[100px] aspect-[2/3]">
          <img className="aspect-[2/3] object-cover" src={data.thumbnail} />
        </div>
      </Link>
      ))}
    </div>
    }
    </>
  );
}