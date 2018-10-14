'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response }, next) {
 
    try{
      await auth.check();

      if(auth.user.role < 3) throw new Error();

      await next();     
      
    }catch(e){
      return response.redirect('/user-login')
    }
  }
}

module.exports = Auth
