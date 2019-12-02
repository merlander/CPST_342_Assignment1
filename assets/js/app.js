window.addEventListener('load', e => {
    const form = document.getElementById('contactForm');
    const time = moment().format();
    console.log(time);
    const page = window.location.pathname;
    console.log(page);

    // Used if fetch is an option, which it is not with FormSubmit.co

    const method = form.getAttribute('method');
    const action = form.getAttribute('action');
    const submitForm = async () => {
        const formInfo = new FormData(form)
        console.log(...formInfo);
        return await fetch(action, {
            method,
            mode: 'cors',
            data: formInfo
        });
    };


    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
    }, {});

    const checkValidation = () => {
        let valid = true;

        if (document.getElementById('firstName').value.trim() == "") {
            let element = document.getElementById('firstName');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#firstName').tooltip('show');
            valid = false;
        }
        if (document.getElementById('lastName').value.trim() == "") {
            let element = document.getElementById('lastName');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#lastName').tooltip('show');
            valid = false;
        }
        if (document.getElementById('email').value.trim() == "") {
            let element = document.getElementById('email');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#email').tooltip('show');
            valid = false;
        } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value.trim()) == false) {
            let element = document.getElementById('email');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#email').attr('data-original-title', 'Please enter a valid email address.')
                .tooltip('show');
            valid = false;
        }
        return valid;
    };

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    alertCloseButtonListeners = (() => {
        const closeButtons = document.getElementsByClassName('closeAlert');
        Array.from(closeButtons).forEach(function (element) {
            element.addEventListener('click', e => {
                element.parentElement.classList.add('d-none');
            });
        });
    })();

    if (page == '/CPST_342_Assignment1/portfolio.html') {
        $('.carousel').carousel()
    }

    if (page == '/CPST_342_Assignment1/contact.html') {
        form.addEventListener('submit', e => {
            e.preventDefault();
            //unused fetch FormData
            //const formInfo = new FormData(form)
            const data = formToJSON(form.elements);
            //Using ajax only because FormSubmit doesn't work with fetch and the options that do all cost money
            /*
            $.ajax({
                url: 'https://formsubmit.co/ajax/c06fc327d69cbbc9443d13152dea2d5d',
                method: 'POST',
                data: data
            }).done(() => {
                $('#confirm-email').modal('hide');
                document.getElementById('successAlert').classList.remove("d-none");
                form.reset();
            }).fail(() => {
                $('#confirm-email').modal('hide');
                document.getElementById('cancelAlert').classList.remove("d-none");
            });
            // Original fetch submit, FormSubmit sends a blank email
            */
            submitForm().then((response) => {
                console.log(response.text());
                $('#confirm-email').modal('hide');
                if (response.status == '200') {
                    document.getElementById('successAlert').classList.remove("d-none");
                } else {
                    document.getElementById('cancelAlert').classList.remove("d-none");
                }
            }).catch((err) => {
                alert("Something went wrong, please try again.");
                console.log(err);
                $('#confirm-email').modal('hide');
                document.getElementById('cancelAlert').classList.remove("d-none");
            });

        });

        document.getElementById('cancelbtn').addEventListener('click', e => {
            $('#confirm-email').modal('hide');
            document.getElementById('cancelAlert').classList.remove("d-none");
        });

        document.getElementById('contactForm').addEventListener('keypress', e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                if (checkValidation() == true) {
                    form.submit();
                }
            }
        });

        document.getElementById('sendbtn').addEventListener('click', e => {
            if (checkValidation() == true) {
                $('#confirm-email').modal('show');
            }
        });

        document.getElementById('firstName').addEventListener('keyup', e => {
            let element = document.getElementById('firstName');
            element.style.backgroundColor = 'white';
            element.style.border = 'none';
        });

        document.getElementById('lastName').addEventListener('keyup', e => {
            let element = document.getElementById('lastName');
            element.style.backgroundColor = 'white';
            element.style.border = 'none';
        });

        document.getElementById('email').addEventListener('keyup', e => {
            let element = document.getElementById('email');
            element.style.backgroundColor = 'white';
            element.style.border = 'none';
        });
    }

});




