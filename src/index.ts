import axios, { AxiosResponse } from "axios";

const app = document.getElementById("app") as HTMLDivElement;

function processarImagemComSucesso(resposta: AxiosResponse) {
  const urlImagem = URL.createObjectURL(resposta.data);

  const img = document.createElement("img");
  img.src = urlImagem;

  app.appendChild(img);
}

function processarImagemComFalha(resposta: AxiosResponse) {
  console.log(resposta);
}

async function obterImagem(id: number) {

  try {
    const imagemPokemon = document.getElementById("imagemPokemon") as HTMLImageElement;
    imagemPokemon.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`;
  } catch (err) {
    console.log(err);
  }
}

async function carregarCardPokemon(pokemon: any) {
  try {
    var cardPokemon = document.getElementById("cardPokemon") as HTMLElement;
    cardPokemon.style.border = "1px solid";

    const idPokemon = document.getElementById("idPokemon") as HTMLLabelElement;
    idPokemon.textContent = `Id: ${pokemon.id}`;

    const nomePokemon = document.getElementById("nomePokemon") as HTMLLabelElement;
    nomePokemon.textContent = `Nome: ${pokemon.name}`;

    const imagemPokemon = document.getElementById("imagemPokemon") as HTMLImageElement;
    imagemPokemon.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id.toString().padStart(3, '0')}.png`;
    imagemPokemon.width = 200;
    imagemPokemon.height = 200;
    debugger;

    const tipos = pokemon.types.map(function (type:any) {
      return type.type.name;
    }).join(' | ');

    const tipoPokemon = document.getElementById("tipoPokemon") as HTMLLabelElement;
    tipoPokemon.textContent = `Tipo(s): ${tipos}`;

    console.log(pokemon);

  } catch (err) {
    console.log(err);
  }
}

async function obterDadosJson(nome: string) {
  try {
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`, { responseType: "json" })

    carregarCardPokemon(resposta.data);

  } catch (err) {
    console.log(err);
  }
}

const formulario = document.getElementById("formulario") as HTMLFormElement;

const txtNome = document.getElementById("txtNome") as HTMLInputElement;

formulario.addEventListener("submit", (evt: SubmitEvent) => {
  evt.preventDefault();

  obterDadosJson(txtNome.value);
});