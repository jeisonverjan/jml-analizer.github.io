/* This function check if the header of the file match with the population, the header of the file must contain all the fields of the selected population. */

export const isValidHeaders = (populationKeys, wbHeaders) => {

    // Array with excluded keys, that are no necessary to compare
    const excludedKeys = ['_id', 'opco', 'name', 'createdAt', 'updatedAt']
    let isValid = true;
    for (let i = 0; i < populationKeys.length; i++) {
        const key = populationKeys[i];
        if (!excludedKeys.includes(key)) {
            if (!wbHeaders.includes(key)) {
                isValid = false;
                break;
            }
        }
    }
    return isValid;
}