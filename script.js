const apiKey = '39ce1d960ba0c5b8e03d9460cb5481a4';

// Verificar si se ha proporcionado una API key
if (apiKey === '') {
  document.getElementById('temp').innerHTML = ('Remember to add your API key!');
}

// Obtener los datos del clima para una ciudad específica
function getWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
  // Realizar la solicitud de datos al API
  fetch(apiUrl)
    .then(function(response) {
      return response.json(); // Convertir los datos a formato JSON
    })
    .then(function(data) {
      drawWeather(data); // Llamar a la función para mostrar los datos del clima
    })
    .catch(function(error) {
      console.error('Error:', error); // Mostrar cualquier error que ocurra durante la solicitud
    });
}

// Mostrar los datos del clima en la página web
function drawWeather(weatherData) {
  // Calcular la temperatura en grados Celsius y Fahrenheit
  var celsius = Math.round(parseFloat(weatherData.main.temp) - 273.15);
  var fahrenheit = Math.round(((parseFloat(weatherData.main.temp) - 273.15) * 1.8) + 32);

  // Obtener la descripción del clima
  var description = weatherData.weather[0].description;

  // Actualizar los elementos HTML con los datos del clima
  document.getElementById('description').innerHTML = description;
  document.getElementById('temp').innerHTML = celsius + '&deg;C';
  document.getElementById('location').innerHTML = weatherData.name;

  // Establecer una clase en el body dependiendo del tipo de clima
  if (description.includes('rain')) {
    document.body.className = 'rainy';
  } else if (description.includes('cloud')) {
    document.body.className = 'cloudy';
  } else if (description.includes('sunny')) {
    document.body.className = 'sunny';
  } else {
    document.body.className = 'Cielo Despejado';
  }
}

// Ejecutar la función para obtener los datos del clima al cargar la página
window.onload = function() {
  getWeatherData('Luque'); // Cambiar la ciudad aquí si se desea obtener datos de otra ubicación
}
