import XLSX from 'xlsx'

export const receiveFile = (pathFile) => {
    let wb = XLSX.readFile(pathFile)
    let wbSheetsNames = wb.SheetNames
    let ws = wb.Sheets[wbSheetsNames[0]]
    

    // Modify Headers, remove spaces and make the first char lowercase
    let range = XLSX.utils.decode_range(ws['!ref'])
    for (var C = range.s.c; C <= range.e.c; ++C) {
        var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
        if (!ws[address]) continue;
        ws[address].w = ws[address].w.replace(/[\(\)\s]/g, "");
        ws[address].w = ws[address].w.charAt(0).toLowerCase() + ws[address].w.slice(1)
        ws[address].v = ws[address].v.replace(/[\(\)\s]/g, "");
        ws[address].v = ws[address].v.charAt(0).toLowerCase() + ws[address].v.slice(1)
    }

    // Data converted to json format
    const wbData = XLSX.utils.sheet_to_json(ws)
    const wbHeaders = XLSX.utils.sheet_to_json(ws, {header: 1})[0]
    return [wbData, wbHeaders]
}