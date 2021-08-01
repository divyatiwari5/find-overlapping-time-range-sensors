const createData = require("./mainScript");
const baseInput = require("./data/baseInput.json");
const smallData = require("./data/smallData.json")
const largeData = require("./data/largeData.json")


/**
 * Compares two result
 *
 * @param {Object} expectedOutput object with Sensor name as key and array of array containing start time and end time
 * @param {Set} result Set of EquipmentSensors objects
 */
function compareResult(expectedOutput, result) {
    // Found Objects as empty array
    let foundObjects = [];
    result = [...result];
    for (let i=0; i<result.length; i++) {
        let ESObj = result[i];
        if (ESObj === undefined) {
            continue;
        }
        resultExpectedArray = expectedOutput[ESObj.sensor];
        if (resultExpectedArray === undefined) {
            return true;
        }
        for (let i=0; i<resultExpectedArray.length; i++) {
            let timeArray = resultExpectedArray[i];
            if (timeArray[0] === ESObj.startTimeStr && timeArray[0] === ESObj.endTimeStr) {
                foundObjects.add(expectedOutput[ESObj.sensor].splice(i, 1));
                break;
            }
        }
    }
    Object.keys(expectedOutput).forEach((sensorName) => {
        let expcOutputSensorDetails = expectedOutput[sensorName];
        expect(expcOutputSensorDetails).toEqual([]);
    });
    expect(foundObjects.length).toEqual(result.length);
}


test("When no Equipment Sensor is available", () => {
    // GIVEN
    const data = Object.assign({}, baseInput);

    data.EquipmentMapping = {}; 

    // WHEN
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let result = equipment.getAllSensorInTimeRange("10:28", "16:15");

    // THEN
    expect([...result]).toEqual([]);
});

test("Sensor equipment out of range", () => {
    // GIVEN
    const data = Object.assign({}, baseInput);

    data.EquipmentMapping["Equipment1"]["start_time"] = "14:00";
    data.EquipmentMapping["Equipment1"]["end_time"] = "16:00";
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];

    // WHEN
    let realOutput = equipment.getAllSensorInTimeRange("17:00", "18:15");

    // THEN
    expect([...realOutput]).toEqual([]);
    
});

test("Sensor Equipment with start time in range (after our given start time) but end time out of range", () => {
    // GIVEN
    const {input, output} = smallData;
    let {plants, equipments, sensors} = createData(input);
    let equipment = equipments["Equipment1"];

    // WHEN
    let realOutput = equipment.getAllSensorInTimeRange("10:00", "10:15");

    // THEN
    expect([...realOutput]).toEqual([]);
});

test("Single Sensor Equipment with start time out of range (before our start time) but end time in the range", () => {
    // GIVEN
    const {input, output} = smallData;
    let {plants, equipments, sensors} = createData(input);
    let equipment = equipments["Equipment1"];

    // WHEN
    let realOutput = equipment.getAllSensorInTimeRange("10:00", "10:15");

    // THEN
    expect([...realOutput]).toEqual([]);
});

test("Single Sensor Equipment with start time == given start time but end time == given end time", () => {
    // GIVEN
    const {input, output} = smallData;
    let {plants, equipments, sensors} = createData(input);
    let equipment = equipments["Equipment2"];

    // WHEN
    let realOutput = equipment.getAllSensorInTimeRange("13:06", "13:25");

    // THEN
    expect([...realOutput]).toEqual([]);
});

test("Sensor Equipment with start time and end time in range", () => {
    // GIVEN
    const {input, output} = smallData;
    let {plants, equipments, sensors} = createData(input);

    // WHEN-THEN
    Object.keys(output).forEach((oKey) => {
        console.log("Running for " + oKey);
        let expectedOutput = output[oKey];
        let equipObj = equipments[oKey];
        let resultOutput = equipObj.getAllSensorInTimeRange("10:28", "16:15");
        compareResult(expectedOutput, resultOutput)
    })
});

test("Large data with start time and end time in range", () => {
    // GIVEN
    const {input, output} = largeData;
    let {plants, equipments, sensors} = createData(input);

    // WHEN-THEN
    Object.keys(output).forEach((oKey) => {
        console.log("Running for " + oKey);
        let expectedOutput = output[oKey];
        let equipObj = equipments[oKey];
        let resultOutput = equipObj.getAllSensorInTimeRange("10:28", "16:15");
        compareResult(expectedOutput, resultOutput)
    })
})
