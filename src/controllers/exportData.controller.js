import XLSX from 'xlsx'
import { __dirname } from '../app.js'
import path from 'path'
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import os from 'os'

export const exportData = (req, res) => {

    try {
        // unique id
        const uniqueCode = nanoid(8)
        // json data
        const recordsResult = JSON.parse(req.body.recordsResult)
        // file name
        const fileName = 'jml_report_' + uniqueCode + '.xlsx'
        // path route
        const pathFile = path.join(os.tmpdir(), fileName)
        // Convert json object into a excel file
        const worksheet = XLSX.utils.json_to_sheet(recordsResult)
        // Excel book init
        const workbook = XLSX.utils.book_new()
        // Create a new page
        XLSX.utils.book_append_sheet(workbook, worksheet, 'analysis_report')
        // Write file
        XLSX.writeFile(workbook, pathFile, { bookType: 'xlsx' });

        // send the file as download then delete it
        res.download(pathFile, (error) => {
            if (error) {
                req.flash('error_msg', error.message)
            } else {
                fs.remove(pathFile)
            }
        })

    } catch (error) {
        req.flash('error_msg', error.message)
    }

}