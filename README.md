<img src="./img/logo-dark.svg" alt="Auto-Console-Group" label="" style="margin-bottom: -2px; width: 75%">

# Introduction

Tame the JS console by **automagically grouping console messages**.

 * **Simple**: Drop in replacement for the full console API.
 * **Automatic**: Groups messages by each [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) iteration.
 * **Easier Debugging**: Makes it much clearer to see what is going on in your app.
 * **Adds Time Stamps**: Each grouping can be timestamped, to help better see what is happening.
 * **Reliable**: Uses a [Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) to ensure the message group is always closed on time.

A more readable console output in a couple of minutes.

<img src="./img/example.png" alt="example output" label="">

_Above created by [example.ts](./example.ts)_.

## Install

Install _auto-console-group_ via npm.

```sh
npm install auto-console-group
```

## Setup

The `createAutoConsoleGroup()` creates a console object with all the same methods as the regular `console` object.

```js
import createAutoConsoleGroup from 'auto-console-group'

const consoleGroup = createAutoConsoleGroup({ options })

// All console methods are reflected on consoleGroup
consoleGroup.log('Log message')
consoleGroup.table(['foo', 'bar'])
consoleGroup.count('Counter')

// Set the Event in the group heading
consoleGroup.event('myEvent')
```

> _If their is an uncaught error in you code, the logs leading up to the error will be displayed in a group directly after the error is logged to the console_.

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

## Options

The following options can be passed to `createAutoConsoleGroup`.

```js
{
  label: 'Label',          // First part of the group heading
  collapsed: false,        // Show groups expanded or collapsed
  defaultEvent: 'Event',   // Second part of the group heading, shown in bold
  showTime: true,          // Display time in the group headings
}
```

> _When the_ `collapsed` _option is set to **true**, the group will automatically open if a **warning** or **error** is included in the group_.

## Methods

In addition to the full [Console API](https://developer.mozilla.org/en-US/docs/Web/API/console), the following methods are also available.

### endAutoGroup()

Force the current group to output to the browser console. Any logs created after this call will appear in a new group.

### event(_string_)

Set the event type part of the group heading for just the current event loop iteration.

### purge()

Remove all messages in the current output queue.

## Helpers

To assist with colouring console messages, the package also contains two consts that will return the current hex codes for highlighting log message.

### HIGHLIGHT

The default console highlight colour, based on dark/light mode.

### FOREGROUND

The current console foreground colour, based on dark/light mode.

---
_&copy; 2025 David J. Bradshaw - License MIT_
