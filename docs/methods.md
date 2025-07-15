## Methods

In addition to the full [Console API](https://developer.mozilla.org/en-US/docs/Web/API/console), the following methods
are also available.

### endAutoGroup()

Force the current group to output to the browser console. Any logs created after this call will appear in a new group.

### errorBoundary(_Function_)

Create an [error boundary](#error-boundaries) around a function. This allows _auto-console-group_ to display runtime
errors within the console group.

### event(_String_)

Set the event type part of the group heading for just the current event loop iteration.

### purge()

Remove all messages in the current output queue.
