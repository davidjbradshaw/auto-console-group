<img src="./img/blacker.svg" alt="Auto-Group-Console" label="" style="margin-bottom: -2px; width: 75%">

# Introduction

Tame the JS console by **automagically grouping console message**.

 * **Simple**: Drop in replacement for the full console API.
 * **Automatic**: Groups messages by each [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop).
 * **Easier Debugging**: Makes it much clearer to see what is going on in your app.
 * **Adds Time Stamps**: Each grouping can be timestamped, to help better see what is happening.
 * **Reliable**: Uses a [Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) to ensure the message group is always closed on time.

A more readable console output in a couple of minutes.

<img src="./img/example.png" alt="example output" label="">

_Above example created by [example.js](./example.js)_.

## Install

Install _auto-group-console_ via npm.

```sh
npm install auto-group-console
```
<!--
## Usage

The library provides two modes of operation, `deferConsole` and `groupConsole`,

 * `deferConsole` Stores logs and outputs everything through the microtask after the event loop has completed.
 * `groupConsole` Outputs logs in real time and creates a microtask to close the console group at the end of the event loop.

The deferred approach has several tradeoffs, it allows you to change settings and purge messages before outputting to the console. However, it also prevents console timers giving accurate results and removes the stacktraces.
Both approaches provide the same interface and are interchangeable, allowing you to use one for development and the other for production.
-->

## Setup

The `createGroupConsole()` creates a console object with all the same methods as the regular `console` object.

```js
import createGroupConsole from 'auto-group-console'

const groupConsole = createGroupConsole({ options })

// All console methods are reflected on groupConsole
groupConsole.log('Log message')
groupConsole.table(['foo', 'bar'])
groupConsole.count('Counter')
```

## Options

The following options can be passed to `createGroupConsole` and `createDeferConsole`, to set the group

```js
{
  label: 'label',          // First part of the group heading
  collapsed: false,        // Show group expanded or collapsed
  defaultEvent: 'event',   // Second part of the group heading, shown in bold
  showTime: true,          // Display time in the group heading
}
```

> _When the `collapsed` option is set to __true__, the group will automatically open if a warning or error is logged to the console_.

## Methods

In addition to the full [Console API](https://developer.mozilla.org/en-US/docs/Web/API/console), the following methods are also available.

### event(_string_)

Set the event type part of the group heading for the current event loop.

### purge()

Remove all messages in the current output queue.

<!--  
_Note When using `deferConsole()` the `timer`, `trace` and `profile` console methods won't give accurate results, as they are no longer running in the main task context_.
-->

---
_&copy; 2025 David J. Bradshaw - License MIT_
