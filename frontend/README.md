# VMS-WEB Connection Documentation

- Communication between VMS and WEB uses Chrome Web Serial API.

## IDLE

### WEB

- When in IDLE state, send 'I'.

```text
I
```

## Accident

### WEB

- When in Accident state, send 'A' and "/{location}!".

```text
A
/1234!
```

### VMS

- When in Accident state, print message.

```text
accident
1234
```
