import { __dirname } from '../app.js'
import path from 'path'
import fs from 'fs-extra'
import { receiveFile } from './functions/receiveFile.js'


export const analyzeFile = async (req, res) => {
    const opco = req.body.selectOpco
    const mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const pathFile = path.join(__dirname, '/static/uploads/', req.file.filename)

    if (req.file.mimetype != mimetype) {
        req.flash('error_msg', 'Enter a valid file')
        res.redirect('/')
        fs.remove(pathFile)
        return
    } else {
        const wbData = receiveFile(pathFile)
        res.send(wbData)
        console.log(opco)
    }
}