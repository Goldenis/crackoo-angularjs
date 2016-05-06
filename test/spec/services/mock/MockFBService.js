angular.module('mockFBService', [])
  .provider('Facebook', function() {
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
    this.$get = function($q) {
      return  {
        //auth : auth,

        getLoginStatus: function() {
          return "connected";
        },

        getUserProfilePicture: function() {
          var deferred = $q.defer();
          deferred.resolve('test image');
          return deferred.promise;        }
      };
    };
    var _self = this;
    //_self.session.userid = "heyrizwan@gmail.com";
    //_self.session.status = "connected";
    //_self.deferred.resolve(session);
    //return _self;
  });
