app.accounts = {
    /*For the user accounts only login setup etc*/
    signUp: function (email, password) {
        /*Creates an account, if no errors*/
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            app.accounts.getUserData();
            app.components.showOnboarding(email);
            Materialize.toast('Created an Account for: ' + email, 4000);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            Materialize.toast(errorMessage, 4000);
        });
    },
    signIn: function (email, password) {
        /*Signs user in, if correct */
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            app.accounts.getUserData();
            app.components.removeOverlay('loading-cover');
            Materialize.toast('Welcome back ' + email, 4000);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            Materialize.toast(errorMessage, 4000);
        });
    },
    logOut: function () {
        /*Signs user out, if correct */
        firebase.auth().signOut().then(function () {
            window.location.reload(true);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            Materialize.toast(errorMessage, 4000);
        });
    },
    getUserData: function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                app.tempData = {};
                app.tempData.user = user;
                $(".OTP-email").text(user.email);

                var dataTours = firebase.database().ref('events/live');
                dataTours.on('value', function (snapshot) {
                    var data = snapshot.val();
                    $("#eventsOutput").empty();
                    Object.keys(data).forEach(key => {
                        console.log(key); // the name of the current key.
                        console.log(data[key]); // the value of the current key.
                        $("#eventsOutput").append("<article><div class=\"col s12 m12 l6\"><div class=\"card hoverable\" id=\"card" + key + "\" onclick=\"document.getElementById('card" + key + "').scrollIntoView({ behavior: 'smooth' });\"><div class=\"card-image\"><img src=\"" + data[key].image + "\"></div><div class=\"card-content\"><span class=\"card-title\">" + data[key].name + "</span><p>" + data[key].desc + "</p></div><div class=\"card-action\"><a href=\"#\" onclick=\"app.components.map.openData(" + data[key].building + ")\">Open Building</a><a href=\"#\" onclick=\"app.components.map.drawPath(" + data[key].location + ")\">Show Location</a></div></div></div></article>");
                    });
                });

            } else {
                window.location.reload(true);
            }
        });
    },
    data: {
        /*For data manipulation*/
        onboardComplete: function () {
            /*For the Onboarding completion */
            var skills = $("#selectCourse").val();
            firebase.database().ref('users/' + app.tempData.user.uid).set({
                userId: app.tempData.user.uid,
                email: app.tempData.user.email,
                skills: skills
            });
            console.log("Ran...");
            app.components.removeOverlay('loading-cover');
        },
        addVotes: function (building, vote) {
            var voteRef = firebase.database().ref('votes/' + building);
            voteRef.transaction(function (post) {
                post = post + vote;
                return post;
            });
        },
        addReaction: function (building, reaction) {
            var reactRef = firebase.database().ref('reaction/' + building + '/' + reaction);
            $("#reactionBar").remove();
            reactRef.transaction(function (post) {
                post = post + 1;
                return post;
            });

            firebase.database().ref('reaction/' + building).once('value').then(function (snapshot) {
                $("#chartHolder").append("<canvas id=\"myChart\"></canvas>");
                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'doughnut',

                    // The data for our dataset
                    data: {
                        labels: ["Happy", "Good", "Not Good", "Bad"],
                        datasets: [{
                            data: [snapshot.val().happy, snapshot.val().good, snapshot.val().notgood, snapshot.val().bad],
                            backgroundColor: ["#2ECC40", "#0074D9", "#FF851B", "#FF4136"]
                    }],

                    },

                    // Configuration options go here
                    options: {}
                });
            });
        }
    }
}
