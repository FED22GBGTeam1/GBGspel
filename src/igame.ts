interface IGame {
  highScore: number;
  elapsedTime: number;
  collectedFish: number;
  seagullsKilled: number;
  musicIsPlaying: boolean;
  playAgain(): void;
  goToStart(): void;
  goToGameOver(): void;
  fetchHighScore(): void;
}