# Getting Started with Filter Overlapping Time Range Sensors

## Available Scripts

In the project directory, you can run:

### `npm install` or `npm i`

It will install all the required packages

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `What's there in the app`

On the main page, user can upload a json input file in a specific format.
**Format of Input Data** can be found in [src/scripts/data/baseInput.json] file.

User can view Total Plants, Equipments, Sensors, Sensors within Equipments. On equipments page, user will get a option
to select start time and end time to filter the sensors of a particular equipment.

[http://localhost:3000/plants]: This page contains a list of plants and their count
[http://localhost:3000/equipments]: This page contains a list of equipments, their count, their sensor related info i.e name,
start time, end time of sensor in a equipment and an option to select time.
[http://localhost:3000/sensors]: This page contains a list of sensors and it's count.

### `Sample Data`

Sample data can be found in 3 files:

- [src/scripts/data/baseInput.json]: Data of 4 Plants, 2 Equipments, 2 Sensors and 3 EquipmentSensor Mappings with one equipment
- [src/scripts/data/smallData.json]: Data of 1 Plant, 2 Equipments, 5 Sensors and 100 EquipmentSensor Mappings with each equipment
- [src/scripts/data/baseInput.json]: Data of 1 Plant, 1 Equipment, 1 Sensor and 1000000 EquipmentSensor Mappings

### `jest`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**Test cases for the following scenarios are written:**

- ***When no Equipment Sensor is available***
- ***When Sensor equipment out of range***
- ***Sensor Equipment with start time in range (after our given start time) but end time out of range***
- ***Single Sensor Equipment with start time out of range (before our start time) but end time in the range***
- ***Single Sensor Equipment with start time == given start time but end time == given end time***
- ***Sensor Equipment with start time and end time in range***
- ***Large data with start time and end time in range***

### `Generate Large Data`

Go to [src/scripts/dataGenerator.js] file
Uncomment code from `line no.77` to `line. no 85`.
From terminal run, `node <path to dataGenerator.js>`

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
