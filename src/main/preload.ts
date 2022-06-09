import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { OpenFileResult, SendEmailResult } from './main';

export type Channels = 'ipc-example' | "saveFile";

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    saveDocument: (JSONDocument: string): Promise<string> => ipcRenderer.invoke("saveFile", JSONDocument),
    openDocument: (): Promise<OpenFileResult> => ipcRenderer.invoke("openFile"),
    sendEmail: (html: string, addressee: string): Promise<SendEmailResult> => ipcRenderer.invoke("sendEmail", html, addressee),
    openURL: (url: string) => ipcRenderer.send("openURL", url),
  },
});
