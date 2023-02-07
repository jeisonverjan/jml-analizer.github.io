import { Schema, model } from "mongoose"

const populationSchema = new Schema({
    opco: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    workerType: {
        type: String,
        trim: true,
        lowercase: true
    },
    workerLocation: {
        type: String,
        trim: true,
        lowercase: true
    },
    lineManager: {
        type: String,
        trim: true,
        lowercase: true
    },
    reportingEntity: {
        type: String,
        trim: true,
        lowercase: true
    },
    keyPosition: {
        type: String,
        trim: true,
        lowercase: true
    },
    organizationLevel: {
        type: String,
        trim: true,
        lowercase: true
    },
    functionGlobal: {
        type: String,
        trim: true,
        lowercase: true
    },
    subfunction: {
        type: String,
        trim: true,
        lowercase: true
    },
    job: {
        type: String,
        trim: true,
        lowercase: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model("Population", populationSchema)