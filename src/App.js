import { useState } from 'react';
import './App.scss';
import Equipments from './Equipments';
import Plants from './Plants';
// import {createData} from "./scripts/mainScript.js";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Sensors from './Sensors';
import PlantIcon from "./assets/plant.png";
import EquipIcon from "./assets/equipment.png";
import SensorIcon from "./assets/sensor.png";

const createData =  require("./scripts/mainScript.js")

function App() {

  const [parsedData, setData] = useState();
  const [plants, setPlants] = useState();
  const [equipments, setEquipments] = useState();
  const [sensors, setSensors] = useState();


function readFile(event) {
  let input = event.target;

  let reader = new FileReader();
  reader.onload = function(){
    let data = JSON.parse(reader.result);
    // If `input` is present in data, parse input
    if (data.input !== undefined) {
        data = data.input;
    }
    let {plants, equipments, sensors} = createData(data);
    setPlants(plants);
    setEquipments(equipments);
    setSensors(sensors);
  };
  reader.readAsText(input.files[0]);
}


  return (
    <div className="App">
      <div className="upload-file">
        <p>Upload input data:</p>
        <input 
          className="upload-button"
          id="myFile"
          type="file" name="Upload Input Data" 
          onChange={(event) => readFile(event)}
        />
      </div>
      <BrowserRouter>
        <div className="user-options">
            <Link to="/plants">
              {/* <img className="btn" src={PlantIcon}/> */}
              <button className="btn">All Plants</button>
            </Link>
            <Link to="/equipments">
              {/* <img className="btn" src={EquipIcon}/> */}
              <button className="btn">All Equipments</button>
            </Link>
            <Link to="/sensors">
              {/* <img className="btn" src={SensorIcon}/> */}
              <button className="btn">All Sensors</button>
            </Link>
        </div>

        <Switch>
          <Route exact path="/plants">
            <Plants plants={plants}/>
          </Route>
          <Route exact path="/sensors">
            <Sensors sensors={sensors}/>
          </Route>
          <Route exact path="/equipments">
            <Equipments equipments={equipments}/>
          </Route>          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;