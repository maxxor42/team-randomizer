import { Teammate } from "../models/teammate";
import { Group } from '../models/group';

export const dummyGroups: Group[] = [
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
    { name: "Bright", locked: false },
    { name: "Dark", locked: false },
];