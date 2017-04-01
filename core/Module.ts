import {SimpleTwitchBot} from "./SimpleTwitchBot";

export abstract class Module {
    public constructor(protected bot: SimpleTwitchBot) {}
    public onAction(channel:string, userstate: any, message: string, self: boolean): void {}
    public onBan(channel: string, username: string, reason: string): void {}
    public onChat(channel: string, userstate: any, message: string, self: boolean): void {}
    public onCheer(channel: string, userstate: any, message: string): void {}
    public onClearchat(channel: string): void {}
    public onConnected(address: string, port: number): void {}
    public onConnecting(address: string, port: number): void {}
    public onDisconnected(reason: string): void {}
    public onEmoteonly(channel: string, enabled: boolean): void {}
    public onEmotesets(sets: string, obj: any): void {}
    public onHosted(channel: string, username: any, viewers: number): void {}
    public onHosting(channel: string, target: string, viewers: number): void {}
    public onJoin(channel: string, username: string, self: boolean): void {}
    public onMessage(channel: string, userstate: any, message: string, self: boolean): void {}
    public onMod(channel: string, username: string): void {}
    public onMods(channel: string, mods: any[]): void {}
    public onNotice(channel: string, msgid: string, message: string): void {}
    public onPart(channel: string, username: string, self: boolean): void {}
    public onPing(): void {}
    public onPong(latency: number): void {}
    public onR9kbeta(channel: string, enabled: boolean): void {}
    public onReconnect(): void {}
    public onResub(channel: string, username: string, months: number, message: string): void {}
    public onRoomstate(channel: string, state: any): void {}
    public onServerchange(channel: string): void {}
    public onSlowmode(channel: string, enabled: boolean, length: number): void {}
    public onSubscribers(channel: string, enabled: boolean): void {}
    public onSubscription(channel: string, username: string, method: any): void {}
    public onTimeout(channel: string, username: string, reason: string, duration: number): void {}
    public onUnhost(channel: string, viewers: number): void {}
    public onUnmod(channel: string, username: string): void {}
    public onWhisper(from: string, userstate: any, message: string, self: boolean): void {}
}