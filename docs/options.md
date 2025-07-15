## Options

The following options can be passed to `createAutoConsoleGroup`.

```js
{
  label: 'Label',          // First part of the group heading
  expand: true,            // Show groups expanded or collapsed
  defaultEvent: 'Event',   // Second part of the group heading, shown in bold
  showTime: true,          // Display time in the group headings
}
```

_When the_ `collapsed` _option is set to __true__, the group will automatically open if a __warning__ or __error__ is
included in the group_.
