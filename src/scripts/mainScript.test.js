const {createData} = require("./importer")
const {compareResult} = require("./utils")

const baseInput = require("./data/baseInput.json");
const smallData = require("./data/smallData.json")
const largeData = require("./data/largeData.json")

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
