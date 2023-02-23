const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
    setBrightness: (brightness) => ipcRenderer.send("set-brightness", brightness),
});
