document.getElementById('searchBtn').addEventListener('click', async () => {
    // Lendo a chave do produto
    const keyword = document.getElementById('keyword').value;

    // Configurando um carregamento
    const loading = document.getElementById('loading');

    // Recebendo os dados e selecionando a Div ao quais serão adicionados
    const resultsDiv = document.getElementById('results');

    loading.style.display = 'block';
    resultsDiv.innerHTML = '';

    try {
        // Fazendo requisição na API com a chave do produto após clickar no botão
        const response = await fetch(`http://localhost:3000/api/scrape/${encodeURIComponent(keyword)}`);

        // Recebendo os dados
        const data = await response.json();

        loading.style.display = 'none';

        // Caso o produto não seja encontrado, ele irá mostrar na tela isso
        if (data.length === 0) {
            resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }

        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('produto');

            const title = document.createElement('h2');
            title.textContent = product.titulo;

            const rating = document.createElement('p');
            rating.innerHTML = `<strong>Rating:</strong> ${product.estrelas}`;

            const numReviews = document.createElement('p');
            numReviews.innerHTML = `<strong>Reviews:</strong> ${product.numAvaliacao}`;

            const image = document.createElement('img');
            image.src = product.imageUrl;

            const link = document.createElement('a');
            link.href = product.imageUrl;
            link.textContent = product.imageUrl;
            link.target = "_blank";
            link.style.display = "block"; // Move o link para a próxima linha
            link.style.fontSize = "14px"; // Define o tamanho da fonte do link

            productDiv.appendChild(title);
            productDiv.appendChild(rating);
            productDiv.appendChild(numReviews);
            productDiv.appendChild(image);
            productDiv.appendChild(link);

            resultsDiv.appendChild(productDiv);
        });

    } catch (error) {
        console.error('Erro ao buscar info:', error);

        // Oculta a animação de carregamento em caso de erro
        loading.style.display = 'none';
    }
});