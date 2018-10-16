'use strict'

const { validate } = use('Validator')
const Config = use('Config');
const Media = use('App/Models/MediaItem');
const Env = use('Env');
const images  = Config.get('local.images');

const paginator = require('@pelevesque/paginate')

class MediaItemController {

    async index({ request, params, view }) {
        const numLinks = 5 // number of links to be created by paginate
        const perPage = 5
        const url = Env.get('APP_URL') + '/dashboard/media-items?page=';

        const page = Number(request.input('page')) || 1;
        console.log(page)
        const mediaItems = await Media.query().paginate(page, 5);
        const paginate = paginator(numLinks, page, perPage, mediaItems.toJSON().total, url);
        console.log(paginate)
        return view.render('dashboard.media-items', { breadcrumb : 'Manage Links', icon : "link", mediaItems : mediaItems.toJSON(), paginate })
    }

    async create({ view }) {
        return view.render('dashboard.media', { breadcrumb : 'Media', icon : 'video' });
    }

    async store( { request, response } ) {

        // To add validation logic here

        const inputs = request.only(
            ['title', 'type_id', 'episode', 'drive', 'size', 'encoded_by', 'resolution', 'audio_channels', 'format', 'subtitle']
        )

        const validation = await validate(inputs, { title : 'required', size : 'required' });
        if(validation.fails()) { 
            return response.status(403).send({ status : 'fail' })
        }
        
        const media = await Media.create(inputs);
        return ({ status : 'success' });
    }

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
