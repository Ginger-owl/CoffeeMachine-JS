// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');


// Variables
const RECIPE = {
  1: {'water': 60, 'milk': 0, 'beans': 20, 'price': 4, 'name': 'espresso'},
  2: {'water': 60, 'milk': 200, 'beans': 20, 'price': 7, 'name': 'latte'},
  3: {'water': 60, 'milk': 150, 'beans': 20, 'price': 6, 'name': 'cappuccino'}
}
// arrays of adjectives that one may hear from a polite barista
const NICE_FOOD_ADJS = ["tasty", "cool", "divine", "tempting", "satisfactory", "heavenly", "yummy", "delightful", "delicious"];
const NICE_DAY_ADJS = ["happy", "nice", "bright", "delightful", "interesting", "lucky", "super-amazing"];

let supply = {'water': 400, 'milk': 540, 'beans': 120, 'd_cups': 9, 'money': 550};


function fillSupplies() {
  supply['water'] += Number(input("Write how many ml of water do you want to add:\n\n"));
  supply['milk'] += Number(input("Write how many ml of milk do you want to add:\n"));
  supply['beans'] += Number(input("Write how many grams of coffee beans do you want to add:\n"));
  supply['d_cups'] += Number(input("Write how many disposable cups of coffee do you want to add:\n"));
}

function displaySupplies() {
  console.log("\nThe coffee machine has:");
  console.log(`${supply['water']} ml of water`);
  console.log(`${supply['milk']} ml of milk`);
  console.log(`${supply['beans']} g of coffee beans`);
  console.log(`${supply['d_cups']} disposable cups`);
  console.log(`$${supply['money']} of money`);
  console.log("");
}

function takeMoney() {
  console.log(`I gave you $${supply['money']}`);
  supply['money'] = 0;
}

function find_adjective() {

}

function buyCoffee() {
  let coffeeId = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu::\n")
  if (coffeeId === 'back') {
    menu();
    return;
  }
  if (checkSupplies(coffeeId)) {
    supply['water'] -= RECIPE[coffeeId]['water']
    supply['milk'] -= RECIPE[coffeeId]['milk']
    supply['beans'] -= RECIPE[coffeeId]['beans']
    supply['d_cups'] -= 1
    supply['money'] += RECIPE[coffeeId]['price']
  }
  // Choose randomly two adjectives and say them in a "good-bye" phrase to the customer
  let drink_adj = NICE_FOOD_ADJS[Math.floor(Math.random()*NICE_FOOD_ADJS.length)];
  let day_adj = NICE_DAY_ADJS[Math.floor(Math.random()*NICE_DAY_ADJS.length)];
  console.log(`Your ${drink_adj} ${RECIPE[coffeeId]['name']}, please!\nHave a ${day_adj} day!`);
}

function turnOff() {
  process.exit();
}

function menu() {
  while (true) {
    let choice = input("Write action (buy, fill, take, remaining, exit):\n");
    switch (choice) {
      case 'buy':
        buyCoffee();
        break;
      case 'fill':
        fillSupplies();
        break;
      case "take":
        takeMoney();
        break;
      case "exit":
        turnOff();
        break;
      case "remaining":
        displaySupplies();
        break;
    }
  }
}

function checkIngredients(drink) {
  if (supply['water'] < RECIPE[drink]['water']) {
    console.log("Sorry, not enough water!");
    return false;
  }
  if (supply['milk'] < RECIPE[drink]['milk']) {
    console.log("Sorry, not enough milk!");
    return false;
  }
  if (supply['beans'] < RECIPE[drink]['beans']) {
    console.log("Sorry, not enough beans!");
    return false;
  }
  if (supply['d_cups'] < 0) {
    console.log("Sorry, not enough disposable cups!");
    return false;
  }
  return true;
}

function checkSupplies(drink) {
  if (checkIngredients(drink)) {
    console.log(`I have enough resources, making you a coffee!\n`);
    return true;
  }
  return false;
}

menu()
