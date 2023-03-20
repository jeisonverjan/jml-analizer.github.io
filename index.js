import {app} from './src/app.js'
import './src/database/mongodb.js'

try {
    app.listen(3000)
    console.log(`Server on port ${3000}`)
} catch (error) {
    console.log(error)
}

