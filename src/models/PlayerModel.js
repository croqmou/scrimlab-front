export default class PlayerModel{
  constructor(username, email, pp, admin, playerGoals, playerWins, playerLoses, rankingPoints1s, rankingPoints2s, rankingPoints3s) {
    this.username = username;
    this.email = email;
    this.pp = pp;
    this.admin = admin;
    this.playerGoals = playerGoals;
    this.playerWins = playerWins;
    this.playerLoses = playerLoses;
    this.rankingPoints1s = rankingPoints1s;
    this.rankingPoints2s = rankingPoints2s;
    this.rankingPoints3s = rankingPoints3s;
  }
}
