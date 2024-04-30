import axios from 'axios';
import { JSDOM } from 'jsdom';

class dadosController{
    async show(req, res) {
        try {
            // Capturando a keyword
            const keyword = req.params.id;

            // Buscando o conteudo da pagina
            const response = await axios.get(`https://www.amazon.com.br/dp/${keyword}`);

            // Criando a instancia JSDOM para analisar o HTML da pagina
            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            // Array para armazenar os produtos
            const produtos = [];

            // Seleciona todos os elementos que contêm informações sobre produtos
            const productElements = document.querySelectorAll('div#a-page');

            // Itera sobre os elementos encontrados para extrair as informações desejadas de cada produto
            productElements.forEach(productElement => {
                // Capturando as informações que queremos
                const titulo = productElement.querySelector('#productTitle').textContent.trim();
                const estrelas = productElement.querySelector('#acrPopover').getAttribute('title');
                const numAvaliacao = productElement.querySelector('#acrCustomerReviewText').textContent.trim();
                const imageUrl = productElement.querySelector('#imgTagWrapperId img').getAttribute('src');

                // Armazenando os detalhes em um objeto para adicionarmos ao array em seguida
                const product = {
                    titulo,
                    estrelas,
                    numAvaliacao,
                    imageUrl
                };
                produtos.push(product);
            });

            // Retorna os produtos encontrados em formato JSON
            return res.json(produtos);
        }
        catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Erro ao realizar consulta.' });
        }
    }
}

export default new dadosController();