function InfoModal(props) {

    const sensorEquipInfo = [...props.sensorEquipInfo];
    const show = props.show

    return(
        <div className="info-modal">
            <p className="close-modal" onClick={props.handleClose}>x</p>
            {
                Object.keys(sensorEquipInfo).length !== 0 ? 
                <div className="content sensor-grid-container">
                    {  
                        sensorEquipInfo.map((sensorEquipObj, i) => {
                            return <div  
                                key={sensorEquipObj.sensor.name + '-'  + i}
                                className="grid-item">
                                <p><b>Sensor:</b> {sensorEquipObj.sensor.name}</p>
                                <p><b>StartTime:</b> {sensorEquipObj.startTimeStr}</p>
                                <p><b>End Time:</b> {sensorEquipObj.endTimeStr}</p>
                            </div>
                        })
                    }
                </div>
                : 
                <p style={{margin: 'auto'}}>No sensor found for the selected time period!</p>
            }
        </div>
    )
}

export default InfoModal