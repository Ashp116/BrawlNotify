import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js'
import {CommandModule} from "../InteractionRouter";
import {DBHandler} from "../database/dbHandler";

const dbHandler = DBHandler.instance

const Command: CommandModule = {
    data: new SlashCommandBuilder()
        .setName('toggle-notify')
        .setDescription('Toggle notify channel')
        .addBooleanOption(option =>
            option
                .setName("enabled")
                .setDescription('Toggle the upcoming channel notification')
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel');
        const toggled = interaction.options.getBoolean('enabled');
        dbHandler.setGuildConfig({
            guildId: interaction.guildId ? interaction.guildId : "",
            notifyUpcomingMatches: toggled ?? true,
        })
            .then(async () => {
                await interaction.reply("Upcoming matches notification toggle is set to `"+ toggled +"`");
            })
            .catch(async (error) => {
                await interaction.reply(`**Error**: ${error.toString().replace("Error: ", "")}`);
            })
    },
};

export default Command;