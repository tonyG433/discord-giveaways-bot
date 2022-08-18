const { EmbedBuilder,  SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Important bot related information.'),
    async slashRun(client, interaction) {

        const apiLatency = Math.round(client.ws.ping)

        let embed = new EmbedBuilder()
            .setTitle("Current bot statistics")
            .addFields([
                {name:"Total servers:", value:`${interaction.client.guilds.cache.size}`},
                {name:'Total users', value:`${client.users.cache.size.toLocaleString()}`},
                {name:"Total channels", value:`${client.channels.cache.size.toLocaleString()}`},
                {name:"Memory usage", value:`${((process.memoryUsage().rss / 1024) / 1024).toFixed(2)} MB`},
                {name:"Discord.js version", value:`${Discord.version}`, inline: true },
                {name:"Node version", value:`${process.version}`, inline: true },
                {name:"API Latency", value:`${apiLatency} ms` , inline: true },
                {name:"GitHub", value:`https://github.com/tonyG433/discord-giveaways-bot` , inline: true },

            ])
            .setColor("Random")

            .setFooter({ text: `Made by tonyG`});


        interaction.reply({embeds: [embed]})



    }
};
