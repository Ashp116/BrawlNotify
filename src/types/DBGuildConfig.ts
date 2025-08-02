export interface DBGuildConfig {
    guildId: string;
    notifyUpcomingEvents?: boolean;
    notifyUpcomingEventsChannel?: string;
    notifyUpcomingEventsReminder?: number;
    notifyUpcomingEventsChannelMessage?: string;
}
