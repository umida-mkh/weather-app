import React, {useState} from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=56cd2eb753d30ec3a17740ec4e20b175`

    //const url = "https://api.openweathermap.org/data/2.5/weather?q=san%20diego&appid=56cd2eb753d30ec3a17740ec4e20b175"
    //instead of city(San Diego) = ${location}, added &units=imperial(units of measurement) param for API

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }
    return (
        <div className="app">
            <div className="search">
            <input
                type="text"
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder="Enter Location"
            />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p> {data.name} </p>
                        {/*<p> San Diego</p> //{data.name} from weather.json}*/}
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                        {/*<h1> 80°F</h1>*/}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                        {/*<p> Clouds</p>*/}
                    </div>
                </div>

                {data.name !== undefined &&
                <div className="bottom">
                    <div className="feels">
                        {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
                        {/*<p className="bold"> 50°F</p>*/}
                        <p> Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
                        {/*<p className="bold"> 45% </p>*/}
                        <p> Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
                        {/*<p className="bold">10 MPH </p>*/}
                        <p>Wind Speed</p>
                    </div>
                </div>
                }

            </div>
        </div>);
}
export default App;
