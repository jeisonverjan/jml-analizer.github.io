import { Router } from 'express'
import Population from '../models/populations.js'
import { renderHome } from '../controllers/index.controller.js'
import { createPopulation, deletePopulation, updatePopulation, updatePopulationPost } from '../controllers/population.controller.js'

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
export default router