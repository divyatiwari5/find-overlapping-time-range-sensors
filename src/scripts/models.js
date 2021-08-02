const {getTimeInMinutes, union} = require("./utils");

// Stores plants and it's associated equipments - PlantMapping
class Plant {
    equipments;

    constructor(name) {
        this.name = name;
        this.equipments = new Set();
    }

    addEquipment(equipment) {
        this.equipments.add(equipment);
    }
}

// Mapping of Equipment and Sensors
class EquipmentSensors {
    constructor(equipment, sensor, startTime, endTime , startTimeStr, endTimeStr) {
        this.equipment = equipment;
        this.sensor = sensor;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startTimeStr = startTimeStr;
        this.endTimeStr = endTimeStr;
    }
}

// This class contains equipment and sensor info
class Equipment {
    sensors;
    sensorTimeMap;
    sensorsMinStartTime;
    sensorsMaxStartTime;
    sensorsMinEndTime;
    sensorsMaxEndTime;
    sensorStartTimeMap;
    sensorEndTimeMap;

    constructor(name) {
        this.name = name;
        this.sensors = new Set();
        this.sensorTimeMap = [];
        this.sensorsMinStartTime = Infinity;
        this.sensorsMaxStartTime = -Infinity;
        this.sensorsMinEndTime = Infinity;
        this.sensorsMaxEndTime = -Infinity;
        this.sensorStartTimeMap = {};
        this.sensorEndTimeMap = {};
    }

    /**
     * Add sensor to sensors; Create EquipmentSensor mapping and
     * calculates sensor's min and max start and end time
     * @param {Sensor} sensor Equipment Sensor
     * @param {String} startTimeStr Sensor's Start Time
     * @param {String} endTimeStr Sensor's End Time
     */
    addSensor(sensor, startTimeStr, endTimeStr) {
        // Add sensor to sensors
        this.sensors.add(sensor);
        // Convert start and end time in minutes
        let startTime = getTimeInMinutes(startTimeStr);
        let endTime = getTimeInMinutes(endTimeStr)

        // Get group number of start time and end time
        // Since we are dividing 24 hours into 48 hours; we need to get lower bound start and end time
        let groupLowerBoundStartTime = parseInt(startTime/30);
        let groupLowerBoundEndTime = parseInt(endTime/30);

        // Create EquipmentSensor
        let sensorMap = new EquipmentSensors(this, sensor, startTime, endTime, startTimeStr, endTimeStr);
        this.sensorTimeMap.push(sensorMap);

        // Initializing sensorStartTimeMap, If there is no entry FOR LBST
        if (this.sensorStartTimeMap[groupLowerBoundStartTime] === undefined) {
            this.sensorStartTimeMap[groupLowerBoundStartTime] = new Set();
        }
        // Add sensorMap to sensorStartTimeMap
        this.sensorStartTimeMap[groupLowerBoundStartTime].add(sensorMap);

        // Initializing sensorEndTimeMap, if there is not entry for LBET
        if (this.sensorEndTimeMap[groupLowerBoundEndTime] === undefined) {
            this.sensorEndTimeMap[groupLowerBoundEndTime] = new Set();
        }
        // Create an entry for LBET in sensorEndTimeMap
        this.sensorEndTimeMap[groupLowerBoundEndTime].add(sensorMap);

        // Calculating sensor's min and max start and end time respectively
        // Use it in getAllSensorInTimeRange() to detect if the parsed start and end is valid or not and accordingly perform operation
        if (startTime <= this.sensorsMinStartTime) {
            this.sensorsMinStartTime = startTime;
        }
        if (startTime > this.sensorsMaxStartTime) {
            this.sensorsMaxStartTime = startTime;
        }
        if (endTime <= this.sensorsMinEndTime) {
            this.sensorsMinEndTime = endTime;
        }
        if (endTime > this.sensorsMaxEndTime) {
            this.sensorsMaxEndTime = endTime;
        }
    }

