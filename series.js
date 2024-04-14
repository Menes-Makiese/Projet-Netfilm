import { api_key, base_url, img_url } from "./movies.js";
import { getColor, animateOnAction, scrollToClass} from "./script.js";

const api_url = base_url + '/discover/tv?sort_by=popularity.desc&' + api_key;


const genresSerie = [
    {
        "id": 0,
        "name": "Popular"
    },
    {
        "id": 10759,
        "name": "Action & Adventure"
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
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

const main = document.getElementById('main');
const genreElementSerie = document.getElementById("genresSeries");
const serieBtn = document.getElementById('serieBtn');

let selectedGenreSerie = [];

getGenreSerie();
function getGenreSerie() {
    genreElementSerie.innerHTML = "";
    genresSerie.forEach(genre => {
        const option = document.createElement('option');
        option.classList.add('tag');
        option.value = genre.id;
        option.textContent = genre.name;
        genreElementSerie.appendChild(option);
    });

    genreElementSerie.value = "0"

    genreElementSerie.addEventListener('change', (event) => {
        selectedGenreSerie = [];
        const selectedOption = event.target.selectedOptions;
        for (let i = 0; i < selectedOption.length; i++) {
            selectedGenreSerie.push(parseInt(selectedOption[i].value));
        }

        //console.log(selectedGenreSerie);
        getSeries(api_url + '&with_genres='+encodeURI(selectedGenreSerie.join(',')))
    })
}

function getSeries(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                main.innerHTML = '<h2>Serie not found</h2>';
            } else {
                //console.log(data.results)
                showSeries(data.results);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            main.innerHTML = '<h2>Une erreur est survenue. Veuillez réessayer plus tard.</h2>';
        });
}

function showSeries(data) {
    main.innerHTML = '';

    data.forEach(serie => {
        const { name, poster_path, vote_average, overview } = serie;
        const serieElement = document.createElement('div');
        serieElement.classList.add('serie');
        serieElement.classList.add('slide-in')
        serieElement.innerHTML = `
        <img src="${poster_path? img_url + poster_path: 'http://via.placeholder.com/1080x1580'}" alt="${name}">
            <div class="serie-info">
                <h3>${name}</h3>
                <span class="${getColor(vote_average)}">${Number.parseFloat(vote_average).toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Synopsis</h3>
                ${overview}
            </div>
        `;

        serieElement.setAttribute('data-visible', 'false');

        main.appendChild(serieElement);
    });
}

function showSerieGenreForm() {
    document.querySelector(".genreMovie").style.display = "none";
    document.querySelector(".genreSerie").style.display = "flex";
}

serieBtn.addEventListener("click", () => {
    
    updateGenreOptions(genresSerie);
    showSerieGenreForm();
    
    
    const movies = document.querySelectorAll('.movie');
    const series = document.querySelectorAll('.serie');
    const hidden = document.querySelector('.hidden');
    
    
    series.forEach(serie => {
        serie.style.display = 'flex';
        serie.setAttribute('data-visible', 'true');
    });
    
    movies.forEach(movie => {
        movie.style.display = 'none';
        movie.setAttribute('data-visible', 'false');
    });
    
    hidden.style.display = 'flex';
    
    setTimeout(() => {
        getSeries(api_url);
        animateOnAction();
        scrollToClass('serie')
    }, 500);
    
});

function updateGenreOptions(genresSeries) {
    genreElementSerie.innerHTML = "";
    genresSeries.forEach(genre => {
        const option = document.createElement('option');
        option.classList.add('tag');
        option.value = genre.id;
        option.textContent = genre.name;
        genreElementSerie.appendChild(option);
    });
}

