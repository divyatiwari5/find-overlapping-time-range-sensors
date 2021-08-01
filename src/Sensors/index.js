
import "../Plants/_Plants.scss";

function Sensors(props) {
    const sensors = props.sensors;
    
    return(
        <div>
            <p className="heading">No. of sensors: {sensors ? Object.keys(sensors).length : 0}</p>
            <div className="grid-container">
                {sensors && Object.keys(sensors).map((sensor) => {
                    return <div key={sensor} className="grid-item">{sensor}</div>
                })}
            </div>
        </div>
    )
}

export default Sensors