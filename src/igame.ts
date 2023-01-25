interface IGame {
  highScore: number;
  elapsedTime: number;
  collectedFish: number;
  playAgain(): void;
  goToStart(): void;
  goToGameOver(): void;
}