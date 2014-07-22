var stackingStrength = angular.module('stackingStrength', ['ngRoute']);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.exercises = {};
    $scope.selectExerciseVisible = true;
    $scope.historyVisible = true;
    $scope.routineButtonsVisible = false;
    $scope.exercisesVisible = false;
    $scope.setsVisible = false;
    $scope.setsButtonsVisible = false;
    $scope.active = true;
    $scope.sets = [];

    $scope.showExercises = function() {
        $scope.exercisesActive = true;
        $scope.exercisesVisible = true;
        $scope.historyActive = false;
        $scope.setsVisible = false;
        $scope.historyVisible = false;
    }

    $scope.showHistory = function() {
        $scope.exercisesActive = false;
        $scope.exercisesVisible = false;
        $scope.historyActive = true;
        $scope.setsVisible = false;
        $scope.historyVisible = true;
    }

	// when landing on the page, get all todos and show them
	$scope.initialize = function() {
		$http.get('/api/lifts')
			.success(function(data) {
				$scope.lifts = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
            console.log($scope.lifts)
	};

	// when submitting the add form, send the exercises to the node API
	$scope.saveExercise = function() {
        var d = new Date();
        $scope.exercises.date = d;
        $scope.exercises.success = true;
		$http.post('/api/lifts', $scope.exercises)
			.success(function(data) {
        $scope.lifts = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
        $scope.showHistory();
        // $scope.setsVisible = false;
        // $scope.exercisesVisible = true;
	};

	// delete a lift after checking it
	$scope.deleteExercise = function(id) {
		$http.delete('/api/lifts/' + id)
			.success(function(data) {
				$scope.lifts = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

    $scope.addExercise = function(l) {
        var w = parseInt(window.prompt("Enter weight in pounds."))
        if (isNaN(w))
            window.alert("Not a valid weight.")
        else {
            $scope.exercises.lifts = l;
            $scope.exercises.weight = w;
        }
    console.log($scope.exercises);
    };

    $scope.selectExercise = function(l) {
        var w = parseInt(window.prompt("Enter weight in pounds."))
        if (isNaN(w))
            window.alert("Not a valid weight.")
        else {
            $scope.exercises.exercise = l;
            $scope.exercises.weight = w;
            $scope.startRoutine();
        }
    };

    $scope.startRoutine = function() {
        $scope.sets = []
        if ($scope.exercises.exercise === "Deadlift") {
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight*.4), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight*.4), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 3, weight: ($scope.exercises.weight*.6), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 2, weight: ($scope.exercises.weight*.85), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight), state: 'btn-default'});
        } else {
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: 45, state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: 45, state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight*.4), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 3, weight: ($scope.exercises.weight*.6), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 2, weight: ($scope.exercises.weight*.8), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight), state: 'btn-default'});
            $scope.sets.push({exercise: $scope.exercises.exercise, reps: 5, weight: ($scope.exercises.weight), state: 'btn-default'});
        }
        $scope.setsVisible = true;
        $scope.setsButtonsVisible = true;
        $scope.routineVisible = false;
        $scope.routineButtonsVisible = false;
        $scope.exercisesVisible = false;
        console.log($scope.sets);
    }

    $scope.toggleActive = function (indx) {
        if ($scope.sets[indx].state === "btn-default")
            $scope.sets[indx].state = "btn-success";
        else if ($scope.sets[indx].state === "btn-success")
             $scope.sets[indx].state = "btn-default";
        else
            $scope.sets[indx].state = "btn-success";
        console.log($scope.sets[indx].state)
    }

}