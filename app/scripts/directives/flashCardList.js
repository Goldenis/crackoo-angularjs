'use strict';
angular.module('crackooApp').directive('flashCardList', [function () {
    return {
      templateUrl: 'views/flashcard/flashcardList.html',
      restrict: 'A',
      scope: true,
      link: function postLink(scope) {
        scope.cards = [
          {
            id: '1',
            data: {
              title: 'Google',
              front: 'google',
              back: 'best search engine'
            }
          },
          {
            id: '2',
            data: {
              title: 'Quora',
              front: 'quora',
              back: 'question or answer website'
            }
          }
        ];
        scope.selectedCard = {
          id: null,
          data: {
            title: null,
            front: null,
            back: null
          }
        };
        scope.showCard = function (val) {
          var num = 1;
          for (var i = 0; i < scope.cards.length; i += 1) {
            if (scope.cards[i].id === val.id) {
              scope.fcNumber = num;
              console.log(scope.cards[i]);
              scope.selectedCard = scope.cards[i];
              if (i > 0) {
                scope.prevCard = scope.cards[i - 1];
              }
              if (i + 1 < scope.cards.length) {
                scope.nextCard = scope.cards[i + 1];
              }
              if (i === 0) {
                scope.prevCard = 'start';
              }
              if (i === scope.cards.length - 1) {
                scope.nextCard = 'end';
              }
              break;
            }
            num += 1;
          }
        };
        scope.showCard(scope.cards[0]);
        //scope.isFrontVisible = true;
        scope.tempCard = {
          id: null,
          data: {
            title: null,
            front: null,
            back: null
          }
        };
        scope.save = function () {
          var card = scope.tempCard;
          scope.isAddVisible = false;
          scope.isListVisible = true;
          console.log(card);
          scope.cards.unshift(card);
          scope.tempCard = null;
          scope.tempCard = {
            id: null,
            data: {
              title: null,
              front: null,
              back: null
            }
          };
          console.log(card);
        };
        scope.cancel = function () {
          scope.isAddVisible = false;
        };
        scope.flip = function () {
          scope.isFrontVisible = scope.isFrontVisible ? false : true;
        };
        scope.delete = function (id) {
          for (var i = 0; i < scope.cards.length; i += 1) {
            if (scope.cards[i].id === id) {
              scope.cards.splice(i, 1);
            }
          }
        };
        scope.isListVisible = false;
        scope.idAddVisible = false;
        scope.toggleAdd = function () {
          scope.isAddVisible = scope.isAddVisible ? false : true;  //scope.isFrontVisible=true;
        };
        scope.toggleList = function () {
          scope.isListVisible = scope.isListVisible ? false : true;
        };
        scope.toggleList();
      }
    };
  }]);  /*

original source code
'use strict';

angular.module('crackooApp')
    .directive('flashCardList', [function () {
        return {
            templateUrl: 'views/flashcard/flashcardList.html',
            restrict: 'A',
            scope : true,
            link: function postLink(scope, element, attrs) {
                scope.cards = [{id: '1', data:{title: 'Google', front: 'google', back : 'best search engine'}}, {id: '2', data:{title: 'Quora', front:'quora', back: 'question or answer website'}}];
                scope.selectedCard = {id: null, data:{title: null, front: null, back:null}};

                scope.showCard = function (val) {
                    var num = 1;
                    for(var i=0; i < scope.cards.length; i++){
                        if(scope.cards[i].id == val.id) {
                            scope.fcNumber = num;
                            console.log(scope.cards[i]);
                            scope.selectedCard = scope.cards[i];
                            if(i > 0) scope.prevCard = scope.cards[i-1];
                            if(i+1 < scope.cards.length) scope.nextCard = scope.cards[i+1];
                            if(i===0) scope.prevCard = "start";
                            if(i===scope.cards.length-1) scope.nextCard = "end";
                            break;
                        }
                        num++;
                    }
                }

                scope.showCard(scope.cards[0]);


                //scope.isFrontVisible = true;
                scope.tempCard = {id: null, data:{title: null, front: null, back:null}};

                scope.save = function() {
                    var card = scope.tempCard;
                    scope.isAddVisible = false;
                    scope.isListVisible = true;
                    console.log(card);
                    scope.cards.unshift(card);
                    scope.tempCard = null;
                    scope.tempCard = {id: null, data:{title: null, front: null, back:null}};
                    console.log(card);
                };

                scope.cancel = function() {
                    scope.isAddVisible = false;
                };

                scope.flip = function() {
                    scope.isFrontVisible = (scope.isFrontVisible) ? false : true;
                };

                scope.delete = function(id) {
                    for (var i = 0; i < scope.cards.length; i++) {
                        if(scope.cards[i].id===id) {
                            scope.cards.splice(i, 1);
                        }
                    }
                };
                scope.isListVisible = false;
                scope.idAddVisible = false;
                scope.toggleAdd = function () {
                    scope.isAddVisible = (scope.isAddVisible) ? false : true;
                    //scope.isFrontVisible=true;
                };
                scope.toggleList = function() {
                    scope.isListVisible = (scope.isListVisible) ? false : true;
                };
                scope.toggleList()
            }
        };
    }]);

*/
        /*

//original code.
'use strict';

angular.module('crackooApp')
  .directive('flashCardList', [function () {
    return {
      templateUrl: 'views/flashcard/flashcardList.html',
      restrict: 'A',
      scope : true,
      link: function postLink(scope, element, attrs) {
        scope.cards = [{id: '1', data:{title: 'Google', front: 'google', back : 'best search engine'}}, {id: '2', data:{title: 'Quora', front:'quora', back: 'question or answer website'}}];

        scope.isFrontVisible = true;
        scope.tempCard = {id: null, data:{title: null, front: null, back:null}};

        scope.save = function() {
          var card = scope.tempCard;
          scope.isAddVisible = false;
          scope.isListVisible = true;
          console.log(card);
          scope.cards.unshift(card);
          scope.tempCard = null;
          scope.tempCard = {id: null, data:{title: null, front: null, back:null}};
          console.log(card);
        };

        scope.cancel = function() {
          scope.isAddVisible = false;
        };

        scope.flip = function() {
          scope.isFrontVisible = (scope.isFrontVisible) ? false : true;
        };

        scope.delete = function(id) {
          for (var i = 0; i < scope.cards.length; i++) {
            if(scope.cards[i].id===id) {
              scope.cards.splice(i, 1);
            }
          }
        };
        scope.isListVisible = false;
        scope.idAddVisible = false;
        scope.toggleAdd = function () {
          scope.isAddVisible = (scope.isAddVisible) ? false : true;
          scope.isFrontVisible=true;
        };
        scope.toggleList = function() {
          scope.isListVisible = (scope.isListVisible) ? false : true;
        };
      }
    };
  }]);

*/
