import express from 'express';
import cors from 'cors';

// Arquivo de rotas para API
import apiRoute from './routes/apiScrapeRoute.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

class App {
    constructor() {
      // Criando instancia do Express
      this.app = express();
      // Chamando o metodo para definir as rotas
      this.routes();
      this.middlewares();
    }

    // Definindo os Middlewares
    middlewares(){
      // Aqui ativamos o CORS pra que a API envie informações para o front-end
      this.app.use(cors());
      // Definindo a pasta de frontEnd como estatica
      // Fiz isso para que poder usar o front e o back end na mesma porta 3000
      this.app.use(express.static(join(__dirname,'..','frontEnd')));
    }
    
    //  Definindo as rotas
    routes() {
      // Rota principal que envia o arquivo index.html ao acessar a raiz do servidor
      this.app.get('/', (req, res) => {
        res.sendFile(join(__dirname, '..','frontEnd', 'index.html'));
      });
      // Rota da API para realizar a consulta
      // utiliza o prefixo /api/scrape
      this.app.use('/api/scrape', apiRoute);
    }
  }
  
  export default new App().app;