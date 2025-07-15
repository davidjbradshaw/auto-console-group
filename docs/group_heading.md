## Group Heading

The heading for each group is made up of three parts: **Label**, **Event** and **Time**.

### Label

The first part of the heading is the `label`, and is for showing your library or application name.
The label is set via the [options](#options) when you create a _consoleGroup_.

### Event

The second part, shown in bold, is the `Event`. This is for indicating the trigger for the current event loop.
The event heading for the current loop is set via the `.event()` method for the current event loop. After which it
will automatically reset to the `defaultEvent` which is set in the [options](#options).

```js
const consoleGroup = createAutoConsoleGroup({ options })

consoleGroup.event('myEvent')
```

### Time

Optionally the group heading can included the time of the first logged message.
To disable this function set the `showTime` option to false.
