'use strict'
const User = use('App/Models/User');
const Mail = use('Mail');
const { validate } = use('Validator')

class UserController {

    async create({ request, session, response }){

        const input = request.all();
        const rules = {
            username : 'required',
            password: 'required|confirmed',
            email: 'required|email|unique:users,email',
        }
        const validation = await validate(input, rules);
        if (validation.fails()) {
            session
              .withErrors(validation.messages())
              .flashExcept(['password'])
      
            return response.redirect('back')
        }
        const user = new User();
        user.username = input.username;
        user.email = input.email;
        user.password = input.password;
        user.name = input.name;
        await user.save();
        return response.route('home');
    }

    async profile(){
        const user = await User.find(1);
        console.log(user.toJSON())
        return await user.profile().findOrCreate({email : 'test'});
    }

    async logout({auth}){
        await auth.logout();
        return 'Logged Out';
    }

    async email(){
        await Mail.send('emails.verify', 'test', (message) => {
            message
              .to('nilarblueruby@gmail.com')
              .from('testuser@nicolasbryne.com')
              .subject('Welcome to yardstick')
          })
      
          return 'Registered successfully'
    }
    
}

module.exports = UserController
