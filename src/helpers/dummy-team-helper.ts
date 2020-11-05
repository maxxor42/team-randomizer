import { Teammate } from '../models/teammate'
import { Team } from '../models/team'

export const dummyTeams: Team[] = [
    {
        name: "Team z",
        members: [
            { name: "Max", locked: false },
            { name: "Mando", locked: false },
            { name: "Hatt", locked: false },
        ],
    },
    {
        name: "Super 8",
        members: [
            { name: "Philip", locked: false },
            { name: "Gecko", locked: false },
            { name: "Zeta", locked: false },
        ],
    },
];

export const dummyBench: Teammate[] = [
    { name: "Bright", locked: true },
    { name: "Dark", locked: false },
];