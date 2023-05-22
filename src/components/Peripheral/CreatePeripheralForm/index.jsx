import { registerOptions } from '../../../model/peripheralValidation';
import usePeripheral from '../usePeripheral.hooks';
const CreatePeripheralForm = ()=>{

    const {
        register,
        handleSubmit,
        errors,
        peripheralSubmit,
        peripheralIsSaved,
        closePeripheralForm,
        peripheralVendorInpVal,
        setPeripheralVendorInpVal,
        peripheralStatusInpVal,
        setPeripheralStatusInpVal,
        peripheralSubmitInpVal
    } = usePeripheral()

    return (
        <div className="modal fade" id="peripheralForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="peripheralFormLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="peripheralFormLabel">{peripheralSubmitInpVal} Peripheral</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {!peripheralIsSaved
                        ?   <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="peripheralVendor" className="form-label">Peripheral Vendor</label>
                                    <input {...register('peripheralVendor', registerOptions.peripheralVendor)} onChange={(event) => { setPeripheralVendorInpVal(event.target.value) }} value={peripheralVendorInpVal} type="text" className="form-control" id="peripheralVendor" aria-describedby="peripheralVendorHelp" placeholder="Type peripheral vendor..." />
                                    {errors?.peripheralVendor && <div id="peripheralVendorHelp" className="form-text text-danger">{errors.peripheralVendor.message}</div>}
                                </div>
                                <div className="form-check form-switch mb-3">
                                    <input {...register('peripheralStatus')} onChange={() => { setPeripheralStatusInpVal(!peripheralStatusInpVal) }}  checked={peripheralStatusInpVal} className="form-check-input" type="checkbox" role="switch" id="peripheralStatus" />
                                    <label className="form-check-label" htmlFor="peripheralStatus">Status: {`${peripheralStatusInpVal ? 'Online' :  'Offline'}`}</label>
                                </div>
                                <input ref={peripheralSubmit} id='peripheralSubmit' className="d-none" type="submit" />

                            </form>
                            : <div className='h5 text-center text-success'>{peripheralSubmitInpVal === 'Create' && 'Peripheral is saved!'} {peripheralSubmitInpVal === 'Update' && 'Peripheral is updated!'}</div>
                        }
                    </div>
                    <div className={`modal-footer d-flex ${peripheralIsSaved && 'd-none'}`}>
                        <button type="button" onClick={() => { peripheralSubmit .current.click()}} className="btn btn-primary flex-grow-1">Create</button>
                        <button ref={closePeripheralForm} type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePeripheralForm