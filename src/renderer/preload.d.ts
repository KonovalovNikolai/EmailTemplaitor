import { Channels } from 'main/preload';
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
        sendEmail(html: string, addressee: string): Promise<SendEmailResult>;
        openURL(url: string): void;
      };
    };
  }
}

export { };
