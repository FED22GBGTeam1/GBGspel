interface IGame {
  highScore: number;
  elapsedTime: number;
  collectedFish: number;
  seagullsKilled: number;
  musicIsPlaying: boolean;
  currentSong: p5.SoundFile;
  playAgain(): void;
  goToStart(): void;
  goToGameOver(): void;
  fetchHighScore(): void;
  pauseMusic(): void;
}