import { Teammate } from "../models/teammate";
import { Team } from "../models/team";
import { Component, Vue } from 'vue-property-decorator';
import { randomizeTeammates, filterLocked, filterUnlocked} from '../helpers/random-group-helper';
import { dummyTeams, dummyBench } from '../helpers/dummy-team-helper';

@Component
export default class GroupMixin extends Vue {
    teams: Team[] = []
    bench: Teammate[] = [];


    addTeam(name: string) {
        this.teams.push({
            name,
            members: [],
        });
    }

    addTeammate(name: string) {
        this.bench.push({
            name,
            locked: false,
        });
    }

    removeTeam(index: number) {
        this.bench = this.bench.concat(this.teams[index].members);
        this.teams.splice(index, 1);
    }

    removeTeammateFromTeam(teamIndex: number, teammateIndex: number) {
        this.teams[teamIndex].members.splice(teammateIndex, 1);
    }

    removeTeammateFromBench(index: number) {
        this.bench.splice(index, 1);
    }

    storeTeams(): void {
        localStorage.setItem('teams', JSON.stringify(this.teams));
    }

    storeBench(): void {
        localStorage.setItem('bench', JSON.stringify(this.bench));
    }

    fetchFromLocalStorage(): void {
        const teams = localStorage.getItem('teams');
        const bench = localStorage.getItem('bench');

        this.teams = teams 
            ? JSON.parse(teams)
            : dummyTeams;

        this.bench = bench
            ? JSON.parse(bench)
            : dummyBench;
    }

    randomize(): void {
        let teammatesToRandomize: Teammate[] = [];
        let randomizedTeammates: Teammate[] = [];
        let teammatesTotal = 0;
        let membersPerTeam = 0;
        let remainder = 0;

        if (!this.teams.length)
            return;

        this.teams.forEach((team: Team) => {
            teammatesToRandomize = teammatesToRandomize
                .concat(filterUnlocked(team.members));

            team.members = filterLocked(team.members);

            teammatesTotal += team.members.length;
        });

        teammatesToRandomize = teammatesToRandomize
            .concat(filterUnlocked(this.bench));

        this.bench = filterLocked(this.bench);

        teammatesTotal += teammatesToRandomize.length;

        membersPerTeam = Math.floor(teammatesTotal / this.teams.length);

        remainder = teammatesTotal % this.teams.length;

        randomizedTeammates = randomizeTeammates(teammatesToRandomize);

        this.teams.forEach((team: Team) => {
            let nrMembersNeaded = membersPerTeam - team.members.length;

            if (remainder) {
                nrMembersNeaded++;
                remainder--;
            }

            team.members = team.members.concat(
                randomizedTeammates.splice(0, nrMembersNeaded)
            );
        });
    }
}