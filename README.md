## Setup
`npm install`

## Running the application
`npm start mocks/moby_dick.txt` or  
`npm start mocks/moby_dick.txt mocks/twenty_thousand_leagues.txt` or  
`cat mocks/moby_dick.txt | node app.js` or  
`npm start mocks/moby_dick.txt scaleMe` (to test handle 100 Moby Dick's)

## Testing the application
`npm test`

## Prerequisites
- Node v12 or above

## Notes
What I would do next with more time? Use import statements over require, performance test regex text clean up, and test to see any other performant approaches with streams to read large amounts of files