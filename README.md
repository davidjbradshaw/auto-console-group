<img src="./img/logo-green.svg" alt="Auto-Console-Group" label="" style="margin-bottom: -2px; width: 75%">

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

Or download [auto-console-group.js](/davidjbradshaw/auto-console-group/blob/main/auto-console-group.js)

## Setup

The `createAutoConsoleGroup()` creates a console object with all the same methods as the regular `console` object,
plus a few additional [methods](#methods) to control how a group is displayed.

```js
import createAutoConsoleGroup from 'auto-console-group'

const consoleGroup = createAutoConsoleGroup({ label: 'autoConsoleGroup' })

// All console methods are reflected on consoleGroup
consoleGroup.log('Log message')
consoleGroup.table(['foo', 'bar'])
consoleGroup.count('Counter')

// Set the Event in the group heading
consoleGroup.event('myEvent')
```

## User Guide

* [Group Heading](https://github.com/davidjbradshaw/auto-console-group/blob/main/docs/group_heading.md)
* [Options](https://github.com/davidjbradshaw/auto-console-group/blob/main/docs/options.md)
* [Methods](https://github.com/davidjbradshaw/auto-console-group/blob/main/docs/methods.md)
* [Format Helpers](https://github.com/davidjbradshaw/auto-console-group/blob/main/docs/helpers.md)
* [Error Boundaries](https://github.com/davidjbradshaw/auto-console-group/blob/main/docs/error_boundaries.md)

---
[<img align="right" src="https://badge.fury.io/js/auto-console-group.svg" alt="NPM" />](https://badge.fury.io/js/auto-console-group)
_&copy; 2025 David J. Bradshaw - License MIT_
