import Population from '../models/populations.js'

export const createPopulation = async (req, res) => {
    try {
        const opcoName = req.body.opco.toLowerCase()
        const populName = req.body.name.toLowerCase()
        const dbOpco = await Population.findOne({ opco: opcoName })
        const dbPopulName = await Population.findOne({ name: populName })
        if (dbOpco || dbPopulName) {
            req.flash('error_msg', 'Population already exists!')
            res.redirect('/populations')
        } else {
            let newPopulation = {}
            for (const ele in req.body) {
                if (req.body[ele]) {
                    newPopulation[ele] = req.body[ele]
                }
            }
            newPopulation = Population(newPopulation)
            await newPopulation.save()
            req.flash('success_msg', 'Population added successfully!')
            res.redirect('/')
        }
    } catch (error) {
        req.flash('error_msg', error)
        res.redirect('/')
    }
}

export const deletePopulation = async(req, res) => {
    try {
        const {id} = req.params
        await Population.findByIdAndDelete(id)
        req.flash('success_msg', 'Population deleted successfully!')
        res.redirect('/')
    } catch (error) {
        req.flash('error_msg', error)
    }
}