const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_DEV !== "production";

const createMainWindow = function () {
    const mainWindow = new BrowserWindow({
        title: "Screen Leaf",
        width: isDev ? 1280 : 640,
        height: 480,
    });

    if (isDev) mainWindow.webContents.openDevTools();
    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
};

const createAboutWindow = function () {
    const aboutWindow = new BrowserWindow({
        title: "About",
        width: 320,
        height: 240,
    });

    aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
};

app.whenReady().then(() => {
    createMainWindow();
    // prettier-ignore
    const menuOptions = [
        ...(isMac ? [{
            label: app.name,
            submenu: [{
                label: 'About',
                click: createAboutWindow,
            }]
        }] : []),
        {
            role: "fileMenu"
        },
        ...(!isMac ? [{
            label: "Help",
            submenu: [{
                label: 'About',
                click: createAboutWindow
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
