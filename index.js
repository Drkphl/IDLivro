const prompt = require('prompt-sync')({ sigint: true });

const { adicionarLivro, listarLivros, atualizarLivro, deletarLivro, findLivro } = require('./modules.js');

while (true) {
    console.log(`
    ---Cadastro de Livros--
    1.Cadastrar novo livro
    2.Listar livros registrados
    3.Atualizar um livro
    4.Deletar um livro
    5.Procurar
    0.Sair
    `);

    let opcao = Number(prompt('Digite uma opção: '));

    switch (opcao) {
        case 1:
            adicionarLivro();
            break;
        case 2:
            listarLivros();
            break;
        case 3:
            atualizarLivro();
            break;
        case 4:
            deletarLivro();
            break;
        case 5:
            findLivro();
            break;
        case 0:
            console.log('Saindo do menu!');
            return;
        default:
            console.log('Vocẽ deve digitar uma opção válida!');
            break;
    }
}
