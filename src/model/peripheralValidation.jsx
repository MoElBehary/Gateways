export const registerOptions = {
    peripheralUID: {
        required: "Gateway name is required",
        minLength: {
            value: 4,
            message: "Gateway name should be more then 4 characters to be human readable."
        }
    },
    peripheralVendor: {
        required: "Gateway name is required",
    },
}