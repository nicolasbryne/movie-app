'use strict'

const Schema = use('Schema')

class MediaItemSchema extends Schema {
  up () {
    this.create('media_items', (table) => {
      table.increments()
      table.integer('metadata_item_id');
      table.string('media_title', 255),
      table.integer('type_id');
      table.integer('size', 8);
      table.integer('duration');
      table.string('resolution', 255);
      table.string('standard', 255);
      table.string('encoded_by', 255);
      table.integer('audio_channels');
      table.timestamps()
    })
  }

  down () {
    this.drop('media_items')
  }
}

module.exports = MediaItemSchema
