const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

var moviesData = "";

//const carouselcaption=document.getElementById('carouselcaption')

getMovies(API_URL)
async function getMovies(API_URL){
    const res=await fetch (API_URL)
    const data=await res.json()
    displayMovies(data.results);
    displayMoviesCa(data.results);
    moviesData = data.results;
}
/** 
async function getMovie(API_URL){
    const res=await fetch (API_URL)
    const data=await res.json()
    displayMovies(data.results);
    displayMoviesCa(data.results);
    moviesData = data.results;
    

}
**/

function showMovie(movieId)
{
    console.log(moviesData[JSON.stringify(movieId)])
    sessionStorage.setItem("movie",JSON.stringify(moviesData[movieId]));
    location.href="movie.html";
    
    // console.log(movieId);
    
    //const movie=getMovie(BASE_URL + "/movie/"+id+"?"+API_KEY);
    //console.log(movie)
    
;}
function displayMoviesCa(movies){
    
    
    const {backdrop_path,release_date,title,vote_average,original_language,id}=movies[0];
    // sessionStorage.setItem("movie",JSON.stringify(movies[0]));
    var MovieYear=release_date.slice(0,4);
        let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
        var movieLang = languageNames.of(original_language);
        

    const carousel=document.querySelector('.carousel-inner');
    var carouselItem = "";
    var ratings=vote_average/2;
    carouselItem += `<div class="carousel-item active" data-bs-interval="10000" onclick=showMovie("${0}")>

        <img src="${IMG_URL + backdrop_path}" alt="${title}"/>
        
        
        <div class='movie-info'>
            <div class="ratings">
                <div class="Stars" style="--rating:${ratings};">
            
                <h3>${vote_average}</h3>
                </div>
            </div>
            <h3>${title}</h3>
            <h3>${MovieYear}</h3>
            <h3>${movieLang}</h3>
        </div>
        
        </div>`;
    

    movies.slice(1,3).forEach((movie, index)=>{

    console.log(index);
        
    const {backdrop_path,release_date,title,vote_average,original_language, id}=movie;
    // sessionStorage.setItem("movie",JSON.stringify(movie));

    var MovieYear=release_date.slice(0,4);
        let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
        var movieLang = languageNames.of(original_language);
        

        carouselItem += `<div class="carousel-item " data-bs-interval="10000" onclick=showMovie("${index}")>
    
        <img src="${IMG_URL + backdrop_path}" alt="${title}"/>
        <div class='movie-info'>
        <div class="Stars" style="--rating:${ratings};">
        </div>
        <h3>${title}</h3>
        
        <h3>${vote_average}</h3>
        <h3>${MovieYear}</h3>
        <h3>${movieLang}</h3>
        </div>
             
                
        </div>`;
     
        
        //carouselcaption.appendChild(moviesElement11);
    })
        carousel.innerHTML=carouselItem;

}

function displayMovies(movies) {
    var cardContainer = document.getElementById("main");
    var card = "";
    movies.forEach((movie, index)=>{
        
        const {poster_path,release_date,title,vote_average,original_language,id}=movie
        var MovieYear=release_date.slice(0,4);
        let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
        var movieLang = languageNames.of(original_language);
        
        
    
        card += `
        <div class="card col-lg-4 col-md-6 col-sm-12" onclick=showMovie(${index})>
            <img src="${IMG_URL + poster_path}" alt="${title}"/>

            <div class='movie-info'>
            
            <h3>${title}</h3>
            <h3>${vote_average}</h3>
            
            <h3>${movieLang}</h3>
            <h3>${MovieYear}</h3>
            </div>
        </div>`;
    });
    //console.log(card);
    cardContainer.innerHTML = card;
}

