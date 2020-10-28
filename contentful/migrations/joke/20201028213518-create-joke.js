module.exports.description = 'Create content model for Joke'

module.exports.up = (migration) => {
  const joke = migration.createContentType('joke')
    .name('Joke')
    .displayField('title')
    .description('')

  joke.createField('title')
    .name('Title')
    .type('Symbol')

  joke.changeFieldControl('title', 'builtin', 'singleLine')
}

module.exports.down = migration => migration.deleteContentType('joke')
