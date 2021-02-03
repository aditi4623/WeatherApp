import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Table, Form } from 'react-bootstrap';
const fTOC = (temp) => {
    var new_temp = (5 / 9) * (temp - 32);
    return Math.round((new_temp + Number.EPSILON) * 100) / 100
    // return Math.round(new_temp)
  }
  const getTime = (time) => {
      var date=new Date(time*1000);
      var hours=date.getHours();
      if(hours>12)
      {
          hours-=12;
      }
      var minutes="0" + date.getMinutes();
      var forTime=hours + ':' + minutes.substr(-2);
      return forTime;
  }
  function App()
  {
      const [weatherData, setWeatherData] = useState();
      const [loading, setLoading] = useState(false);
      const [pincode, setPincode] = useState(localStorage.getItem("pincode"))
       
      if (loading===true)
      {
          let requestOptions = {
              method : 'GET',
          };
      if(pincode && pincode.length === 6){
          localStorage.setItem("pincode", pincode)
          fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${pincode},IN&units=imperial&appid=566238b6d800438f03724b1179de8207`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(JSON.stringify(result))
              setWeatherData(result);
              setLoading(false);

          }
          )
          .catch(error => console.log(`error`, error));
        }
       else {
          setWeatherData(null)
          setLoading(false)

      }
      return (<></>)
    } else {
        return (
            <div>
                <div style={{ width: '20em' }} className='mx-auto mt-5'>
                    <Form.Group controlId="areaPincode">
                      <Form.Control type="number" placeholder="Pin code" classame="text-cente" value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                    </Form.Group>
                    <center>
                    <Button variant="primary" type="submit" onClick={(e) => { setLoading(true) }}>
                      <i className="far fa-sync"></i>&nbsp;Fetch
                    </Button>
                    </center>

                </div>
                {
                (weatherData) ? (
                    <Card title={weatherData.name} subTitle={weatherData.sys.country} style={{ width: '25em' }} className="ui-card-shadow mx-auto p-2 text-center border-primary border mt-2" footer={ <span>
                      <Button label={getTime(weatherData.sys.sunrise) + " AM"} icon="fas fa-sun" className="mr-2 p-button-secondary" />
                      <Button label={getTime(weatherData.sys.sunset) + " PM"} icon="fas fa-sun-haze" className="p-button-secondary p-ml-2 ml-2" />
                    </span>}>
                      <img alt="Card" src={"https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"} width="80px" />
        
                      <p className="p-m-0 text-center" style={{ lineHeight: '1.5' }}>
                        <i className="fas fa-temperature-low"></i> {fTOC(weatherData.main.temp)}&deg;C<br />
                        {weatherData.weather[0].description}
                      </p>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Pressure</td>
                            <td>{(weatherData.main.pressure) / 1000} Pa</td>
                          </tr>
                          <tr>
                            <td>Humidity</td>
                            <td>{weatherData.main.humidity}%</td>
                          </tr>
                          <tr>
                            <td>Wind speed</td>
                            <td>{weatherData.wind.speed} KMph</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  ) : (
                      <></>
                    )
                }
              </div>
        );
    }

  }


export default App;