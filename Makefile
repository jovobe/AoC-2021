build:
	node_modules/.bin/tsc

day-01: build
	node day-01/main.js

day-02: build
	node day-02/main.js

day-03: build
	node day-03/main.js
