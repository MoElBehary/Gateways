import useGateway from '../useGateway.hooks'
import usePeripheral from '../../Peripheral/usePeripheral.hooks'
import PeripheralCard from '../../Peripheral/PeripheralCard'
const GatewayCard = ({gateway})=>{
    const {
        deleteGateway,
        openEditGateway,
        selectGatewaySerial
    } = useGateway()
    const {
        openCreatePeripheralForm
    } = usePeripheral()
    return(
        <div className="card mb-4">
            <div className="card-header d-flex">
                Gateway
                <div className='ms-auto'>
                    <h6 className='m-0'>Peripheral Count : <span className="badge bg-primary">{gateway.gatewayPeripheral.length} / 10</span></h6>
                </div>
            </div>
            <div className="card-body">
                <h4 className="card-title">{gateway.gatewayName}</h4>
                <ul>
                    <li className="card-text">GateWay Serial Number : {gateway.gatewaySerial}</li>
                    <li className="card-text">IPV4 address : {gateway.gatewayIPV4}</li>
                </ul>
                {gateway.gatewayPeripheral[0] &&
                    <div className='py-4'>
                        <h5 className="card-title py-2">Peripheral</h5>
                        {gateway.gatewayPeripheral.map((peripheral)=>(
                            <div key={peripheral.peripheralUID}>
                                <PeripheralCard gatewayPeripheral={peripheral} />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='card-footer py-3 d-flex'>
                {gateway.gatewayPeripheral.length < 10 && 
                    <button onClick={() => {openCreatePeripheralForm() ; selectGatewaySerial(gateway.gatewaySerial)}} className="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#peripheralForm"> Add New Peripheral</button>
                }
                {gateway.gatewayPeripheral.length >= 10 && 
                    <button disabled className="btn btn-muted mx-2"> You can not create more then 10 peripheral!</button>
                }
                <div className='ms-auto'>
                    <button onClick={() => { openEditGateway(gateway.gatewaySerial) }} className="btn btn-outline-primary mx-2" data-bs-toggle="modal" data-bs-target="#gatewayForm">Edit</button>
                    <button onClick={() => { deleteGateway(gateway.gatewaySerial) }} className="btn btn-outline-danger mx-2">Delete</button>
                </div>
            </div>
        </div>
    )
}
export default GatewayCard