// Main specified in package.json controls the main process.

const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const setBrightness = require('brightness').set;

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_DEV !== "production";

const createWindow = function ({
    title = "",
    width = 320,
    height = 240,
    dir = "./renderer/placeholder.index",
}) {
    const window = new BrowserWindow({
        title: title,
        width: isDev ? width * 2 : width,
        height: height,
    });

    window.loadFile(path.join(__dirname, dir));
};

const createMainWindow = function () {
    const window = new BrowserWindow({
        title: "Screen leaf",
        width: isDev ? 640 * 2 : 640,
        height: 480,
        webPreferences: {
            preload: path.join(__dirname, './IPC/preload.js')
        }
    });

    if (isDev)
        window.webContents.openDevTools();
    window.loadFile(path.join(__dirname, 'renderer/homepage/index.html'));
};

const createAboutWindow = function () {
    createWindow({
        title: "About",
        width: 320,
        height: 240,
        dir: "./renderer/about/about.html",
    });
};



app.whenReady().then(() => {
    ipcMain.on('set-brightness', (_, brightness) => {
        setBrightness(brightness);
    });
    createMainWindow();
    // prettier-ignore
    const menuOptions = [
        ...(isMac ? [{
            label: app.name,
            submenu: [{
                label: 'About',
                click: () => createAboutWindow(),
            }]
        }] : []),
        {
            role: "fileMenu"
        },
        ...(!isMac ? [{
            label: "Help",
            submenu: [{
                label: 'About',
                click: () => createAboutWindow(),
            }]
        }] : []),
    ];
    const mainMenu = Menu.buildFromTemplate(menuOptions);
    Menu.setApplicationMenu(mainMenu);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});
