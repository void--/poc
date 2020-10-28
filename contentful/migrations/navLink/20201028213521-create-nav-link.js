module.exports.description = 'Create content model for Nav Link'

module.exports.up = (migration) => {
  const navLink = migration.createContentType('navLink')
    .name('Nav Link')
    .displayField('title')
    .description('')

  navLink.createField('title')
    .name('Title')
    .type('Symbol')

  navLink.createField('destinationUrl')
    .name('Destination URL')
    .type('Symbol')

  navLink.createField('destinationContent')
    .name('Destination Content')
    .type('Link')
    .validations([{ linkContentType: ['page'] }])
    .linkType('Entry')

  navLink.createField('subLinks')
    .name('Sub Links')
    .type('Array')
    .items({ type: 'Link', validations: [{ linkContentType: ['navLink'] }], linkType: 'Entry' })

  navLink.changeFieldControl('title', 'builtin', 'singleLine')
  navLink.changeFieldControl('destinationUrl', 'builtin', 'singleLine')
  navLink.changeFieldControl('destinationContent', 'builtin', 'entryLinkEditor', { showLinkEntityAction: true, showCreateEntityAction: true })
  navLink.changeFieldControl('subLinks', 'builtin', 'entryLinksEditor', { bulkEditing: false, showLinkEntityAction: true, showCreateEntityAction: true })
}

module.exports.down = migration => migration.deleteContentType('navLink')
