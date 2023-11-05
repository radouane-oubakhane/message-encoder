import express from 'express';
import mongoose from 'mongoose';
import messagesRouter from './routes/messages';
import usersRouter from './routes/users';
import cors from 'cors';

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/messages';

async function connectToMongoDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}

connectToMongoDB();

 

// App setup
const PORT = 8000;
const app = express();


app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    })
);

app.use(express.json());
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);



app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});




app.listen(PORT, () => console.log('Server is running on port ', PORT));
