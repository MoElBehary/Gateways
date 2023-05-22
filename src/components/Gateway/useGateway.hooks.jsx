import { useRef, useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { AppContext } from '../../model/Context/appContext';

let selectedUpdatingGateway;

const useGateway = ()=>{
    const [gatewayIsSaved, setGatewayIsSaved] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const gatewaySubmit = useRef(null);
    const closeGatewayForm = useRef(null);

    const {
        gateways,
        setGateways,
        gatewayNameInpVal,
        setGatewayNameInpVal,
        gatewayIPV4InpVal,
        setGatewayIPV4InpVal,
        gatewaySubmitInpVal,
        setGatewaySubmitInpVal,
        setSelectedGatewaySerial
    } = useContext(AppContext)
    
    useEffect(()=>{
        localStorage.setItem('gateways', JSON.stringify(gateways));
    }, [gateways])


    const openCreateGatewayForm = ()=>{
        setGatewaySubmitInpVal('Create')
        setGatewayNameInpVal('')
        setGatewayIPV4InpVal('')
    }
    
    const generateSerialNumber = ()=>{
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const serialNumber = timestamp + random;
        return serialNumber;
    }

    const formHandler = (data)=>{
        gatewaySubmitInpVal === 'Create' && createGateway(data)
        gatewaySubmitInpVal === 'Update' && updateGateway(data)
        return
    }

    const createGateway = (data)=>{
        data.gatewaySerial = generateSerialNumber()
        data.gatewayPeripheral = []
        setGateways(prevArray => [data, ...prevArray])
        gatewaySaved()

    }

    const gatewaySaved = ()=>{
        setGatewayIsSaved(true)
        setTimeout(() => { closeGatewayForm.current.click() }, 1000)
        setTimeout(() => { setGatewayIsSaved(false) }, 1200)
    }

    const deleteGateway = (serialNumber)=>{
        const modifiedArray = gateways.filter(object => object.gatewaySerial !== serialNumber);
        setGateways(modifiedArray)

    }

    const openEditGateway = (serialNumber)=>{
        setGatewaySubmitInpVal('Update')
        const selectedItem = gateways.find(object => object.gatewaySerial === serialNumber);
        selectedUpdatingGateway = selectedItem
        setGatewayNameInpVal(selectedItem.gatewayName)
        setGatewayIPV4InpVal(selectedItem.gatewayIPV4)
    }
    const updateGateway = (data)=>{
        const selectedItemIndex = gateways.indexOf(selectedUpdatingGateway)
        selectedUpdatingGateway.gatewayName = data.gatewayName
        selectedUpdatingGateway.gatewayIPV4 = data.gatewayIPV4
        const updatedGateways = [...gateways]
        updatedGateways.splice(selectedItemIndex, 1, selectedUpdatingGateway)
        setGateways(updatedGateways)
        gatewaySaved()    
    }

    const selectGatewaySerial = (serialNumber)=>{
        setSelectedGatewaySerial(serialNumber)
    }

    return {
        openCreateGatewayForm,
        gatewayNameInpVal,
        setGatewayNameInpVal,
        gatewayIPV4InpVal,
        setGatewayIPV4InpVal,
        gateways,
        gatewaySubmit,
        closeGatewayForm,
        gatewayIsSaved,
        register,
        handleSubmit: handleSubmit(formHandler),
        errors,
        deleteGateway,
        openEditGateway,
        gatewaySubmitInpVal,
        selectGatewaySerial
    };

}
export default useGateway