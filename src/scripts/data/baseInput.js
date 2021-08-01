module.exports =  baseInput = {
    "Plants": [
        "PlantA",
        "PlantB",
        "PlantC",
        "PlantD"
    ],
    "Equipments": [
        "Equipment1",
        "Equipment2"
    ],
    "Sensors": [
        "Sensor1",
        "Sensor2"
    ],
    "PlantsMapping": {
        "PlantA": [
            "Equipment1"
        ]
    },
    "EquipmentMapping": {
        "Equipment1": [
            {
                "_id": "Sensor1",
                "start_time": "10:00",
                "end_time": "13:00"
            },
            {
                "_id": "Sensor1",
                "start_time": "10:00",
                "end_time": "13:00"
            },
            {
                "_id": "Sensor2",
                "start_time": "10:00",
                "end_time": "13:00"
            }
        ]
    }

}