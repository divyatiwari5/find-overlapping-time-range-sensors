/**
 * Converts time to minutes
 * @param {String} timeStr in HH:MM or H:M format
 * @returns {Number} formatted time in minutes
 */
function getTimeInMinutes(timeStr) {
    let splittedTime = timeStr.split(":");
    return ((+splittedTime[0] * 60) + +splittedTime[1]);
}

/**
 * Union of sets
 * @param {Array[Set]} sets array of sets to combine
 * @returns {Set} Union of all sets
 */
function union (sets) {
    return sets.reduce((combined, list) => {
        return new Set([...combined, ...list]);
    }, new Set());
}


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
        let resultExpectedArray = expectedOutput[ESObj.sensor];
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


module.exports = {
    getTimeInMinutes,
    union,
    compareResult
}