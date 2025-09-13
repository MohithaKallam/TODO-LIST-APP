import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); 

const app = express();


connectDB();

app.use(cors());
app.use(express.json()); 


app.use('/', userRoutes); 
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
  res.send('Backend API is running 🚀');
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
