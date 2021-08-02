# Filter Overlapping Time Range Sensors

## App Structure and Features

### App Structure

### Features and future scopes
- [x] Upload JSON file via Web Browser
- [x] Parse JSON file
- [x] Create `Plant`, `Equipment`, `Sensor`, `EquipmentSensor` from input JSON Data
- [x] Filter sensor in equipment on the basis of `start_time` and `end_time`
- [ ] Validate JSON
- [ ] Ability to add more `Plant`, `Equipment`, `Sensor`, `EquipmentSensor` from UI
- [ ] Ability to pass params from CLI in `runScript.js`

### App Structure and Notable Files & Functions w.r.t Script
- `src`: Contains all source codes
  - `scripts`: Contains scripts specific to problem statement
    - `utils.js`: Contains util functions: `getTimeInMinutes`, `union`, `compareResult`
    - `models.js`: Contains model classes: `Plant`, `Equipment`, `Sensor`, EquipmentSensor`
    - `importer.js`: Contains function to import JSON data: `createData`
    - `dataGenerator.js`: Contains a script to generate test data. [Check doc here](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/blob/master/README.md#denerate-data)
    - `data`: Contains sample `JSON` data
    - `runScript.js`: Run with `node` after editing params from CLI
  - `Equipments`: React component
  - `InfoModal`: React component
  - `Plants`: React component
  - `Sensors`: React component

### Assumptions
- Sensors can be mapped to any equipment multiple times in multiple time ranges.

## Sample Data and Generating Data for test case

### Format
```json
{
  "Plants": [
    "Plant$"
  ],
  "Equipments": [
    "EquipmentX"
  ],
  "Sensors": [
    "SensorFoo"
  ],
  "PlantMapping": {
    "Plant$": [
      "EquipmentX"
    ]
  },
  "EquipmentMapping": {
    "EquipmentX": [
      {
        "_id": "SensorFoo",
        "start_time": "HH:MM",
        "end_time": "HH:MM"
      }
    ]
  }
}
```

### Existing Sample Data:

- [src/scripts/data/baseInput.json](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/blob/master/src/scripts/data/baseInput.json): 
  - `Plants`: 4
  - `Equipments`: 2
  - `Sensors`: 2
  - `EquipmentSensor`: 3
- [src/scripts/data/smallData.json](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/blob/master/src/scripts/data/smallData.json):
  - `Plants`: 1
  - `Equipments`: 2
  - `Sensors`: 5
  - `EquipmentSensor`: 100
- [src/scripts/data/largeData.json](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/blob/master/src/scripts/data/largeData.json):
  - `Plants`: 1
  - `Equipments`: 1
  - `Sensors`: 1000000
  - `EquipmentSensor`: 1000000

  
### Generate Data
Source Code: [src/scripts/dataGenerator.js](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/blob/master/src/scripts/dataGenerator.js)
1. `generateRandomData(np, ne, ns, nepe, nees, minTime, maxTime, validMinTime, validMaxTime)`
2. Generates the random data with provided constraints
    - `np`: Number of `Plants`
    - `ne`: Number of `Equipments`
    - `ns`: Number of `Sensors`
    - `nepe`: Number of `Equipments` per `Plant`
    - `nees`: Number of `Sensors` per `Equipment`
    - `minTime`: Minimum start time of `Sensor` in an `Equipment`
    - `maxTime`: Maximum end time of `Sensor` in an `Equipment`
    - `validMinTime`: Minimum start time of `Sensor` in an `Equipment` that qualifies for output for a test scenario
    - `validMaxTime`: Maximum end time of `Sensor` in an `Equipment` that qualifies for output for a test scenario
3. Output Format: Contains `input` as data to be input and `output` as expected result.
    ```json
    {
      "input": {
        "Plants": ["Plant$"],
        "Equipments": ["EquipmentX"],
        "Sensors": ["SensorFoo"],
        "PlantMapping": {
          "Plant$": [
            "EquipmentX"
          ]
        },
        "EquipmentMapping": {
          "EquipmentX": [
            {
              "_id": "SensorFoo",
              "start_time": "HH:MM",
              "end_time": "HH:MM"
            }
          ]
        }
      },
      "output": {
        "EquipmentX": {
          "SensorFoo": ["valid HH:MM"]
        }
      }
    }
    ```

## Tests with `jest`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Existing Test Scenarios

- When no Equipment Sensor is available
- When Sensor equipment out of range
- Sensor Equipment with start time in range (after our given start time) but end time out of range
- Single Sensor Equipment with start time out of range (before our start time) but end time in the range
- Single Sensor Equipment with start time == given start time but end time == given end time
- Sensor Equipment with start time and end time in range
- Large data with start time and end time in range

## Running script from directly

The script for problem statement is present in [src/scripts](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/tree/master/src/scripts)
To run custom input directly from terminal, use [src/scripts/runScript.js](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/tree/master/src/scripts/runScript.js)

1. Modify `jsonPath`, `equipName`, `startTime`, `endTime` in `runScript.js`
2. Run `node src/scripts/runScript.js`

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Running React App

In the project directory, you can run:

### `npm install` or `npm i`

It will install all the required packages

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run runScript` or `node src/scripts/runScript.js`
to directly run the main script.


### `Getting Started with the App`

On the main page, user can upload a json input file in a specific format.
**Format of Input Data** can be found in [src/scripts/data/baseInput.json](https://github.com/divyatiwari5/find-overlapping-time-range-sensors/blob/master/src/scripts/data/baseInput.json) file.

User can view all the `Plants`, `Equipments`, `Sensors`, `Sensors within Equipments`.

On equipments page, user will get a option
to select start time and end time to **filter the sensors of a particular equipment**.

- [http://localhost:3000/plants](http://localhost:3000/plants): Contains a list of plants
- [http://localhost:3000/equipments](http://localhost:3000/equipments): Contains a list of equipments, and it's sensor related info i.e name,
  start time, end time of sensor in a equipment. Also contains filter sensors on the basis of time
- [http://localhost:3000/sensors](http://localhost:3000/sensors): Contains a list of sensors
