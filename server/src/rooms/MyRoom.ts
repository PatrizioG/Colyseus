import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage(0, (client, input) => {
      // get reference to the player who sent the message
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;

      if (input.left) {
        player.x -= velocity;
      } else if (input.right) {
        player.x += velocity;
      }

      if (input.up) {
        player.y -= velocity;
      } else if (input.down) {
        player.y += velocity;
      }
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const mapWidth = 400;
    const mapHeight = 300;

    const player = new Player();

    // place Player at a random position
    player.x = Math.random() * mapWidth;
    player.y = Math.random() * mapHeight;

    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
