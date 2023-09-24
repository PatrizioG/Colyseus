import { Client, Room } from "colyseus.js";
import Phaser from "phaser";
import { MyRoomState } from "../server/src/rooms/schema/MyRoomState";

// custom scene class
export class GameScene extends Phaser.Scene {
  room: Room;
  playerEntities: { [sessionId: string]: any } = {};
  // local input cache
  inputPayload = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    // preload scene
    this.cursorKeys = this.input.keyboard.createCursorKeys();
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
      this.room = await client.joinOrCreate<MyRoomState>("my_room");
      console.log("Joined successfully!");

      this.room.state.players.onAdd((player, sessionId) => {
        const entity = this.physics.add.image(player.x, player.y, "ship_0001");
        // keep a reference of it on `playerEntities`
        this.playerEntities[sessionId] = entity;
        // listening for server updates
        player.onChange(() => {
          // update local position immediately
          entity.x = player.x;
          entity.y = player.y;
        });
        // Alternative, listening to individual properties:
        // player.listen("x", (newX, prevX) => console.log(newX, prevX));
        // player.listen("y", (newY, prevY) => console.log(newY, prevY));
      });
      this.room.state.players.onRemove((player, sessionId) => {
        const entity = this.playerEntities[sessionId];
        if (entity) {
          // destroy entity
          entity.destroy();

          // clear local reference
          delete this.playerEntities[sessionId];
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  update(time: number, delta: number): void {
    // game loop
    // send input to the server
    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.room?.send(0, this.inputPayload);
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
