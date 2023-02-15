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
    let totalItemIssue = {}
    let recordsResult = []
    let noJobs = []
    

    // Loop into wbData
    wbData.forEach(record => {
        // object to save findings
        let recordAnalyses = {}
        recordAnalyses.user = record.user
        recordAnalyses.userADID = record.userADID
        recordAnalyses.processType = record.processType

        if (!record.serviceNowRequest) {
            totalNoTickets++

            // Loop to compare record with the population
            filteredKeys.forEach(key => {
                if (opcoPopulation[key].includes(record[key].toLowerCase()) && record[key]) {
                    recordAnalyses[key] = true
                } else {
                    recordAnalyses[key] = false
                    if (totalItemIssue[key]) {
                        totalItemIssue[key]++
                    } else {
                        totalItemIssue[key] = 1
                    }
                }
            })
            recordsResult.push(recordAnalyses)
        } else {
            totalTickets++
        }
        if (record.processType === 'Leaver') {
            leavers++
        } else {
            joiners++
        }
        if (record.job) {
            if (!opcoPopulation.job.includes(record.job.toLowerCase()) && !noJobs.includes(record.job)) {
                noJobs.push(record.job)
            }
        }

    })
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


    const reportHeader = `A total of ${totalRecords} records were received, consisting of ${joiners} Joiners and ${leavers} Leavers. Out of the ${totalRecords} records received, ${totalTickets} tickets were automatically generated, resulting in an effectiveness rate of ${totalGeneratedPercent.toFixed(2)}%. Among the ${totalRecords} records, there were ${totalNoTickets}  instances where no ticket was automatically generated, representing a ${totalNoGeneratedPercent.toFixed(2)}% rate. The root causes for the ${totalNoTickets} tickets not generated were identified as follows:`

    const analysisResult = {
        reportHeader,
        recordsResult,
        totalItemIssue,
        noJobs
    }
    return analysisResult
}