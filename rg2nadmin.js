// Default Variables
const version = "V1.0"
const port = Game.port
const serverversion = Game.version
const prefix = "[#fc0303][RG2NAdmin][#ffffff] "

// Config Loader
const config = Game.serverSettings.rg2nAdmin

// Config
const staff = config.staff || [],
      restricted = config.restricted || [];
      restrictedips = config.restrictedips || [];

// Functions
function checkStaff(player) {
    if (staff.includes(player.userId)) return true
}
function checkRestricted(player) {
    if (restricted.includes(player.userId)) return true
}

// Code
Game.on("playerJoin", player => {
    player.message(prefix + "This server is equipped with RG2N Admin " + version)
    if (checkRestricted(player) == true) {
        player.kick("You are restricted from joining this game!")
    }
    if (checkStaff(player) == true) {
        player.centerPrint(prefix + "You are staff!", 10)
    }
})

Game.command("isstaff", player => {
    if (checkStaff(player) == true) {
        player.message(prefix + "You are staff!")
    } else {
        player.message(prefix + "You are not staff!")
    }
})

Game.command("serverinfo", (player, Game) => {
    player.message(`\\c6[SERVER]: \\c0Port: ` + String(port) + ' Version: ' + serverversion)
})

Game.command("kick", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            player.message(prefix + "They have been kicked!")
            return player.kick("You have been removed from the server.")
        } else {
            player.message(prefix + "User or value not found.")
        }
    }
})

Game.command("ban", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            restricted.push(player.userId)
            player.message(prefix + "They have been banned!")
            return player.kick("You have been banned from the server.")
        } else {
            player.message(prefix + "User or value not found.")
        }
    }
})
