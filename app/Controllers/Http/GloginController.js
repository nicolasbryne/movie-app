'use strict'

const User = use('App/Models/User');
const Social = use('App/Models/SocialProfile');

class GloginController {

    async redirect ({ ally, auth }) {
      return auth.user ? 'Already Logged In' : await ally.driver('google').redirect();
    }
    
    async callback ({ request, response, ally, auth }) {

      try {
        
        const googleUser = await ally.driver('google').getUser();        
  
        // search for existing user
        const whereClause = {
          social_id: googleUser.getId()
        }

        const socialProfile = await Social.findBy(whereClause);

        if(!socialProfile){
          //social profile to be saved
          const socialDetails = {
            social_id : googleUser.getId(),
            name : googleUser.getName(),
            email : googleUser.getEmail(),
            nickname : googleUser.getNickname(),
            avatar : googleUser.getAvatar(),
            accessToken : googleUser.getAccessToken(),
            refreshToken : googleUser.getRefreshToken(),
            expires : googleUser.getExpires()
          }

          const socialUser = await Social.create(socialDetails);

          // user details to be saved
          const userDetails = {
            email: googleUser.getEmail() + '.mm',
            name : googleUser.getName(),
            login_source: 'google'
          }

          const user = await User.findOrCreate({ email: googleUser.getEmail()+  '.mm' }, userDetails );

          // associate social profile to created user account
          await socialUser.user().associate(user);

          await auth.login(user);
          return 'Created && logged in';
          
        }else{
          //check if already logged in or login user
          return auth.user ? 'Already Logged In' : await auth.login(await socialProfile.user().fetch());
        }
      } catch (error) {
        console.log(error);
        return 'Unable to Login'
      }
    }
}

module.exports = GloginController
