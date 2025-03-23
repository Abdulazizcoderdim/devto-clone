require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/error.middleware');
const app = express();
const cookieParser = require("cookieParser");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser({}))


// Routes
app.use('/api', require('./routes/index'));

app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
