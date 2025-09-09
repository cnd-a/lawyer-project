const express = require('express');
const cors = require('cors');
const app = express();

const lawyerRoutes = require('./routes/lawyerRoutes.js');
const articleRoutes = require('./routes/articleRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const errorHandler = require('./middleware/errorHandler.js')
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const corsOptions = { origin: 'http://localhost:5173' };
app.use(cors());

app.use('/lawyers', lawyerRoutes);
app.use('/articles', articleRoutes);
app.use('/users', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}`) });
