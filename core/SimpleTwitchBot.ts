import * as tmi from "tmi.js";
import {Module} from "./Module";

export class SimpleTwitchBot {
    private client: tmi.client;
    private modules: Module[];

    public constructor(private username: string,private oauth: string, private channels: string[], private reconnect: boolean = true, private debug: boolean = false) {
        let options = {
            options: {
                debug: this.debug
            },
            connection: {
                reconnect: this.reconnect
            },
            identity: {
                username: this.username,
                password: this.oauth
            },
            channels: this.channels
        };
        this.client = new tmi.client(options);
        this.modules = [];
    }

    public connect(): void {
        this.client.connect().then((data) => {
            if (this.debug) {
                console.log("Connecting was successful.");
            }

            this.client.on("action", (channel, userstate, message, self) => {
                this.onAction( channel, userstate, message, self);
            });
            this.client.on("ban", (channel, username, reason) => {
                this.onBan(channel, username, reason);
            });

            this.client.on("chat", (channel, userstate, message, self) => {
                this.onChat(channel, userstate, message, self);
            });

            this.client.on("cheer", (channel, userstate, message)  => {
                this.onCheer(channel, userstate, message);
            });

            this.client.on("clearchat", (channel) => {
                this.onClearchat(channel);
            });

            this.client.on("connected", (address, port) => {
                this.onConnected(address, port);
            });

            this.client.on("connecting", (address, port) => {
                this.onConnecting(address, port);
            });

            this.client.on("disconnected", (reason) => {
                this.onDisconnected(reason);
            });

            this.client.on("emoteonly", (channel, enabled) => {
                this.onEmoteonly(channel, enabled);
            });

            this.client.on("emotesets", (sets, obj) => {
                this.onEmotesets(sets, obj);
            });

            this.client.on("hosted", (channel, username, viewers) => {
                this.onHosted(channel, username, viewers);
            });

            this.client.on("hosting", (channel, target, viewers) => {
                this.onHosting(channel, target, viewers);
            });

            this.client.on("join", (channel, username, self) => {
                this.onJoin(channel, username, self)
            });

            this.client.on("message", (channel, userstate, message, self) => {
                this.onMessage(channel, userstate, message, self);
            });

            this.client.on("mod", (channel, username) => {
                this.onMod(channel, username);
            });

            this.client.on("mods", (channel, mods) => {
                this.onMods(channel, mods);
            });

            this.client.on("notice", (channel, msgid, message) => {
                this.onNotice(channel, msgid, message);
            });

            this.client.on("part", (channel, username, self) => {
                this.onPart(channel, username, self);
            });

            this.client.on("ping", () => {
                this.onPing();
            });

            this.client.on("pong", (latency) => {
                this.onPong(latency);
            });

            this.client.on("r9kbeta", (channel, enabled) => {
                this.onR9kbeta(channel, enabled);
            });

            this.client.on("reconnect", () => {
                this.onReconnect();
            });

            this.client.on("resub", (channel, username, months, message) => {
                this.onResub(channel, username, months, message);
            });

            this.client.on("roomstate", (channel, state) => {
                this.onRoomstate(channel, state);
            });

            this.client.on("serverchange", (channel) => {
                this.onServerchange(channel)
            });

            this.client.on("slowmode", (channel, enabled, length) => {
                this.onSlowmode(channel, enabled, length);
            });

            this.client.on("subscribers", (channel, enabled) => {
                this.onSubscribers(channel, enabled);
            });

            this.client.on("subscription", (channel, username, method) => {
                this.onSubscription(channel, username, method);
            });

            this.client.on("timeout", (channel, username, reason, duration) => {
                this.onTimeout(channel, username, reason, duration);
            });

            this.client.on("unhost", (channel, viewers) => {
                this.onUnhost(channel, viewers);
            });

            this.client.on("unmod", (channel, username) => {
                this.onUnmod(channel, username);
            });

            this.client.on("whisper", (from, userstate, message, self) => {
                this.onWhisper(from, userstate, message, self);
            });
        }).catch((err) => {
            if (this.debug) {
                console.log("Connecting was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public addModule(module: Module): void {
        this.modules.push(module);
    }

    public getChannels(): any[] {
        return this.client.getChannels();
    }

    public getOptions(): object {
        return this.client.getOptions();
    }

    public getUsername(): string {
        return this.client.getUsername();
    }

    private onAction(channel:string, userstate: object, message: string, self: boolean): void {
        for (let module of this.modules) {
            module.onAction(channel, userstate, message, self);
        }
    }

    private onBan(channel: string, username: string, reason: string): void {
        for (let module of this.modules) {
            module.onBan(channel, username, reason);
        }
    }

    private onChat(channel: string, userstate: object, message: string, self: boolean): void {
        for (let module of this.modules) {
            module.onChat(channel, userstate, message, self);
        }
    }

    private onCheer(channel: string, userstate: object, message: string): void {
        for (let module of this.modules) {
            module.onCheer(channel, userstate, message);
        }
    }

    private onClearchat(channel: string): void {
        for (let module of this.modules) {
            module.onClearchat(channel);
        }
    }

    private onConnected(address: string, port: number): void {
        for (let module of this.modules) {
            module.onConnected(address, port);
        }
    }

    private onConnecting(address: string, port: number): void {
        for (let module of this.modules) {
            module.onConnecting(address, port);
        }
    }

    private onDisconnected(reason: string): void {
        for (let module of this.modules) {
            module.onDisconnected(reason);
        }
    }

    private onEmoteonly(channel: string, enabled: boolean): void {
        for (let module of this.modules) {
            module.onEmoteonly(channel, enabled);
        }
    }

    private onEmotesets(sets: string, obj: object): void {
        for (let module of this.modules) {
            module.onEmotesets(sets, obj);
        }
    }

    private onHosted(channel: string, username: object, viewers: number): void {
        for (let module of this.modules) {
            module.onHosted(channel, username, viewers);
        }
    }

    private onHosting(channel: string, target: string, viewers: number): void {
        for (let module of this.modules) {
            module.onHosting(channel, target, viewers);
        }
    }

    private onJoin(channel: string, username: string, self: boolean): void {
        for (let module of this.modules) {
            module.onJoin(channel, username, self);
        }
    }

    private onMessage(channel: string, userstate: object, message: string, self: boolean): void {
        for (let module of this.modules) {
            module.onMessage(channel, userstate, message, self);
        }
    }

    private onMod(channel: string, username: string): void {
        for (let module of this.modules) {
            module.onMod(channel, username);
        }
    }

    private onMods(channel: string, mods: any[]): void {
        for (let module of this.modules) {
            module.onMods(channel, mods);
        }
    }

    private onNotice(channel: string, msgid: string, message: string): void {
        for (let module of this.modules) {
            module.onNotice(channel, msgid, message);
        }
    }

    private onPart(channel: string, username: string, self: boolean): void {
        for (let module of this.modules) {
            module.onPart(channel, username, self);
        }
    }

    private onPing(): void {
        for (let module of this.modules) {
            module.onPing();
        }
    }

    private onPong(latency: number): void {
        for (let module of this.modules) {
            module.onPong(latency);
        }
    }

    private onR9kbeta(channel: string, enabled: boolean): void {
        for (let module of this.modules) {
            module.onR9kbeta(channel, enabled);
        }
    }

    private onReconnect(): void {
        for (let module of this.modules) {
            module.onReconnect();
        }
    }

    private onResub(channel: string, username: string, months: number, message: string): void {
        for (let module of this.modules) {
            module.onResub(channel, username, months, message);
        }
    }

    private onRoomstate(channel: string, state: object): void {
        for (let module of this.modules) {
            module.onRoomstate(channel, state);
        }
    }

    private onServerchange(channel: string): void {
        for (let module of this.modules) {
            module.onServerchange(channel);
        }
    }

    private onSlowmode(channel: string, enabled: boolean, length: number): void {
        for (let module of this.modules) {
            module.onSlowmode(channel, enabled, length);
        }
    }

    private onSubscribers(channel: string, enabled: boolean): void {
        for (let module of this.modules) {
            module.onSubscribers(channel, enabled);
        }
    }

    private onSubscription(channel: string, username: string, method: object): void {
        for (let module of this.modules) {
            module.onSubscription(channel, username, method);
        }
    }

    private onTimeout(channel: string, username: string, reason: string, duration: number): void {
        for (let module of this.modules) {
            module.onTimeout(channel, username, reason, duration);
        }
    }

    private onUnhost(channel: string, viewers: number): void {
        for (let module of this.modules) {
            module.onUnhost(channel, viewers);
        }
    }

    private onUnmod(channel: string, username: string): void {
        for (let module of this.modules) {
            module.onUnmod(channel, username);
        }
    }

    private onWhisper(from: string, userstate: object, message: string, self: boolean): void {
        for (let module of this.modules) {
            module.onWhisper(from, userstate, message, self);
        }
    }

    public action(channel: string, message: string): void {
        this.client.action(channel, message).then((data) => {
            if (this.debug) {
                console.log("Action \"" + message + "\"on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Action \"" + message + "\"on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public ban(channel: string, username: string, reason?: string): void {
        this.client.ban(channel, username, reason).then((data) => {
            if (this.debug) {
                console.log("Banning \"" + username + "\"on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Banning \"" + username + "\"on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public clear(channel: string): void {
        this.client.clear(channel).then((data) => {
            if (this.debug) {
                console.log("Clearing " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Clearing " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public color(color: string): void {
        this.client.color(color).then((data) => {
            if (this.debug) {
                console.log("Setting color" + color + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Setting color " + color + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public commercial(channel: string, seconds: number): void {
        this.client.commercial(channel, seconds).then((data) => {
            if (this.debug) {
                console.log("Commercial on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Commercial on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public emoteonly(channel: string): void {
        this.client.emoteonly(channel).then((data) => {
            if (this.debug) {
                console.log("Setting emote only on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Setting emote only on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public emoteonlyOff(channel: string): void {
        this.client.emoteonlyoff(channel).then((data) => {
            if (this.debug) {
                console.log("Unsetting emote only on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unsetting emote only on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public host(channel: string, target: string): void {
        this.client.host(channel, target).then((data) => {
            if (this.debug) {
                console.log("Hosting " + target + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Hosting " + target + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public join(channel: string): void {
        this.client.join(channel).then((data) => {
            if (this.debug) {
                console.log("Joining " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Joining " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public mod(channel: string, username: string): void {
        this.client.mod(channel, username).then((data) => {
            if (this.debug) {
                console.log("Modding " + username + " on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Modding " + username + " on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public getMods(channel: string): any[] {
        return this.client.mods(channel).then((data) => {
            if (this.debug) {
                console.log("Getting mods from " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Getting mods from " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public part(channel: string): void {
        this.client.part().then((data) => {
            if (this.debug) {
                console.log("Parting " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Parting " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public  ping(): void {
        this.client.ping().then((data) => {
            if (this.debug) {
                console.log("Pinging was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Pinging was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public r9kbeta(channel: string): void {
        this.client.r9kbeta(channel).then((data) => {
            if (this.debug) {
                console.log("Setting R9kbeta on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Setting R9kbeta on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public r9kbetaOff(channel: string): void {
        this.client.r9kbetaoff(channel).then((data) => {
            if (this.debug) {
                console.log("Unsetting R9kbeta on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unsetting R9kbeta on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public raw(message: string): void {
        this.client.raw(message).then((data) => {
            if (this.debug) {
                console.log("Sending raw message \"" + message + "\" was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Sending raw message \"" + message + "\" was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public say(channel: string, message: string): void {
        this.client.say(channel, message).then((data) => {
            if (this.debug) {
                console.log("saying \"" + message + "\" on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("saying \"" + message + "\" on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public slow(channel: string, length?: number): void {
        this.client.slow(channel, length).then((data) => {
            if (this.debug) {
                console.log("Setting slow mode on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Setting slow mode on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public slowOff(channel: string): void {
        this.client.slowoff().then((data) => {
            if (this.debug) {
                console.log("Unsetting slow mode on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unsetting slow mode on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public subscribers(channel: string): void {
        this.client.subscribers(channel).then((data) => {
            if (this.debug) {
                console.log("Setting subscriber mode on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Setting subscriber mode on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public subscribersOff(channel: string): void {
        this.client.subscribersoff().then((data) => {
            if (this.debug) {
                console.log("Unsetting subscriber mode on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unsetting subscriber mode on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public timeout(channel: string, username: string, length?: number, reason?: string): void {
        this.client.timeout(channel, username, length, reason).then((data) => {
            if (this.debug) {
                console.log("Timing out " + username + " on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Timing out " + username + " on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public unban(channel: string, username: string): void {
        this.client.unban(channel, username).then((data) => {
            if (this.debug) {
                console.log("Unbanning " + username + " from " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unbanning " + username + " from " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public unhost(channel: string): void {
        this.client.unhost(channel).then((data) => {
            if (this.debug) {
                console.log("Unhosting from " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unhosting from " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public unmod(channel: string, username: string): void {
        this.client.unmod(channel, username).then((data) => {
            if (this.debug) {
                console.log("Unmodding " + username + " on " + channel + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Unmodding " + username + " on " + channel + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public whisper(username: string, message: string): void {
        this.client.whisper(username, message).then((data) => {
            if (this.debug) {
                console.log("Whispering " + username + " was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Whispering " + username + " was not successful.");
                console.log("Error: " + err);
            }
        });
    }

    public disconnect() {
        this.client.disconnect().then((data) => {
            if (this.debug) {
                console.log("Disconnecting was successful");
            }
        }).catch((err) => {
            if (this.debug) {
                console.log("Disconnecting was not successful.");
                console.log("Error: " + err);
            }
        });
    }
}