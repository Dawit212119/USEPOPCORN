  
import { useEffect,useState } from "react"

  export function useKey(key,setselectedmovie){


    useEffect(function(){
        function callback(e){
          if(e.code === key){
            setselectedmovie(null)
          }
        }
      document.addEventListener("keydown", callback)

      return function(){
        document.removeEventListener("keydown",callback)
      }
     },[setselectedmovie,key])

     return []

  }