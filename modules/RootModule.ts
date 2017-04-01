import {Module} from "../core/Module";
import {SimpleTwitchBot} from "../core/SimpleTwitchBot";

export class RootModule extends Module {
    constructor(bot: SimpleTwitchBot, private root: string) {
        super(bot);
    }
    public onMessage(channel: string, userstate: any, message: string, self: boolean): void {
        let params = message.split(" ");
        if (userstate.username === this.root.toLowerCase()) {
            if (params[0] === "!join" && params[1] !== null) {
                this.bot.join(params[1]);
            }
            else if (params[0] === "!part") {
                if (params[1] === null) {
                    this.bot.part(channel);
                }
                else {
                    this.bot.part(params[1]);
                }
            }
            else if (params[0] === "!reply" && params.length > 1) {
                let msg = "";
                for (let i = 1; i < params.length; i++) {
                    msg += params[i] + " ";
                }
                this.bot.say(channel,msg);
            }
            else if (params[0] === "!say" && params.length > 2) {
                let msg = "";
                for (let i = 2; i < params.length; i++) {
                    msg += params[i] + " ";
                }
                this.bot.say(params[1],msg);
            }
            else if (params[0] === "!disconnect") {
                this.bot.disconnect();
            }
        }
    }
}