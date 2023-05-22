import { registerOptions } from '../../../model/gatewayValidation';
import useGateway from '../useGateway.hooks';
const CreateGatewayForm = ()=>{

    const {
        gatewayNameInpVal,
        setGatewayNameInpVal,
        gatewayIPV4InpVal,
        setGatewayIPV4InpVal,
        gatewaySubmit,
        closeGatewayForm,
        gatewayIsSaved,
        register,
        handleSubmit,
        errors,
        gatewaySubmitInpVal
        } = useGateway();
    
    return (
        <div className="modal fade" id="gatewayForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="gatewayFormLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="gatewayFormLabel">{gatewaySubmitInpVal} Gateway</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                        !gatewayIsSaved
                        ?   <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="gatewayName" className="form-label">Gateway Name</label>
                                        <input {...register('gatewayName', registerOptions.gatewayName)} onChange={(event)=>{setGatewayNameInpVal(event.target.value)}}  value={gatewayNameInpVal} type="text" className="form-control" name='gatewayName' id="gatewayName" aria-describedby="gatewayNameHelp" placeholder="Type gateway name..." />
                                    {errors?.gatewayName && <div id="gatewayNameHelp" className="form-text text-danger">{errors.gatewayName.message}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gatewayIPV4" className="form-label">Gateway IPV4</label>
                                    <input {...register('gatewayIPV4', registerOptions.gatewayIPV4)} onChange={(event)=>{setGatewayIPV4InpVal(event.target.value)}} value={gatewayIPV4InpVal} type="text" className="form-control" name='gatewayIPV4' id="gatewayIPV4" aria-describedby="gatewayIPV4Help" placeholder="Type gateway IPV4..." />
                                    {errors?.gatewayIPV4 && <div id="gatewayIPV4Help" className="form-text text-danger">{errors.gatewayIPV4.message}</div>}
                                </div>
                                <input ref={gatewaySubmit} id='gatewaySubmit' className="d-none" type="submit" />
                            </form>
                                : <div className='h5 text-center text-success'>{gatewaySubmitInpVal === 'Create' && 'Gateway is saved!'} {gatewaySubmitInpVal === 'Update' && 'Gateway is updated!'}</div>
                        }
                    </div>
                    <div className={`modal-footer d-flex ${gatewayIsSaved && 'd-none'}`}>
                        <button type="button" onClick={() => { gatewaySubmit.current.click() }} className="btn btn-primary flex-grow-1">{gatewaySubmitInpVal}</button>
                        <button ref={closeGatewayForm} type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateGatewayForm