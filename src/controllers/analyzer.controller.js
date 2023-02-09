import { __dirname } from '../app.js'
import path from 'path'
import fs from 'fs-extra'
import Population from '../models/populations.js'
import { receiveFile } from './functions/receiveFile.js'
import { isValidHeaders } from './functions/isValidHeaders.js'

export const analyzeFile = async (req, res) => {
    //Opco that user selected
    const opco = req.body.selectOpco
    //Variable to only accept .xlsx files
    const mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    // file location
    const pathFile = path.join(__dirname, '/static/uploads/', req.file.filename)
    // Extract the population according what user selected
    const opcoPopulation = await Population.findOne({ opco: opco })
    // Extract the keys of the population in order to compare to wbHeaders
    const populationKeys = Object.keys(opcoPopulation._doc)

    if (req.file.mimetype != mimetype) {
        req.flash('error_msg', 'Enter a valid file')
        res.redirect('/')
        fs.remove(pathFile)
        return
    } else {
        try {
            const [wbData, wbHeaders] = receiveFile(pathFile)

            // If the header of the mile match to Population selected
            if (isValidHeaders(populationKeys, wbHeaders)) {
                res.send(wbData)
                return
            } else {
                req.flash('error_msg', 'The columns of the file do not match with the population selected')
                res.redirect('/')
                fs.remove(pathFile)
                return
            }
            
        } catch (error) {
            req.flash('error_msg', error.message)
            res.redirect('/')
            fs.remove(pathFile)
        }
    }
}