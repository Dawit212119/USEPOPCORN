






import { useEffect,useState } from "react";
const KEY='119c5eea';
export function useMovies(query,setselectedmovie){

const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState();
  const [error,setError]=useState("");
useEffect(function(){
        

    const controller=new AbortController();
  async function fetchMovie(){
    try{
      setIsLoading(true)
      setError('')
    const res=  await  fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

    if(!res.ok)
      throw new Error("Somthing went wrong with featching movie")

    const data = await res.json()
 console.log(data)
    if(data.Response ==='False') 
       throw new Error("movie not found")

  console.log(error)
    setMovies(data.Search)
setError("");
        
            
  }catch(err) { 
    if(!err.name!== "AbortError") {
    setError(err.message) ;
  }
  } finally {
    setIsLoading(false)
  }

}
if (!query.length){
  setMovies([]);
  setError('');
  return
}

setselectedmovie(null);
  fetchMovie();

  return function (){
    controller.abort();
  }

},[query,error,setselectedmovie])
return [movies,isLoading,error]}