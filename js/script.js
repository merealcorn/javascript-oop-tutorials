//
// //Creates an object called secretCode
// function secretCode() {
//   //secretNum is a private variable created within Javascript
//   var secretNum = 78;
//
//   this.guessNum = function(num) {
//     if(num > 78) {
//       return "Lower";
//     } else if (num < 78) {
//     return "higher";
//     } else {
//     return "You guessed it";
//     }
//   }
// }
//
// var secret = new secretCode();
//
// document.write("Value of secretNum : " + secret.SecretNum + "<br />");
//
// document.write("Is 70 the number :" + secret.guessNum(70) + "<br />");
//
// secretCode.prototype.getSecret = function() {
//   return this.secretNum;
// }
//
// document.write("The secret number is " + secret.getSecret() + "<br />")


// ============================================================================
// DEFINING GETTERS AND SETTERS WITHIN JAVASCRIPT
// //Creates a constructor for Circle that takes in a radius as a parameter;
//  var Circle = function(radius){
//    this._radius = radius;
//  }
//
// //Below defines a setter and getter for radius, and a getter for area;
//  Circle.prototype = {
//    set radius(radius) {this._radius = radius; },
//    get radius() {return this._radius;},
//
//    //Math.PI is a built in Javascript function for Pi;
//    get area() {return Math.PI * (this._radius * this._radius);}
//  };
//
//  var circ = new Circle(10);
//
//  circ.radius = 15;
//
//  document.write("A circle with radius " + circ.radius + " has an area of " + circ.area.toFixed(2) + "<br />")


// ============================================================================


// Minute 30 of https://www.youtube.com/watch?v=O8wwnhdkPE4

//Creates an animal object
function Animal() {
  this.name = "Animal";
// toString method is of the main Object object that every object inherits (look into this further) - we overwrite it below:
  this.toString = function(){
    return "My name is " + this.name;
  };
}

function Canine() {
  this.name = "Canine";
}

function Wolf() {
  this.name = "Wolf";
}

//Overwrites the prototype for canine and wolf.  Creates multiple levels of inheritance
Canine.prototype = new Animal();
Wolf.prototype = new Canine();

//Since you overwrote the prototype you have to reset the constructor, before typing the lines below, it will refer to the main Object Objects

Canine.prototype.constructor = Canine;
Wolf.prototype.constructor = Wolf;

var arcticWolf = new Wolf();

//Takes the name defined in the Wolf constructor, and the toString() method defined in the Animal constructor
document.write(arcticWolf.toString() + "<br />");

// instanceof returns a boolean value that will tell you whether an object is an instance of another object
document.write("Wolf instance of Animal: " + (arcticWolf instanceof Animal) + "<br />");

Animal.prototype.sound = "Grrr";
Animal.prototype.getSound = function() {
  return this.name + " says " + this.sound;
}
Animal.prototype.getFeeling = function() {
  return this.name + " is " + " feeling " + this.feeling;
}

Canine.prototype.sound = "woof!";
Wolf.prototype.sound = "grr woof!";

//Wolf belongs to Canine which belongs to Animal (as defined in lines 78-84).  So, Wolf.prototype.sound will return "Wolf says grr woof!").  The instance of wolf (in this case, articWolf) has access to any prototypes within the Canine constructor or the Animal constructor.  So, if a sound for Wolf isn't defined, it still has access to Canine.prototype.sound, or just Animal.prototype.sound.  This is inheritance.
document.write(arcticWolf.getSound() + " <br />");






function Rodent() {
  this.name = "Rodent";
}

function Rat() {
  this.name = "Rat";
  this.feeling = "angry";
}

//Adds animal object to a prototype of another Object (Rodent).  Does the same as the above example in a different way (it is faster);
Rodent.prototype = new Animal();

Rat.prototype = Rodent.prototype;
Rodent.prototype.constructor = Rodent;
Rat.prototype.constructor = Rat;

var caneRat = new Rat();

Rat.prototype.sound = "I'm uglyyyy uggg uggg uggg";
Rat.prototype.feeling = "angry"

document.write(caneRat.toString() + "<br />")
document.write()

//Intermediate Function -- streamlines inheritance.  Just another way to practice inheritance.
//Minute 35 of https://www.youtube.com/watch?v=O8wwnhdkPE4
function extend(Child, Parent){
  var Temp = function(){};

  Temp.prototype = Parent.prototype;

  Child.prototype = new Temp();

  Child.prototype.constructor = Child;
}

function Deer() {
  this.name = "Deer";
  this.sound = "Snort";
  this.feeling = "in danger";
}

extend(Deer, Animal);

var elk = new Deer();

document.write(elk.getSound() + "<br />" + elk.getFeeling());

