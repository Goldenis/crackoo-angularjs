angular.module('mockAuthService', [])
  .provider('authService', function() {
    var auth = {
      authResponse : {
        "userID" : "heyrizwan@gmail.com"
      },
      session:
      {
        "userid": "heyrizwan@gmail.com",
        "status" : "connected"
      }
    };
    this.$get = function() {
      return  {
        auth : auth,
        getUser: function() {
          return {email:"heyrizwan@gmail.com"};
        }
      };
    };
    var _self = this;
    //_self.session.userid = "heyrizwan@gmail.com";
    //_self.session.status = "connected";
    //_self.deferred.resolve(session);
    //return _self;
  });
