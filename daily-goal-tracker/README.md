## Setup

Expects node version 20 or above

```
npm i
```

## Testing

```
npm run test
```

## Local running

```
npm run dev
open http://127.0.0.1:5173/
```

Note that there is a seed button at the top of the app to seed initial data

## Caviats

- I have not got around to building the router so dev mode only for now
- I have not notably accounted for timezones in my tests (and so they will not work outside of the uk)
- The code tries to account for local timezones (including bst) but I left it out of scope for this work
- The code assumes the week starts on either Sunday or Monday depending on your locale. Resultantly tests may use different dates on different machines.
- I chose to average out yes/nos into % yesses
