const prompt = require('prompt-sync')({ sigint: true });

//Requisitos do sistema
// Criação dos livros:
// -Adicionar um novo livro ao sistema com os seguintes atributos: id, title, author, year, genre, year_new_versions (array).
// Leitura (listagem dos livros):
// -Listar todos os livros cadastrados no sistema.
// Atualização dos livros:
// -Atualizar os dados de um livro existente com base no seu id.
// Deleção de livros:
// -Remover um livro do sistema com base no seu id.
// Busca de livro:
// -Implementar uma função de busca com diferentes critérios:
// -Por title
// -Por author
// -Por yar
// -Por genre

let livros = [];
let ultimoID = 1;

const modelo = (ID) => {
    let title = prompt('titulo do Livro: ');
    let author = prompt('Nome do autor: ');
    let year = parseInt(prompt('ano de lançamento: '));
    let genre = prompt('Genero do livro: ');
    let yearNewVersions = [];

    let op = prompt('esse livro teve novas versões? ');

    if (op == 'sim') {
        while (true) {
            let versions = Number(prompt("em que ano foram lançadas ? (Caso tenha finalizado, digite 'fim') "));

            if (versions === 'fim') {
                break;
            } else {
                yearNewVersions.push(versions);
            }
        }
    }

    if (title != '' && author != '' && !isNaN(year) && year >= 0 && year <= 2100 && genre != '') {
        let livro;
        if (ID == undefined) {
            livro = {
                ID: ultimoID,
                title,
                author,
                year,
                genre,
                yearNewVersions,
            };
            ultimoID++;
        } else {
            livro = {
                ID,
                title,
                author,
                year,
                genre,
                yearNewVersions,
            };
        }
        return livro;
    } else {
        console.log('dados invalidos');
    }
};

const adicionarLivro = () => {
    let livro = modelo();
    if (livro === undefined) {
        return;
    } else {
        livros.push(livro);
        console.log('Livro adicionado');
    }
};

const listarLivros = () => {
    if (livros.length === 0) {
        console.log('Não possui nenhum livro registrado!');
        return false;
    } else {
        livros.forEach((livro) => {
            console.log(
                `ID: ${livro.ID}. 
            Titulo: ${livro.title}, 
            Autor: ${livro.author}, 
            Ano de Lançamento: ${livro.year}
            Genero: ${livro.genre}`
            );
            livro.yearNewVersions.forEach((versao, indice) => {
                console.log(`Versão: ${indice + 1}: ${versao}`);
            });
        });
    }
    return true;
};

const atualizarLivro = () => {
    if (listarLivros()) {
        const ID = prompt('Qual ID do livro que deseja editar: ');

        if (ID > 0 && ID != undefined) {
            let LivroEditado = modelo(ID);

            if (LivroEditado === undefined) {
                return;
            } else {
                livros[ID] = LivroEditado;
                console.log('Livro Atualizado!');
            }
        } else {
            console.log('ID inexistente');
        }
    } else {
        return;
    }
};

const deletarLivro = () => {
    if (!listarLivros()) {
        return;
    }

    const ID = prompt('Qual ID deseja remover: ');

    livros.forEach((livro, indice) => {
        if (livro.ID == ID) {
            livros.splice(indice, 1);
            console.log('Livro removido!');
        }
    });
};

module.exports = {
    adicionarLivro,
    listarLivros,
    atualizarLivro,
    deletarLivro,
};
