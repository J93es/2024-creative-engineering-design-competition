# Production

## dot-env

- Add .env file in ./ with the following values

```./.env
# ./.env

# database uri
DB_URI="mongodb://localhost:27017/contest"

# exporting post
PORT=8080

# cors white list set
CORS_WHITE_LIST=["example.com"]

# development, production enviroment
DEVELOPMENT_ENV="development"

# admin id, password list
AUTH_DATA=[{"id":"id-example","password":"password-example"}]
```

## Script

### `npm run dev`

- In a development environment, you must comment out the first line of ./src/app.ts: import "module-alias/register";

### `npm run build`

### `npm start`

# API Documentation

## Enums

### Accident Code

```typescript
export const enum AccidentCode {
  CAR_CRASH = "0",
  FIRE = "1",
  FLOOD = "2",
}
```

### Accident Status

```typescript
export const enum AccidentStatus {
  DETECTED = "0",
  IGNORED = "1",
  ALARMING = "2",
  END = "3",
}
```

### Rail Robot Command

```typescript
export const enum RailRobotCommand {
  PATROL = "0",
  ALARMING = "1",
  CHARGE = "3",
  MOVE_TO_TARGET_LOCATION = "4",
  STOP = "5",
}
```

## Data Models

### AccidentType

```typescript
export interface AccidentType {
  id: string; // Auto-generated on POST
  code: AccidentCode.CAR_CRASH | AccidentCode.FIRE | AccidentCode.FLOOD; // Default: AccidentCode.CAR_CRASH
  location: number; // Required
  discovererRobotId: string; // Required
  probability?: number;
  status:
    | AccidentStatus.DETECTED
    | AccidentStatus.IGNORED
    | AccidentStatus.ALARMING
    | AccidentStatus.END; // Default: AccidentStatus.DETECTED
}
```

### RailRobotType

```typescript
export interface RailRobotType {
  id: string; // Required
  command:
    | RailRobotCommand.PATROL
    | RailRobotCommand.ALARMING
    | RailRobotCommand.CHARGE
    | RailRobotCommand.MOVE_TO_TARGET_LOCATION
    | RailRobotCommand.STOP; // Default: RailRobotCommand.STOP
  currentLocation: number; // Required
  targetLocation?: number;
  patrolStartLocation?: number;
  patrolEndLocation?: number;
}
```

## Auth

Authentication information needs to be added to the headers or query.

#### Headers

```json
{
  "cdec-auth": "(your-own-id):(your-own-password)" // Please enter your ID and password in the parentheses.
}
```

#### Query /ws-subscribe?cdec-auth=(your-own-id):(your-own-password)

Only permitted on WebSocket. Please enter your ID and password in the parentheses.

## Rate Limiter

If more than 3000 requests occur per minute, the rate limiter will be triggered.

#### Response: 429

```json
{
  "msg": "Too many requests, please try again later."
}
```

## Web Soket

When data is changed, server emit data.

### /ws-subscribe

#### Message

```json
{
  "accident": {
    "id": "147bdf05-a050-4f83-8f2a-0a68d36b537a",
    "code": "0",
    "location": 3,
    "discovererRobotId": "0",
    "probability": 97,
    "status": "0"
  },
  "railRobots": {
    "0": {
      "id": "0",
      "command": "5",
      "currentLocation": 0,
      "targetLocation": 3,
      "patrolStartLocation": 0,
      "patrolEndLocation": 10
    },
    "1": {
      "id": "1",
      "command": "0",
      "currentLocation": 20,
      "targetLocation": 0,
      "patrolStartLocation": 10,
      "patrolEndLocation": 20
    }
  }
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
  "code": "0",
  "location": 1,
  "discovererRobotId": "1",
  "probability": 97,
  "status": "0"
}
```

### POST /accident

Report a new accident record.

#### Request

```json
{
  "location": 1,
  "code": "0",
  "discovererRobotId": "1",
  "probability": 97
}
```

#### Response

- If accident does not exist:

```json
{
  "id": "ac6e52f2-55ba-4bb3-9dd0-3018a5094bc3",
  "location": 1,
  "code": "0",
  "discovererRobotId": "1",
  "probability": 97,
  "status": "0"
}
```

- If accident already exists:

```json
{
  "msg": "Error: current Accident is already exist"
}
```

#### Effect

- The accident is posted.
- The rail robot that detected the accident stops.

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
  "msg": "Accident ignored"
}
```

- If accident does not exist:

```json
{
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

## Admin Router

### GET admin/

Get all rail robots and current accident data.

#### Request

```json
{}
```

#### Response

```json
{
  "accident": {
    "id": "147bdf05-a050-4f83-8f2a-0a68d36b537a",
    "code": "0",
    "location": 3,
    "discovererRobotId": "0",
    "probability": 97,
    "status": "0"
  },
  "railRobots": {
    "0": {
      "id": "0",
      "command": "5",
      "currentLocation": 0,
      "targetLocation": 3,
      "patrolStartLocation": 0,
      "patrolEndLocation": 10
    },
    "1": {
      "id": "1",
      "command": "0",
      "currentLocation": 20,
      "targetLocation": 0,
      "patrolStartLocation": 10,
      "patrolEndLocation": 20
    }
  }
}
```

### DELETE admin/reset

Delete all information in the database and create two pieces of rail robot information.

#### Request

```json
{}
```

#### Response

```json
{
  "msg": "Reseted successfully"
}
```
