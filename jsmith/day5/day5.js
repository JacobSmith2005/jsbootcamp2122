//Import expressJS module
const express = require('express');

// Create an epxress application object
const app = express()

app.set("view engine", "ejs");



class GameMatch {
  constructor() {
    this.id = gameList.length + 1000; //come back
    this.turn = ''; //index of whos turn it is
    this.players = []; //comeback
    this.round = 0;
  }
}


class Character {
  constructor(name, race, profession) {
  this.id = characterList.length + 1000;
  this.name= name
  this.race= race
  this.profession= profession
  this.equipment= {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {}
  }
  this.inventory= []
  this.abilities= []
  this.stats= {
    attack: 5,
    defense: 5,
    speed: 9999999999999999999999999999999999999999999999999999999999999999999,
    hp_current: 20,
    hp_max: 20
  }
  //This method searches for an item in the itme list with this name
  //And adds it to this character's inventory
  this.pickupItem= function(searchName) {
    console.log(this);
    for (var item of item_list) {
      console.log(item.name);
      if (item.name == searchName) {
        console.log("Found a match!");
        this.inventory.push(item);
        break;
      }
    }
  }
  //This method searches for a given slot and overwrites
  //it with an empty object
  this.unequipItem= function(slot) {
    for (var slotName in this.equipment) {
      console.log(slotName);
      if (slotName == slot) {
        console.log("Found item slot. Removing.");
        this.equipment.slotName = {};
        break;
      }
    }
  }
  }
}
var characterList = []
characterList.push(new Character('glob', 'goblin', 'assasain'))
// This holds all possible items
var item_list = [
  {
    name: 'Goblin sword',
    slot: 'arm_p',
    bonuses: {
      attack: 5
    }
  },
  {
    name: 'Goblin knife',
    slot: 'arm_s',
    bonuses: {
      defense: 5
    }
  }
];

//create character list with two default characters

var gameList = [];
var characterList = [];
characterList.push(new Character('glob', 'goblin', 'assasain'))
characterList.push(new Character('glob', 'goblin', 'assasain'))

for (var character of characterList) {
  character.pickupItem('goblin sword');
}
//search for game in game list
app.get('/game', (req, res) => {
  // render a template called game from views
  var foundGame = gameList.find(game => game.id == req.query.gameid);
  if (foundGame) {
    //chech to see if the user sent the addcharacter query param
    if (req.query.addcharacter) {
      //check to see if players are full
      if (foundGame.players.length < 2) {
        //FInd the charcter with the add charcter id
        var foundProfile = characterList.find(character => character.id == req.query.addcharacter);
        //if the characters exists add its id to the player list
        if (foundProfile) {
          foundGame.players.push(foundProfile.id)
        }
      }
    }
    res.render('game', { sendData: foundGame })
  } else res.redirect('/newgame')
});

app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
})

// Create a GET endpoint

app.get('/profile', (req, res) => {
  // render a template called profile from the views folder & send it a variable called sendData
  var foundProfile = characterList.find(character => character.id == req.query.characterid);
  if (foundProfile) {
    res.render('profile', { sendData: foundProfile })
  } else res.redirect('/newprofile')
});
// this endpoint creates a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character('glob', 'goblin', 'assasain'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
})
app.get('/#', (req, res) => {
  res.render('')
})
app.get('/', (req, res) => {
  res.render('')
})
//Start an http listen server
app.listen(3000);
