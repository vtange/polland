console.log("	CONFIG/AUTH.JS")
// config/auth.js
module.exports = {
	
    'facebookAuth' : {
        'clientID'      : '', // your App ID
        'clientSecret'  : '', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'	//this goes in Facebook's "App URL" textbox
    },

    'twitterAuth' : {
        'consumerKey'       : '',
        'consumerSecret'    : '',
        'callbackURL'       : ' https://polland.herokuapp.com/auth/twitter/callback '
    },

    'googleAuth' : {
        'clientID'      : '.apps.googleusercontent.com',
        'clientSecret'  : '',
        'callbackURL'   : 'https://polland.herokuapp.com/auth/google/callback'
    }
	
};
