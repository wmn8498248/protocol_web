const { app, BrowserWindow } = require("electron");
 
let mainWindow;
let windowConfig = {
  width: 1920,
  height: 1080,
  webPreferences: {
    webSecurity: false, // 解决打包后谷歌浏览器不能访问本地文件的问题
  },
};


function createWindow() {
  mainWindow = new BrowserWindow(windowConfig);
  mainWindow.show();
//   mainWindow.loadFile("./dist/index.html");
  
  // mainWindow.webContents.openDevTools(); // 是否打开开发者工具
  mainWindow.loadURL('http://192.168.1.8/');
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.on("resize", function () {
    mainWindow.reload();
  });
}
app.on("ready", () => {
  createWindow();
  const { Menu } = require("electron");
  Menu.setApplicationMenu(null); // 设置window下隐藏菜单栏
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", function () {
  if (mainWindow == null) createWindow();
});