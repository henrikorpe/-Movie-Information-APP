const tulos = document.getElementById('tulos3');
const haku = document.getElementById('haku4');
const haku2 = document.getElementById('haku3');

async function lataus(hae){
    const osoite = `https://omdbapi.com/?s=${hae}&page=1&apikey=fc1fef96`;
    const vastaus = await fetch(`${osoite}`);
    const tieto = await vastaus.json();
    if(tieto.Response == "True") displayMovieList(tieto.Search);
}

function findMovies(){
    let hae = (haku2.value).trim();
    if(hae.length > 0){
        haku.classList.remove('hide-haku4');
        lataus(hae);
    } else {
        haku.classList.add('hide-haku4');
    }
}

function displayMovieList(elokuva){
    haku.innerHTML = "";
    for(let i = 0; i < elokuva.length; i++){
        let tulokset = document.createElement('div');
        tulokset.dataset.id = elokuva[i].imdbID; 
        tulokset.classList.add('haku4-item');
        if(elokuva[i].Poster != "N/A")
            moviePoster = elokuva[i].Poster;
        else 
            moviePoster = "image_not_found.png";

        tulokset.innerHTML = `
        <div class = "kuva">
            <img src = "${moviePoster}">
        </div>
        <div class = "tiedot">
            <h3>${elokuva[i].Title}</h3>
            <p>${elokuva[i].Year}</p>
        </div>
        `;
        haku.appendChild(tulokset);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const haku3 = haku.querySelectorAll('.haku4-item');
    haku3.forEach(movie => {
        movie.addEventListener('click', async () => {
            haku.classList.add('hide-haku4');
            haku2.value = "";
            const tulos = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const tiedot = await tulos.json();
            displayMovieDetails(tiedot);
        });
    });
}

function displayMovieDetails(details){
    tulos.innerHTML = `

    <div class = "kuva2">
        <img src = ${details.Poster}>
    </div>

    <div class = "tiedot2">
    
        <h2 class = "nimi"> ${details.Title} </h3>

        <ul class = "tiedot3">
            <li class = "julkaisu"> Publishing Year: ${details.Year} </li>
            <li class = "ikäraja"> Age Rating: ${details.Rated} </li>
        </ul>

        <p class = "genre"> <b>Genre:</b> ${details.Genre} </p>
        <p class = "kassari"> <b>Writer:</b> ${details.Writer} </p
        <p class = "casti"> <b>Actors:</b> ${details.Actors} </p>
        <p class = "juoni"> <b>Plot:</b> ${details.Plot} </p>
        <p class = "kieli"> <b>Language:</b> ${details.Language} </p>

    </div>
    `;
}

window.addEventListener('click', (event) => {
    if(event.target.className != "kenttä"){
        haku.classList.add('hide-haku4');
    }
});
