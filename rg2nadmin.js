// Default Variables
const version = "V1.0"
const port = Game.port
const serverversion = Game.version
const prefix = "[#fc0303][RG2NAdmin][#ffffff] "
const staff1 = prefix + "You can not moderate this player because they are staff!"

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
function checkRestrictedIp(player) {
    if (restrictedips.includes(player.socket.IPV4)) return true
}
function banPlayer(player) {
    restricted.push(player.userId)
    caller.message(prefix + "They have been banned!")
    player.kick("You have been banned from the server.")
}

function kickPlayer(player) {
    caller.message(prefix + "They have been kicked!")
    player.kick("You have been removed from the server.")
}

function ipbanPlayer(player) {
    restricted.push(player.userId)
    restrictedips.push(player.socket.IPV4)
    caller.message(prefix + "They have been banned!")
    player.kick("You have been ipbanned from the server.")
}

// Code
Game.on("playerJoin", player => {
    player.message(prefix + "This server is equipped with RG2N Admin " + version)
    if (checkRestricted(player) == true) {
        player.kick("You are restricted from joining this game!")
        restrictedips.push(player.socket.IPV4)
    }
     if (checkRestrictedIp(player) == true) {
        player.kick("You are restricted from joining this game!")
        restricted.push(player.userId)
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
            if (checkStaff(player) == true) {
                caller.message(staff1)
            } else {
                return kickPlayer(player)
            }
        }
    }
})

Game.command("ban", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            if (checkStaff(player) == true) {
                caller.message(staff1)
            } else {
                return banPlayer(player)
            }
        }
    }
})

Game.command("ipban", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            if (checkStaff(player) == true) {
                caller.message(staff1)
            } else {
                return ipbanPlayer(player)
            }
        }
    }
})

Game.command("getip", (caller, args) => {
    if (checkStaff(caller) !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            if (checkStaff(player) == true) {
                caller.message(staff1)
            } else {
                return caller.message(prefix + "The player's IP is " + player.socket.IPV4)
            }
        }
    }
})

Game.command("admin", (caller,args) => {
    if (checkStaff !== true) return
    for (let player of Game.players) {
        if (player.username.startsWith(args)) {
            return staff.push(player.userId)
        }
    }
})
