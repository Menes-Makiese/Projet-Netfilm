//TMDB API movies
import { getColor, animateOnAction, scrollToClass } from "./script.js";

export const api_key = 'api_key=998f7a07259a3b294343ae30db28d0cd';
export const base_url = 'https://api.themoviedb.org/3';
export const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
export const img_url = 'https://image.tmdb.org/t/p/w500';

const genresMovie = [
    {
        "id": 0,
        "name": "Popular"
    },
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

const main = document.getElementById("main");
const genreElementMovie = document.getElementById("genresMovies");
const movieBtn = document.getElementById("movieBtn");

let selectedGenreMovie = [];

getGenreMovie();
function getGenreMovie() {
    genreElementMovie.innerHTML = "";
    genresMovie.forEach(genre => {
        const option = document.createElement("option");
        option.classList.add('tag');
        option.value = genre.id; 
        option.textContent = genre.name; // 
        genreElementMovie.appendChild(option);
    });

    genreElementMovie.value = "0";

    
    genreElementMovie.addEventListener('change', (event) => {
        selectedGenreMovie = []; 
        const selectedOption = event.target.selectedOptions;
        for (let i = 0; i < selectedOption.length; i++) {
            selectedGenreMovie.push(parseInt(selectedOption[i].value));
        }
        //console.log(selectedGenreMovie);
        getMovies(api_url + '&with_genres='+encodeURI(selectedGenreMovie.join(',')))
    });
}


// Fonction pour récupérer les films
export function getMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                main.innerHTML = '<h2>Movie not found</h2>';
            } else {
                //console.log(data.results)
                showMovies(data.results);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            main.innerHTML = '<h2>Une erreur est survenue. Veuillez réessayer plus tard.</h2>';
        });
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.classList.add('slide-in')
        movieElement.innerHTML = `
        <img src="${poster_path? img_url + poster_path: 'http://via.placeholder.com/1080x1580'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${Number.parseFloat(vote_average).toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Synopsis</h3>
                ${overview}
            </div>
        `;
        
        movieElement.setAttribute('data-visible', 'false');
        
        main.appendChild(movieElement);
    });
}

function showMovieGenreForm() {
    document.querySelector(".genreMovie").style.display = "flex";
    document.querySelector(".genreSerie").style.display = "none";
}

movieBtn.addEventListener("click", () => {
    updateGenreOptions(genresMovie);
    
    showMovieGenreForm();
    
    const movies = document.querySelectorAll('.movie');
    const series = document.querySelectorAll('.serie');
    const hidden = document.querySelector('.hidden');
    
    movies.forEach(movie => {
        movie.style.display = 'flex';
        movie.setAttribute('data-visible', 'true');
        
    });
    
    series.forEach(serie => {
        serie.style.display = 'none';
        serie.setAttribute('data-visible', 'false');
    });
    
    hidden.style.display = 'flex';
    
    setTimeout(() => {
        getMovies(api_url);
        animateOnAction();
        scrollToClass('movie')
    }, 500);
});

function updateGenreOptions(Movies) {
    genreElementMovie.innerHTML = "";
    Movies.forEach(genre => {
        const option = document.createElement("option");
        option.classList.add('tag');
        option.value = genre.id;
        option.textContent = genre.name;
        genreElementMovie.appendChild(option);
    });
}
