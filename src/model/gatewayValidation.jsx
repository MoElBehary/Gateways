export const registerOptions = {
    gatewayName: {
        required: "Gateway name is required",
        minLength: {
            value: 4,
            message: "Gateway name should be more then 4 characters to be human readable."
        },
        validate: (value) => uniqueValueValidator('gateways', 'gatewayName', value, 'Gateway Name must be unique, This gateway Name may be used before.')
    },
    gatewayIPV4: { 
        required: "Gateway IPV4 is required.",
        pattern: {
            value: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
            message: "invalid IPV4."
        },
        validate: (value) => uniqueValueValidator('gateways', 'gatewayIPV4', value, 'Gateway IPV4 must be unique, This gateway IPV4 may be used before.')
    }
};

const uniqueValueValidator = (key, objKey, value, message) => {
    const storedData = localStorage.getItem(key);
    const dataArray = storedData ? JSON.parse(storedData) : [];
    const isUnique = !dataArray.some(object => object[objKey] === value);
    return isUnique || message;
};