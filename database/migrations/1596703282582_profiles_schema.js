'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.create('profiles', (collection) => {
      collection.index('title_index', {
        title: 1
      })
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfilesSchema
