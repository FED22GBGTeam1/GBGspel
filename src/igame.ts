interface IGame {
  /**
   * Highest score stored in local storage.
   */
  highScore: number;
  /**
  * How long the game went on for.
  */
  elapsedTime: number;
  /**
   * Amount of fish gathered.
   */
  collectedFish: number;
  /**
   * Amount of seagulls killed.
   */
  seagullsKilled: number;
  /**
   * Checks if background music is currently playing.
   */
  musicIsPlaying: boolean;
  /**
   * The background song currently being played.
   */
  currentSong: p5.SoundFile;
  /**
   * Function to go to the playing game scene and play the 'hast' song.
   * The 'another' song is stopped.
   */
  playAgain(): void;
  /**
   * Function to go to the start scene and play the 'another' song.
   * The 'another' song is stopped.
   */
  goToStart(): void;
  /**
   * Function to go to the game over scene and play the 'another' song.
   * The 'hast' song is stopped.
   */
  goToGameOver(): void;
  /**
   * This function retrieves the high score stored in the local storage.
   */
  fetchHighScore(): void;
  /**
 * Play or stop the given music file, depending on the value of `musicIsPlaying`.
 * 
 * @param {p5.SoundFile} sound - The music file to be played or stopped.
 */
  playMusic(sound: p5.SoundFile): void;
}