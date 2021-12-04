build:
	node_modules/.bin/tsc


day-01: build
	node day-01/main.js
