import Population from '../models/populations.js'

export const renderHome = async(req, res) => {
    const populations = await Population.find().lean()
    res.render('home', {populations})
}

