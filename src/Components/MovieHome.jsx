import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import Spinner from "./Spinnner";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc,setDoc,getDoc, updateDoc,deleteField} from "firebase/firestore";
const MovieHome = ({currentUser}) => {
  const location=useLocation();
  // // console.log(location)
  const categoryFilter=useSelector((state)=>state.category.categoryFilter)
  const languageFilter=useSelector((state)=>state.language.languageFilter)
  const searchMovie=useSelector((state)=>state.search.searchMovie)
  const [movies, setMovies] = useState([]);
  const [heading ,setHeading]=useState("");
  const [fetching,setFetching]=useState(false);
  // const tmdb_api_key=import.meta.env.VITE_TMDB_API_KEY
  const tmdb_api_key="your api key"
  const isObjectEmpty=(obj)=> {
    return Object.keys(obj).length === 0;
  }
  useEffect(() => {
    // // console.log(searchMovie);
    if(!isObjectEmpty(searchMovie) && location.pathname==="/search"){
      const url=`https://api.themoviedb.org/3/${searchMovie.prefix}?api_key=${tmdb_api_key}&${searchMovie.query}`
      // // console.log(url);
      const heading2=searchMovie.text;
      setFetching(true)
      fetchSearch(url,heading2);
    }
    else if(!isObjectEmpty(languageFilter) && !isObjectEmpty(categoryFilter)){
      const url=`https://api.themoviedb.org/3/${languageFilter.languagePrefix}?api_key=${tmdb_api_key}&${languageFilter.language}&${categoryFilter.genre}`
      const heading2=`${languageFilter.languageTitle} ${categoryFilter.genreTitle} movies`
      setFetching(true)
      fetchFilter(url,heading2)
    }
    else if(!isObjectEmpty(languageFilter)){
      const url=`https://api.themoviedb.org/3/${languageFilter.languagePrefix}?api_key=${tmdb_api_key}&${languageFilter.language}`
      const heading2=`${languageFilter.languageTitle} movies`
      setFetching(true)
      fetchFilter(url,heading2)
    }
    else if(!isObjectEmpty(categoryFilter)){
      // // console.log(categoryFilter);
      const url=`https://api.themoviedb.org/3/${categoryFilter.genrePrefix}?api_key=${tmdb_api_key}&${categoryFilter.genre}`
      const heading2=`${categoryFilter.genreTitle} movies`
      setFetching(true)
      fetchFilter(url,heading2)
    }
    else{
      
      setFetching(true)
      fetchPopular();
    }
  }, [categoryFilter,languageFilter,searchMovie]);
  const fetchSearch=async(url,heading2)=>{
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Network response was not ok (status ${data.status})`);
      }
  
      const moviesF = await data.json();
      if(moviesF.results.length==0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `No results found for ${heading2} please check the spelling and try again`,
        })
      }
      setMovies(moviesF.results);
      setHeading(heading2)
      setFetching(false);
    } catch (error) {
      // toast.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Unable to load ${heading2}`,
      })
      
      fetchPopular()
    }
  }

  
  const fetchFilter=async(url,heading2)=>{
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Network response was not ok (status ${data.status})`);
      }
  
      const moviesF = await data.json();
      setMovies(moviesF.results);
      setHeading(heading2)
      setFetching(false);
    } catch (error) {
      // toast.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Unable to load ${heading2}`,
      })
      
      fetchPopular()
    }
  }
  const fetchPopular=async()=>{
    const url=`https://api.themoviedb.org/3/movie/popular?api_key=${tmdb_api_key}`
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Network response was not ok (status ${data.status})`);
      }
  
      const moviesF = await data.json();
      setMovies(moviesF.results);
      setHeading("Popular movies")
      setFetching(false);
    } catch (error) {
      // toast.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    }
  }
  // showing favourites and watchlist
  

  // database manipultion

  const [favoriteMovies,setFavouriteMovies]=useState([]);
  const [watchlistMovies,setWatchListMovies]=useState([]);
  useEffect(()=>{
    if(currentUser!==null){
      getFavMovies();
      getWatchlistMovies();
    }
    else{
      setFavouriteMovies([]);
      setWatchListMovies([]);
    }
  },[currentUser])

  //Favourite Movies
  const getFavMovies=async()=>{
    try {
      const docRef=doc(db,"favorites",currentUser.uid);
      // console.log(docRef);
      const docSnapshot = await getDoc(docRef); 
      if (docSnapshot.exists()) {
        // // console.log(docSnapshot.data().movies);
        // setFavouriteMovies(docSnapshot.data().movies)
        const data=docSnapshot.data();
        const favArray=Object.values(data);
        setFavouriteMovies(favArray);
        // console.log(favArray)
      } else {
        // // console.log("Document does not exist.");
        // await setDoc(docRef,{
        //   movies:[]
        // })
      }

    } catch (error) {
      alert(error.message)
      // console.log(error)
    }
  }
  const addToFavorites = async (movie) => {
    if(currentUser===null){
      toast.info("You need to login to add to favourites");
      return;
    }

    try {
      const updatedFavoriteMovies = favoriteMovies.concat(movie);
      setFavouriteMovies(updatedFavoriteMovies)
      // console.log("Adding to favourites")
      const favRef=doc(db,"favorites",currentUser.uid);
      // console.log(favRef);
      await setDoc(favRef,{[movie.id]:movie},{merge:true});
      console.log("added to favourites");
    } catch (error) {
      console.log(error);
      // toast.error("Error adding movie to favorites:", error);
      const updatedFavoriteMovies=favoriteMovies.filter((favMovie)=>favMovie.id!==movie.id);
      setFavouriteMovies(updatedFavoriteMovies);
    }
  };
  const RemoveFromFavourites = async (movie) => {
    try {
      const updatedFavoriteMovies=favoriteMovies.filter((favMovie)=>favMovie.id!==movie.id);
      setFavouriteMovies(updatedFavoriteMovies);
      // console.log("Adding to favourites")
      const favRef=doc(db,"favorites",currentUser.uid);
      // console.log(favRef);
      await updateDoc(favRef, {
        [movie.id]:deleteField()
      });
      
    } catch (error) {
      // toast.error("Error adding movie to favorites:", error);
      console.log(error);
      const updatedFavoriteMovies = favoriteMovies.concat(movie);
      setFavouriteMovies(updatedFavoriteMovies)
    }
  };
  
  // Watchlist Movies
  const getWatchlistMovies=async()=>{
    try {
      const docRef=doc(db,"watchlist",currentUser.uid);
      // console.log(docRef);
      const docSnapshot = await getDoc(docRef); 
      if (docSnapshot.exists()) {
        // // console.log(docSnapshot.data().movies);
        // setWatchListMovies(docSnapshot.data().movies)
        const data=docSnapshot.data();
        const watchArray=Object.values(data);
        setWatchListMovies(watchArray);
        // console.log(watchArray)
      } else {
        // // console.log("Document does not exist.");
        // await setDoc(docRef,{
        //   movies:[]
        // })
      }

    } catch (error) {
      alert(error.message)
      // console.log(error)
    }
  }
  const addToWatchlist = async (movie) => {
    if(currentUser===null){
      toast.info("You need to login to add to watchlist");
      return;
    }
    try {
      // console.log("Adding to favourites")
      const updatedWatchlistMovies = watchlistMovies.concat(movie);
      setWatchListMovies(updatedWatchlistMovies);
      const watchRef=doc(db,"watchlist",currentUser.uid);
      await setDoc(watchRef,{[movie.id]:movie},{merge:true});
      
    } catch (error) {
      console.log(error);
      // toast.error("Error adding movie to favorites:", error);
      const updatedWatchlistMovies=watchlistMovies.filter((favMovie)=>favMovie.id!==movie.id);
      setWatchListMovies(updatedWatchlistMovies);
    }
  };
  const removeFromWatchlist = async (movie) => {
    try {
      // console.log("Adding to favourites")
      const updatedWatchlistMovies=watchlistMovies.filter((favMovie)=>favMovie.id!==movie.id);
      setWatchListMovies(updatedWatchlistMovies);
      const favRef=doc(db,"watchlist",currentUser.uid);
      // console.log(favRef);
      await updateDoc(favRef, {
        [movie.id]:deleteField()
      });
      
    } catch (error) {
      // toast.error("Error adding movie to favorites:", error);
      const updatedWatchlistMovies = watchlistMovies.concat(movie);
      setWatchListMovies(updatedWatchlistMovies);
    }
  };
  useEffect(()=>{
    if(currentUser!==null){
      // console.log("useEffect path is called")
      if(location.pathname==='/favourites'){
        // console.log("Location is favourite")
        setMovies(favoriteMovies);
        // console.log(movies)
        setHeading("Your Favourite Movies");
      }
      if(location.pathname==='/watchlist'){
        console.log("location is watchlist")
        setMovies(watchlistMovies);
        setHeading('Watchlist Movies');
      }
    }
  },[location,favoriteMovies,watchlistMovies])
  return (
    <><ToastContainer theme="colored"/> { fetching?<Spinner/> :
      <div className={`${location.pathname==='/favourites' || location.pathname==='/watchlist'?'mt-24':'mt-40'} dark:text-white flex flex-col items-center`}>
        <div>
        <h1 className="text-4xl md:text-6xl text-black font-bold dark:text-white ">
          {heading}
        </h1>
        </div>
        <div className="px-8">
          <div className="container grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl-grid-cols-4 mt-8">
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} favoriteMovies={favoriteMovies} 
              watchlistMovies={watchlistMovies} addToFavorites={addToFavorites} 
              addToWatchlist={addToWatchlist} RemoveFromFavourites={RemoveFromFavourites}
              removeFromWatchlist={removeFromWatchlist}
              
              />;
            })}
          </div>
        </div>
      </div>
}
    </>
  );
};

export default MovieHome;
