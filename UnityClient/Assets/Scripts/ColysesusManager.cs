using Colyseus;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

public class ColysesusManager : MonoBehaviour
{
    public GameObject myPrefab;

    private Dictionary<string, GameObject> gameObjects = new Dictionary<string, GameObject>();

    // Start is called before the first frame update
    async void Start()
    {
        ColyseusClient client = new ColyseusClient("ws://localhost:2567");
        Debug.Log("Start");
        var room = await client.JoinOrCreate<MyRoomState>("my_room");
        Debug.Log("Joined Room");

        room.OnJoin += Room_OnJoin;
        room.OnLeave += Room_OnLeave;
        room.State.players.OnAdd((string sessionId, Player player) =>
        {
            Debug.Log("player has been added at " + sessionId + "at x: " + player.x + " y: " + player.y);
            // add your player entity to the game world!

            var newCoords = Camera.main.ScreenToWorldPoint(new Vector3(player.x, player.y , 1));
            Debug.Log($"new coord x:{newCoords.x} y: {newCoords.y}");
            var gameObject = Instantiate(myPrefab, new Vector3(newCoords.x, newCoords.y, 1), Quaternion.identity);
            gameObjects.Add(sessionId, gameObject);

            player.OnChange(() =>
            {
                var c = Camera.main.ScreenToWorldPoint(new Vector3(player.x, player.y , 1));
                Debug.Log($"on change x:{c.x} y: {c.y}");
                gameObject.transform.position = c;
            });
        });
    }

    private void Room_OnLeave(int code)
    {
        Debug.Log("OnLeave: " + code);
    }

    private void Room_OnJoin()
    {
        Debug.Log("OnJoin");
    }

    // Update is called once per frame
    void Update()
    {

    }
}
