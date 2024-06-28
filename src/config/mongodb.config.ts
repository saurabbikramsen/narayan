import mongoose from 'mongoose'
import { mongoUri } from '../constants/env.constants'

export const connectToMongoDB = () => {
    mongoose
        .connect(mongoUri)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('Connection error', error))
}
