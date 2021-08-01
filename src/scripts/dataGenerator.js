const faker = require("faker");
const fs = require('fs')

function generateRandomData(np, ne, ns, nepe, nees, minTime, maxTime, validMinTime, validMaxTime) {
    results = {};
    data = {
        "Plants": [
        ],
        "Equipments": [
        ],
        "Sensors": [
        ],
        "PlantsMapping": {
        },
        "EquipmentMapping": {
        }

    }
    for(i=1; i<=np; i++) {
        data.Plants.push("Plant"+i);
    }
    for(i=1; i<=ne; i++) {
        data.Equipments.push("Equipment"+i)
    }
    for(i=1; i<=ns; i++) {
        data.Sensors.push("Sensor"+i)
    }
    data.Plants.forEach(plant => {
        data.PlantsMapping[plant] = [];
        for(i=1; i<=nepe; i++) {
            console.log(plant, i, "/", nepe);
            var equipment = faker.random.arrayElement(data.Equipments);
            data.PlantsMapping[plant].push(equipment);
        }
    });
    data.Equipments.forEach(equp => {
        data.EquipmentMapping[equp] = []
        result = {}
        for(i=1; i<=nees; i++) {
            console.log(equp, i, "/", nees)
            var sensor = faker.random.arrayElement(data.Sensors);
            hour = faker.datatype.datetime();
            min = faker.datatype.number(max=59);
            startTime = faker.datatype.number(max=maxTime-120);
            endTime = 0
            while (endTime <= startTime) {
                endTime = faker.datatype.number(max=maxTime);
            }
            stH = parseInt(startTime/60)
            stM = startTime - (stH*60)
            etH = parseInt(endTime/60)
            etM = endTime - (etH*60)
            startTimeStr = stH+":"+stM;
            endTimeStr = etH+":"+etM;
            var es = {
                "_id": sensor,
                "start_time": startTimeStr,
                "end_time": endTimeStr
            };
            data.EquipmentMapping[equp].push(es);
            if (startTime >= validMinTime && endTime < validMaxTime) {
                obj_result = result[sensor];
                if (obj_result === undefined) {
                    obj_result = [];
                    result[sensor] = obj_result;
                }
                obj_result.push([startTimeStr, endTimeStr])
            }
        }
        results[equp] = result;
    });

    return {"input": data, "output": results};
}

// // 10:28 AM - 04:15 PM
// genData = generateRandomData(1, 1, 1000000, 1, 1000000, 0, 1439, 628, 975);

// fs.writeFile('./largeData.json', JSON.stringify(genData), err => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     //file written successfully
//   })
  
module.exports = generateRandomData;