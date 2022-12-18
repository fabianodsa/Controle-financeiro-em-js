const dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20},
    { id: 2, name: 'Salário', amount: 300},
    { id: 3, name: 'Torta de frango', amount: -10},
    { id: 4, name: 'Violão', amount: 150}
]
// função para adicionar a transação no DOM. 
//O parâmetro "transaction recebe um objeto que representa a transação"
const adicionarTransacao = transaction => {
    const operador = transaction.amount < 0 ? '-' : '+'
    console.log(operador)

    // <li class="minus">
    // Salário <span>-$400</span><button class="delete-btn">x</button>
    // </li>
}

adicionarTransacao(dummyTransactions[1])