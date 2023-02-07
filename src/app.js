import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/index.routes.js'
import flash from 'connect-flash'
import session from 'express-session'
import multer from 'multer'

// Express App Init
export const app = express()

// App settings
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// view engine
app.set("views", path.join(__dirname, 'views'))
app.engine('hbs', engine({
    extname: "hbs"
}))
app.set('view engine', 'hbs')

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use(multer({
    dest: path.join(__dirname, 'static/uploads'),
}).single('file'))

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// Routes
app.use(indexRoutes)

// Static Files
app.use(express.static(path.join(__dirname, 'static')))
