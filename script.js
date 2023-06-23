// Fonction qui supprime les espaces d'une ville dans le Id du boutton delete
function textParse(text) {
    return text.trim().replaceAll(' ', '_');
}


// Fonction qui contient le html à afficher pour chaque ville
function cityView(city) {
    return `
    <div class="cityContainer">
      <p class="name">${city.cityName}</p>
      <p class="description">${city.description}</p>
      <img class="weatherIcon" src="images/${city.main}.png" />
      <div class="temperature">
        <p class="tempMin">${city.tempMin}°C</p>
        <span>-</span>
        <p class="tempMax">${city.tempMax}°C</p>
      </div>
      <button class="deleteCity" id="${textParse(city.cityName)}">Delete</button>
    </div>
`;
}


// Fonction qui créé un listener pour chaque bouton delete de la page
function listenDelete() {
    for(let obj of document.querySelectorAll('.deleteCity')) {
        // Listener pour le delete d'une ville
        document.querySelector('#'+obj.id).addEventListener('click', () => {
            const cityName = document.querySelector('#'+obj.id).parentNode.querySelector('.name').textContent;
            // Fetch qui supprime la ville cityName
            fetch('https://weatherapp-backend-five.vercel.app/weather/'+cityName, { method: 'DELETE' })
            .then(resRaw => resRaw.json())
            .then(data => {
                // Si le delete est fait, on supprime le div parent
                if (data.result) {
                    document.querySelector('#'+obj.id).parentNode.outerHTML = '';
                }
                // Sinon on console.log le result false
                else console.log(data.result+' => '+cityName);
            })
        });
    }
}


// Initialisation de l'affichage des villes au chargement de la page
let initialCities = '';
fetch('https://weatherapp-backend-five.vercel.app/weather')
.then(resRaw => resRaw.json())
.then(data => {
	if (data.weather) {
		// Pour chaque entrée du tableau récupéré on exécute la fonction cityView qui affiche la ville
		for(let obj of data.weather) initialCities += cityView(obj);
		// On envoie toutes les données récupérées dans le innerHTML de #cityList
		document.querySelector('#cityList').innerHTML = initialCities;
		// On éxecute la fonction listenDelete qui créé les event listener des bouttons delete
		listenDelete();
	}
});


// Listener - Add a new city
document.querySelector('#addCity').addEventListener('click', function () {
	const cityName = document.querySelector('#cityNameInput').value;
	fetch('https://weatherapp-backend-five.vercel.app/weather', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cityName })
	})
	.then(resRaw => resRaw.json())
    .then(data => {
		console.log(data)
        if (data.result) {
            document.querySelector('#cityList').innerHTML += cityView(data.weather);
            document.querySelector('#cityNameInput').value = '';
            // On éxecute la fonction listenDelete qui créé les event listener des bouttons delete
            listenDelete();
        }
        else console.log(data.result);
	});
});