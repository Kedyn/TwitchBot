# SimpleTwitchBot

Simple Twitch Bot created with Typescript built on top of tmi.js.

Created with Node version 7.7.3

# Getting Started

To install the bot use your terminal and run ```npm install```. To run the bot you must first edit the *main.ts* file with your bot information. Then to connect your bot use  ```npm start```.

# Developtment

The bot currently has super basic functionalities from the RootModule.ts which allows the main user to control the bot from chat. RootModule has the following commands:

Command:|Parameters/Example:|Description
:-------|:------------------|:---------
!join|@channel (example: !join my_channel)|Joins a channel.
!part|@channel (example: !part [my_channel])|Parts a channel. Channel is optional, if no channel is specified then it will leave the current channel.
!reply|@message (example: !reply my message|Sends a message to the current channel.
!say|@channel @message (example: !say my_channel my message)|Sends a message to a specific channel.
!disconnect|(example: !diconnect)|Disconnects your bot.
