import path from "path";
import {
    ChatInputCommandInteraction,
    Interaction,
    Routes,
    SlashCommandBuilder,
    REST,
    SlashCommandOptionsOnlyBuilder
} from "discord.js";
import * as fs from "node:fs";


export interface CommandModule {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export class InteractionRouter {
    private commands: {[key: string]: CommandModule} = {};
    private rest: REST = new REST();
    private CLIENT_ID: string = "";

    public constructor(commandsPath: string = path.join(__dirname, 'commands')) {
        if (!process.env.TOKEN || !process.env.CLIENT_ID)
            throw new Error("TOKEN and CLIENT_ID is not found in environment variables")

        // Register Commands
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const _commandName = file.split(".")[0];
            this.commands[_commandName] = require(path.join(commandsPath, file)).default as CommandModule;
        }

        this.CLIENT_ID = process.env.CLIENT_ID

        // Load REST for the discord endpoints
        this.rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
    }

    private ExecChatCommands(interaction: ChatInputCommandInteraction) {
        if (!this.commands) return;

        const command = this.commands[interaction.commandName]

        if (command) {
            command.execute(interaction)
                .catch((err) => {
                    console.error(`ERROR: ExecChatCommands '${err}'`)
                });
        }
    }

    public async RegisterChatCommandsToGuilds(guildIds: string[]) {
        const _commandsData: any[] = []
        Object.values(this.commands).forEach((command) => {
            _commandsData.push(command.data.toJSON())
        })

        for (const guildId of guildIds) {
            try {
                await this.rest.put(
                    Routes.applicationGuildCommands(this.CLIENT_ID, guildId),
                    { body: _commandsData },
                );
            } catch (error) {
                console.error(`Failed to update for guild ${guildId}:`, error);
            }
        }
    }

    public async Route(interaction: Interaction): Promise<void> {
        if (interaction.isChatInputCommand()) {
            this.ExecChatCommands(interaction);
        }
    }
}