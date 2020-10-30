const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Create a new note
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    content: {
      describe: 'Note content',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function ({ title, content }) {
    notes.add(title, content);
  },
});

// Remove a note

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function ({ title }) {
    notes.remove(title);
  },
});

// List notes

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: function () {
    console.log(chalk.green.inverse('Listing out all notes!'));
  },
});

// Read a note

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function () {
    console.log(chalk.green.inverse('Reading a note!'));
  },
});

yargs.parse();
