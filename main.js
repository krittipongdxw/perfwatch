const { app, BrowserWindow, ipcMain, Notification } = require("electron/main");
const path = require("path");

app.disableHardwareAcceleration();

app.setAppUserModelId('PerfWatch');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 921,
        height: 640,
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
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

console.log("Icon Path:", path.join(__dirname, "assets", "perfwatch-logo.png"));

ipcMain.on("show-notification", (event, { title, body }) => {
    new Notification({ title, body, icon: path.join(__dirname, "assets", "perfwatch-logo.ico") }).show();
});

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
