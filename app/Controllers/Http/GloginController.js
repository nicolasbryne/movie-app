'use strict'
const User = use('App/Models/User');
const Logger = use("Logger");

class GloginController {
    async redirect ({ ally }) {
        await ally.driver('google').redirect()
      }
    
      async callback ({ request, response, ally, auth }) {
        console.log('callback')
        console.log(request.all());
        try {
          console.log('here')
          const googleUser = await ally.driver('google').getUser();
          console.log('there')
          // user details to be saved
          const userDetails = {
            username: googleUser.getName(),
            password: '111111',
            email: googleUser.getEmail(),
            token: googleUser.getAccessToken(),
            login_source: 'google'
          }
    
          // search for existing user
          const whereClause = {
            email: googleUser.getEmail()
          }
          console.log(googleUser)
          const user = await User.findOrCreate(whereClause, userDetails);
          console.log(user)
          const authUser = await auth.login(user)
    
          return 'Logged in' + authUser
        } catch (error) {
          console.log(error);
          return 'Unable to Login'
        }
      }
}

module.exports = GloginController