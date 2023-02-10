export const analyzeData = (wbData, opcoPopulation) => {

    const totalRecords = wbData.length
    let joiners = 0
    let leavers = 0
    let totalNoTickets = 0
    let totalTickets = 0
    wbData.forEach(record => {
        if (!record.serviceNowRequest) {
            totalNoTickets++
        } else {
            totalTickets++
        }
        if (record.processType === 'Joiner') {
            joiners++
        } else {
            leavers++
        }
    })

    
    const reportHeader = `Received ${totalRecords} records, of which ${joiners} are Joiners and ${leavers} are Leavers.
    From the ${totalRecords} records received, ${totalTickets} was automatically generated; an effectiveness of ${totalGeneratedPercent}.
    `

    console.log(reportHeader)
}