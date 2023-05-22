import AddGatewayButton from './AddGatewayButton'
import ListingGateways from './ListingGateways'
const Gateway = ()=>{
    return (
        <section className='container'>
            <div className='row'>
                <div className='col'>
                    <AddGatewayButton />
                </div>
            </div>
            <div className='row'>
                <div className="col">
                    <ListingGateways />
                </div>
            </div>
        </section>
    )
}
export default Gateway