function Plants(props) {

    const plants = props.plants;
    
    return(
        <div>
            <p className="heading">Total no. of Plants: {plants ? Object.keys(plants).length: 0}</p>
            <div className="grid-container">
                {plants && Object.keys(plants).map((plant) => {
                    return <div key={plant} className="grid-item">{plant}</div>
                })}
            </div>
        </div>
    )
}

export default Plants