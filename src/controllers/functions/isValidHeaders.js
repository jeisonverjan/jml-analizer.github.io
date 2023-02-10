/* This function check if the header of the file match with the population, the header of the file must contain all the fields of the selected population. */

export const isValidHeaders = (populationKeys, wbHeaders) => {

    // Array with excluded keys, that are no necessary to compare
    const excludedKeys = ['_id', 'opco', 'name', 'createdAt', 'updatedAt']
    const requiredKeys = ['user', 'userADID', 'processType', 'status', 'serviceNowRequest']

    let isValid = true;

    // If the file does not include columns needed to analyze
    for (let j = 0; j < requiredKeys.length; j++) {
        const head = requiredKeys[j]
        if (!wbHeaders.includes(head)){
            isValid = false;
            break;
        }
    }

    // If the file does not include all populations fields
    for (let i = 0; i < populationKeys.length; i++) {
        const key = populationKeys[i]
        if (!excludedKeys.includes(key)) {
            if (!wbHeaders.includes(key)) {
                isValid = false;
                break;
            }
        }
    }
    return isValid;
}