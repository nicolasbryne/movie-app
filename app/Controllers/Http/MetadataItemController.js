'use strict'

const MetaItem = use('App/Models/MetadataItem');

class MetadataItemController {

    async mediaItem() {
        const meta = await MetaItem.find(1);
        //return await meta.mediaItem().fetch();
        return meta;
    }

    async joinMedia(){
        return await MetaItem.query().where('metadata_type', 1).innerJoin('media_items', 'metadata_items.id', 'media_items.metadata_item_id')
    }
}



module.exports = MetadataItemController
