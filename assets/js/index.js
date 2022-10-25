const pokemonUl = document.getElementById("pokemons-ul");

const showTypes = (pokemonTypes) => {
  return pokemonTypes.map(
    (typeSlot) => ` <p class=${typeSlot.type.name}>${typeSlot.type.name}</p>`
  );
};

const showPokemons = (pokemon) => {
  return pokemon.map((item) => {
    console.log(item);
    pokemonUl.innerHTML += `
    <li class=${item.types[0].type.name}>
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
    `;
  });
};

const pokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((res) => res.json());
};

const offset = 0;
const limit = 6;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((res) => res.json())
    .then((data) => data.results)
    .then((pokemons) => pokemons.map(pokemonDetail))
    .then((pokeDetails) => Promise.all(pokeDetails))
    .then((pokeList) => showPokemons(pokeList))
    .catch((err) => console.log(err));
