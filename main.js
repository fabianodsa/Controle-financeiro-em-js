const transactionsUl = document.querySelector('#transactions')
const saldoReceita = document.querySelector('#saldoReceita')
const saldoDespesa = document.querySelector('#saldoDespesa')
const balanco = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputNome = document.querySelector('#text')
const inputValor = document.querySelector('#amount')

const localStorage = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorage : []

const removerTransacao = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    init()
}

const adicionarTransacao = transaction => {
    const operador = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const valorSemOperador = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span> ${operador} R$ ${valorSemOperador}</span>
        <button class="delete-btn" onClick="removerTransacao(${transaction.id})">
        x
        </button>
    `
    transactionsUl.prepend(li)
}

const atualizarValores = () => {
    const valorDasTransacoes = transactions
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
    transactionsUl.innerHTML = ''
    transactions.forEach(adicionarTransacao)
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
        amount: Number(transacaoValor)
    }
    
    transactions.push(transaction)
    init()

    inputNome.value = ''
    inputValor.value = ''
})