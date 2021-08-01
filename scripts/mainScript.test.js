const createData = require("./mainScript");
const baseInput = require("./data/baseInput");
const generateRandomData = require("./data/hugeData.js")
const smallData = require("./data/smallData.js")

test("When no Equipment Sensor is available", () => {
    const data = Object.assign({}, baseInput);

    data.EquipmentMapping = {}; 

    const expectedOutput = {};

    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let realOutput = equipment.getAllSensorInTimeRange("10:28", "16:15");
    expect(realOutput).toEqual(expectedOutput);

});

test("Sensor equipment out of range", () => {
    // GIVEN
    const data = Object.assign({}, baseInput);

    data.EquipmentMapping["Equipment1"]["start_time"] = "14:00";
    data.EquipmentMapping["Equipment1"]["end_time"] = "16:00";

    const expectedOutput = {};

    // WHEN
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let realOutput = equipment.getAllSensorInTimeRange("17:00", "18:15");

    // THEN
    expect(realOutput).toEqual(expectedOutput);
    
});

test("Single Sensor Equipment with start time and end time in range", () => {
    const {input, output} = smallData;

    let {plants, equipments, sensors} = createData(input);
    expectedOutput = output["Equipment1"]
    equipment = equipments["Equipment1"]
    realOutput = equipment.getAllSensorInTimeRange("10:28", "16:15");
    console.log(JSON.stringify(expectedOutput))
    console.log('real;', JSON.stringify(realOutput));
    // Some how compare both

    expect(realOutput).toEqual(expectedOutput);
});

test("Single Sensor Equipment with start time and end time out of range", () => {
    const data = Object.assign({}, baseInput);
    let expectedOutput = {};
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let realOutput = equipment.getAllSensorInTimeRange("14:28", "16:15");

    expect(realOutput).toEqual(expectedOutput);
});

test("Single Sensor Equipment with start time in range (after our given start time) but end time out of range", () => {
    const data = Object.assign({}, baseInput);
    let expectedOutput = {};
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let realOutput = equipment.getAllSensorInTimeRange("10:14", "16:15");

    expect(realOutput).toEqual(expectedOutput);
});

test("Single Sensor Equipment with start time out of range (before our start time) but end time in the range", () => {
    const data = Object.assign({}, baseInput);
    let expectedOutput = {};
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let realOutput = equipment.getAllSensorInTimeRange("09:00", "12:00");

    expect(realOutput).toEqual(expectedOutput);
});

test("Single Sensor Equipment with start time == given start time but end time == given end time", () => {
    const data = Object.assign({}, baseInput);
    let expectedOutput = {};
    let {plants, equipments, sensors} = createData(data);
    let equipment = equipments["Equipment1"];
    let realOutput = equipment.getAllSensorInTimeRange("10:00", "13:00");

    expect(realOutput).toEqual(expectedOutput);
});
