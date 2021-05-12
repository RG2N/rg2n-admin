# RG2NAdmin
RG2NAdmin is a small and powerful admin to get you started with brick hill.

# Setup

1. Place the rg2nadmin.js file into your server's user_scripts folder.
2. Open your start.js and paste in the following code: 
```javascript
rg2nAdmin: {
        staff: [417215, 323659, 179802],
        restricted: [],
        restrictedips: []
}
```
3. Your start.js should look like this now.
4. Restart/start your server and go wild!

# Commands
If your too lazy to read the code and find the commands here is a list:

- /isstaff (Sends "You are staff!" if you have configured your start.js properly.)
- /serverinfo (Sends info about your server such as server version and port.)
- /ban (Bans the player until the server is restarted.)
- /kick (Kicks the player from the server.)
- /ipban (Bans the player's IP and username until server is restarted.)

# Start.js template.
```javascript
rg2nAdmin: {
        staff: [YourID, YourFriendsID, YourAdminsID],
        restricted: [YourBrothersID, YourMothersID, YourDadsID],
        restrictedips: ["111.111.1.1", "222.222.2.2", "333.333.3.3"]
}
```
