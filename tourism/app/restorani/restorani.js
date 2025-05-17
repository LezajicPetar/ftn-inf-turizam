const tabela = document.querySelector("#restorani tbody");
const detaljiDiv = document.querySelector("#detalji");
const forma = document.querySelector("#forma");

const restorani = [
  {
    naziv: "Bella Italia",
    opis: "Autentična italijanska kuhinja",
    tipoviKuhinje: ["italijanska"],
  },
  {
    naziv: "Gurman",
    opis: "Tradicionalna srpska kuhinja",
    tipoviKuhinje: ["srpska"],
  },
  {
    naziv: "Le Chef",
    opis: "Francuska kuhinja",
    tipoviKuhinje: ["francuska"],
  },
];

function prikaziDetalje(restoran) {
  detaljiDiv.innerHTML = `<p><strong>Opis:</strong> ${restoran.opis}</p>`;
}

function dodajRed(restoran, index) {
  const tr = document.createElement("tr");

  const tdBr = document.createElement("td");
  tdBr.textContent = index + 1;

  const tdNaziv = document.createElement("td");
  tdNaziv.textContent = restoran.naziv;

  const tdKuhinje = document.createElement("td");
  tdKuhinje.textContent = restoran.tipoviKuhinje.join(", ");

  tr.appendChild(tdBr);
  tr.appendChild(tdNaziv);
  tr.appendChild(tdKuhinje);

  tr.addEventListener("click", () => prikaziDetalje(restoran));
  tabela.appendChild(tr);
}

function prikaziSveRestorane() {
  tabela.innerHTML = "";
  restorani.forEach((r, i) => dodajRed(r, i));
}

forma.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(forma);
  const noviRestoran = {
    naziv: formData.get("naziv"),
    opis: formData.get("opis"),
    tipoviKuhinje: formData
      .get("kuhinje")
      .split(",")
      .map((s) => s.trim()),
  };

  restorani.push(noviRestoran);
  prikaziSveRestorane();
  forma.reset();
});

prikaziSveRestorane();
