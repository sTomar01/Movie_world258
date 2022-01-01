const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");

var moviesData = "";

getMovies(API_URL);
async function getMovies(API_URL) {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayMovies(data.results);
  displayMoviesCa(data.results);
  moviesData = data.results;
}

function showMovie(movieId) {
  console.log(moviesData[JSON.stringify(movieId)]);
  sessionStorage.setItem("movie", JSON.stringify(moviesData[movieId]));
  location.href = "movie.html";
}

function displayMoviesCa(movies) {
  const carousel = document.querySelector("#movies-carousel");
  var carouselItem = "";

  movies.forEach((movie, index) => {
    console.log(index);

    const {
      backdrop_path,
      release_date,
      title,
      vote_average,
      original_language,
      id,
    } = movie;

    var ratings = vote_average / 2;

    var MovieYear = release_date.slice(0, 4);
    let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    var movieLang = languageNames.of(original_language);

    carouselItem += `<div onclick=showMovie("${0}")>

    <img src="${IMG_URL + backdrop_path}" alt="${title}"/>
    
    
    <div class='carousel-content'>
        <div class="ratings">
            
            <div class="Stars" style="--rating:${ratings}">
        
            <div><h3 style="color: white;" class="rating_text">${"("+ratings+"/5)"}</h3></div>
            </div>
        </div>
        <h3 style="margin-top:-50px;font-size:18px;color: white;">${title}( ${MovieYear} | ${movieLang} )</h3>
        
    </div>
    
    </div>`;
  });
  carousel.innerHTML = carouselItem;
  handleCarousel(".owl-carousel");
}

function displayMovies(movies) {
  var cardContainer = document.getElementById("main");
  var card = "";
  
  
  movies.forEach((movie, index) => {
    const {
      poster_path,
      release_date,
      title,
      vote_average,
      original_language,
      id,
    } = movie;
    var MovieYear = release_date.slice(0, 4);
    let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    var movieLang = languageNames.of(original_language);
    var ratings = vote_average / 2;

    card += `
        <div class="card col-lg-4 col-md-6 col-sm-12" onclick=showMovie(${index})>
            <img src="${IMG_URL + poster_path}" alt="${title}"/>

            <div class='movie-info'>

            
            <h3 class="Movie_name_card">${title}</h3>
            <div class="Card_ratings">
            <div class="Stars" style="--rating:${ratings};">
        
            <div><h3 class="rating_text">${"("+ratings+"/5)"}</h3></div>
            </div>
        </div>
            
            
            <h3 class="Card_lang">${movieLang}<br>${MovieYear}</h3>
            </div>
        </div>`;
  });
  //console.log(card);
  cardContainer.innerHTML = card;
}

const handleCarousel = (carouselName) => {
  $(carouselName).owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      520: {
        items: 2,
        nav: false,
      },
      768: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });
};
