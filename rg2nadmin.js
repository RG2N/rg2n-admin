// Default Variables
const version = "V1.0"
const port = Game.port
const serverversion = Game.version

// Config Loader
const config = Game.serverSettings.rg2nAdmin

// Config
const staff = config.staff || [],
      restricted = config.restricted || [];

// Functions
function checkStaff(player) {
    if (staff.includes(player.userId)) return true
}
function checkRestricted(player) {
    if (restricted.includes(player.userId)) return true
}

// Code
Game.on("playerJoin", player => {
    player.message("This server is equipped with RG2N Admin " + version)
    if (checkRestricted(player) == true) {
        player.kick("You are restricted from joining this game!")
    }
})

Game.command("isstaff", player => {
    if (checkStaff(player) == true) {
        player.message("You are staff!")
    } else {
        player.message("You are not staff!")
    }
})

Game.command("serverinfo", (player, Game) => {
    player.message(`\\c6[SERVER]: \\c0Port: ` + String(port) + ' Version: ' + serverversion)
})

Game.command("kick", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            return player.kick("You have been removed from the server.")
        }
    }
})

Game.command("ban", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            restricted.push(player.userId)
            return player.kick("You have been banned from the server.")
        }
    }
})
