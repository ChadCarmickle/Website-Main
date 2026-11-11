
// Electron FrameWork - Container in the Electron framework. 
const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");

function MainFunction(){
    const launchWindow = new BrowserWindow({
        title: "Bulletin Board",
        width: 900,
        height: 900
    });

    const homeURL = url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file"
    });

    launchWindow.loadURL(homeURL);

}
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.whenReady().then(MainFunction);
