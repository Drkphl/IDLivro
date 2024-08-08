const prompt = require('prompt-sync')({ sigint: true });

let livros = [];
let ultimoID = 4;

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

            if (isNaN(versions)) {
                op = 'nao';
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
                `
            ID: ${livro.ID}.
            Titulo: ${livro.title}, 
            Autor: ${livro.author}, 
            Ano de Lançamento: ${livro.year}
            Genero: ${livro.genre}`
            );

            livro.yearNewVersions.forEach((versao, indice) => {
                console.log(`Revisão: ${indice + 1}: ${versao}`);
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

const findLivro = () => {
    console.log(`
    1 - Titulo
    2- Autor
    3- Ano
    4- Genero`);

    let op = Number(prompt('o que gostaria de procurar?:'));

    let Value;
    let key;

    switch (op) {
        case 1:
            key = 'title';
            Value = prompt('qual titulo deseja procurar?');
            break;
        case 2:
            key = 'author';
            Value = prompt('qual o author deseja procurar? ');
            break;
        case 3:
            key = 'genre';
            Value = prompt('qual o genero que deseja procurar? ');
            break;
        default:
            console.log('opção invalida');
            return;
    }
    const results = livros.filter((livro) => livro[key] == Value);

    if (results.length > 0) {
        results.forEach((livro) => {
            console.log(
                `ID: ${livro.ID},
                Titulo: ${livro.title},
                Autor: ${livro.author},
                Ano de Lançamento: ${livro.year}
                Genero: ${livro.genre}
                `
            );
        });
    }
};

module.exports = {
    adicionarLivro,
    listarLivros,
    atualizarLivro,
    deletarLivro,
    findLivro,
};
