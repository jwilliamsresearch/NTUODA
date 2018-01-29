var app = {}

app.components = {
    /* Components is only for document components, all data interaction and database edition shouldn't happen in here. */
    showLogin: function () {
        /* Will take the user to login screen, and append and animate the document. */
        $("#loading-cover").append("<div class=\"container\"><div class=\"row\" style=\"z-index: 5\"><div class=\"col s12 m12 animated zoomIn  center-align\"><img style=\"width: 30px;display: inline-block;\" src=\"img/icon.png\" alt=\"NTUODA Logo\"><h3 class=\"white-text\" style=\"display: inline-block;\">NTU Open Day Assistant</h3><div id=\"logContent\" class=\"card-panel white\"><span><div class=\"row\"><h6>Create an Account or Log In...</h6><div class=\"input-field col s12 m6\"><input id=\"email\" type=\"email\" class=\"validate\"><label for=\"email\" data-error=\"Please use a Correct Email Format.\" data-success=\"Email is Correct Format.\">Email</label></div><div class=\"input-field col s12 m6\"><input id=\"password\" type=\"password\" class=\"validate\"><label for=\"password\">Password</label></div></div><button class=\"btn waves-effect pink waves-light\" type=\"submit\" name=\"action\" onclick=\"app.accounts.signIn($('#email').val(), $('#password').val())\">Login<i class=\"material-icons right\">person</i></button><button class=\"btn pink waves-effect waves-light\" type=\"submit\" name=\"action\" onclick=\"app.accounts.signUp($('#email').val(), $('#password').val())\">Create Account<i class=\"material-icons right\">person_add</i></button></span></div><p class=\"white-text\">A group project by Ji</p></div></div></div>");
        $(".hide-login").remove();
    },
    showOnboarding: function () {
        $("#logContent").empty();
        $("#logContent").append("<p>We're going to suggest you a course, select some relevant courses: </p> <span><input type=\"checkbox\" id=\"chckDb\" /><label for=\"chckDb\">Databases</label><br></span><span><input type=\"checkbox\" id=\"chckInWork\" /><label for=\"chckInWork\">IT In Work</label><br></span><span><input type=\"checkbox\" id=\"chckDataMan\" /><label for=\"chckDataMan\">Data Manipulation</label><br></span><span><input type=\"checkbox\" id=\"chckMedia\" /><label for=\"chckMedia\">Media</label><br></span><span><input type=\"checkbox\" id=\"chckMobileDev\" /><label for=\"chckMobileDev\">Mobile Development</label><br></span><span><input type=\"checkbox\" id=\"chckNetwork\" /><label for=\"chckNetwork\">Networking</label><br></span><span><input type=\"checkbox\" id=\"chckHardware\" /><label for=\"chckHardware\">Computer Hardware</label><br></span><span><input type=\"checkbox\" id=\"chckWebDesign\" /><label for=\"chckWebDesign\">Web Design</label><br></span><span><input type=\"checkbox\" id=\"chckWebDev\" /><label for=\"chckWebDev\">Web Development</label></span> <br><br> <button class=\"btn pink waves-effect waves-light\" type=\"submit\" name=\"action\" onclick=\"app.accounts.data.onboardComplete()\">Complete Account<i class=\"material-icons right\">star</i></button>");
    },
    removeOverlay: function (name) {
        /*Removes the overlay*/
        $("#" + name).fadeOut(500);
        $(".button-collapse").sideNav();
    }
}