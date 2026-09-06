let modInfo = {
	name: "Prestigious Saplings: Exponential Enhancement!",
	author: "novacandy",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js", "furtherEnhance.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Initial Release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- Added stuff.`

let winText = `Thanks for beating my game, I guess. Now go away... please...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.mul(tmp.e.effect)
	if (hasUpgrade("e", 12)) gain = gain.pow(2)
	if (hasUpgrade("e", 13)) gain = gain.pow(upgradeEffect("e", 13))
	gain = gain.pow(buyableEffect("e", 11))
	if (hasMilestone('n', 10)) gain = gain.tetrate(2)
	gain = gain.tetrate(tmp.f.effect)
	if (gain.gte(Decimal.tetrate(10, Number.MAX_SAFE_INTEGER - 1))) gain = Decimal.tetrate(10, tmp.f.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	name: ""
}}

// Display extra things at the top of the page
var displayThings = [
	"Reach F1.00e100 points to beat the game!"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("10^^1e100")
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}