'use strict'

const Model = use('Model')

class SocialProfile extends Model {
    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = SocialProfile
