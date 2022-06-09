/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import * as fsPromise from 'fs/promises';
import { resolveHtmlPath } from './util';

import { createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer';

let mainWindow: BrowserWindow | null = null;
let currentDocumentPath: string = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    width: 900,
    height: 550,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // mainWindow.removeMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.on('openURL', handleOpenURL)
    ipcMain.handle('saveFile', handleSaveDocument);
    ipcMain.handle('openFile', handleOpenDocument);
    ipcMain.handle('sendEmail', handleSendEmail);
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);


function setWindowsTitle(window: BrowserWindow, filePath: string) {
  const documentName = path.basename(filePath, '.etd');
  mainWindow.setTitle(`${documentName} - EmailTemplater`);
}

async function handleSaveDocument(event, JSONDocument: string) {
  if (currentDocumentPath === null) {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      filters: [{ name: "Шаблон EMail", extensions: ['etd'] }],
    });
    if (canceled) {
      return "canceled";
    }

    currentDocumentPath = filePath;
    setWindowsTitle(mainWindow, filePath);
  }

  try {
    await fsPromise.writeFile(currentDocumentPath, JSONDocument, { encoding: "utf-8" });
  } catch (err) {
    currentDocumentPath = null;
    console.log(err);
    return "error";
  }

  return "success";
}

export interface OpenFileResult {
  status: "canceled" | "error" | "success";
  JSONDocument: string;
}

async function handleOpenDocument(event): Promise<OpenFileResult> {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile',],
    filters: [{ name: "Шаблон EMail", extensions: ['etd'] }],
  });
  if (canceled) {
    return {
      status: "canceled",
      JSONDocument: "",
    };
  }

  const selectedPath = filePaths[0];

  let data: string;

  try {
    data = await fsPromise.readFile(selectedPath, { encoding: "utf-8" });
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      JSONDocument: "",
    };
  }

  currentDocumentPath = selectedPath;
  setWindowsTitle(mainWindow, selectedPath);

  return {
    status: "success",
    JSONDocument: data,
  };
}

export interface SendEmailResult {
  status: "success" | "error";
  url: string;
}

async function handleSendEmail(event, html: string, addressee: string): Promise<SendEmailResult> {
  let transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "joesph.collins86@ethereal.email",
      pass: "XNzRKyyadpNAJSyUWN",
    }
  });

  let result: SendEmailResult;

  try {
    const info = await transporter.sendMail({
      from: "joesph.collins86@ethereal.email",
      to: addressee,
      subject: "Тестовое сообщение",
      html: html,
    });

    const url = getTestMessageUrl(info);
    result = {
      status: "success",
      url: url ? url : ""
    };
  }
  catch (err) {
    result = {
      status: "error",
      url: ""
    };
  }

  return result;
}

function handleOpenURL(event, url: string) {
  shell.openExternal(url);
}
