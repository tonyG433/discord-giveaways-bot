const config = require('./config.json')
const { GiveawaysManager } = require('discord-giveaways');
const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection, ActivityType} = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ],
    allowedMentions: { parse: ["users"] },
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    presence: {
        activities: [{
            name: `Giveaways`,
            type: ActivityType.Playing
        }]
    }
})

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: "Random",
        embedColorEnd: '#9fef14',
        reaction: '🎉'

    }
});
// Giveaway manager
client.giveawaysManager = manager


client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    winners.forEach((member) => {
        member.send(`**Congratulations ${member.user.username}, you've won ${giveaway.prize}!**`);
    })
});

// Slash commands
client.slashCommands = new Collection()

// Slash commands loading
require('./handlers/command')(client, false)

// loads the events
require('./handlers/event')(client)

// Logs in
client.login(config.token);
