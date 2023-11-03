const contenedor = document.querySelector(".contenedor");
const form = document.querySelector(".form");
const numberInput = document.querySelector(".number-wrapper");
const errContainer = document.querySelector(".errorContenedor");

const selectedPokeApi = async (selected) => {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  try {
    const respuesta = await fetch(url + selected);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    errContainer.innerHTML = `El Pokemon ${selected} no existe. ¡Por ahora! `;
    return;
  }
};
const pokeTipes = (types) => {
  let avaibleTypes = [];
  types.forEach((item) => {
    avaibleTypes.push(item.type.name);
  });
  return avaibleTypes;
};
const ERROR = (value) => {
  let error = false;

  if (value === "") {
    errContainer.innerHTML = "El input esta vacio";
    return;
  }
  errContainer.innerHTML = "";
  return (error = true);
};

const pokeMtrs = (height) => {
  const mtrs = 0.3048;
  const finalMtrs = Math.ceil(height * mtrs);
  return finalMtrs;
};
const pokePeso = (weight) => {
  const peso = 0.3048;
  const finalPeso = Math.ceil(weight * peso);
  return finalPeso;
};

const templatePoke = ({ name, sprites, types, height, weight }) => {
  return (contenedor.innerHTML = `<div class="center"><div class="property_card"> <a href="#">
  <div class="property-image">
    <div class="property-image-title">
      <img src='${sprites.other.home.front_default}'>
    </div>
  </div></a
>
<div class="property-description">
  <h2>${name.toUpperCase()}</h2>
  <p>Tipo: ${pokeTipes(types).join(" / ")}</p>
  <p> Altura = ${pokeMtrs(height)} mts </p>
  <p> Peso = ${pokePeso(weight)} kg </p>
</div>
<a href="./index.html">
  <div class="property-social-icons">
 
  </div>
</a>
   
  </div>
  </div>`);
};

const SeleccionDePoke = async (e) => {
  e.preventDefault();
  let selectPokemon = numberInput.value;
  contenedor.innerHTML = "";
  const errContainer =
    "<span>No es posible mostrar un pokemon porque se encontro un error</span>";

  if (!ERROR(selectPokemon)) {
    return (contenedor.innerHTML = errContainer);
  }

  const data = await selectedPokeApi(selectPokemon);

  if (data == null || data == undefined) {
    return (contenedor.innerHTML = errContainer);
  }
  templatePoke(data);
  return;
};

const renderPoke = async () => {
  form.addEventListener("submit", SeleccionDePoke);
};
renderPoke();
