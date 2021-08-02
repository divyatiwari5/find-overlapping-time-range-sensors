const {Plant, Equipment, Sensor} = require("./models");

/**
 * Creates object for plants, sensors and equipments. 
 * For each equipment, map sensor
 * @param {*} data 
 * @returns plants, equipments and sensors
 */
function createData(data) {

    let plants = {};
    let equipments = {};
    let sensors = {};

    data.Plants.forEach(plant => {
        plants[plant] = new Plant(plant);
    });

    data.Sensors.forEach(sensor => {
        sensors[sensor] = new Sensor(sensor);
    });

    data.Equipments.forEach(equp => {
        let equpObj = new Equipment(equp);
        let equipmentMappings = data.EquipmentMapping[equp] || [];
        equipmentMappings.forEach(equpSensorMap => {
            let sensorObj = sensors[equpSensorMap._id];
            equpObj.addSensor(sensorObj, equpSensorMap.start_time, equpSensorMap.end_time);
        })
        equipments[equp] = equpObj;
    });

    // Loop on data.PlantMapping and do plants[plantMapKey].addEquipment(equipments[eachEqup]);

    return {plants, equipments, sensors};
}

module.exports = {
    createData
}
