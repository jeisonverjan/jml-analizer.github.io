import { Router } from 'express'
import Population from '../models/populations.js'
import {renderHome} from '../controllers/index.controller.js'
import {createPopulation, deletePopulation} from '../controllers/population.controller.js'


const router = Router()


// Home Page
router.get('/', renderHome)

// Create population form
router.get('/populations', (req, res) => {
    res.render('populations-add')
})

// Create Populations post
router.post('/populations/add', createPopulation)

// Delete Population
router.get('/population/:id/delete', deletePopulation)

export default router