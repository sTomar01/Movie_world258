const movie = JSON.parse(sessionStorage.getItem("movie"));
console.log("movie", movie.title);
const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/movie/" + movie.id + "/credits?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const header = document.getElementById("header");

//const carouselcaption=document.getElementById('carouselcaption')

getMovies(API_URL);
async function getMovies(API_URL) {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayMovies(data.cast);
}

function displayMovies(casts) {
  const heading = document.getElementById("MovieName");
  heading.innerHTML = movie.title;
  main.innerHTML = "";
  const {
    poster_path,
    release_date,
    title,
    vote_average,
    original_language,
    overview,
  } = movie;
  var MovieYear = release_date.slice(0, 4);
  let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  var movieLang = languageNames.of(original_language);

  const moviesTag = `
    <div class="d-flex pr-5 justify-content-end">
        <img id="movieimage"src="${IMG_URL + poster_path}" alt="${title}"/>
    </div>
    <div>
        <h3>${title}</h3>
        
        <h3>${vote_average}</h3>
        <h3>${movieLang}</h3>
        <h3>${MovieYear}</h3>
    </div>
  `;

  const Overview_Data=document.getElementById("Overview_data");
  Overview_Data.innerHTML = movie.overview;
  main.innerHTML = moviesTag;


    const Cast_Data=document.getElementById("cast_data")
    var castString=""
    casts.forEach(cast_details => {
        const {original_name,profile_path} = cast_details;

        castString += `
        <div class="cast_data">
        <img src="${IMG_URL + profile_path}"  class="cast_image">
        <h3 class="cast_name"> ${original_name}</h3>
    </div>`;
        
    });
    Cast_Data.innerHTML=castString;

  // main.appendChild(moviesElement3);
}
