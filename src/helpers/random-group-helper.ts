import { Teammate } from "../models/teammate";

export function randomizeTeammates(teammates: Teammate[]): Teammate[] {
    return teammates
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

export function filterUnlocked(teammates: Teammate[]): Teammate[] {
    return teammates.filter((teammate: Teammate) => !teammate.locked)
}

export function filterLocked(teammates: Teammate[]): Teammate[] {
    return teammates.filter((teammate: Teammate) => teammate.locked)
}