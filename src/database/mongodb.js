import {connect} from 'mongoose'
import { MONGODB_URI } from '../config/config.js'

( async() => {
    try {
        const db = await connect(MONGODB_URI)
        console.log(`DB connected to ${db.connection.name}`)
    } catch (error) {
        console.log(error.message)
    }
} )();