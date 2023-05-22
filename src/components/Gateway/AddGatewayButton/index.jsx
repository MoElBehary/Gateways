import useGateway from "../useGateway.hooks"
const AddGatewayButton = ()=>{
    const {
        openCreateGatewayForm
    } = useGateway()
    return(
        <button onClick={openCreateGatewayForm} type="button" className="btn btn-outline-primary w-100 p-3" data-bs-toggle="modal" data-bs-target="#gatewayForm">Add New Gateway</button>
    )
}
export default AddGatewayButton