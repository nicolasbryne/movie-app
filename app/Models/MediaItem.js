'use strict'

const Model = use('Model')

class MediaItem extends Model {

    tmdb() {
        return this.belongsTo('App/Models/MetadataItem');
    }
}

module.exports = MediaItem
