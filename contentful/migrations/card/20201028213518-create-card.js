module.exports.description = 'Create content model for Card'

module.exports.up = (migration) => {
  const card = migration.createContentType('card')
    .name('Card')
    .displayField('title')
    .description('')

  card.createField('title')
    .name('Title')
    .type('Symbol')

  card.createField('image')
    .name('Image')
    .type('Link')
    .validations([{ linkContentType: ['image'] }])
    .linkType('Entry')

  card.createField('test')
    .name('woof woof')
    .type('Number')

  card.changeFieldControl('title', 'builtin', 'singleLine')
  card.changeFieldControl('image', 'builtin', 'entryLinkEditor', { showLinkEntityAction: true, showCreateEntityAction: true })
  card.changeFieldControl('test', 'builtin', 'undefined')
}

module.exports.down = migration => migration.deleteContentType('card')
