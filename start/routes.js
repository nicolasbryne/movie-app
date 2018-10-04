'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.on('/').render('welcome');
Route.get('/media-items', 'MediaItemController.list');
Route.get('/media-item', 'MediaItemController.add');
Route.get('/media-item-full', 'MediaItemController.joinMetadata');

Route.get('/media-save', 'MediaItemController.render');

Route.get('/meta-item', 'MetadataItemController.mediaItem')
Route.get('/meta-item-full', 'MetadataItemController.joinMedia');

Route.on('/front').render('save');
Route.on('/user-login').render('loginform');
Route.on('/registration').render('registration');

Route.get('/login/google', 'GloginController.redirect')
Route.get('/authenticated/google', 'GloginController.callback')