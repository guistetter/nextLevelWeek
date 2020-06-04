function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  //fix bug ao mudar estado não muda a cidade, basta limpar lista de cidades antes de fazer o fecth e add novas..
  citySelect.innerHTML = "<option value> Selecione a Cidade</options>";
  citySelect.disable = true;
  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
