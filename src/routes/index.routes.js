import { Router } from 'express'
import Population from '../models/populations.js'
import { renderHome } from '../controllers/index.controller.js'
import { createPopulation, deletePopulation, updatePopulation, updatePopulationPost } from '../controllers/population.controller.js'
import fs from 'fs-extra'

// Router init
const router = Router()

// Home Page
router.get('/', renderHome)

// Create population form
router.get('/populations', (req, res) => {
    res.render('populations-add', { endPoint: '/populations/add' })
})

// Create Populations post
router.post('/populations/add', createPopulation)

// Delete Population
router.get('/population/:id/delete', deletePopulation)

// Update Population GET
router.get('/population/:id/update', updatePopulation)

// Update Population POST
router.post('/population/update/:id', updatePopulationPost)

// Upload file to analyze
router.post('/upload', (req, res)=>{

    if (req.file.mimetype != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        req.flash('error_msg', 'Enter a valid file')
        res.redirect('/')
        const pathFile = '/uploads/' + req.file.filename
        fs.remove(pathFile, (err)=>{
            console.log(pathFile)
            console.log(err)
        })
        return
    } else {
        console.log(req.file)
        console.log(req.body.selectOpco)
        res.send('uploaded')
    }
})

export default router