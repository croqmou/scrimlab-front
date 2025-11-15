export default class TeamModel{
  constructor(teamName,teamLogo, teamBanner, teamDescription,captain, playerTwo,playerThree,sub,secondSub,coach,manager,rankingPoints,teamGoals,teamWins,teamLoses) {
    this.teamName = teamName;
    this.teamLogo = teamLogo;
    this.teamBanner = teamBanner;
    this.teamDescription = teamDescription;
    this.captain = captain;
    this.playerTwo = playerTwo;
    this.playerThree = playerThree;
    this.sub = sub;
    this.secondSub = secondSub;
    this.coach = coach;
    this.manager = manager;
    this.rankingPoints = rankingPoints;
    this.teamGoals = teamGoals;
    this.teamWins = teamWins;
    this.teamLoses = teamLoses;
  }
}
