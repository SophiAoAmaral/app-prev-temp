import { useState, useRef} from 'react';
import './App.css';
import axios from "axios";
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import WeatherInfo5Days from './components/WeatherInfo5Days/WeatherInfo5Days'


function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()

  const inputRef = useRef();

 async function searchCity(){
    
    const city = inputRef.current.value;
    const key = "b2aa568d432d56f8a74cc50a4712972b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const apiInfo = await axios.get(url);

    const apiInfo5Days = await axios.get(url5Days)


    setWeather5Days(apiInfo5Days.data)
    setWeather(apiInfo.data)
    
  }


  return (
    <>
      <div className="container">
        <h1>Previsão do Tempo</h1>
        <input type="text" ref={inputRef} placeholder="Digite uma cidade" />
        <button onClick={searchCity}>Buscar</button>

        {weather && <WeatherInfo weather={weather} />}

        {weather5Days && <WeatherInfo5Days weather5Days={weather5Days} />}
      </div>
    </>
  );
}

export default App
