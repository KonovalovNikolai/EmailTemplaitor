import { Channels } from 'main/preload';
import { Addressee } from './utils/Addressee';
import { OpenFileResult, SendEmailResult } from './utils/ipcInterfaces';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        saveDocument(JSONDocument: string): Promise<string>;
        openDocument(): Promise<OpenFileResult>;
        sendEmail(html: string, addressees: Addressee[]): void;
        handleEmailResult(callback: (event, result: SendEmailResult) => void): void;
        handleFinishSend(callback: (event) => void): void;
        openURL(url: string): void;
      };
    };
  }
}

export { };
