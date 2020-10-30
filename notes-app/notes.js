const fs = require('fs');
const chalk = require('chalk');

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('./notes.json');

    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return [];
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('./notes.json', dataJSON);
};
const list = function () {
  return 'Your notes...';
};

const add = function (title, content) {
  console.log(chalk.blue.inverse('Adding a new note!'));

  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length > 0) {
    console.log(chalk.red.inverse('Note exists!'));
    return;
  }

  notes.push({
    title,
    content,
  });

  saveNotes(notes);
  console.log(chalk.green.inverse('New note added!'));
};

const remove = function (title) {
  console.log(chalk.blue.inverse('Removing a note!'));

  const notes = loadNotes();
  const newNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (newNotes.length === notes.length) {
    console.log(chalk.red.inverse('Nothing changed!'));
    return;
  }

  saveNotes(newNotes);
  console.log(chalk.green.inverse(`Note \`${title}\` has been removed!`));
};

module.exports = {
  list,
  add,
  remove,
};
