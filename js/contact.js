const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();


            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;
            }


            window.location.href =
                "contact-success.html";

        }
    );

}