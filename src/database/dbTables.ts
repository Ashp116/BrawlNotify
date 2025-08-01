import { pgTable, text, boolean } from 'drizzle-orm/pg-core';

export const DBTablesSQL = {
    guildConfig: `
    CREATE TABLE IF NOT EXISTS guild_config (
      guild_id TEXT PRIMARY KEY,
      notify_upcoming_matches BOOLEAN NOT NULL DEFAULT FALSE,
      notify_upcoming_matches_channel TEXT NOT NULL
    );
    `
}

export const DBTables = {
    guildConfig: pgTable('guild_config', {
        guildId: text('guild_id').primaryKey(),
        notifyUpcomingMatches: boolean('notify_upcoming_matches').notNull().default(false),
        notifyUpcomingChannel: text('notify_upcoming_matches_channel'),
    }),
}