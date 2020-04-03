// Modules to control application life and create native browser window
const {app, BrowserWindow, screen} = require('electron')
const path = require('path')
const url = require('url');
const os = require('os');

function createWindow () {  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  let indexHtmlPath = ''
  if (app.isPackaged) {
    indexHtmlPath = url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  } else {
    indexHtmlPath = 'http://localhost:3000'
    const ELECTRON_DEV_TOOLS_PATH = '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0'
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), ELECTRON_DEV_TOOLS_PATH)
    );
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the app.
  // mainWindow.loadURL('http://localhost:3000')
  mainWindow.loadURL(indexHtmlPath)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
