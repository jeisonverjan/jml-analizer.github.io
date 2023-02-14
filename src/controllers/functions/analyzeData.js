export const analyzeData = (wbData, opcoPopulation, populationKeys) => {

    // control variables
    const totalRecords = wbData.length
    const keysToExclude = ['_id', 'opco', 'name', 'status', 'createdAt', 'updatedAt']
    const filteredKeys = populationKeys.filter(key => !keysToExclude.includes(key))

    // counters variables
    let joiners = 0
    let leavers = 0
    let totalNoTickets = 0
    let totalTickets = 0

    //  Results variables
    let totalGeneratedPercent = 0
    let totalNoGeneratedPercent = 0
    let analysisResult = []
    let noJobs = []

    /* filteredKeys.forEach(key => {
        console.log(opcoPopulation[key])
    }) */

    // Loop into wbData
    wbData.forEach(record => {
        // object to save findings
        let recordAnalyses = {}
        recordAnalyses.user = record.user
        recordAnalyses.userADID = record.userADID
        recordAnalyses.processType = record.processType

        if (!record.serviceNowRequest) {
            totalNoTickets++
        } else {
            totalTickets++
        }
        if (record.processType === 'Leaver') {
            leavers++
        } else {
            joiners++
        }
        if (record.job) {
            if (!opcoPopulation.job.includes(record.job.toLowerCase()) && !noJobs.includes(record.job)){
                noJobs.push(record.job)
            } 
        }

        filteredKeys.forEach(key => {
            if (opcoPopulation[key].includes(record[key].toLowerCase()) && record[key] && !record.serviceNowRequest) {
                recordAnalyses[key] = true
            } else {
                recordAnalyses[key] = false
            }
        })
        analysisResult.push(recordAnalyses)
    })
    console.log(analysisResult)
    console.log(analysisResult[0].length)
    if (totalTickets == 0) {
        totalGeneratedPercent = 0
    } else {
        totalGeneratedPercent = (totalTickets / totalRecords) * 100
    }

    if (totalNoTickets == 0) {
        totalNoGeneratedPercent = 0
    } else {
        totalNoGeneratedPercent = (totalNoTickets / totalRecords) * 100
    }

    
    const reportHeader = `Received ${totalRecords} records, of which ${joiners} are Joiners and ${leavers} are Leavers. From the ${totalRecords} records received, ${totalTickets} were/was automatically generated; an effectiveness of ${totalGeneratedPercent.toFixed(2)}%. Of the ${totalRecords} records received, no ticket were/was automatically generated in ${totalNoTickets} records; which equals the ${totalNoGeneratedPercent.toFixed(2)}%`

    console.log(reportHeader)
}