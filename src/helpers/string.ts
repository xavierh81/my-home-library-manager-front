// Check if a string parameter is empty 
export const isStringEmpty = (str: string | null) => {
    return (!str || /^\s*$/.test(str));
}