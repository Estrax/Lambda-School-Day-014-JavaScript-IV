/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

/*
	Object oriented design is commonly used in video games.	For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

	In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.	

	At the bottom of this file are 3 objects that all end up inheriting from Humanoid.	Use the objects at the bottom of the page to test your constructor functions.
	
	Each constructor function has unique properties and methods that are defined in their block comments below:
*/
	
/*
	=== GameObject ===
	* createdAt
	* dimensions (These represent the character's size in the video game)
	* destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

class GameObject{
    constructor({createdAt, dimensions}){
        this.createdAt = createdAt.toString();
	    this.dimensions = dimensions;
    }

    destroy(){
        return `${this.name} was removed from the game`;
    }
};

/*
	=== CharacterStats ===
	* healthPoints
	* name
	* takeDamage() // prototype method -> returns the string '<object name> took damage.'
	* should inherit destroy() from GameObject's prototype
*/

class CharacterStats extends GameObject{
    constructor({createdAt, dimensions, healthPoints, name}){
        super({createdAt, dimensions});
        this.healthPoints = healthPoints;
        this.name = name;
    }

    takeDamage(){
        return `${this.name} took damage.`;
    }
};

/*
	=== Humanoid (Having an appearance or character resembling that of a human.) ===
	* team
	* weapons
	* language
	* greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
	* should inherit destroy() from GameObject through CharacterStats
	* should inherit takeDamage() from CharacterStats
*/

class Humanoid extends CharacterStats{
    constructor({createdAt, dimensions, healthPoints, name, team, weapons, language}){
        super({createdAt, dimensions, healthPoints, name});
        this.team = team;
        this.weapons = weapons.toString(); // because console.log(object.weapons); returns a string as the example output in the line 133.
        this.language = language;
    }

    greet(){
        return `${this.name} offers a greeting in ${this.language}.`;
    }

    killOpponent(opponent){
        console.log(`${this.name} killed ${opponent.name}.`);
	    return opponent.destroy();
    }
};

/*
	* Inheritance chain: GameObject -> CharacterStats -> Humanoid
	* Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
	* Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
	createdAt: new Date(),
	dimensions: {
		length: 2,
		width: 1,
		height: 1,
	},
	healthPoints: 5,
	name: 'Bruce',
	team: 'Mage Guild',
	weapons: [
		'Staff of Shamalama',
	],
	language: 'Common Tongue',
});

const swordsman = new Humanoid({
	createdAt: new Date(),
	dimensions: {
		length: 2,
		width: 2,
		height: 2,
	},
	healthPoints: 15,
	name: 'Sir Mustachio',
	team: 'The Round Table',
	weapons: [
		'Giant Sword',
		'Shield',
	],
	language: 'Common Tongue',
});

const archer = new Humanoid({
	createdAt: new Date(),
	dimensions: {
		length: 1,
		width: 2,
		height: 4,
	},
	healthPoints: 10,
	name: 'Lilith',
	team: 'Forest Kingdom',
	weapons: [
		'Bow',
		'Dagger',
	],
	language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.	
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

class Villain extends Humanoid{
    constructor({createdAt, dimensions, healthPoints, name, team, weapons, language}){
        super({createdAt, dimensions, healthPoints, name, team, weapons, language});
    }

    kickOpponent(opponent){
        opponent.healthPoints -= 3;
        console.log(`${this.name} kicked ${opponent.name} that caused 3 damage.`);

        if(opponent.healthPoints>0) return opponent.takeDamage();
        return this.killOpponent(opponent);
    }
};

class Hero extends Humanoid{
    constructor({createdAt, dimensions, healthPoints, name, team, weapons, language}){
        super({createdAt, dimensions, healthPoints, name, team, weapons, language});
    }

    hitOpponent(opponent){
        opponent.healthPoints -= 7;
        console.log(`${this.name} hit ${opponent.name} that caused 7 damage.`);

        if(opponent.healthPoints>0) return opponent.takeDamage();
        return this.killOpponent(opponent);
    }
};

class Game{
    constructor(players = [], currentPlayer = -1){
        this.players = players;
        this.currentPlayer = currentPlayer;
    }

    checkIfFinished(){
        return this.players.map(player => player.healthPoints).reduce((acc, elem) => acc+=(elem>0 ? 1 : 0),0)==1;
    }
};

(() => {
    console.log("Let's play!");

    const hero = new Hero({
        createdAt: new Date(),
        dimensions: {
            length: 2,
            width: 2,
            height: 2,
        },
        healthPoints: 15,
        name: 'Christine',
        team: 'The Round Table',
        weapons: [
            'Giant Sword',
            'Shield',
        ],
        language: 'Common Tongue',
    });
    
    const villain = new Villain({
        createdAt: new Date(),
        dimensions: {
            length: 1,
            width: 2,
            height: 4,
        },
        healthPoints: 10,
        name: 'Judith',
        team: 'Forest Kingdom',
        weapons: [
            'Bow',
            'Dagger',
        ],
        language: 'Elvish',
	});
	
	const hero2 = new Hero({
        createdAt: new Date(),
        dimensions: {
            length: 2,
            width: 2,
            height: 2,
        },
        healthPoints: 15,
        name: 'Christine2',
        team: 'The Round Table2',
        weapons: [
            'Giant Sword',
            'Shield',
        ],
        language: 'Common Tongue',
	});
	
	const hero3 = new Hero({
        createdAt: new Date(),
        dimensions: {
            length: 2,
            width: 2,
            height: 2,
        },
        healthPoints: 15,
        name: 'Christine3',
        team: 'The Round Table3',
        weapons: [
            'Giant Sword',
            'Shield',
        ],
        language: 'Common Tongue',
    });

    let currentGame = new Game([hero, villain, hero2, hero3], 0);
    while(!currentGame.checkIfFinished()){
        console.log(`Now it's player ${currentGame.currentPlayer+1} turn!`);
        if(currentGame.players[currentGame.currentPlayer].hitOpponent != undefined){
            console.log(currentGame.players[currentGame.currentPlayer].hitOpponent(currentGame.players[(currentGame.currentPlayer+1)%currentGame.players.length]));
        }else if(currentGame.players[currentGame.currentPlayer].kickOpponent != undefined){
            console.log(currentGame.players[currentGame.currentPlayer].kickOpponent(currentGame.players[(currentGame.currentPlayer+1)%currentGame.players.length]));
        }
        currentGame.currentPlayer = (++currentGame.currentPlayer)%currentGame.players.length;
    }

    const winner = currentGame.players.filter(player => player.healthPoints>0)[0];

    console.log(`Game finished! ${winner.name} from team called ${winner.team} won the game!`);
})();