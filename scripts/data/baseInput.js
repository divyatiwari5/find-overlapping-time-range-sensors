module.exports = baseInput = {
    "Plants": [
        "PlantA"
    ],
    "Equipments": [
        "Equipment1"
    ],
    "Sensors": [
        "Sensor1"
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
            }
        ]
    }

}