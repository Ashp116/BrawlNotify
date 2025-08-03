import {ChatInputCommandInteraction, Events, Guild, Interaction} from "discord.js";
import {InteractionRouter} from "./InteractionRouter";
import {DBHandler} from "./database/dbHandler";
import {FetchUpcomingEvents} from "./utils/BrawlAPI";
import {MemstoreManager} from "./memstore/MemstoreManager";
import {PriorityQueue} from "./utils/PriorityQueue";
import {PriorityQueueGuildInfo} from "./types/PriorityQueueGuildInfo";

require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const interactionRouter = new InteractionRouter();

// Create a temporary bot client to fetch guilds
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, async (interaction: Interaction) => interactionRouter.Route(interaction));

client.once('ready', async () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
    //await interactionRouter.RegisterChatCommandsToGuilds(client.guilds.cache.map((g: Guild) => g.id))
    await DBHandler.instance.connect();
    let events = MemstoreManager.getInstance().Get<string, PriorityQueue<PriorityQueueGuildInfo>>("Events")

});

client.login(token);
