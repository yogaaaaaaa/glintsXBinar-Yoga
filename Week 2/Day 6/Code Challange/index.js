// Import readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cylinder = require("./function/cylinder"); // import cuboid
const cone = require("./function/cone"); // import cube

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

// Function to display the menu
function menu() {
  console.log(`Menu`);
  console.log(`====`);
  console.log(`1. Cylinder`);
  console.log(`2. Cone`);
  console.log(`3. Exit`);
  rl.question(`Choose option: `, (option) => {
    if (!isNaN(option)) {
      // If option is a number it will go here
      if (option == 1) {
        cylinder.input(); // It will call input() function in cuboid file
      } else if (option == 2) {
        cone.inputCone(); // It will call input() function in cube file
      } else if (option == 3) {
        rl.close(); // It will close the program
      } else {
        console.log(`Option must be 1 to 3!\n`);
        menu(); // If option is not 1 to 3, it will go back to the menu again
      }
    } else {
      // If option is not a number it will go here
      console.log(`Option must be number!\n`);
      menu(); // If option is not 1 to 3, it will go back to the menu again
    }
  });
}

menu(); // call the menu function to display the menu

module.exports.rl = rl; // export rl to make another can run the readline
module.exports.isEmptyOrSpaces = isEmptyOrSpaces;
