export interface DBGuildConfig {
    guildId: string;
    notifyUpcomingEvents?: boolean;
    notifyUpcomingEventsChannel?: string;
    notifyUpcomingMatchedReminder?: number;
    notifyUpcomingMatchedChannelMessage?: string;
}
