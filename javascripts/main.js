document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login_form");
    const fields = form.querySelectorAll("input");
    const login_button = document.getElementById("login_button");

    //Validate all fields
    function validateFields(){
        let allFillFields = true;

        fields.forEach(field => {
            if (field.value.length<6) allFillFields = false;
        });

        login_button.disabled = !allFillFields;
    }

    fields.forEach(field => {
        field.addEventListener("input", validateFields);
    });

    function changeMode(bool){
        if (bool) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            document.getElementById("title").src = "images/original_instagram_title_dark.png";
            document.getElementById("meta").src = "images/meta_icon_dark.png";
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            document.getElementById("title").src = "images/original_instagram_title_light.png";
            document.getElementById("meta").src = "images/meta_icon_light.png";
        }
    }

    function detectColorScheme(){
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        changeMode(isDarkMode);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e)=>{
        changeMode(e.matches);
    });

    detectColorScheme();

});

function redirectToFacebook() {
    window.location.href = "https://m.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Foidc%2F%3Fapp_id%3D124024574287414%26redirect_uri%3Dhttps%>"
}