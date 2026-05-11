// =====================================================
// script.js — portfólio Juliane Müller Belmonte
// menu mobile, tema claro/escuro e validação de contato
// =====================================================


// --- Menu mobile ---
// O botão hambúrguer só aparece em telas pequenas (CSS define max-width: 600px)
var btnMenu = document.querySelector('.nav-toggle');
var listaNav = document.querySelector('nav ul');

btnMenu.addEventListener('click', function () {
    var aberto = listaNav.classList.toggle('nav-open');
    // troca o ícone conforme o estado do menu
    btnMenu.innerHTML = aberto ? '&#x2715;' : '&#9776;';
});

// fecha o menu ao clicar em qualquer link de navegação
listaNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        listaNav.classList.remove('nav-open');
        btnMenu.innerHTML = '&#9776;';
    });
});


// --- Tema claro / escuro ---
var btnTema = document.getElementById('theme-btn');

// verifica se o usuário já escolheu um tema anteriormente (salvo no localStorage)
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-mode');
    btnTema.textContent = '☀';
}

btnTema.addEventListener('click', function () {
    var escuro = document.body.classList.toggle('dark-mode');
    // ☾ = lua (tema claro ativo), ☀ = sol (tema escuro ativo)
    btnTema.textContent = escuro ? '☀' : '☾';
    localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
});


// --- Validação e envio simulado do formulário de contato ---
var formContato = document.getElementById('form-contato');
var modalSucesso = document.getElementById('modal-sucesso');
var btnFecharModal = document.getElementById('fechar-modal');

formContato.addEventListener('submit', function (e) {
    e.preventDefault(); // evita recarregamento da página

    var campoNome     = document.getElementById('nome');
    var campoEmail    = document.getElementById('email');
    var campoMensagem = document.getElementById('mensagem');

    var tudoOk = true;

    // limpa marcações de erro antes de revalidar
    [campoNome, campoEmail, campoMensagem].forEach(function (campo) {
        campo.closest('.form-group').classList.remove('erro');
    });

    // verifica se o nome foi preenchido
    if (campoNome.value.trim() === '') {
        campoNome.closest('.form-group').classList.add('erro');
        tudoOk = false;
    }

    // verifica formato básico de e-mail (usuario@dominio.com)
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(campoEmail.value.trim())) {
        campoEmail.closest('.form-group').classList.add('erro');
        tudoOk = false;
    }

    // verifica se a mensagem foi preenchida
    if (campoMensagem.value.trim() === '') {
        campoMensagem.closest('.form-group').classList.add('erro');
        tudoOk = false;
    }

    // se tudo estiver válido: limpa o formulário e exibe o modal de sucesso
    if (tudoOk) {
        formContato.reset();
        modalSucesso.style.display = 'flex';
    }
});

// fecha o modal pelo botão "Fechar"
btnFecharModal.addEventListener('click', function () {
    modalSucesso.style.display = 'none';
});

// também fecha clicando fora da caixa branca do modal
modalSucesso.addEventListener('click', function (e) {
    if (e.target === modalSucesso) {
        modalSucesso.style.display = 'none';
    }
});
