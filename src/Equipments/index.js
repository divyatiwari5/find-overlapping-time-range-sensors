import { useEffect, useState } from "react";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import "./_Equipments.scss";

function Equipments(props) {

    const [totalEquipments, setEquipments] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const format = 'H:mm';

    const now = moment().hour(0).minute(0);

    useEffect(() => {
        const equipments = props.equipments;
        setEquipments(equipments);
    }, [totalEquipments]); 

    function onStartDateChange(value) {
        if (value) setStartDate(value.format(format));
    }

    function onEndDateChange(value) {
        if (value) setEndDate(value.format(format));
    }

    function filterEquipmentSensors(selectedEquipment) {
        console.log({selectedEquipment});
        const result = selectedEquipment.getAllSensorInTimeRange(startDate, endDate)
        console.log({result});
    }

    return(
        <div>
            <p className="heading">Total no. of Equipments: {totalEquipments ? Object.keys(totalEquipments).length : 0}</p>
            <div className="equp-grid-container">
                {totalEquipments && Object.keys(totalEquipments).map((equipment) => {
                    return <div key={equipment} className="grid-item">
                        {totalEquipments[equipment].name}
                        <p>Total no. of sensors: {totalEquipments[equipment].sensors.size}</p>
                        <p>Total no. of sensor equipment mapping: {totalEquipments[equipment].sensorTimeMap.length}</p>
                        <div className="time-filter">
                            <span className="filter-box">
                                <p>Start Time</p>
                                <TimePicker
                                    showSecond={false}
                                    defaultValue={now}
                                    onChange={onStartDateChange}
                                    />
                            </span>
                            <span className="filter-box">
                                <p>End Time</p>
                                <TimePicker
                                    showSecond={false}
                                    defaultValue={now}
                                    onChange={onEndDateChange}
                                    />
                            </span>
                        </div>
                        <button className="filter-btn" onClick={() => filterEquipmentSensors(totalEquipments[equipment])}>Filter Sensors</button>
                       
                    </div>
                })}
            </div>
        </div>
       
    )
}

export default Equipments;