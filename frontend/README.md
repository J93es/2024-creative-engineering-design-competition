# VMS-WEB Connection Documentation

- Use Chrome Web Serial Api

## IDLE

### WEB

- When in IDLE state, send 'I'

```text
I
```

### VMS

- When in IDLE state, print {협의 필요}

```text
{협의 필요}
```

## Accident

### WEB

- When in Accident state, send 'A' and "/{location}!"

```text
A
/1234!
```

### VMS

- When in Accident state, print {협의 필요}

```text
{협의 필요}
```