    /**
     * Creates array of sets of start and end Equipment Sensors with Potential matches and filter the common between those
     * @param {String} startTime
     * @param {String} endTime
     * @returns all sensors in given time range
     */
    getAllSensorInTimeRangev1(startTime, endTime) {
        // Convert start and end time in minutes
        const startTimeInMinutes = getTimeInMinutes(startTime);
        const endTimeInMinutes = getTimeInMinutes(endTime);

        // Get group number of start time and end time
        // Since we are dividing 24 hours into 48 hours; we need to get lower bound start and end time
        const lowerBoundStartTime = parseInt(startTimeInMinutes/30);
        const lowerBoundEndTime = parseInt(endTimeInMinutes/30);

        let result = new Set();

        // TODO: Handle if startTime > EndTime; if startTime < 00:00 && endTime > 23:59
        if (this.sensors.size === 0) {
            return result;
        }
        if (startTimeInMinutes > this.sensorsMaxStartTime || endTimeInMinutes < this.sensorsMinEndTime) {
            return result;
        }

        // Array of sets of ES with potential matches
        let sTHMFilteredSets = [];
        let eTHMFilteredSets = [];

        // Get elements from respective Map Range
        for (let i=(lowerBoundStartTime+1); i<lowerBoundEndTime; i++) {
            if (this.sensorStartTimeMap[i] !== undefined) {
                sTHMFilteredSets.push(this.sensorStartTimeMap[i]);
            }
            if (this.sensorEndTimeMap[i] !== undefined) {
                eTHMFilteredSets.push(this.sensorEndTimeMap[i]);
            }
        }

        // Process this.sensorStartTimeMap
        // Set of filtered ES objects in lowerBoundStartTime and lowerBoundEndTime
        let startTimeFilteredObjects = new Set();

        let lowerBoundStartTimeElems = this.sensorStartTimeMap[lowerBoundStartTime] || [];
        let lowerBoundEndTimeElems = this.sensorStartTimeMap[lowerBoundEndTime] || [];

        // Get elements from lowerBoundStartTime of startTimeMap which is in the range of startTimeInMinutes and endTimeInMinutes
        lowerBoundStartTimeElems.forEach((es) => {
            if ( es.startTime >= startTimeInMinutes && es.endTime < endTimeInMinutes) {
                startTimeFilteredObjects.add(es);
            }
        });

        // Get elements from lowerBoundEndTime of startTimeMap which is in the range of startTimeInMinutes and endTimeInMinutes
        lowerBoundEndTimeElems.forEach((es) => {
            if (es.startTime < endTimeInMinutes  && es.endTime < endTimeInMinutes) {
                startTimeFilteredObjects.add(es);
            }
        });
        sTHMFilteredSets.push(startTimeFilteredObjects);

        // Process this.sensorEndTimeMap
        let endTimeFilteredObjects = new Set();

        let lowerBoundSensorEndStartTimeElems = this.sensorEndTimeMap[lowerBoundStartTime] || [];
        let lowerBoundSensorEndEndTimeElems = this.sensorEndTimeMap[lowerBoundEndTime] || [];

        // Get elements from start lower bound time of endTimeHashMap
        lowerBoundSensorEndStartTimeElems.forEach((es) => {
            if (es.endTime > startTimeInMinutes && es.startTime >= startTimeInMinutes) {
                endTimeFilteredObjects.add(es);
            }
        });

        // Get elements from end lower bound time of endTimeHashMap
        lowerBoundSensorEndEndTimeElems.forEach((es) => {
            if (es.endTime < endTimeInMinutes && es.startTime >= startTimeInMinutes) {
                endTimeFilteredObjects.add(es);
            }
        })
        eTHMFilteredSets.push(endTimeFilteredObjects);
        // Set of all filtered objects from startTimeHashMap
        let allStartTimeObjects = union(sTHMFilteredSets);
        let allEndTimeObjects = union(eTHMFilteredSets);

        allStartTimeObjects.forEach(obj => {
            if (allEndTimeObjects.has(obj) ){
                result.add(obj);
                // let obj_result = result[obj.sensor.name];
                // if (obj_result === undefined) {
                //     obj_result = [];
                //     result[obj.sensor.name] = obj_result;
                // }
                // obj_result.push([obj.startTimeStr, obj.endTimeStr])
            }
        });

        // result = new Set([...allStartTimeObjects].filter((a) => allEndTimeObjects.has(a)));

        return result

    }

