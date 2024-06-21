document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubRepos();
    fetchCarouselData();
    fetchColegasData();
});

function fetchGitHubRepos() {
    const username = 'JulioBuzzi';
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.getElementById('repos-container');
            repos.forEach(repo => {
                const repoCard = `
                    <div class="card">
                        <a href="${repo.html_url}" target="_blank">
                            <img src="assets/images/github.png" class="card-img-top" alt="Imagem da logo github">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'Sem descrição'}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Last updated ${new Date(repo.updated_at).toLocaleDateString()}</small>
                        </div>
                    </div>
                `;
                reposContainer.innerHTML += repoCard;
            });
        })
        .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));
}

function fetchCarouselData() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const carouselIndicators = document.getElementById('carousel-indicators');
            const carouselInner = document.getElementById('carousel-inner');
            
            data.carousel.forEach((item, index) => {
                const indicator = `
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>
                `;
                const carouselItem = `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${item.image}" class="d-block w-100" alt="${item.alt}">
                    </div>
                `;
                carouselIndicators.innerHTML += indicator;
                carouselInner.innerHTML += carouselItem;
            });
        })
        .catch(error => console.error('Erro ao buscar dados do carrossel:', error));
}

function fetchColegasData() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const colegasSection = document.querySelector('.colegas');
            colegasSection.innerHTML = ''; // Limpa o conteúdo atual
            
            data.colegas.forEach(colega => {
                const img = document.createElement('img');
                img.src = colega.foto;
                img.alt = colega.alt;
                img.classList.add('colega-img'); // Adiciona uma classe para estilização opcional
                colegasSection.appendChild(img);
            });
        })
        .catch(error => console.error('Erro ao buscar dados dos colegas:', error));
}

