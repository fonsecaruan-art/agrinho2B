// ==========================================================================
// CONFIGURAÇÃO DOS DADOS DO ECOSSISTEMA E FAQ
// ==========================================================================

const ecossistemaFoco = [
    {
        titulo: "Agricultores & Cooperativas",
        descricao: "Acesso a relatórios de campo, previsões de safra de alta precisão e metodologias sustentáveis que validam as exigências de exportação.",
        tag: "Produção e Mercado"
    },
    {
        titulo: "Estudantes & Pesquisadores",
        descricao: "Compartilhamento de dados abertos sobre solos do Paraná central, criando um ambiente vivo para teses e inovação científica agroecológica.",
        tag: "Ciência e Extensão"
    },
    {
        titulo: "Órgãos Públicos & Consumidores",
        descricao: "Transparência nas práticas de manejo regional, monitoramento de impacto ambiental e garantia de suprimentos seguros e ecológicos.",
        tag: "Transparência e Sociedade"
    }
];

const faqDados = [
    {
        pergunta: "Como a plataforma atende a diferentes perfis de usuários?",
        resposta: "Atuamos como um hub descentralizado. O produtor acessa relatórios práticos de manejo, o pesquisador extrai dados analíticos consolidados da região e as cooperativas cruzam metas de sustentabilidade."
    },
    {
        pergunta: "A tecnologia proposta é compatível com pequenas propriedades do centro do PR?",
        resposta: "Sim. Nossos modelos de monitoramento via satélite e biotecnologia adaptativa não exigem maquinário milionário, priorizando a otimização dos recursos que o produtor local já possui."
    },
    {
        pergunta: "Como estudantes e universidades podem colaborar com os dados?",
        resposta: "Mantemos acordos de cooperação técnica com instituições de ensino paranaenses, permitindo que estudos acadêmicos validem as nossas soluções de campo com total rigor científico."
    }
];

// ==========================================================================
// INICIALIZAÇÃO DA LANDING PAGE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarComponentes();
    configurarAcessibilidade();
    configurarCarrossel();
    configurarFormulario();
});

// Renderização Dinâmica sem quebras estéticas
function renderizarComponentes() {
    const carrosselTrack = document.getElementById('dynamic-carousel');
    const faqAcordeao = document.getElementById('dynamic-accordion');

    if (carrosselTrack) {
        carrosselTrack.innerHTML = ecossistemaFoco.map(item => `
            <div class="carousel-item">
                <h3 class="carousel-title">${item.titulo}</h3>
                <p class="carousel-desc">${item.descricao}</p>
                <span class="carousel-tag">${item.tag}</span>
            </div>
        `).join('');
    }

    if (faqAcordeao) {
        faqAcordeao.innerHTML = faqDados.map((item, index) => `
            <div class="accordion-item">
                <button class="accordion-header" data-index="${index}" aria-expanded="false">
                    <span>${item.pergunta}</span>
                    <span class="accordion-icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>${item.resposta}</p>
                </div>
            </div>
        `).join('');

        // Eventos do Acordeão
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const ativo = item.classList.contains('active');
                
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.accordion-header').forEach(h => h.setAttribute('aria-expanded', 'false'));

                if (!ativo) {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}

// ==========================================================================
// MECANISMOS DE ACESSIBILIDADE
// ==========================================================================

function configurarAcessibilidade() {
    let tamanhoBase = 16;
    const raiz = document.documentElement;
    const corpo = document.body;

    document.getElementById('btn-font-increase')?.addEventListener('click', () => {
        if (tamanhoBase < 24) { tamanhoBase += 2; raiz.style.fontSize = `${tamanhoBase}px`; }
    });

    document.getElementById('btn-font-decrease')?.addEventListener('click', () => {
        if (tamanhoBase > 12) { tamanhoBase -= 2; raiz.style.fontSize = `${tamanhoBase}px`; }
    });

    document.getElementById('btn-contrast')?.addEventListener('click', () => {
        corpo.classList.toggle('high-contrast');
    });
}

// ==========================================================================
// COMPORTAMENTO DO CARROSSEL
// ==========================================================================

function configurarCarrossel() {
    const track = document.getElementById('dynamic-carousel');
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    if (!track || !prev || !next) return;

    let indexAtual = 0;
    const total = ecossistemaFoco.length;

    function moverCarrossel() {
        track.style.transform = `translateX(-${indexAtual * 100}%)`;
    }

    next.addEventListener('click', () => {
        indexAtual = (indexAtual + 1) % total;
        moverCarrossel();
    });

    prev.addEventListener('click', () => {
        indexAtual = (indexAtual - 1 + total) % total;
        moverCarrossel();
    });
}

// ==========================================================================
// CAPTURA SEGURA DE FORMULÁRIO (LEADS)
// ==========================================================================

function configurarFormulario() {
    const form = document.getElementById('lead-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Solicitação enviada com sucesso! Nossa equipe do Hub AgroInova fará a triagem do seu perfil para conexão técnica.');
        form.reset();
    });
}