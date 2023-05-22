import useGateway from '../useGateway.hooks'
import GatewayCard from '../GatewayCard'
const ListingGateways = ()=>{
    const {
        gateways
    } = useGateway()
    return(
        <div className='py-5'>
            {gateways?.map((gateway)=>(
                <div key={gateway.gatewaySerial}>
                <GatewayCard gateway={gateway} />
                </div>
            ))}
            {gateways =='' && <h5 className='text-center p-5 text-muted'>There is No Gateways !</h5>}
        </div>
    )
}
export default ListingGateways