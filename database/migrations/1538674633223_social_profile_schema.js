'use strict'

const Schema = use('Schema')

class SocialProfileSchema extends Schema {
  up () {
    this.create('social_profiles', (table) => {
      table.increments();
      table.integer('user_id')
      table.integer('social_id', 30).unique();
      table.string('name', 255);
      table.string('email', 255);
      table.string('nickname', 255);
      table.string('avatar', 255);

      table.string('accessToken', 255);
      table.string('refreshToken', 255);
      table.string('apiToken', 255);
      table.integer('expires');
      table.timestamps()
    })
  }

  down () {
    this.drop('social_profiles')
  }
}

module.exports = SocialProfileSchema