//Calling parent methods, or "super classes"
function Vehicle(name) {
  this.name = "Vehicle";
}

Vehicle.prototype = {
  drive: function(){
    return this.name + " drives forward";
  },
  stop: function() {
    return this.name + " stops";
  }
}

//Creates new object Truck
function Truck(name) {
  this.name = name;
}

Truck.prototype = new Vehicle();
Truck.prototype.constructor = Truck;

//Overwrite the parent method for drive (within Vehicle)
Truck.prototype.drive = function(){
  //Calls parent method within prototype .apply(this) allows access to the drive method in vehicle, even though we are overwriting it ^
  var driveMsg = Vehicle.prototype.drive.apply(this);

  return driveMsg += " through a field";
}

var jeep = new Truck("Jeep");

document.write(jeep.drive() + "<br />");
document.write(jeep.stop() + "<br />");



//ECMA SCRIPT VERSION 6
var addStuff = {
  sum(num1, num2){
    return num1 + num2;
  }
}
document.write("1 + 2 = ", addStuff.sum(1,2) + "<br />");

//DEFINING CLASSES WITHIN EC6
class Point {
  constructor(xPos, yPos){
    this.xPos= xPos;
    this.yPos = yPos;
  }

  getPos(){
    return "X: " + this.xPos + " Y: " + this.yPos;
  }
}

var point = new Point(100,200);

document.write(point.getPos() + "<br />")

class Reptile {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return "Reptile is named " + this.name;
  }

  static getReptile(){
    return new Reptile("No Name");
  }
}

class Chameleon extends Reptile {
  constructor(name, owner) {
    super(name);
    this.owner = owner;
  }
  toString(){
    return super.toString() + "<br /> Chameleon is named " + this.name;
  }
}

var rover = new Chameleon("Rover", "Pauly D.");

document.write(rover.toString() + "<br />");

var bowser = Reptile.getReptile();

document.write("Bowser info : " + bowser.toString() + "<br />");

//Design patterns in Javascript -- singleton pattern.  used when you want one object of a specific type:

function Hero(name){
  if(typeof Hero.instance === 'object'){
    return Hero.instance;
  }

  this.name = name;
  Hero.instance = this;
  return this;
}

//Can only have ONE hero, named Derek.
var derekHero = Hero("Derek");
document.write("Our hero is " + derekHero.name + "<br />")

//Will not work.
var PaulHero = Hero("Paul");
// document.write("Our hero is " + paulHero.name + "<br />")

// ============================================================================

function Sword(desc) {
  this.weaponType = "Sword";
  this.metal = desc.metal || "Steel";
  this.style = desc.style || "Longsword";
  this.hasMagic = desc.hasMagic || false;
}

function Bow(desc) {
  this.weaponType = "Bow";
  this.material = desc.material || "Wood"
  this.style = desc.style || "Longbow";
  this.hasMagic = desc.hasMagic || false;
}

function WeaponFactory(){};

WeaponFactory.prototype.makeWeapon = function(desc){
  var weaponClass = null;

  if(desc.weaponType === "Sword"){
    weaponClass = Sword;
  } else if (desc.weaponType === "Bow"){
    weaponClass = Bow;
  } else {
    return false;
  }
  return new weaponClass(desc);
}

var myWeaponFact = new WeaponFactory();

var bladeFist = myWeaponFact.makeWeapon({
  weaponType: "Sword",
  metal: "Dark Iron",
  style: "Scythe",
  hasMagic: true
});

document.write(bladeFist.weaponType + " of type " + bladeFist.style + " crafted from " + bladeFist.metal + "<br />")


//Observable --pushes all data to the observers
var Observable = function() {
  this.subscribers = [];
}

Observable.prototype = {
  subscribe: function(subscriber){
    this.subscribers.push(subscriber);
  },
  unsubscribe: function(unsubscriber){
    for(i=0; i < this.subscribers.length; i++){
      if(this.subscribers[i] === unsubscriber){
        this.subscribers.splice(i, 1);

        return unsubscriber.name;
      }
    }
  },

  publish: function(data){
    for(i = 0; i < this.subscribers.length; i++){
      this.subscribers[i].receiveData(data);
    }
  }
};

var OrganFanny = {
  name: "Organ Fanny",
  receiveData = function(data){
    document.write(this.name + " received your info " + data + "<br />");
  }
}

var BoldmanYaks = {
  name: "Boldman Yaks",
  receiveData = function(data){
    document.write(this.name + " received your info " + data + "<br />");
  }
}


observable = new Observable;

observable.subscribe(OrganFanny)
observable.publish('IBM at $145.30');

document.write(observable.unsubscribe(OrganFanny) + " unsubscribed<br />" )

observable.publish('IBM at $144.30');
