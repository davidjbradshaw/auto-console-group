<img src="https://iframe-resizer.com/auto-group-console2.svg" alt="Auto-Group-Console" title="" style="margin-bottom: -2px; width: 75%">

## Intoduction
This is a simple library to group console messages automatically by [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) frames. This is useful in JavaScript applications that have a lot of event triggers, as it allows you to group console output by triggering action. It works by creating a [Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) to close the console group at the end of the current Event Loop.

The library provedes two modes of operation, `groupConsole` and `deferConsole`. They both provide the same interface and are interchangable. The defered version can be useful in production builds, as processing the console messages in the microtasks removes any stack traces that you might not want to make publically available.

### Group Console

The Group Console creates a group on the first message and then closed the group when the current Event Loop task ends.

```js
import { createGroupConsole } from 'auto-group-console'

const groupConsole = createGroupConsole({ options })

// All console methods are reflected on groupConsole
groupConsole.log('Log message')
groupConsole.warn('Warning message')
groupConsole.error('Error message')
```


### Defer Console

The Defer Console, outputs all console messages at the end of the current Event Loop task. 

```js
import { createDeferConsole } from 'auto-group-console'

const deferConsole = createDeferConsole({ options })

// All console methods are reflected on deferConsole
deferConsole.log('Log message')
deferConsole.warn('Warning message')
deferConsole.error('Error message')
```

## Options

The following options can be passed to `createGroupConsole` and `createDeferConsole`.

```js
{
  enabled: true / false
  title: 'Default Group Title'
}
```

When `enabled` is set to false it will suppress all messages to the console.

## API

In addition to the full [Console API](https://developer.mozilla.org/en-US/docs/Web/API/console), the following methods are also available.

### setEnabled(<span style="font-weight: normal">true/false</span>)

Turn console logging on and off.

### setLoopEnabled(<span style="font-weight: normal">true/false</span>)

Turn console logging on and off for just the current loop.

### setTitle(<span style="font-weight: normal">title</span>)

Set the group title. If this is called after a message call when using `groupConsole`, then the title will only update on the next event loop.

### setLoopTitle(<span style="font-weight: normal">title</span>)

Set the group title just for the current loop. For `groupConsole`, this has to be set before the first message call. With `deferConsole` it can be set anytime within the current event loop.

--
_&copy; 2025 David J. Bradshaw_ 
