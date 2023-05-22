import { useRef, useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { AppContext } from '../../model/Context/appContext';
let selectedUpdatingPeripheralID;
const usePeripheral = ()=>{
    const [peripheralIsSaved, setPeripheralIsSaved] = useState(false)
    
    const {
        gateways,
        setGateways,
        selectedGatewaySerial,
        peripheralVendorInpVal,
        setPeripheralVendorInpVal,
        peripheralStatusInpVal,
        setPeripheralStatusInpVal,
        peripheralSubmitInpVal,
        setPeripheralSubmitInpVal
    } = useContext(AppContext)
    
    useEffect(() => {
        localStorage.setItem('gateways', JSON.stringify(gateways));
    }, [gateways])

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const peripheralSubmit = useRef(null)
    const closePeripheralForm = useRef(null);

    const openCreatePeripheralForm = () => {
        setPeripheralSubmitInpVal('Create')
        setPeripheralVendorInpVal('')
        setPeripheralStatusInpVal(false)
    }

    const generateUID= () => {
        return Math.floor(Math.random() * 1000000);
    }

    const peripheralSaved = () => {
        setPeripheralIsSaved(true)
        setTimeout(() => { closePeripheralForm.current.click() }, 1000)
        setTimeout(() => { setPeripheralIsSaved(false) }, 1200)
    }

    const formHandler  = (data)=>{
        peripheralSubmitInpVal === 'Create' && createPeripheral(data)
        peripheralSubmitInpVal === 'Update' && updatePeripheral(data)
        
    }

    const createPeripheral = (data)=>{
        data.peripheralUID = generateUID()
        data.peripheralTimestamp = new Date().toDateString();
        const selectedGateway = gateways.find(object => object.gatewaySerial === selectedGatewaySerial);
        if (selectedGateway.gatewayPeripheral.length <= 10){
            selectedGateway.gatewayPeripheral.unshift(data)
            const updatedGateways = [...gateways]
            setGateways(updatedGateways)
            peripheralSaved()
        }
        else {
            return false
        }
    }

    const deletePeripheral = (peripheralID) => {
        const parentGateway = gateways.find((object) => object.gatewayPeripheral.some((category) => category.peripheralUID === peripheralID));
        const parentGatewayIndex = gateways.indexOf(parentGateway)
        const modifiedPeripheralArray = parentGateway.gatewayPeripheral.filter((object) => object.peripheralUID !== peripheralID)
        parentGateway.gatewayPeripheral = modifiedPeripheralArray
        const updatedGateways = [...gateways]
        updatedGateways.splice(parentGatewayIndex, 1, parentGateway)
        setGateways(updatedGateways)

    }

    const openEditPeripheral = (peripheralID) => {
        setPeripheralSubmitInpVal('Update')
        selectedUpdatingPeripheralID = peripheralID
        const parentGateway = gateways.find((object) => object.gatewayPeripheral.some((category) => category.peripheralUID === peripheralID));
        const selectedPeripheral = parentGateway.gatewayPeripheral.find((object) => object.peripheralUID === peripheralID)
        setPeripheralVendorInpVal(selectedPeripheral.peripheralVendor)
        setPeripheralStatusInpVal(selectedPeripheral.peripheralStatus)
    }

    const updatePeripheral = (data) => {
        const parentGateway = gateways.find((object) => object.gatewayPeripheral.some((category) => category.peripheralUID === selectedUpdatingPeripheralID));
        const parentGatewayIndex = gateways.indexOf(parentGateway)
        const selectedPeripheral = parentGateway.gatewayPeripheral.find((object) => object.peripheralUID === selectedUpdatingPeripheralID)
        selectedPeripheral.peripheralVendor = data.peripheralVendor
        selectedPeripheral.peripheralStatus = data.peripheralStatus
        const updatedGateways = [...gateways]
        updatedGateways.splice(parentGatewayIndex, 1, parentGateway)
        setGateways(updatedGateways)
        peripheralSaved()
    }

    return {
        register,
        handleSubmit: handleSubmit(formHandler),
        errors,
        peripheralSubmit,
        peripheralIsSaved,
        closePeripheralForm,
        deletePeripheral,
        peripheralVendorInpVal,
        setPeripheralVendorInpVal,
        peripheralStatusInpVal,
        setPeripheralStatusInpVal,
        openCreatePeripheralForm,
        peripheralSubmitInpVal,
        openEditPeripheral
    }
}
export default usePeripheral