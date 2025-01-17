import { useEffect, useRef, useState } from "react";
import StarRating from "./starrating";
import  {useMovies} from "./useMovies.js"
import { useLocalStorage } from "./useLocalStorageState.js";
import { useKey } from "./useKey.js";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY='119c5eea';
export default function App() {
  const [query, setQuery] = useState("");
  //const [movies, setMovies] = useState([]);
  // const [isLoading,setIsLoading]=useState();
  // const [error,setError]=useState("");
const [selectedmovie,setselectedmovie]=useState(null)
  //const [watched,setWatched]=useState([]);
// const [watched, setWatched] = useState(function(){
//   const storedValue=localStorage.getItem("watched")
//   return storedValue ? JSON.parse(storedValue) : [];
// });
const [movies,isLoading,error]=useMovies(query,setselectedmovie);
         const [watched,setWatched]=useLocalStorage([],'watched');


  function handleselected(id){
    setselectedmovie((selectedId)=>id===selectedId? null : id )
  }


function handleWatched(movie){ 
  
   setWatched((watched)=> [...watched,movie])
}

function handleDelete(id){
  setWatched((watched)=>watched
  .filter((movie)=>movie.imdbID!==id))
}    
  

 

 
         
// useEffect(function(){
        

//     const controller=new AbortController();
//   async function fetchMovie(){
//     try{
//       setIsLoading(true)
//       setError('')
//     const res=  await  fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

//     if(!res.ok)
//       throw new Error("Somthing went wrong with featching movie")

//     const data = await res.json()
//  console.log(data)
//     if(data.Response ==='False') 
//        throw new Error("movie not found")

//   console.log(error)
//     setMovies(data.Search)
// setError("");
        
            
//   }catch(err) { 
//     if(!err.name!== "AbortError") {
//     setError(err.message) ;
//   }
//   } finally {
//     setIsLoading(false)
//   }

// }
// if (!query.length){
//   setMovies([]);
//   setError('');
//   return
// }

// setselectedmovie(null);
//   fetchMovie();

//   return function (){
//     controller.abort();
//   }

// },[query,error])
  
  return (
    <>
        <Navbar > 
        <Logo/>
        <Search  query={query} setQuery={setQuery}/>
       <Numlist movies={movies} />

        </Navbar>
    <Main>  
    <Listbox>



      {!isLoading && !error && <Movielist movies={movies} onMovieDe={handleselected}/>}
      { isLoading && <Loading/>  }
      {error && <ErrorMessage message={error}/>}

    </Listbox>
    
    <Listbox>

      { selectedmovie ? <MovieDetial selectedmovie={selectedmovie}
       setselectedmovie={setselectedmovie} 
       onAddWatched={handleWatched} 
       watched={watched}/> : 
       <>        <WatchedSummary watched={watched}/>
      <WatchedMovieList  watched={watched} onDeleteWatched={handleDelete}/>         </>
      
           
           }

    </Listbox>
    </Main>

    
       

    </>
  );
}
function Loading(){
  return <p className="loader">Loading...</p>
}


function ErrorMessage({message}){

  return (
  <p className="error">{message}</p>)
}

function MovieDetial({selectedmovie,setselectedmovie
  ,onAddWatched,watched}){
  const [userRating,setUserRating]=useState(0);
    const [movie,setMovie]=useState({});
       const [isLoading,setIsLoading]=useState(false)
      
        const watchedUserRating=watched.find((movie)=>movie.imdbID===selectedmovie)?.userRating
        const watchedMovie = watched.find((movie) => movie.imdbID === selectedmovie);
        const isWatched = Boolean(watchedMovie);
      //  const isWatched= watched.map((watched)=>watched.imdbid).includes(selectedmovie)
   const {Title:title, Year:year,Poster:poster,
    Runtime:runtime,imdbRating,Plot:plot,
    Released:released,Actors:actors,
    Director:director,Genre:genre }=movie;

  const countref=useRef(0);


  useEffect(function(){
    if(userRating)
    countref.current=countref.current+1;

  },[userRating])







          function handleAdd(){
         
            const newWatchedMovie={
              imdbID: selectedmovie,
              title,
              year,
              poster,
              imdbRating:Number(imdbRating),
              runtime:Number(runtime.split(" ").at(0)),
              userRating,
              countdecisions:countref.current
            }
            onAddWatched(newWatchedMovie);
            setselectedmovie(null);
          }

    useEffect(function(){

      async function getMovieDetails(){
        setIsLoading(true)
        const res= await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedmovie}`)
        const data=await res.json();
            console.log(data);

             setMovie(data);
            setIsLoading(false);

      }
      getMovieDetails();
    }
    ,[selectedmovie])

    // useEffect(function(){
    //     function callback(e){
    //       if(e.code === "Escape"){
    //         setselectedmovie(null)
    //       }
    //     }
    //   document.addEventListener("keydown", callback)

    //   return function(){
    //     document.removeEventListener("keydown",callback)
    //   }
    //  },[])    

         useKey('Escape',setselectedmovie);

   useEffect(function(){
    if(!title) return;
   
    document.title=`Movie | ${title}`
     return function (){
      document.title="usePopCorn";
     }

   },[title])

  return (
    <div className="details"> 

   <header> 
   <button className="btn-back" onClick={()=>setselectedmovie(null)} >&larr;</button>
      <img  src={poster} alt={`Poster of ${movie} movie`}/>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{released} &bull; {runtime}</p>
        <p>{genre}</p>
        <p><span>⭐</span>{imdbRating}</p>
        </div>  
       
       
       </header>
  <section>
    <div className="rating">
      { !isWatched ?  ( 
      <>
        <StarRating  maxRating={10} 
     defaultRating={1}  size={24} onSetRating={setUserRating} />  
   { userRating >0 &&  (
  <button className="btn-add" onClick={handleAdd} ref={countref}>+ Add to list</button>)
   }</>) :  (<p>u watched the movie  <span>{watchedUserRating}</span></p>)}
         </div>
   
    <p>
      <em>{plot}</em>
    </p>
    <p>Staring {actors}</p>
    <p>Directed by {director}</p>
  </section>

 </div>

    
  )
}
/* eslint-disable */


function Navbar({children}){
  return (
<nav className="nav-bar">
       
      {children}
       
      
      </nav>)
;
}
function  Logo(){
  return  (
<div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>)
}
function Search({query,setQuery}){


  const inputEl=useRef(null); 


   useEffect(function(){
      function  callback(e){
        if(document.activeElement=== inputEl.current) 
          return;


    if(e.code==="Enter"){
      inputEl.current.focus();
      console.log(inputEl.current)
      setQuery("");
    }
      }




    document.addEventListener("keydown",callback)
    return  function(){
      document.removeEventListener("keydown",callback)
    }
   },[setQuery])






 return  (
  <input
  className="search"
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  ref={inputEl}
/>)
}

function Numlist({movies})
{
  
   return  (
  <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>)
}

function Main({children}){
 // const [query, setQuery] = useState("");
 

 
  return(
    
    <main className="main">
      
       {children}
  
</main>
)
}
function Listbox({children}){
  const [isOpen1, setIsOpen1] = useState(true);
  // const [movies, setMovies] = useState(tempMovieData);

      return  (
  <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >
      {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 &&  children}
     
    
  </div>) 
  
}

function Movielist({movies,onMovieDe}){

  return(
    <ul className="list list-movies">
    {movies?.map((movie) => <Movie movie={movie} onMovieDe={onMovieDe}/>)}
  </ul>

  )
}
function Movie({movie,onMovieDe}){

return (
  <li key={movie.imdbID}  onClick={()=>onMovieDe(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
)
}

// function Watchedbox({children}){
//   //const [movies, setMovies] = useState(tempMovieData);

 

//   const [isOpen2, setIsOpen2] = useState(true);
//   return (    
       
// <div className="box">
//   <button
//     className="btn-toggle"
//     onClick={() => setIsOpen2((open) => !open)}
//   >
//     {isOpen2 ? "–" : "+"}
//   </button>
//   {isOpen2 && 
//        children
     
//     }
// </div>
//   )
// }

function WatchedSummary({ watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
         return (
<div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>

         )
}

function WatchedMovieList({watched,onDeleteWatched}){
  return ( <ul className="list">
    {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>)}
  </ul>)
}

function WatchedMovie({movie,onDeleteWatched}){
  return (

<li>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>

      <button className="btn-delete" 
      onClick={()=>onDeleteWatched(movie.imdbID)}/>

        </div>
      </li>
  )
} 


