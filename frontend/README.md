# VMS-WEB Connection Documentation

- Communication between VMS and WEB uses Chrome Web Serial API.

## IDLE

### WEB

- When in Normal state, send 'I'.

```text
I
```

### VMS

- When in Normal state, print message.

```text
Strictly limited
70km/h
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
WARNING
1234m
```
