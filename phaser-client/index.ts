import { Client, Room } from "colyseus.js";
import Phaser from "phaser";

// custom scene class
export class GameScene extends Phaser.Scene {
  preload() {
    // preload scene
  }

  async create() {
    // create scene
    console.log("Joining room...");

    const client = new Client("ws://localhost:2567");

    try {
      const room = await client.joinOrCreate("my_room");
      console.log("Joined successfully!");
    } catch (e) {
      console.error(e);
    }
  }

  update(time: number, delta: number): void {
    // game loop
  }
}

// game config
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  backgroundColor: "#b6d53c",
  parent: "phaser-example",
  physics: { default: "arcade" },
  pixelArt: true,
  scene: [GameScene],
};

// instantiate the game
const game = new Phaser.Game(config);
