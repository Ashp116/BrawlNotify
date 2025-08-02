import {pgTable, text, boolean, integer} from 'drizzle-orm/pg-core';

export const DBTablesSQL = {
    guildConfig: `
    CREATE TABLE IF NOT EXISTS guild_config (
      guild_id TEXT PRIMARY KEY,
      notify_upcoming_events BOOLEAN NOT NULL DEFAULT FALSE,
      notify_upcoming_events_channel TEXT NOT NULL,
      notify_upcoming_events_reminder INTEGER,
      notify_upcoming_events_channel_message TEXT
    );
    `
}

export const DBTables = {
    guildConfig: pgTable('guild_config', {
        guildId: text('guild_id').primaryKey(),
        notifyUpcomingEvents: boolean('notify_upcoming_events').notNull().default(false),
        notifyUpcomingEventsChannel: text('notify_upcoming_events_channel'),
        notifyUpcomingEventsReminder: integer('notify_upcoming_matched_reminder'),
        notifyUpcomingEventsChannelMessage: text('notify_upcoming_matched_channel_message'),
    }),
}
