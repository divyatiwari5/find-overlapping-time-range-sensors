const createData = require("./mainScript");
const baseInput = require("./data/baseInput");
const generateRandomData = require("./data/hugeData")
const smallData = require("./data/smallData")


function compareResult(expectedOutput, result) {
    let foundObjects = [];
    console.log({result});
    for (var i=0; i<result.size; i++) {
        let ESObj = result[i];
        if (ESObj === undefined) {
            continue;
        }
        resultExpectedArray = expectedOutput[ESObj.sensor];
        if (resultExpectedArray === undefined) {
            return true;
        }
        for (var i=0; i<resultExpectedArray.length; i++) {
            var timeArray = resultExpectedArray[i];
            if (timeArray[0] === ESObj.startTimeStr && timeArray[0] === ESObj.endTimeStr) {
                foundObjects.add(expectedOutput[ESObj.sensor].splice(index, 1));
                break;
            }
        };
    };
    Object.keys(expectedOutput).forEach((sensorName) => {
        expcOutputSensorDetails = expectedOutput[sensorName];
        expect(expcOutputSensorDetails).toEqual([]);
    });
    expect(foundObjects.length).toEqual(result.size);
}


test("When no Equipment Sensor is available", () => {
    const data = Object.assign({}, baseInput);

    data.EquipmentMapping = {}; 

    const expectedOutput = [];

    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let result = equipment.getAllSensorInTimeRange("10:28", "16:15");
    compareResult(expectedOutput, result);
});


// test("Sensor equipment out of range", () => {
//     // GIVEN
//     const data = Object.assign({}, baseInput);

//     data.EquipmentMapping["Equipment1"]["start_time"] = "14:00";
//     data.EquipmentMapping["Equipment1"]["end_time"] = "16:00";

//     const expectedOutput = {};

//     // WHEN
//     let {plants, equipments, sensors} = createData(data);
//     let equipment = equipments["Equipment1"];
//     let realOutput = equipment.getAllSensorInTimeRange("17:00", "18:15");

//     // THEN
//     expect(realOutput).toEqual(expectedOutput);
    
// });

test("Single Sensor Equipment with start time and end time in range", () => {
    const {input, output} = smallData;

    let {plants, equipments, sensors} = createData(input);
    Object.keys(output).forEach((oKey) => {
        console.log("Running for " + oKey);
        expectedOutput = output[oKey];
        equipObj = equipments[oKey];
        resultOutput = equipObj.getAllSensorInTimeRange("10:28", "16:15");
        compareResult(expectedOutput, resultOutput)
    })
});

// test("Single Sensor Equipment with start time and end time out of range", () => {
//     const data = Object.assign({}, baseInput);
//     let expectedOutput = {};
//     let {plants, equipments, sensors} = createData(data);
//     let equipment = equipments["Equipment1"];
//     let realOutput = equipment.getAllSensorInTimeRange("14:28", "16:15");

//     expect(realOutput).toEqual(expectedOutput);
// });

// test("Single Sensor Equipment with start time in range (after our given start time) but end time out of range", () => {
//     const data = Object.assign({}, baseInput);
//     let expectedOutput = {};
//     let {plants, equipments, sensors} = createData(data);
//     let equipment = equipments["Equipment1"];
//     let realOutput = equipment.getAllSensorInTimeRange("10:14", "16:15");

//     expect(realOutput).toEqual(expectedOutput);
// });

// test("Single Sensor Equipment with start time out of range (before our start time) but end time in the range", () => {
//     const data = Object.assign({}, baseInput);
//     let expectedOutput = {};
//     let {plants, equipments, sensors} = createData(data);
//     let equipment = equipments["Equipment1"];
//     let realOutput = equipment.getAllSensorInTimeRange("09:00", "12:00");

//     expect(realOutput).toEqual(expectedOutput);
// });

// test("Single Sensor Equipment with start time == given start time but end time == given end time", () => {
//     const data = Object.assign({}, baseInput);
//     let expectedOutput = {};
//     let {plants, equipments, sensors} = createData(data);
//     let equipment = equipments["Equipment1"];
//     let realOutput = equipment.getAllSensorInTimeRange("10:00", "13:00");

//     expect(realOutput).toEqual(expectedOutput);
// });
