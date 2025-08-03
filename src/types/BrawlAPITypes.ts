export type BrawlEvent = {
    slot: {
        id: number;
        name: string;
        emoji: string;
        hash: string;
        listAlone: boolean;
        hideable: boolean;
        hideForSlot: number;
        background: string | null;
    };
    predicted: boolean;
    historyLength: number;
    startTime: string;
    endTime: string;
    reward: number;
    map: {
        id: number;
        new: boolean;
        disabled: boolean;
        name: string;
        hash: string;
        version: number;
        link: string;
        imageUrl: string;
        credit: string;
        environment: {
            id: number;
            scId: number;
            name: string;
            hash: string;
            path: string;
            version: number;
            imageUrl: string;
        };
        gameMode: {
            id: number;
            scId: number;
            name: string;
            hash: string;
            version: number;
            color: string;
            bgColor: string;
            link: string;
            imageUrl: string;
        };
        lastActive: number;
        dataUpdated: number;
        stats: {
            brawler: number;
            winRate: number;
            useRate: number;
        }[];
        teamStats: any[];
    };
    modifier: any;
};

export type BrawlEvents = {
    active: BrawlEvent[],
    upcoming: BrawlEvent[]
}