<img src="https://iframe-resizer.com/auto-group-console2.svg" alt="Auto-Group-Console" title="" style="margin-bottom: -2px; width: 75%">

## Intoduction
This is a simple library to group console messages automatically by [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) frames. This is useful in JavaScript applications that have a lot of event triggers, as it allows you to group console output by triggering action. It works by creating a [Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) to close the console group at the end of the current Event Loop.


### Install

This library can be install from NPM.

```sh
npm install auto-group-console
```

## Usage

The library provides two modes of operation, `groupConsole` and `deferConsole`, They both provide the same interface and are interchangeable. The `groupConsole` version outputs logs in real time and creates a microtask to end the console group. Whereas the `deferConsole` version, stores all console messages and outputs everything through the microtask after the main task has completed. 

The deferred approach has several tradeoffs, it allows you to set the group heading after the first log message and suppresses stack traces, which might be useful on public sites. However, it also prevents console timers giving accurate results.

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

> When deferring console output, the `timer`, `trace` and `profile` console methods won't give accurate results, as they are no longer running in the main task context.

## Options

The following options can be passed to `createGroupConsole` and `createDeferConsole`.

```js
{
  enabled: true / false
  title: 'Default Group Title'
}
```

When `enabled` is set to false it will suppress all messages to the console.

## Methods

In addition to the full [Console API](https://developer.mozilla.org/en-US/docs/Web/API/console), the following methods are also available.

### setEnabled(<span style="font-weight: normal">true/false</span>)

Turn console logging on and off.

### setLoopEnabled(<span style="font-weight: normal">true/false</span>)

Turn console logging on and off for just the current loop.

### setTitle(<span style="font-weight: normal">title</span>)

Set the group title. If this is called after a message call when using `groupConsole`, then the title will only update on the next event loop.

### setLoopTitle(<span style="font-weight: normal">title</span>)

Set the group title just for the current loop. For `groupConsole`, this has to be set before the first message call. With `deferConsole` it can be set anytime within the current event loop.

---
_&copy; 2025 David J. Bradshaw - License MIT_
