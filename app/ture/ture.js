'use strict'

let tagovi = []

class Tura {
    constructor(naziv, duzina, opis, tagovi) {
        this.naziv = naziv;
        this.duzina = duzina;
        this.opis = opis;
        this.tagovi = tagovi;
    }
}

function displayTuraDetails(tura) {
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')
    let p4 = document.createElement('p')

    p1.textContent = tura.naziv
    p2.textContent = 'Duzina ture: ' + tura.duzina
    p3.textContent = 'Opis: ' + tura.opis
    p4.textContent = 'Tagovi: '

    for (let i = 0; i < tura.tagovi.length; i++) {
        if (i == tura.tagovi.length - 1) {
            p4.textContent += tura.tagovi[i]
        }
        else {
            p4.textContent += tura.tagovi[i] + ', '
        }
    }

    let div = document.querySelector('#tura-details')
    div.innerHTML = ''

    p1.style.fontWeight = 'bold'
    div.style.display = 'block'

    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(p4)
}

function createTableRows() {
    let tBody = document.querySelector('tBody')

    let localStorageData = JSON.parse(localStorage.getItem('ture')) || []

    for (let i = 0; i < localStorageData.length; i++) {
        let tura = localStorageData[i]

        let tr = document.createElement('tr')
        let br = document.createElement('td')
        let naziv = document.createElement('td')
        let duzina = document.createElement('td')

        br.textContent = i + 1
        naziv.textContent = tura.naziv
        duzina.textContent = tura.duzina

        tr.appendChild(br)
        tr.appendChild(naziv)
        tr.appendChild(duzina)

        tr.addEventListener('click', () => displayTuraDetails(tura))

        tBody.appendChild(tr)
    }
}

function handleFormSubmission() {
    let submitButton = document.querySelector('#dodaj-turu')

    submitButton.addEventListener('click', () => {
        let form = document.querySelector('#form')
        let formData = new FormData(form)

        let naziv = formData.get('naziv')
        let duzina = formData.get('duzina')
        let opis = formData.get('opis')

        let tura = new Tura(naziv, duzina, opis, tagovi)
        let localStorageData = JSON.parse(localStorage.getItem('ture')) || []
        localStorageData.push(tura)
        localStorage.setItem('ture', JSON.stringify(localStorageData))
        tagovi = []
        createTableRows()
    })
}

function dodajTag() {
    let input = document.getElementById('tag-input')
    let vrednost = input.value

    tagovi.push(vrednost)
    prikaziTagove()
    input.value = ''
}

function obrisiTag(index) {
    tagovi.splice(index, 1)
    prikaziTagove()
}

function prikaziTagove() {
    let tagDiv = document.getElementById('tagovi')
    tagDiv.innerHTML = ''

    for (let i = 0; i < tagovi.length; i++) {
        let divContainer = document.createElement('div')
        divContainer.className = 'tag-parovi'

        let div = document.createElement('div')
        div.className = 'tag'
        div.textContent = tagovi[i]

        let removeButton = document.createElement('button')
        removeButton.textContent = 'X'
        removeButton.onclick = () => obrisiTag(i)

        divContainer.appendChild(div)
        divContainer.appendChild(removeButton)

        tagDiv.appendChild(divContainer)
    }
}

function initializeTure() {
    createTableRows()
    handleFormSubmission()
}

document.addEventListener("DOMContentLoaded", initializeTure) 