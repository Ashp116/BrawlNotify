export interface DBGuildConfig {
    guildId: string;
    notifyUpcomingMatches?: boolean;
    notifyUpcomingMatchesChannel?: string;
    notifyUpcomingMatchedReminder?: number;
    notifyUpcomingMatchedChannelMessage?: string;
}
