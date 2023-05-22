import usePeripheral from "../usePeripheral.hooks"
const PeripheralCard = ({ gatewayPeripheral })=>{
    const {
        deletePeripheral,
        openEditPeripheral
    } = usePeripheral()
    return (
        <div className="m-2">
            <button className="btn text-start btn-outline-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target={`#id${gatewayPeripheral.peripheralUID}`} aria-expanded="false" aria-controls="collapseExample">
                PeripheralID:  <strong>{gatewayPeripheral.peripheralUID}</strong>
            </button>
            <div className="collapse" id={`id${gatewayPeripheral.peripheralUID}`}>
                <div className="card card-body">
                    <ul>
                        <li>
                            Vendor: {gatewayPeripheral.peripheralVendor}
                        </li>
                        {gatewayPeripheral.peripheralStatus && 
                            <li>
                                status: Online
                            </li>
                        }
                        {!gatewayPeripheral.peripheralStatus && 
                        <li>
                            status: Offline
                        </li>
                        }
                        <li>Created Date: {gatewayPeripheral.peripheralTimestamp}</li>
                    </ul>
                    <div className="py-3">
                        <button onClick={() => { openEditPeripheral(gatewayPeripheral.peripheralUID) }} className="btn btn-outline-primary mx-2" data-bs-toggle="modal" data-bs-target="#peripheralForm">Edit</button>
                        <button onClick={() => { deletePeripheral(gatewayPeripheral.peripheralUID) }} className="btn btn-outline-danger mx-2">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PeripheralCard