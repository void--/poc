module.exports.description = 'Create content model for Menu'

module.exports.up = (migration) => {
  const menu = migration.createContentType('menu')
    .name('Menu')
    .displayField('title')
    .description('')

  menu.createField('title')
    .name('Title')
    .type('Symbol')

  menu.createField('links')
    .name('Links')
    .type('Array')
    .items({ type: 'Link', validations: [{ linkContentType: ['navLink'] }], linkType: 'Entry' })

  menu.changeFieldControl('title', 'builtin', 'singleLine')
  menu.changeFieldControl('links', 'builtin', 'entryLinksEditor', { bulkEditing: false, showLinkEntityAction: true, showCreateEntityAction: true })
}

module.exports.down = migration => migration.deleteContentType('menu')
