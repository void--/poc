module.exports.description = 'Create content model for Hero'

module.exports.up = (migration) => {
  const hero = migration.createContentType('hero')
    .name('Hero')
    .displayField('title')
    .description('')

  hero.createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)

  hero.createField('text')
    .name('Text')
    .type('RichText')

  hero.createField('image')
    .name('Image')
    .type('Link')
    .validations([{ linkContentType: ['image'] }])
    .linkType('Entry')

  hero.changeFieldControl('title', 'builtin', 'singleLine')
  hero.changeFieldControl('text', 'builtin', 'richTextEditor')
  hero.changeFieldControl('image', 'builtin', 'entryCardEditor', { showLinkEntityAction: true, showCreateEntityAction: true })
}

module.exports.down = migration => migration.deleteContentType('hero')
