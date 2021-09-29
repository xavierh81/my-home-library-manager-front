// Check if a string parameter is empty 
export const isStringEmpty = (str: string | null) => {
    return (!str || /^\s*$/.test(str));
}

// Get enum key by his value
export const getEnumKeyByValue = (object: any, value: number) => {
    return Object.keys(object).find(key => object[key] === value);
}