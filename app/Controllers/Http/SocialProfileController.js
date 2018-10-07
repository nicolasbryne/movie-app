'use strict'
const socialProfile = use('App/Models/SocialProfile');

class SocialProfileController {
    async user(){
        const social = await socialProfile.find(5);
        //return await social.user().fetch();
        if(social) return social;
        return 'not found'
    }
}

module.exports = SocialProfileController
