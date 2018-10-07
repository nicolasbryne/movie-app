'use strict'

class AuthController {

    async login( { request, auth, session, response }) {
        const { email, password } = request.all();
        try{
            await auth.attempt(email, password);
            return response.route('home');
        }catch(e){
            session.withErrors({ login_error : 'Invalid username or password' }).flashAll();
            return response.redirect('back');
        }
    }
}

module.exports = AuthController
