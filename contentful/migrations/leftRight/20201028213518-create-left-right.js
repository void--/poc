module.exports.description = 'Create content model for Left Right'

module.exports.up = (migration) => {
  const leftRight = migration.createContentType('leftRight')
    .name('Left Right')
    .displayField('title')
    .description('')

  leftRight.createField('title')
    .name('Title')
    .type('Symbol')

  leftRight.createField('text')
    .name('Text')
    .type('RichText')
    .validations([{ nodes: {} }])

  leftRight.createField('orientation')
    .name('Orientation')
    .type('Array')
    .validations([{ size: { min: 1, max: 1 } }])
    .items({ type: 'Symbol', validations: [{ in: ['left', 'right'] }] })

  leftRight.createField('image')
    .name('Image')
    .type('Link')
    .validations([{ linkContentType: ['image'] }])
    .linkType('Entry')

  leftRight.changeFieldControl('title', 'builtin', 'singleLine')
  leftRight.changeFieldControl('text', 'builtin', 'richTextEditor')
  leftRight.changeFieldControl('orientation', 'builtin', 'checkbox')
  leftRight.changeFieldControl('image', 'builtin', 'entryCardEditor', { showLinkEntityAction: true, showCreateEntityAction: true })
}

module.exports.down = migration => migration.deleteContentType('leftRight')
