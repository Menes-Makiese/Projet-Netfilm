import { base_url, api_key, img_url, getMovies, api_url } from "./movies.js";

const search_url = base_url + '/search/multi?' + api_key;
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');




const aText = new Array(
    "Find a Movie ", "or ", "a TV Serie"
);
let iSpeed = 100; 
let iIndex = 0; 
let iArrLength = aText[0].length;
let iScrollAt = 20; 
let iTextPos = 0; 

let iRow; 

function typewriter() {
    let sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    let destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++];
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
    if (iTextPos++ === iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout(typewriter, 200);
        } else {
            setTimeout(() => {
                document.getElementById('movieBtn').style.opacity = '1';
                document.getElementById('serieBtn').style.opacity = '1';
            }, 400);
        }
    } else {
        setTimeout(typewriter, iSpeed);
    }
}

typewriter();

export function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch();

    const hidden = document.querySelector('.hidden');

    hidden.style.display = 'flex';
    scrollToClass('result');

});

function performSearch() {
    const searchTerm = search.value.trim(); 
    if (searchTerm) {
        getSearchResults(search_url + '&query=' + encodeURIComponent(searchTerm));
        search.value = "";
    } else {
        getMovies(api_url);
    }
}


function getSearchResults(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                main.innerHTML = '<h2>Results not found</h2>';
            } else {
                //console.log(data.results)
                showResults(data.results);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            main.innerHTML = '<h2>An error occurred. Please try again later.</h2>';
        });
}


function showResults(results) {
    main.innerHTML = ''; 

    results.forEach(result => {
        const { title, name, poster_path, vote_average, overview } = result;
        const element = document.createElement('div');
        element.classList.add('result');
        element.classList.add('slide-in');

        element.innerHTML = `
            <img src="${poster_path ? img_url + poster_path : 'http://via.placeholder.com/1080x1580'}" alt="${title || name}">
            <div class="result-info">
                <h3>${title || name}</h3>
                <span class="${getColor(vote_average)}">${Number.parseFloat(vote_average).toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Synopsis</h3>
                ${overview}
            </div>
        `;

        main.appendChild(element);
    });
}

export function animateOnAction() {
    const movies = document.querySelectorAll('.movie');
    const series = document.querySelectorAll('.serie');
    const results = document.querySelectorAll('.result');

    movies.forEach(movie => {
        movie.classList.add('slide-in');
    });

    series.forEach(serie => {
        serie.classList.add('slide-in');
    });

    results.forEach(result => {
        result.classList.add('slide-in');
    });
}

export function scrollToClass(className) {
    const element = document.querySelector("." + className);
    if (element) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop
        });
    }
}
