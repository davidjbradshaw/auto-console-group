## Error Boundaries

This library works by storing console messages in an array and outputting the collected list of messages via
a [Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) that runs
directly after the main Event Loop task completes. Whilst this will continue to work even in the  event of a runtime
error, as the Microtask runs after the main task has terminated, the current log group will be displayed
after the error, rather than in front of it.

To overcome this limitation, you can create an Error Boundary, which will catch runtime errors and included them
in the current console group.

```js
const consoleGroup = createAutoConsoleGroup({ label: 'Error boundary example' })

consoleGroup.errorBoundary(() => {
  consoleGroup.log('Message before error')
  throw new Error('Runtime error')
})
```
