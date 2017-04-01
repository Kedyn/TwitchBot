import {SimpleTwitchBot} from "./core/SimpleTwitchBot";
import {RootModule} from "./modules/RootModule";

//Get your OAuth key from: https://twitchapps.com/tmi/
let my_bot = new SimpleTwitchBot("SimpleTwitchBot","oauth:???",["SimpleTwitchBot", "MyChannel"],true,true);

my_bot.addModule(new RootModule(my_bot, "Me"));

my_bot.connect();