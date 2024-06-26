document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProfile();
    fetchGitHubRepos();
    fetchCarouselData();
    fetchColegasData();
});

function fetchGitHubProfile() {
    const username = 'JulioBuzzi';
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar perfil do GitHub');
            }
            return response.json();
        })
        .then(profile => {
            console.log('Dados do perfil:', profile); // Verifica os dados recebidos
            const profileSection = document.getElementById('Seção1');

            // Preencher informações pessoais
            const profileImage = profileSection.querySelector('.me');
            profileImage.src = profile.avatar_url;
            profileImage.alt = profile.name;

            const profileName = profileSection.querySelector('h3');
            profileName.textContent = profile.name;

            const aboutMe = profileSection.querySelector('.sobre-mim');
            aboutMe.textContent = `Nasci em ${profile.location || 'Não especificado'}. ${profile.bio || 'Não há biografia disponível'}`; // Atualiza texto sobre mim

            const location = profileSection.querySelector('.location');
            location.innerHTML = `<strong>Location:</strong> ${profile.location || 'Não especificado'}`; // Adiciona tratamento para localização vazia

            // Adicionar links sociais
            const iconsSection = profileSection.querySelector('.icons');
            iconsSection.innerHTML = `
                <a class="icon" href="https://twitter.com/JulioBuzzi05" target="_blank"><button><i class="fa-brands fa-x-twitter"></i></button></a>
                <a class="icon" href="https://www.instagram.com/juliocesar_1900/?hl=pt-br" target="_blank"><button><i class="fa-brands fa-instagram"></i></button></a>
                <a class="icon" href="https://www.linkedin.com/in/julio-cesar-thurow-buzzi-8b84972b8/" target="_blank"><button><i class="fa-brands fa-linkedin"></i></button></a>
                <a class="icon" href="${profile.blog || '#'}" target="_blank"><button><i class="fa-brands fa-github"></i></button></a>
            `; // Adiciona link do GitHub

            // Adicionar link para o GitHub
            const githubLink = profileSection.querySelector('.github-link');
            githubLink.href = profile.html_url;
        })
        .catch(error => console.error('Erro ao buscar informações do perfil do GitHub:', error));
}

function fetchGitHubRepos() {
    const username = 'JulioBuzzi';
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            console.log('Repositórios:', repos); // Verifica os dados recebidos
            const reposContainer = document.getElementById('repos-container');
            reposContainer.innerHTML = ''; // Limpa o conteúdo existente

            repos.forEach((repo, index) => {
                const repoLink = `repo${index + 1}.html`;
                const repoCard = `
                    <div class="card">
                        <a href="${repoLink}" class="repo-link">
                            <img src="assets/images/github.png" class="card-img-top" alt="Imagem da logo github">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description || 'Sem descrição'}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Última atualização ${new Date(repo.updated_at).toLocaleDateString()}</small>
                        </div>
                    </div>
                `;
                reposContainer.innerHTML += repoCard;

                // Salva informações na sessionStorage para as páginas individuais
                sessionStorage.setItem(`repo${index + 1}`, JSON.stringify(repo));
            });
        })
        .catch(error => console.error('Erro ao buscar repositórios do GitHub:', error));
}

function fetchColegasData() {
    fetch('db/db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados dos colegas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados dos colegas:', data); // Verifica os dados recebidos
            const colegasContainer = document.querySelector('.colegas-container');
            colegasContainer.innerHTML = ''; // Limpa o conteúdo existente

            data.colegas.forEach(colega => {
                const cardHTML = `
                    <div class="card">
                        <img src="${colega.foto}" class="card-img-top" alt="${colega.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${colega.nome}</h5>
                            <a href="${colega.github}" class="btn btn-primary" target="_blank">Ver GitHub</a>
                        </div>
                    </div>
                `;
                colegasContainer.innerHTML += cardHTML;
            });
        })
        .catch(error => console.error('Erro ao buscar dados dos colegas:', error));
}

function fetchCarouselData() {
    fetch('db/db.json') // Carregar dados do arquivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do carrossel');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados do carrossel:', data); // Verifica os dados recebidos

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
