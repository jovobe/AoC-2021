import * as fs from 'fs';
import path from 'path';

enum Direction {
    Up = 'up',
    Down = 'down',
    Forward = 'forward',
}

function fromString(direction: string): Direction {
    switch (direction) {
        case 'up':
            return Direction.Up;
        case 'down':
            return Direction.Down;
        case 'forward':
            return Direction.Forward;
        default:
            throw new Error('Invalid direction: ' + direction);
    }
}

class Command {
    public direction: Direction;
    public steps: number;
    constructor(direction: Direction, steps: number) {
        this.direction = direction;
        this.steps = steps;
    }
    public static fromString(commandString: string): Command {
        const parsed = commandString.split(' ');
        const direction = fromString(parsed[0]);
        const steps = parseInt(parsed[1]);
        return new Command(direction, steps);
    }
}

class Position {
    public x: number;
    public depth: number;
    constructor() {
        this.x = 0;
        this.depth = 0;
    }
    public move(command: Command): void {
        switch (command.direction) {
            case Direction.Up:
                this.depth -= command.steps;
                break;
            case Direction.Down:
                this.depth += command.steps;
                break;
            case Direction.Forward:
                this.x += command.steps;
                break;
        }
    }
    public applyCommands(commands: Command[]): void {
        commands.forEach(c => this.move(c));
    }
}

const input: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'),'utf8');
const commandStrings: string[] = input.split('\n').filter(s => s.length > 0);
const commands: Command[] = commandStrings.map(string => Command.fromString(string));

const position = new Position();
position.applyCommands(commands);

console.log('part 1: ' + position.x * position.depth);

// part 2
class Position2 extends Position {
    public aim: number;
    constructor() {
        super();
        this.aim = 0;
    }
    public move(command: Command): void {
        switch (command.direction) {
            case Direction.Up:
                this.aim -= command.steps;
                break;
            case Direction.Down:
                this.aim += command.steps;
                break;
            case Direction.Forward:
                this.x += command.steps;
                this.depth += command.steps * this.aim;
                break;
        }
    }
}

const position2 = new Position2();
position2.applyCommands(commands);

console.log('part 2: ' + position2.x * position2.depth);
