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
  handler({ title, content }) {
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
  handler({ title }) {
    notes.remove(title);
  },
});

// List notes

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    notes.list();
  },
});

// Read a note

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler({ title }) {
    notes.show(title);
  },
});

yargs.parse();
