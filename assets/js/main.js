const pokemonList = document.querySelector('#pokemonList')
const loadMoreButton = document.querySelector('#loadMoreButton')
const pokemonDetailContent = document.querySelector('#pokemonDetailContent')
const detailCard = document.querySelector('#detailCard')
const closebtn = document.querySelector('#closeCard')


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
    <div id="pokeDetail">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <span class="name">${pokemon.name} </span>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
    </div>
    <div class="physic">
        <span class="weight">weight:${pokemon.weight}</span>
        <span class="height">height:${pokemon.height}</span>
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
        
        const pokemonCards = document.querySelectorAll('#pokemonList .pokemon')
        pokemonCards.forEach(pokemonCard => {
            pokemonCard.addEventListener('click', (event) => {
                const pokemonId = event.currentTarget.querySelector('.number').textContent.slice(1)
                const targetPokemon = pokemons.find(pokemon => pokemon.number === parseInt(pokemonId))
                loadPokemonDetail(targetPokemon)
            })
        })
    })}

function loadPokemonDetail(pokemon) {
    const pokemonDetailHtml = convertPokemonDetailtoLi(pokemon)
    pokemonDetailContent.innerHTML = pokemonDetailHtml
    detailCard.style.display = 'block'
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

closebtn.addEventListener('click', () => {
    detailCard.style.display = 'none'
})

