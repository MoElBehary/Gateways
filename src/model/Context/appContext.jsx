import { useState, createContext } from "react";

export const AppContext = createContext()

export const AppWrapper = ({children}) =>{

    const [gatewayNameInpVal, setGatewayNameInpVal] = useState('')
    const [gatewayIPV4InpVal, setGatewayIPV4InpVal] = useState('')
    const [gatewaySubmitInpVal, setGatewaySubmitInpVal] = useState('')
    const [selectedGatewaySerial, setSelectedGatewaySerial] = useState('')
    const [peripheralVendorInpVal, setPeripheralVendorInpVal] = useState('')
    const [peripheralStatusInpVal, setPeripheralStatusInpVal] = useState(false)
    const [peripheralSubmitInpVal, setPeripheralSubmitInpVal] = useState('')
    const [gateways, setGateways] = useState(() => {
        const storedData = localStorage.getItem('gateways');
        return storedData ? JSON.parse(storedData) : [];
    })

    return (
        <AppContext.Provider
            value={{
                gateways,
                setGateways,
                gatewayNameInpVal,
                setGatewayNameInpVal,
                gatewayIPV4InpVal,
                setGatewayIPV4InpVal,
                gatewaySubmitInpVal,
                setGatewaySubmitInpVal,
                selectedGatewaySerial,
                setSelectedGatewaySerial,
                peripheralVendorInpVal,
                setPeripheralVendorInpVal,
                peripheralStatusInpVal,
                setPeripheralStatusInpVal,
                peripheralSubmitInpVal,
                setPeripheralSubmitInpVal
            }}
        >
            {children}
        </AppContext.Provider>
    )
}