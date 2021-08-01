function InfoModal(props) {

    const sensorEquipInfo = [...props.sensorEquipInfo];
    const show = props.show

    return(
        <div>
            <p onClick={props.handleClose}>x</p>
            {
                sensorEquipInfo && sensorEquipInfo.map((sensorEquipObj) => {
                    return <div key={sensorEquipObj.sensor.name + '-'  + sensorEquipObj.startTimeStr + '-' + sensorEquipObj.endTimeStr}>
                        <p>Sensor: ${sensorEquipObj.sensor.name}</p>
                        <p>StartTime: ${sensorEquipObj.startTimeStr}</p>
                        <p>End Time: ${sensorEquipObj.endTimeStr}</p>
                    </div>
                })
            }
        </div>
    )
}

export default InfoModal