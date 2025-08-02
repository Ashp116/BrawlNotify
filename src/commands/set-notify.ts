import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js'
import {CommandModule} from "../InteractionRouter";
import {DBHandler} from "../database/dbHandler";

const dbHandler = DBHandler.instance

const Command: CommandModule = {
    data: new SlashCommandBuilder()
        .setName('set-notify')
        .setDescription('Set notification channel')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Select a channel')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reminder")
                .setDescription('Reminder time to be notified of upcoming events.')
        ),


    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel');
        dbHandler.setGuildConfig({
            guildId: interaction.guildId ? interaction.guildId : "",
            notifyUpcomingEventsChannel: channel?.id.toString() ? channel?.id.toString() : "",
            notifyUpcomingEvents: true
        })
            .then(async () => {
                await interaction.reply(`Upcoming matches notification channel is set to ${channel?.toString()}`);
            })
            .catch(async (error) => {
                await interaction.reply(`**Error**: ${error.toString().replace("Error: ", "")}`);
            })
    },
};

export default Command;