import express from 'express';
import cors from 'cors';
import apiRoute from './routes/apiScrapeRoute.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

class App {
    constructor() {
      this.app = express();
      this.routes();
      this.middlewares();
    }

    middlewares(){
      this.app.use(cors());
      this.app.use(express.static(join(__dirname,'..','frontEnd')));
    }
  
    routes() {
      this.app.get('/', (req, res) => {
        res.sendFile(join(__dirname, '..','frontEnd', 'index.html'));
      });
      this.app.use('/api/scrape', apiRoute);
    }
  }
  
  export default new App().app;