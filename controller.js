const cards = require("./db.json");

function shuffleArray(array) {
  let arrCopy = [...array];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

let playerRecord = {
  wins: 0,
  losses: 0,
};

module.exports = {
  shuffleArray,

  getCards: (req, res) => {
    try {
      let shuffled = shuffleArray(cards);

      const randomPlayer = Math.floor(Math.random() * shuffled.length);

      let player = shuffled.slice(randomPlayer, randomPlayer + 1);
      console.log(player);
      player[0].attacks = Math.floor(Math.random() * 20) + 1;
      player[0].block = Math.floor(Math.random() * 20) + 1;

      let comp = shuffled.slice(0, 1);
      comp[0].attacks = Math.floor(Math.random() * 20) + 1;
      comp[0].block = Math.floor(Math.random() * 20) + 1;

      res.status(200).send({ player, comp });
    } catch (error) {
      res.sendStatus(400);
    }
  },
  duel: (req, res) => {
    try {
      let { comp, player } = req.body;

      let playerAttack = player[0].attacks;

      let compBlock = comp[0].block;

      let playerBlock = player[0].block;

      let compAttack = comp[0].attacks;

      if (playerAttack > compBlock) {
        playerRecord.wins++;
        res.status(200).send("You won!");
      } else if (playerAttack < compBlock) {
        playerRecord.losses++;
        res.status(200).send("You lost!");
      } else {
        res
          .status(200)
          .send("You're both mortally wounded and can continue no longer!");
      }
    } catch (error) {
      res.sendStatus(400);
    }
  },
  getRecord: (req, res) => {
    try {
      res.status(200).send(playerRecord);
    } catch (error) {
      res.sendStatus(400);
    }
  },
};

// if (playerBlock > compAttack) {
//   playerRecord.wins++;
//   res.status(200).send("You won!");
// } else if (playerBlock < compAttack) {
//   playerRecord.losses++;
//   res.status(200).send("You lost!");
// } else {
//   res
//     .status(200)
//     .send("You're both mortally wounded and can continue no longer!");
// }

// if (playerAttack > compBlock) {
//   playerRecord.wins++;
//   res.status(200).send("You won!");
// } else if (playerAttack < compBlock) {
//   playerRecord.losses++;
//   res.status(200).send("You lost!");
// } else if (playerBlock > compAttack) {
//   playerRecord.wins++;
//   res.status(200).send("You won!");
// } else if (playerBlock < compAttack) {
//   playerRecord.losses++;
//   res.status(200).send("You lost!");
// } else {
//   res
//     .status(200)
//     .send("You're both mortally wounded and can continue no longer!");
// }
