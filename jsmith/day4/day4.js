//Import expressJS module
const express = require('express');

// Create an epxress application object
const app = express()

app.set("view engine", "ejs");

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
characterList.push(new Character('xqc', 'el goblino', 'gfuel sponsor'))
// This holds all possible items
var item_list = [
  {
    name: 'gfuel bottle',
    slot: 'arm_p',
    bonuses: {
      attack: 5
    }
  },
  {
    name: 'tier 3 subs',
    slot: 'arm_s',
    bonuses: {
      defense: 5
    }
  }
];

characterList[0].pickupItem('gfuel bottle');
characterList[0].unequipItem('arm_p');
// Create a GET endpoint
app.get('/profile/:characterid', (req, res) => {
  // render a template called profile from the views folder & send it a variable called sendData
  var foundProfile = characterList.find(character => character.id == req.params.characterid);
  if (foundProfile) {
    res.render('profile', { sendData: foundProfile })
  } else res.redirect('/new')
});
// this endpoint creates a new character
app.get('/new', (req, res) => {
  characterList.push(new Character('xqc', 'el goblino', 'gfuel sponsor'))
  res.redirect('/profile/' + characterList[characterList.length - 1].id)
})
app.get('/#', (req, res) => {
  res.render('')
})
app.get('/', (req, res) => {
  res.render('')
})
//Start an http listen server
app.listen(3000);
