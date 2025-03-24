import express from 'express';
import 'dotenv/config';
// import cors from cors;
// import cookieParser from 'cookie-parser';

const PORT = process.env.PORT;
const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
      console.error(e);
  }
};

start();
