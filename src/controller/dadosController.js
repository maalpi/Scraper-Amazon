import axios from 'axios';
import { JSDOM } from 'jsdom';

class dadosController{
    async show(req, res) {
        try {
            // Capturando a keyword
            const keyword = req.params.id;

            // Buscando o conteudo da pagina
            const response = await axios.get(`https://www.amazon.com.br/dp/${keyword}`);

            // Criando a instancia JSDOM para analisar
            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            // Array para armazenar os produtos
            const produtos = [];

            const productElements = document.querySelectorAll('div#a-page');

            productElements.forEach(productElement => {
                const titulo = productElement.querySelector('#productTitle').textContent.trim();
                const estrelas = productElement.querySelector('#acrPopover').getAttribute('title');
                const numAvaliacao = productElement.querySelector('#acrCustomerReviewText').textContent.trim();
                const imageUrl = productElement.querySelector('#imgTagWrapperId img').getAttribute('src');

                // Armazenando os detalhes em um objeto e adicionando ao array
                const product = {
                    titulo,
                    estrelas,
                    numAvaliacao,
                    imageUrl
                };
                produtos.push(product);
            });

            return res.json(produtos);
        }
        catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Erro ao realizar consulta.' });
        }
    }
}

export default new dadosController();