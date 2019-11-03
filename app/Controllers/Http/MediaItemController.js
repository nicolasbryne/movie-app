'use strict'

const { validate } = use('Validator')
const Config = use('Config');
const Media = use('App/Models/MediaItem');
const Tmdb = use('App/Models/MetadataItem');
const TmdbMovie = use('App/Models/Api/Movie');
const TmdbTvshow = use('App/Models/Api/Tvshow');
const Env = use('Env');
const images  = Config.get('local.images');

const paginator = require('@pelevesque/paginate')

class MediaItemController {

    async index({ request, params, view }) {

        //return await Movie.fetch(291805);

        const numLinks = 5 // number of links to be created by paginate
        const perPage = 20
        const url = `${Env.get('APP_URL')}/dashboard/media-items?page=`;
        const page = Number(request.input('page')) || 1;
        const mediaItems = await Media.query().paginate(page, perPage);
        const paginate = paginator(numLinks, page, perPage, mediaItems.toJSON().total, url);
        return view.render('dashboard.media-items', { 
            breadcrumb : 'Manage Links', 
            icon : "link", 
            mediaItems : mediaItems.toJSON(), 
            paginate 
        });
    }

    async create({ view }) {
        return view.render('dashboard.add-media', { breadcrumb : 'Media', icon : 'video' });
    }

    async store( { request, response } ) {

        const inputs = request.only(
            ['title', 'type_id', 'tmdb_id', 'episode', 'drive', 'size', 'encoded_by', 'resolution', 'audio_channels', 'format', 'subtitle']
        )

        // To add validation logic here
        const rules = {
            title : 'required',
            tmdb_id : 'required', 
            size : 'required'
        }

        const validation = await validate(inputs, rules);
        if(validation.fails()) { 
            return response.status(403).send({ status : 'fail' })
        }
        const tmdb_id = inputs.tmdb_id;
        delete inputs.tmdb_id;
        try{
        const tmdbData = Number(inputs.type_id) === 1 ? await TmdbMovie.fetch(tmdb_id) : await TmdbTvshow.fetch(tmdb_id);
        console.log(tmdbData)
        const tmdb = {};
        tmdb.title = tmdbData.title || tmdbData.name;
        tmdb.original_title = tmdbData.original_title || tmdbData.original_name;
        tmdb.metadata_type = inputs.type_id;
        tmdb.tmdb_id = tmdbData.id;
        tmdb.summary = tmdbData.overview;
        tmdb.tagline = tmdbData.tagline;
        tmdb.rating = tmdbData.vote_average;
        tmdb.runtime = tmdbData.runtime;
        tmdb.year = new Date(tmdbData.release_date).getFullYear();
        tmdb.available_at = tmdbData.release_date || tmdbData.first_air_date;
        tmdb.poster_path = tmdbData.poster_path;
        tmdb.backdrop_path = tmdbData.backdrop_path;

        const tmdbRes = await Tmdb.findOrCreate({tmdb_id : tmdbData.id, metadata_type : inputs.type_id }, tmdb);

        const media = await Media.create(inputs);
        await media.tmdb().associate(tmdbRes);

        return ({ status : 'success' });
        }catch(e){
            console.log(e);
            return response.status(404).send({ status : 'error' });
        }
    }

    async edit( { params, view }){
        const id = Number(params.id);
        const media = await Media.find(id);
        const tmdb = await media.tmdb().fetch();
        console.log(tmdb.toJSON())
        return view.render('dashboard.media-edit', { media : media.toJSON(), tmdb : tmdb.toJSON(), breadcrumb : 'Media', icon : 'video' });
    }


    async update( { request, params, response } ) {

        const inputs = request.all();

        const mediaInputs = {
            title : inputs.title || null,
            episode : inputs.episode || null,
            drive : inputs.drive || null,
            size : inputs.size || null,
            encoded_by : inputs.encoded_by || null,
            resolution : inputs.resolution || null,
            audio_channels : inputs.audio_channels || null,
            subtitle : inputs.subtitle || null
        }

        const tmpYear = inputs.available_at ? new Date(inputs.avaliable_at).getFullYear() : null;
        const tmdbInputs = { 
            title : inputs.title, 
            original_title : inputs.original_title || null, 
            tmdb_id : inputs.tmdb_id || null, 
            rating : inputs.rating || null, 
            casts : inputs.casts || null, 
            tagline : inputs.tagline || null, 
            studio : inputs.studio || null, 
            year : tmpYear,
            available_at : inputs.avaliable_at || null, 
            content_rating : inputs.content_rating || null, 
            summary : inputs.summary || null
        }
        // To add validation logic here
        const rules = {
            title : 'required',
            tmdb_id : 'required', 
            size : 'required'
        }

        const validation = await validate(inputs, rules);
        if(validation.fails()) { 
            return response.status(403).send({ status : 'fail' })
        }
        const tmdb_id = inputs.tmdb_id;
        delete inputs.tmdb_id;
        try{
            await Media.query().where({ id : params.id}).update(mediaInputs);
            await Tmdb.query().where({tmdb_id , metadata_type : inputs.type_id}).update(tmdbInputs);

            return ({ status : 'success' });

        }catch(e){
            console.log(e)
            return response.status(500).send({ status : 'fail' });
        }
    }

    async destroy( { params }){
        const { id } = params;
        const media = await Media.find(id);
        await media.delete();
        return ({ status : 'deleted' });
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

    async render({ view, params }) {
        const media_id = params.id;
        const result = await Media.query()
            .where('media_items.id', media_id)
            .innerJoin('metadata_items', 'media_items.metadata_item_id', 'metadata_items.id')
            .first();
        
        //return results;

        return view.render('media', { result, ...images } );
        
    }
}

module.exports = MediaItemController
