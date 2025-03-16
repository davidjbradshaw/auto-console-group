<img src="./img/black.svg" alt="Auto-Group-Console" label="" style="margin-bottom: -2px; width: 75%">

## Introduction

Tame the JS console by **Automagically grouping console message**.

 * **Simple**: Reflects the full console API, making it a drop in replacement.
 * **Automatic**: Groups messages by each [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)..
 * **Easier Debugging**: Makes it much clearer to see what is going on in your app.
 * **Adds Time Stamps**: Each grouping is timestamped, to better see what is happening.
 * **Reliable**: Uses a [Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) to ensure the message group is always closed on time.

The following example was created by [example.js](./example.js).

<img src="./img/example.png" alt="example output" label="">

__

## Usage

The library provides two modes of operation, `deferConsole` and `groupConsole`,

 * `deferConsole` Stores logs and outputs everything through the microtask after the event loop has completed.
 * `groupConsole` Outputs logs in real time and creates a microtask to end the console group at the end of the event loop.

The deferred approach has several tradeoffs, it allows you to change settings and purge messages before outputting to the console. However, it also prevents console timers giving accurate results and removes the stacktraces.
Both approaches provide the same interface and are interchangeable, allowing you to use one for development and the other for production.

### Defer Console

The Defer Console, outputs all console messages at the end of the current Event Loop task. 

```js
import { createDeferConsole } from 'auto-group-console'

const deferConsole = createDeferConsole({ options })

// All console methods are reflected on deferConsole
deferConsole.log('Log message')
deferConsole.assert(true, 'Assertion')
deferConsole.debug('Debug message')
```

### Group Console

The Group Console creates a group on the first message and then closed the group when the current Event Loop task ends.

```js
import { createGroupConsole } from 'auto-group-console'

const groupConsole = createGroupConsole({ options })

// All console methods are reflected on groupConsole
groupConsole.log('Log message')
groupConsole.table(['foo', 'bar'])
groupConsole.count('Counter')
```

> When deferring console output, the `timer`, `trace` and `profile` console methods won't give accurate results, as they are no longer running in the main task context.

## Options

The following options can be passed to `createGroupConsole` and `createDeferConsole`, to set the group

```js
{
  label: 'label',          // First part of the group heading
  defaultEvent: 'event',   // Second part of the group heading, shown in bold
  showTime: true,          // Display time in the group heading
}
```

When `enabled` is set to false it will suppress all messages to the console.

## Methods

In addition to the full [Console API](https://developer.mozilla.org/en-US/docs/Web/API/console), the following methods are also available.

### event(_string_)

Set the event type part of the group heading for the current event loop.

> When using `groupConsole` this has to be set before all other console messages.

### label(_string_)

Set the label type part of the group heading for all future messages.

> When using `groupConsole` this has to be set before all other console messages.

### purge()

Remove all messages in the current output queue.

> When using `groupConsole` this is ignored.

### showTime(_bool_)

Turn clock on and off.

> When using `groupConsole` this has to be set before all other console messages.

---
_&copy; 2025 David J. Bradshaw - License MIT_
