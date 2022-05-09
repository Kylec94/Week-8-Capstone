const drawBtn = document.querySelector("#draw");
const playerDiv = document.querySelector("#player");
const compDiv = document.querySelector("#comp");
const duelBtn = document.querySelector("#duel");
const resultsText = document.querySelector("#results");
const playAgainBtn = document.querySelector("#play-again");
const winsText = document.querySelector("#wins");
const lossesTest = document.querySelector("#losses");
const fleeBtn = document.querySelector("#flee");

let player = [];
let comp = [];
let playerDuo = [];

duelBtn.classList.add("hide");
playAgainBtn.classList.add("hide");

const makePlayerCard = (character) => {
  return `
        <div class="character-card outline">
        <img src='${character.imgAddress}' alt='${character.name}'/>
        <h3 class="name">${character.name}</h3>
        <button id="att" onclick="duel()"><i class="fa-solid fa-gavel"></i> <span id="spanatt">${character.attacks}</span></button>
        <button id="block" onclick="duel()"><i class="fa-solid fa-shield"></i> <span id="spanatt">${character.block}</span></button>
        <button id="flee" onclick="draw()"><i class="fa-solid fa-person-running"></i><span id="spanatt"> Flee, coward!</span></button>
       `;
};

const makeCompCard = (character) => {
  return `
  <div class="character-card outline">
  <img src='${character.imgAddress}' alt='${character.name}'/>
  <h3 class="name">${character.name}</h3>
  <button id="att"><i class="fa-solid fa-gavel"></i> <span id="spanatt">${character.attacks}</span></button>
  <button id="block"><i class="fa-solid fa-shield"></i> <span id="spanatt">${character.block}</span></button>
  
 `;
};

const renderPlayer = () => {
  playerDiv.innerHTML = "";

  player.forEach((players) => {
    let cardHtml = makePlayerCard(players);
    playerDiv.innerHTML += cardHtml;
  });
};

const renderComp = () => {
  compDiv.innerHTML = "";

  comp.forEach((character) => {
    let cardHtml = makeCompCard(character);
    compDiv.innerHTML += cardHtml;
  });
};

const draw = () => {
  axios.get("/player/one").then((res) => {
    player = res.data.player;
    comp = res.data.comp;
    renderPlayer();
    drawBtn.classList.add("hide");
  });
};

const duel = () => {
  resultsText.textContent = "Dueling...";
  renderPlayer();
  renderComp();
  setTimeout(() => {
    axios.post("/duel", { comp, player }).then(({ data }) => {
      resultsText.textContent = data;
      playAgainBtn.classList.remove("hide");
      getPlayerStats();
    });
  }, 2000);
};

const reset = () => {
  resultsText.textContent = "";
  player = [];
  comp = [];
  playerDuo = [];
  playAgainBtn.classList.add("hide");
  renderPlayer();
  renderComp();
  drawBtn.classList.remove("hide");
};

const getPlayerStats = () => {
  axios.get("/player").then(({ data: { wins, losses } }) => {
    winsText.textContent = `Wins: ${wins}`;
    lossesTest.textContent = `Losses: ${losses}`;
  });
};

drawBtn.addEventListener("click", draw);
playAgainBtn.addEventListener("click", reset);

getPlayerStats();
