'use strict'
const Config = use('Config');
const Media = use('App/Models/MediaItem');

const images  = Config.get('local.images');

class MediaItemController {

    async list(){
        return await Media.all();
    }

    async joinMetadata(){
        return await Media.query().innerJoin('metadata_items', 'media_items.metadata_item_id', 'metadata_items.id')
    }

    async add(){
        const mediaItem = new Media();
        mediaItem.title = "Now You See Me 2";
        mediaItem.type_id = 1;
        mediaItem.size = 900000;
        mediaItem.duration = 135;
        mediaItem.resolution = '1080p';
        mediaItem.audio_channels = 6;
        mediaItem.standard = 'Bluray-Rip';
        mediaItem.encoded_by = 'nicolasbryne';
        return await mediaItem.save();
    }

    async render({ view }) {
        const media = await Media.query().where('media_items.id', 1).innerJoin('metadata_items', 'media_items.metadata_item_id', 'metadata_items.id');
        return view.render('drive', { media : media[0], ...images } );
        
    }
}

module.exports = MediaItemController