function attachEvents() {
    const input = document.getElementById('location');



    document.getElementById('submit').addEventListener('click', async (ev) => {
       // ev.preventDefault()
        try {
            const urlWeather = 'http://localhost:3030/jsonstore/forecaster/locations'
            const urlUpcoming = 'http://localhost:3030/jsonstore/forecaster/upcoming/'

            const response = await fetch(urlWeather)
            const data = await response.json()
            if (!response.ok || input.value === '' || data.forEach(o => o.name.toLowerCase() === input.value.toLowerCase() ? getAll(o.code) : false)) {
                throw new Error(response.message)
            }


        } catch (err) {

            document.getElementById('forecast').style.display = 'block'
            document.getElementsByClassName('label')[0].textContent = 'Error'
        }

    })

    async function showData(code) {

        document.getElementById('forecast').style.display = 'block'

        const urlConditions = 'http://localhost:3030/jsonstore/forecaster/today/' + code
        const response = await fetch(urlConditions)
        const data = await response.json()


        const res1 = e('div', { className: 'forecasts' },
            e('span', { className: 'condition symbol' }, returnSymbol(data.forecast.condition)),
            e('span', { className: 'condition' },e('span', { className: 'forecast-data' }, returnName(data)),
            e('span', { className: 'forecast-data' }, returnDegrees(data)),e('span', { className: 'forecast-data' }, returnWeather(data))))

        const current = document.getElementById('current')
        current.appendChild(res1)
        // New York
    }

    async function upcoming(code) {

        const urlConditions = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code
        const response = await fetch(urlConditions)
        const data = await response.json()
        const forecastInfo =  e('div', { className: 'forecast-info'})
        const upcoming = document.getElementById('upcoming')
        upcoming.appendChild(forecastInfo)
       data.forecast.forEach(o => {
            const result = e('span',{ className: 'upcoming'},e('span',{className: 'symbol'},returnSymbol(o.condition)))


            forecastInfo.appendChild(result)
       })



    }
  function getAll(code){
    showData(code)
    upcoming(code)
  }
    function returnSymbol(day) {

        weather = {
            'Sunny': '☀',
            'Partly sunny': '⛅',
            'Overcast': ' ☁ ',
            'Rain': '☂',
            'Degrees': '°'
        }

        return weather[day]

    }
    function returnName(data) {

        return data.name

    }
    function returnDegrees(data) {

        return `${data.forecast.low}/${data.forecast.high}`

    }
    function returnWeather(data) {

        return data.forecast.condition

    }




    function e(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }
}

attachEvents();