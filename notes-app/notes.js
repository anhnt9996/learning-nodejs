const fs = require('fs');
const chalk = require('chalk');

const list = function () {
  return 'Your notes...';
};

const add = function (title, content) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      content,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note exists!'));
  }
};

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

module.exports = {
  list,
  add,
};
