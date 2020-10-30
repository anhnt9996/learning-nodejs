const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('./notes.json');

    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('./notes.json', dataJSON);
};

const list = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse('Your notes!'));
  notes.forEach((note) => console.log(`- ${note.title}`));
};

const add = (title, content) => {
  console.log(chalk.blue.inverse('Adding a new note!'));

  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote !== undefined) {
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

const remove = (title) => {
  console.log(chalk.blue.inverse('Removing a note!'));

  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);

  if (newNotes.length === notes.length) {
    console.log(chalk.red.inverse('Nothing changed!'));
    return;
  }

  saveNotes(newNotes);
  console.log(chalk.green.inverse(`Note \`${title}\` has been removed!`));
};

const show = (title) => {
  console.log(chalk.blue.inverse('Showing a note!'));

  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(`- ${chalk.green(note.title)}: ${note.content}`);
    return;
  }

  console.log(chalk.red.inverse('No note found!'));
};

module.exports = {
  list,
  add,
  remove,
  show,
};
