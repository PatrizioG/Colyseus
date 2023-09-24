import { Client, Room } from "colyseus.js";
import Phaser from "phaser";
import { MyRoomState } from "../server/src/rooms/schema/MyRoomState";

// custom scene class
export class GameScene extends Phaser.Scene {
  preload() {
    // preload scene
    this.load.image(
      "ship_0001",
      "https://cdn.glitch.global/3e033dcd-d5be-4db4-99e8-086ae90969ec/ship_0001.png"
    );
  }

  async create() {
    // create scene
    console.log("Joining room...");

    const client = new Client("ws://localhost:2567");

    try {
      const room = await client.joinOrCreate<MyRoomState>("my_room");
      room.state.players.onAdd((player, sessionId) => {
        const entity = this.physics.add.image(player.x, player.y, "ship_0001");
      });
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
