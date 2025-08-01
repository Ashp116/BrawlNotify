import { Client } from "pg";
import { DBClient } from "./dbClient"; // should export a Promise<Client>
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { DBTables, DBTablesSQL } from "./dbTables";
import { eq } from "drizzle-orm";
import { DBGuildConfig } from "../types/DBGuildConfig";

export class DBHandler {
    private dbClient?: NodePgDatabase;

    public static instance = new DBHandler();

    private constructor() {} // private constructor to prevent new instances

    public async connect() {
        try {
            const client = await DBClient;
            this.dbClient = drizzle(client);
            await this.dbInit(); // await table setup
        } catch (err) {
            console.error("Failed to connect to DB:", err);
        }
    }

    private async dbInit() {
        if (!this.dbClient) return;
        await this.dbClient.execute(DBTablesSQL.guildConfig);
    }

    public async getGuildConfig(guildId: string) {
        if (!this.dbClient) throw new Error("DB not connected");

        const result = await this.dbClient
            .select()
            .from(DBTables.guildConfig)
            .where(eq(DBTables.guildConfig.guildId, guildId));

        return result[0];
    }

    public async setGuildConfig(guildConfig: DBGuildConfig) {
        if (!this.dbClient) throw new Error("DB not connected");

        if (!guildConfig.guildId) {
            throw new Error("guildId is required");
        }

        const savedGuildConfig = await this.getGuildConfig(guildConfig.guildId);

        if (
            !savedGuildConfig &&
            (!guildConfig.notifyUpcomingMatchesChannel || !guildConfig.notifyUpcomingMatches)
        )
            throw new Error("Guild is not configured! Please use `/set-notify`.");

        const insertData: {
            guildId: string;
            notifyUpcomingMatches: boolean;
            notifyUpcomingMatchesChannel: string;
        } = {
            guildId: guildConfig.guildId,
            notifyUpcomingMatches: guildConfig.notifyUpcomingMatches ?? true,
            notifyUpcomingMatchesChannel: guildConfig.notifyUpcomingMatchesChannel ?? '',
        };

        const updateData = {
            notifyUpcomingMatches: insertData.notifyUpcomingMatches,
            notifyUpcomingMatchesChannel: insertData.notifyUpcomingMatchesChannel,
        };

        await this.dbClient
            .insert(DBTables.guildConfig)
            .values(insertData)
            .onConflictDoUpdate({
                target: DBTables.guildConfig.guildId,
                set: updateData,
            });
    }

}
