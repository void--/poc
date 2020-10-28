module.exports.description = 'Create content model for Page'

module.exports.up = (migration) => {
  const page = migration.createContentType('page')
    .name('Page')
    .displayField('title')
    .description('')

  page.createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)

  page.createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)

  page.createField('panels')
    .name('Panels')
    .type('Array')
    .localized(true)
    .items({ type: 'Link', validations: [], linkType: 'Entry' })

  page.createField('test')
    .name('test')
    .type('Symbol')

  page.changeFieldControl('title', 'builtin', 'singleLine')
  page.changeFieldControl('slug', 'builtin', 'singleLine')
  page.changeFieldControl('panels', 'builtin', 'entryLinksEditor', { bulkEditing: false, showLinkEntityAction: true, showCreateEntityAction: true })
  page.changeFieldControl('test', 'builtin', 'singleLine')
}

module.exports.down = migration => migration.deleteContentType('page')
