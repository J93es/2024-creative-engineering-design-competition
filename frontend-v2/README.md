# Production

## dot-env

- Add .env file in ./ with the following values

```./.env
# ./.env

# backend api url
REACT_APP_API_URL=http://localhost:8084

# web socket url
REACT_APP_WS_URL=ws://localhost:8084/ws-subscribe
```

## Script

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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
