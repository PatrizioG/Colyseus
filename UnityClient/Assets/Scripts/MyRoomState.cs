// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.16
// 

using Colyseus.Schema;
using Action = System.Action;

public partial class MyRoomState : Schema {
	[Type(0, "string")]
	public string mySynchronizedProperty = default(string);

	[Type(1, "map", typeof(MapSchema<Player>))]
	public MapSchema<Player> players = new MapSchema<Player>();

	/*
	 * Support for individual property change callbacks below...
	 */

	protected event PropertyChangeHandler<string> __mySynchronizedPropertyChange;
	public Action OnMySynchronizedPropertyChange(PropertyChangeHandler<string> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.mySynchronizedProperty));
		__mySynchronizedPropertyChange += __handler;
		if (__immediate && this.mySynchronizedProperty != default(string)) { __handler(this.mySynchronizedProperty, default(string)); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(mySynchronizedProperty));
			__mySynchronizedPropertyChange -= __handler;
		};
	}

	protected event PropertyChangeHandler<MapSchema<Player>> __playersChange;
	public Action OnPlayersChange(PropertyChangeHandler<MapSchema<Player>> __handler, bool __immediate = true) {
		if (__callbacks == null) { __callbacks = new SchemaCallbacks(); }
		__callbacks.AddPropertyCallback(nameof(this.players));
		__playersChange += __handler;
		if (__immediate && this.players != null) { __handler(this.players, null); }
		return () => {
			__callbacks.RemovePropertyCallback(nameof(players));
			__playersChange -= __handler;
		};
	}

	protected override void TriggerFieldChange(DataChange change) {
		switch (change.Field) {
			case nameof(mySynchronizedProperty): __mySynchronizedPropertyChange?.Invoke((string) change.Value, (string) change.PreviousValue); break;
			case nameof(players): __playersChange?.Invoke((MapSchema<Player>) change.Value, (MapSchema<Player>) change.PreviousValue); break;
			default: break;
		}
	}
}

