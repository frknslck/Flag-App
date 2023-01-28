let countries = "";

window.onload = function() {
    fetchC();
};

const fetchC = async()=>{
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        if (!response.ok) {
            renderError(`Something went wrong:${response.status}`);
            throw new Error();
        }
        const data = await response.json();
        getNames(data);
    } catch (error) {
        console.log(error);
    }
};

const getNames = (data)=>{
    countries = data;
    countries.forEach((country)=>{
        const select = document.querySelector(".form-select");
        select.innerHTML += `
            <option value='${country.name.common}'>${country.name.common}</option> `;
    });
};

document.querySelector(".form-select").addEventListener("change", ()=>{
    const name = document.querySelector(".form-select").value;
    if (name) {
        const mod = countries.filter((country)=>country.name.common === name);
        DOM(mod[0]);
    }
});

const DOM = (country)=>{
    const {name: {common}, capital, region, flags: {svg}, languages, currencies, population, borders, maps, } = country;
    document.getElementById("country__container").innerHTML = `
    <div class="card shadow-lg">
                <img src="${svg}" alt="" class="shadow">
                <h3 class="text-center mt-1 fw-normal">${common}</h3>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="fa-solid fa-globe"></i>
                        <span class="fw-bold">Region: </span>${region}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-landmark"></i>
                        <span class="fw-bold">Capitals: </span>${capital}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-language"></i>
                        <span class="fw-bold">Languages: </span>${Object.values(languages)}
                    </li>
                    <li class="list-group-item">
                    <i class="fa-solid fa-coins"></i>
                        <span class="fw-bold">Currencies: </span>${Object.values(currencies)[0].name},
                        ${Object.values(currencies)[0].symbol}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-people-group"></i>
                        <span class="fw-bold">Population: </span>${population}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-road-barrier"></i>
                        <span class="fw-bold">Borders: </span>${borders ? borders : "None"}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <span class="fw-bold">Map: </span> <a href="${maps.googleMaps}" target="_blank" class="text-decoration-none"> Go to google map</a>
                    </li>
                </ul>
            </div>`;
};
