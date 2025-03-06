require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT || 6000;
    morgan
  } catch (error) {
    console.error(error);
  }
};
