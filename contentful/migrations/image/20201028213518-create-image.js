module.exports.description = 'Create content model for Image'

module.exports.up = (migration) => {
  const image = migration.createContentType('image')
    .name('Image')
    .displayField(null)
    .description('')

  image.createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset')

  image.changeFieldControl('image', 'builtin', 'assetLinkEditor')
}

module.exports.down = migration => migration.deleteContentType('image')
