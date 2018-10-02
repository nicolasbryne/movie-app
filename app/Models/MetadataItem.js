'use strict'

const Model = use('Model')

class MetadataItem extends Model {

    mediaItem(){
        return this.hasOne('App/Models/MediaItem','' , 'metadata_item_id');
    }
}

module.exports = MetadataItem
