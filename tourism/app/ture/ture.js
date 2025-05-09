'use strict'


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

function initializeTure() {
    createTableRows()
}

document.addEventListener("DOMContentLoaded", initializeTure) 