function gameController($scope,$http) {
    $scope.word = "";
    $scope.solution = "";
    $http.get("/hangman/scripts/php/word.php")
        .success(function (response) {
            $scope.result = response;
            $scope.solution = $scope.result.word;
            setWord();
        });
    function setWord() {
        $scope.word = "";
        for (i = 1; 1 < $scope.solution.length;i++) {
            $scope.word = $scope.word + ".";
        }
    }
}