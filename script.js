document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    const searchInput = document.getElementById('caixa-busca');
    let allLanguages = []; // Variável para armazenar todas as linguagens

    // Função para buscar e renderizar os dados
    async function fetchAndRenderArticles() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allLanguages = await response.json(); // Armazena os dados na variável global
            renderArticles(allLanguages); // Renderiza todos os artigos inicialmente
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
            mainContainer.innerHTML = '<p>Não foi possível carregar os dados das linguagens.</p>';
        }
    }

    // Função para renderizar os artigos
    function renderArticles(languages) {
        mainContainer.innerHTML = ''; // Limpa o conteúdo existente

        languages.forEach(language => {
            const article = document.createElement('article');

            const h2 = document.createElement('h2');
            h2.classList.add('article-title');

            const icon = document.createElement('img');
            icon.src = language.icone;
            icon.alt = `${language.nome} icon`;
            h2.appendChild(icon);
            h2.appendChild(document.createTextNode(language.nome)); // Adiciona o nome da linguagem como texto

            const description = document.createElement('p');
            description.textContent = language.descrição;

            const year = document.createElement('p');
            year.innerHTML = `<strong>Ano de criação:</strong> ${language.ano}`;

            const link = document.createElement('a');
            link.href = language.link;
            link.target = '_blank';
            link.textContent = 'Documentação';

            article.append(h2, description, year, link);
            mainContainer.appendChild(article);
        });
    }

    // Função para lidar com a busca em tempo real
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredLanguages = allLanguages.filter(language => {
            // Filtra as linguagens cujo nome (em minúsculas) inclui o termo de busca
            return language.nome.toLowerCase().includes(searchTerm);
        });
        renderArticles(filteredLanguages);
    }

    // Chama a função para buscar e renderizar os artigos quando a página carregar
    fetchAndRenderArticles();

    // Adiciona o event listener para o evento 'input' na caixa de busca
    searchInput.addEventListener('input', handleSearch);
});