    /**
     * Creates array of sets of start and end Equipment Sensors with Potential matches and filter the common between those
     * @param {String} startTime
     * @param {String} endTime
     * @returns all sensors in given time range
     */
    getAllSensorInTimeRange(startTime, endTime) {
        // Convert start and end time in minutes
        const startTimeInMinutes = getTimeInMinutes(startTime);
        const endTimeInMinutes = getTimeInMinutes(endTime);

        let startTimeFilteredObjects = new Set();


        // Get group number of start time and end time
        // Since we are dividing 24 hours into 48 hours; we need to get lower bound start and end time
        const lowerBoundStartTime = parseInt(startTimeInMinutes/30);
        const lowerBoundEndTime = parseInt(endTimeInMinutes/30);

        // TODO: Handle if startTime > EndTime; if startTime < 00:00 && endTime > 23:59
        if (this.sensors.size === 0 && this.sensorTimeMap.size === 0) {
            return startTimeFilteredObjects;
        }
        if (startTimeInMinutes > this.sensorsMaxStartTime || endTimeInMinutes < this.sensorsMinEndTime) {
            return startTimeFilteredObjects;
        }

        // Array of sets of ES with potential matches
        let sTHMFilteredSets = [];
        let maxLength = 0;
        // Get elements from respective Map Range
        for (let i=(lowerBoundStartTime+1); i<lowerBoundEndTime; i++) {
            let sensorStartTimeMapObj = this.sensorStartTimeMap[i];
            if (sensorStartTimeMapObj!== undefined) {
                if (sensorStartTimeMapObj.size > maxLength) maxLength = sensorStartTimeMapObj.size
                sTHMFilteredSets.push([...sensorStartTimeMapObj]);
            }
        }

        // Process this.sensorStartTimeMap
        // Set of filtered ES objects in lowerBoundStartTime and lowerBoundEndTime

        let lowerBoundStartTimeElems = [...(this.sensorStartTimeMap[lowerBoundStartTime] || [])];
        let lowerBoundEndTimeElems = [...(this.sensorStartTimeMap[lowerBoundEndTime] || [])];

        let loopLength = Math.max(lowerBoundStartTimeElems.length, lowerBoundEndTimeElems.length, maxLength);

        for (let i=0; i<loopLength; i++ ) {
            for (let j=0; j<sTHMFilteredSets.length; j++) {
                let es = sTHMFilteredSets[j][i];
                if (es === undefined) sTHMFilteredSets.splice(j, 1);
                else if (es.endTime < endTimeInMinutes) {
                    startTimeFilteredObjects.add(es);
                }
            }
            let Ses = lowerBoundStartTimeElems[i];
            let Ees = lowerBoundEndTimeElems[i];
            if (Ses && Ses.startTime >= startTimeInMinutes && Ses.endTime < endTimeInMinutes) {
                startTimeFilteredObjects.add(Ses);
            }
            if (Ees && Ees.endTime < endTimeInMinutes) {
                startTimeFilteredObjects.add(Ees);
            }
        }

        // Get elements from lowerBoundEndTime of startTimeMap which is in the range of startTimeInMinutes and endTimeInMinutes

        return startTimeFilteredObjects;

    }
}

// Contains Sensor data
class Sensor {
    constructor(name) {
        this.name = name;
    }
}

module.exports = {
    Plant,
    EquipmentSensors,
    Equipment,
    Sensor,
}
