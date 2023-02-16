import { Router } from 'express'
import { renderHome } from '../controllers/index.controller.js'
import { createPopulation, deletePopulation, updatePopulation, updatePopulationPost, renderPopulationForm } from '../controllers/population.controller.js'
import { analyzeFile } from '../controllers/analyzer.controller.js'
import { exportData } from '../controllers/exportData.controller.js'


// Router init
const router = Router()

// Home Page
router.get('/', renderHome)

// Render population form
router.get('/populations', renderPopulationForm)

// Create Populations post
router.post('/populations/add', createPopulation)

// Delete Population
router.get('/population/:id/delete', deletePopulation)

// Update Population GET
router.get('/population/:id/update', updatePopulation)

// Update Population POST
router.post('/population/update/:id', updatePopulationPost)

// Upload file - analyze data and show analysis
router.post('/upload', analyzeFile)

// Export report
router.post('/export-data', exportData)

export default router