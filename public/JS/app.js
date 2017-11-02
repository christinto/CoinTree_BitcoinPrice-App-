//sets up new angular app
//production code :D
//Different controllers can belong to this single module
angular.module('PriceApp',[]);

var app = angular.module('PriceApp', []);

app.controller('priceCtrl', function($scope, $http, $interval) {
  this.loadNotifications = function(){
    $http.get("/getLatestPrice")
    .then(function(response) {
        //var result = response.data;
        //var currentPrice = response.data.currentPrices.spotPrice;
        //var lastPrice = result.lastPrices.spotPrice;
        if (response.data !== '') {
          var currentPrice = response.data.currentPrices.spotPrice;
          var lastPrice = response.data.lastPrices.spotPrice;
          var percentagechangeCalc = (currentPrice - lastPrice) / lastPrice * 100;
          $scope.percentagechange = percentagechangeCalc;
          $scope.currentprice = response.data.currentPrices.spotPrice;
          $scope.lastprice = response.data.lastPrices.spotPrice;
        }
        else {
          $scope.percentagechange = 'Data unavailable';
          $scope.currentprice = 'Data unavailable';
          $scope.lastprice = 'Data unavailable';
        }
     });
    };
    //Puts in interval, first trigger after 30 seconds
    var theInterval = $interval(function(){
      this.loadNotifications();
   }.bind(this), 30000);

    $scope.$on('$destroy', function () {
        $interval.cancel(theInterval)
    });

this.loadPriceChangeSinceLastStartup = function(){
    $http.get("/getLatestPrice")
    .then(function(response) {
      if (response.data !== '') {
        var currentPrice = response.data.currentPrices.spotPrice;
        var lastPrice = response.data.lastPrices.spotPrice;
        var percentagechangeCalc = (currentPrice - lastPrice) / lastPrice * 100;
        var percentchangeStartCalc = (currentPrice - lastPrice) / lastPrice * 100;
        $scope.percentagechange = percentagechangeCalc;
        $scope.percentagechangestart = percentchangeStartCalc;
        $scope.currentprice = response.data.currentPrices.spotPrice;
        $scope.lastprice = response.data.lastPrices.spotPrice;
      }
      else {
        $scope.percentagechangestart = 'Data unavailable';
        $scope.percentagechange = 'Data unavailable';
        $scope.currentprice = 'Data unavailable';
        $scope.lastprice = 'Data unavailable';
      }
   });
 };
 //invoke initially
 this.loadPriceChangeSinceLastStartup();

});


















