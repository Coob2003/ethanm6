const { Client, Intents } = require(`discord.js`)
let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})
const config = require(`./config.json`)

client.on(`guildMemberUpdate`, (oldMember, newMember) => {
    if (oldMember.guild.id != config.guildID) return
    if ((!oldMember.roles.cache.has(config.roleID)) && (newMember.roles.cache.has(config.roleID))) {
        oldMember.guild.channels.cache.get(config.channelID).send({
            content: `<@${oldMember.id}>, ${config.welcomeMessage}`
        })
    }
})

client.on(`ready`, () => {
    console.log(`Bot online`)
})

client.login(config.token)