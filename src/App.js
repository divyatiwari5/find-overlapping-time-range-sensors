import { useState } from 'react';
import './App.scss';
import Equipments from './Equipments';
import Plants from './Plants';
// import {createData} from "./scripts/mainScript.js";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Sensors from './Sensors';

const {createData} =  require("./scripts/importer.js")

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
      console.log(data.output);
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
              <button className="btn">All Plants</button>
            </Link>
            <Link to="/equipments">
              <button className="btn">All Equipments</button>
            </Link>
            <Link to="/sensors">
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
          <Route exact path="/">
            <Redirect to="/plants"/>
          </Route>        
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;