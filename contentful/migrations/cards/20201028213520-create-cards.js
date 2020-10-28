module.exports.description = 'Create content model for Cards'

module.exports.up = (migration) => {
  const cards = migration.createContentType('cards')
    .name('Cards')
    .displayField('title')
    .description('')

  cards.createField('title')
    .name('Title')
    .type('Symbol')

  cards.createField('cards')
    .name('Cards')
    .type('Array')
    .required(true)
    .items({ type: 'Link', validations: [{ linkContentType: ['card'] }], linkType: 'Entry' })

  cards.changeFieldControl('title', 'builtin', 'singleLine')
  cards.changeFieldControl('cards', 'builtin', 'entryCardsEditor', { bulkEditing: false, showLinkEntityAction: true, showCreateEntityAction: true })
}

module.exports.down = migration => migration.deleteContentType('cards')
