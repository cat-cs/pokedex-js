const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetailContent = document.getElementById('pokemonDetailContent')

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonDetailtoLi(pokemon){
    return `
    <div id="poke-detail">
        <span class="name">${pokemon.name} </span>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        <span class="weight">${pokemon.weight}</span>
        <span class="height">${pokemon.height}</span>
        </div>
        <div id="stats" class="stats-value">
            <ul>
            ${pokemon.stats.map((stat) => `<li id="${stat.statName}">${stat.statName}: ${stat.statValue}</li>`).join('')}
            </ul>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonDetail(pokemon) {
    const pokemonDetailHtml = convertPokemonDetailtoLi(pokemon)
    pokemonDetailContent.innerHTML += pokemonDetailHtml
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
