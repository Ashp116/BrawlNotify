import fetch from "node-fetch"
import {BRAWL_API} from "./constants";
import {BrawlEvent, BrawlEvents} from "../types/BrawlAPITypes";

export async function FetchUpcomingEvents() : Promise<BrawlEvent[]> {
    let data = await fetch(BRAWL_API.EVENTS)
    let json = await data.json() as BrawlEvents
    return json.upcoming
}