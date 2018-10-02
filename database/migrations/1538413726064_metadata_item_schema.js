'use strict'

const Schema = use('Schema')

class MetadataItemSchema extends Schema {
  up () {
    this.create('metadata_items', (table) => {
      table.increments()
      table.integer('metadata_type');
      table.string('guid', 255);
      table.string('title', 255);
      table.string('original_title', 255);
      table.string('studio', 255);
      table.float('rating');
      table.string('tagline', 255);
      table.text('summary');
      table.text('trivia');
      table.text('quotes');
      table.string('content_rating', 255);
      table.datetime('originally_available_at');
      table.datetime('available_at');
      table.integer('year');
      table.string('extra_data', 255);
      table.timestamps()
    })
  }

  down () {
    this.drop('metadata_items')
  }
}

module.exports = MetadataItemSchema
