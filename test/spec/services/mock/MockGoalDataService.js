angular.module('mockGoalDataService', [])
  .provider('GoalDataService', function() {
    var studyItems = [{"goalName":null,"goalID":null,"caption":"Algebra 1","description":"What is the Squre root of 400","studyItemType":"P","studyItemID":"1432630965832","summary":"Take the square roots of your perfect square factors. The product property of square roots states that for any given numbers a and b, Sqrt(a × b) = Sqrt(a) × Sqrt(b).[2] Because of this property, we can now take the square roots of our perfect square factors and multiply them together to get our answerIn our example, we would take the square roots of 25 and 16. See below:Sqrt(25 × 16)Sqrt(25) × Sqrt(16)5 × 4 = 20","examples":[],"difficulty":"E"},{"goalName":null,"goalID":null,"caption":"Pythagoras Theorem","description":"What is Pythagoras theorem","studyItemType":"P","studyItemID":"1432630966001","summary":null,"examples":[],"difficulty":"D"},{"goalName":null,"goalID":null,"caption":"Arithmetic","description":"What is 25*25","studyItemType":"P","studyItemID":"1432630966142","summary":null,"examples":[],"difficulty":"D"}];
    this.$get = function($q) {
      return  {
        getStudyItems: function() {
          var deferred = $q.defer();
          deferred.resolve(studyItems);
          return deferred.promise;        }
      };
    };
  });
