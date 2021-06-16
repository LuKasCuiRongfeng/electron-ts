declare module NodeJS {
    export interface Global {
        wins: { [props: string]:  Electron.BrowserWindow | null},
        baseUrl: string
    }
}