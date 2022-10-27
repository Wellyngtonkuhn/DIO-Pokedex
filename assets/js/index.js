const pokemonUl = document.getElementById("pokemons-ul");
const verPokemon = document.getElementById("btn-verPokemon");
const showModal = document.getElementById("showModal");

let offset = 0;
const limit = 1;

const showTypes = (pokemonTypes) => {
  return pokemonTypes.map(
    (typeSlot) => ` <p class=${typeSlot.type.name}>${typeSlot.type.name}</p>`
  );
};

const showPokemons = (pokemon) => {
  return pokemon.map((item) => {
    pokemonUl.innerHTML += `
    <button onclick='opemModal(${item.id})'> 
      <li id=${item.id} class=${item.types[0].type.name}>
      <h2 class="pokemon-nome">${item.name}</h2>
  
      <div class="pokemon-details">
          <div>
              ${showTypes(item.types).join("")}
          </div>
          <div class='poke-img'>
          <img
              src=${item.sprites.other.dream_world.front_default}
              alt=${item.name}
          />
          </div>
      </div>
    </li>
  </button>
    `;
  });
};

const pokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((res) => res.json());
};

const getData = (offset, limit) => {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((res) => res.json())
    .then((data) => data.results)
    .then((pokemons) => pokemons.map(pokemonDetail))
    .then((pokeDetails) => Promise.all(pokeDetails))
    .then((pokeList) => showPokemons(pokeList))
    .catch((err) => console.log(err));
};

const verMais = () => {
  offset += limit;
  getData(offset, limit);
};

const opemModal = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return (showModal.innerHTML = `
      <div class="modal">
      <div class="header">
        <div>
          <h3>${data.name}</h3>
          <div class="type">
          ${showTypes(data.types).join("")}
          </div>

        </div>
        <div>
          <p onclick='fecharModal()' class="fecharModal">X</p>
          <p>#001</p>
        </div>
      </div>

      <div class="modal-img">
        <img
            src=${data.sprites.other.dream_world.front_default}
            alt=${data.name}
        />
      </div>

      <div class="modal-details">
        <div class="type">
          <h4>Tipo:</h4>
          ${showTypes(data.types).join("")}
        </div>

        <div class="type">
          <h4>Altura:</h4>
          <p>00000</p>
        </div>

        <div class="type">
          <h4>Peso:</h4>
          <p>11111</p>
        </div>
      </div>
    </div>
      
      `);
    });
};

const fecharModal = () => {
  showModal.innerHTML = "";
};

getData(offset, limit);
