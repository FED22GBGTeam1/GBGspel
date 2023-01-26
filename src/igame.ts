interface IGame {
  highScore: number;
  elapsedTime: number;
  collectedFish: number;
  musicIsPlaying: boolean;
  playAgain(): void;
  goToStart(): void;
  goToGameOver(): void;
}