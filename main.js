// Main specified in package.json controls the main process.

const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_DEV !== "production";

const createWindow = function ({
    title = "",
    width = 320,
    height = 240,
    dir = "./renderer/placeholder.index",
    isMainWindow = false,
}) {
    const window = new BrowserWindow({
        title: title,
        width: isDev ? width * 2 : width,
        height: height,
    });

    if (isDev && isMainWindow)
        window.webContents.openDevTools();
    window.loadFile(path.join(__dirname, dir));
};

const createMainWindow = function () {
    createWindow({
        title: "Screen Leaf",
        width: 640,
        height: 480,
        dir: "./renderer/index.html",
        isMainWindow: true,
    });
};

const createAboutWindow = function () {
    createWindow({
        title: "About",
        width: 320,
        height: 240,
        dir: "./renderer/about.html",
    });
};

app.whenReady().then(() => {
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
