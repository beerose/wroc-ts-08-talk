---
title: Persistent data structures thanks to recursive type aliases
---

_the talk_


# How

with a kickass **15** minute presentation, entirely in VSCode.

# Why

It's well known that mutability is evil and often troublesome,
but you can stop shallow copying arrays (or god-forbid deep copying)
every time you want to change them. Let me show you how.

Immutable data structures are the tool for the job when immutability is required. \
Time to add them to our toolset.

Persistent data structures are good to know when your product needs time-travel capabilities
(like text inputs -- they are pretty bad if CTRL+Z doesn't work).

TODO: Make "Why" shorter?

# What

- What does the `persistent data structure` mean?
- Meet Cons List
  - How it looks in TypeScript 3.7
  - How it looked before TS3.7
  - Functions operating on ConsList
    - (big reveal) Instances of fp-ts typeclasses
  - Benchmarks of Cons List vs Array operations

---
_quick reminders_

# Controls

```json
  {
    "key": "cmd+alt+left",
    "command": "workbench.action.previousEditor"
  },
  {
    "key": "cmd+alt+right",
    "command": "workbench.action.nextEditor"
  },
  {
    "key": "cmd+shift+q",
    "command": "quokka.toggle",
    "when": "editorTextFocus"
  },
```

Move quickly through the slides with
- `Cmd + Alt + LeftArrow` → _View: Open Previous Editor_  
- `Cmd + Alt + RightArrow` → _View: Open Next Editor_

Run TypeScript slides with
- `Cmd + Shift + Q` → _Quokka.js: Toggle (Start/Stop) on Current File_

Minimize distractions and maximize screen space 
- `Cmd + B` → _(built-in) View: Toggle Side Bar Visibility_

Use regions to hide imports and code pasted from previous slides

![](assets/2019-10-28-19-43-38.png)
