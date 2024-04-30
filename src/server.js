import app from './app.js';

//Porta escolhida
const port = 3000;

//Iniciando o server
app.listen(port, ()=> {
    console.log(`Servidor rodando em http://localhost:${port}`);
});