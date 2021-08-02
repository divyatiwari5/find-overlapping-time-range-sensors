import { useEffect, useState } from "react";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import InfoModal from "../InfoModal";

function Equipments(props) {

    const [totalEquipments, setEquipments] = useState({});
    const [startDate, setStartDate] = useState("00:00");
    const [endDate, setEndDate] = useState("00:00");
    const [showModal, setModalState] = useState(false);
    const [sensorEquipInfo, setSensorEquipInfo] = useState({});

    const format = 'H:mm';

    const now = moment().hour(0).minute(0);

    useEffect(() => {
        const equipments = props.equipments;
        setEquipments(equipments);
    }); 

    function onStartDateChange(value) {
        if (value) setStartDate(value.format(format));
    }

    function onEndDateChange(value) {
        if (value) setEndDate(value.format(format));
    }

    function filterEquipmentSensors(selectedEquipment) {
        console.log({selectedEquipment});
        console.time("V1 Timing");
        const result = selectedEquipment.getAllSensorInTimeRangev1(startDate, endDate);
        console.log({result});
        console.timeEnd("V1 Timing");
        console.time("V2 Timing");
        const result2 = selectedEquipment.getAllSensorInTimeRange(startDate, endDate);
        console.log({result2});
        console.timeEnd("V2 Timing");

        setSensorEquipInfo(result2);
        setModalState(true);

    }

    function handleClose() {
        setModalState(false);
    }

    return(
        <div>
            <p className="heading">Total no. of Equipments: {totalEquipments ? Object.keys(totalEquipments).length : 0}</p>
            <div className="equp-grid-container">
                {totalEquipments && Object.keys(totalEquipments).map((equipment) => {
                    const equipObj = totalEquipments[equipment];
                    return <div key={equipment} className="grid-item">
                        {equipObj.name}
                        <p>Total no. of sensors: {equipObj.sensors.size}</p>
                        <p>Total no. of sensor equipment mapping: {equipObj.sensorTimeMap.length}</p>
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
                        <button className="filter-btn" onClick={() => filterEquipmentSensors(equipObj)}>Filter Sensors</button>
                    </div>
                })}
                {
                        showModal && 
                        <InfoModal
                            show={showModal}
                            sensorEquipInfo={sensorEquipInfo}
                            handleClose={handleClose}
                        />
                }
            </div>
        </div>
       
    )
}

export default Equipments;