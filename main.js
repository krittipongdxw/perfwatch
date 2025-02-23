const { app, BrowserWindow } = require("electron/main");
const path = require("path");

app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 921,
        height: 640,
        autoHideMenuBar: true,
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "src", "preload.js"),
            devTools: false,
        },
    });

    win.setAspectRatio(1.4390625);
    // win.setResizable(false);
    win.loadFile("./src/interface/index.html");
    win.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
