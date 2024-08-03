const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weather = document.querySelector('.weather-box');
const wdetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = 'c77b7fa4c88e8405273ab4c967b41ef4';
    const city = document.querySelector('.search-box input').value;

    if (city == ' ')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {
        if (json.cod == '404') {
            container.style.height = '400px';
            weather.classList.remove('active');
            wdetails.classList.remove('active');
            error.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weather.classList.add('active');
        wdetails.classList.add('active');
        error.classList.remove('active');


        const image = document.querySelector('.weather-box img');
        const temprature = document.querySelector('.weather-box .temp');
        const description = document.querySelector('.weather-box .desc');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Cloud':
                image.src = 'images/cloud.png';
                break;
            case 'Clouds':
                image.src = 'images/clouds.png';
                break;
            case 'Drizzle':
                image.src = 'images/drizzle.png';
                break;
            case 'Mist':
                image.src = 'images/mist.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;

            default:
                image.src = 'images/cloud.png';
        }
        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C<span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

    })
})



