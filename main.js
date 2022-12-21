const transactionsUl = document.querySelector('#transactions')
const saldoReceita = document.querySelector('#saldoReceita')
const saldoDespesa = document.querySelector('#saldoDespesa')
const balanco = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputNome = document.querySelector('#text')
const inputValor = document.querySelector('#amount')



const dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20},
    { id: 2, name: 'Salário', amount: 300},
    { id: 3, name: 'Torta de frango', amount: -10},
    { id: 4, name: 'Violão', amount: 150}
]

const adicionarTransacao = transaction => {
    const operador = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const valorSemOperador = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span> ${operador} R$ ${valorSemOperador} </span><button class="delete-btn">x</button>
    `
    transactionsUl.prepend(li)
}

const atualizarValores = () => {
    const valorDasTransacoes = dummyTransactions
        .map(transaction => transaction.amount)
    const total = valorDasTransacoes
        .reduce((acumulador, transaction) => acumulador + transaction, 0)
        .toFixed(2)
    const renda = valorDasTransacoes
        .filter(value => value > 0)
        .reduce((acumulador, value) => acumulador + value, 0)
        .toFixed(2)
    const despesas = Math.abs(valorDasTransacoes
    .filter(value => value < 0)
    .reduce((acumulador, value) => acumulador + value, 0))
    .toFixed(2)
    
    console.log(despesas)

    balanco.textContent = `R$ ${total}`
    saldoReceita.textContent = `R$ ${renda}`
    saldoDespesa.textContent = `R$ ${despesas}`
}

const init = () => {
    dummyTransactions.forEach(adicionarTransacao)
    atualizarValores()
}

init()

const gerarID = () =>  Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transacaoNome = inputNome.value.trim()
    const transacaoValor = inputValor.value.trim()

    if (transacaoNome === '' || transacaoValor === '') {
        alert("Preenha todos os campos!")
        return
    }

    const transaction = { 
        id: gerarID(), 
        name: transacaoNome, 
        amount: transacaoValor 
    }
    
    dummyTransactions.push(transaction)
    init()

    inputNome.value = ''
    inputValor.value = ''
})