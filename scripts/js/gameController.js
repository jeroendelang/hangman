var app = angular.module("hangmanApp", []);

app.controller("gameController", function ($scope, $http) {
    $scope.word = "";
    $scope.gameInProgress = false;
    $scope.guess = "";
    $scope.guesses = "";
    $scope.tries = 11;
    $scope.percentage = 0;

    $scope.guessLetter = function () {
        // Het teken dat geraden moet worden in kleine letters zetten en eventuele spaties verwijderen
        $scope.guess = $scope.guess.toLowerCase().trim();
        console.log("Letter: " + $scope.guess);

        // Eerste vraag: komt het gevraagde teken voor in het alfabet?
        if ($scope.guess.match(/[a-z]/i)) {
            // Staat blijkbaar in het alfabet, dus toevoegen aan de historie
            $scope.guesses += $scope.guess;
            if ($scope.solution.indexOf($scope.guess) != -1) {
                setWord();
                console.log("komt voor");
            } else {
                // Letter komt niet voor, aantal resterende pogingen verminderen
                $scope.tries--;
                console.log("Komt niet voor, " + $scope.tries + " pogingen over.");
                $scope.percentage = Math.round(100 - ($scope.tries / 11 * 100));
            }
        } else {
            // Geen processing nodig, ongeldig teken gebruikt
            console.log("ongeldig teken, geen aftrek");
        }
        $scope.guess = "";
    }
    function setWord() {
        $scope.word = "";

        for (i = 0; i < $scope.solution.length; i++) {
            if ($scope.guesses.indexOf($scope.solution.charAt(i)) != -1) {
                $scope.word = $scope.word + $scope.solution.charAt(i);                
            } else {
                $scope.word = $scope.word + ".";
            }
        }

    }
    function newGame() {
        console.log("Start a new game");
        $http.get("/hangman/scripts/php/word.php")
            .success(function (data, status, headers, config) {
                console.log("Got a word from the webservice, status: " + status);
                $scope.result = data;
                $scope.solution = data.word;
                setWord();
                $scope.gameInProgress = true;
            })
            .error(function (data, status, headers, config) {
                console.log("Error getting a word from the webservice, status: " + status);
            });
        $scope.progressType = "success";
        $scope.percentage = 0;
    }
    newGame();
});