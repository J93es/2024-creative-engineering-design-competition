# API Documentation

## Enums

### Accident Code

```typescript
export const enum Code {
  CAR_CRASH = "0",
  FIRE = "1",
  FLOOD = "2",
}
```

### Accident Status

```typescript
export const enum Status {
  DETECTED = "0",
  IGNORED = "1",
  ALARMING = "2",
  END = "3",
}
```

### Rail Robot Command

```typescript
export const enum Command {
  PATROL = "0",
  ALARMING = "1",
  CHARGE = "3",
  MOVE_TO_TARGET_LOCATION = "4",
}
```

## Data Models

### AccidentType

```typescript
export interface AccidentType {
  id: string; // Auto-generated on POST
  code: Code.CAR_CRASH | Code.FIRE | Code.FLOOD; // Required
  location: number; // Required
  discoverorRobotId: string; // Required
  status: Status.DETECTED | Status.IGNORED | Status.ALARMING | Status.END; // Default: Status.DETECTED
}
```

### RailRobotType

```typescript
export interface RailRobotType {
  id: string; // Required
  command:
    | Command.PATROL
    | Command.ALARMING
    | Command.CHARGE
    | Command.MOVE_TO_TARGET_LOCATION; // Default: Command.PATROL
  currentLocation: number; // Required
  targetLocation?: number;
  patrolStartLocation?: number;
  patrolEndLocation?: number;
}
```

## Rail Robot Router

### GET /rail-robot

Fetches all rail robots.

#### Request

```json
{}
```

#### Response

```json
[
  {
    "id": "0",
    "command": "0",
    "currentLocation": 15,
    "targetLocation": 8,
    "patrolStartLocation": 10,
    "patrolEndLocation": 20
  },
  {
    "id": "1",
    "command": "0",
    "currentLocation": 10,
    "targetLocation": 13,
    "patrolStartLocation": 0,
    "patrolEndLocation": 10
  }
]
```

### GET /rail-robot/each

Fetches a single rail robot by ID.

#### Request

```json
{
  "id": "0"
}
```

#### Response

```json
{
  "id": "0",
  "command": "0",
  "currentLocation": 15,
  "targetLocation": 8,
  "patrolStartLocation": 10,
  "patrolEndLocation": 20
}
```

### POST /rail-robot

Creates a new rail robot.

#### Request

```json
{
  "id": "2",
  "currentLocation": 11
}
```

#### Response

```json
{
  "id": "2",
  "command": "0",
  "currentLocation": 11,
  "patrolStartLocation": 6,
  "patrolEndLocation": 12
}
```

### PUT /rail-robot/start-patrol

Starts the patrol for all robots.

#### Request

```json
{}
```

#### Response

```json
{
  "msg": "Patrol started"
}
```

#### Effect

- Patrol position and command update of each rail robot.

### PUT /rail-robot/move-to-target-location

Moves a rail robot to a specified target location.

#### Request

```json
{
  "targetLocation": 1
}
```

#### Response

```json
{
  "msg": "Moved to target location"
}
```

#### Effect

- Make a specific robot move to the target location through the target location and the patrol position of each rail robot.

### PUT /rail-robot/stop

Stops a rail robot by ID.

#### Request

```json
{
  "id": "1"
}
```

#### Response

```json
{
  "id": "1",
  "command": "3",
  "currentLocation": 10,
  "targetLocation": 1,
  "patrolStartLocation": 0,
  "patrolEndLocation": 6
}
```

### PUT /rail-robot/update-current-location

Updates the current location of a rail robot.

#### Request

```json
{
  "id": "1",
  "currentLocation": 11
}
```

#### Response

```json
{
  "id": "1",
  "command": "3",
  "currentLocation": 11,
  "targetLocation": 1,
  "patrolStartLocation": 0,
  "patrolEndLocation": 6
}
```

### DELETE /rail-robot

Deletes a rail robot by ID.

#### Request

```json
{
  "id": "2"
}
```

#### Response

```json
{
  "msg": "Deleted successfully"
}
```

## Accident Router

### GET /accident

Fetches the current accident.

#### Request

```json
{}
```

#### Response

- If accident does not exist:

```json
{}
```

- If accident exists:

```json
{
  "id": "ac6e52f2-55ba-4bb3-9dd0-3018a5094bc3",
  "location": 1,
  "discoverorRobotId": "1",
  "status": "0"
}
```

### POST /accident

Report a new accident record.

#### Request

```json
{
  "location": 1,
  "discoverorRobotId": "1"
}
```

#### Response

- If accident does not exist:

```json
{
  "id": "ac6e52f2-55ba-4bb3-9dd0-3018a5094bc3",
  "location": 1,
  "discoverorRobotId": "1",
  "status": "0"
}
```

- If accident already exists:

```json
{
  "code": 404,
  "msg": "Error: current Accident is already exist"
}
```

### PUT /accident/ignore

Ignores the current accident.

#### Request

```json
{}
```

#### Response

- If accident exists:

```json
{
  "id": "ac6e52f2-55ba-4bb3-9dd0-3018a5094bc3",
  "location": 1,
  "discoverorRobotId": "1",
  "status": "1"
}
```

- If accident does not exist:

```json
{
  "code": 404,
  "msg": "Error: Accident is not exist"
}
```

## Alarm Router

### PUT /alarm/start

Starts the alarm.

#### Request

```json
{}
```

#### Response

```json
{
  "msg": "Alarm started"
}
```

#### Effect

- rail-robot alarm is starting
- accident code is updated

### PUT /alarm/end

Stops the alarm.

#### Request

```json
{}
```

#### Response

```json
{
  "msg": "Alarm stopped"
}
```

#### Effect

- rail-robot patroling is starting
- accident code is updated
