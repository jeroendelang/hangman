function gameController($scope, $http) {
    $scope.word = "";
    $scope.gameInProgress = false;
    $scope.guess = "";
    $scope.tries = 11;
    $scope.percentage = $scope.tries / 11 * 100;

    function guessLetter() {
        letters = "abncdefghijklmnopqrstuvwxyz";
        $scope.guess = $scope.guess.toLowerCase();
        if (letters.indexOf($scope.guess == -1)) 
        {
            $scope.guess = "";            
        } else {
            if ($scope.solution.indexOf($scope.guess == -1)) {
                $scope.tries--;
            } else {
                /*
                Als de letter wel voorkomt
                */
            }
        }
    }
    function setWord() {
        $scope.word = "";
        
        for (i = 0; i < $scope.solution.length; i++) {
            $scope.word = $scope.word + ".";
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
}