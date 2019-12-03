import 'bootstrap';
const moment = require('moment');
window.$ = require('jquery');
const dt = require('datatables.net');
window.$.DataTable = dt;
import 'datatables.net-bs4';

let time = moment().format();
let page = window.location.pathname;

window.addEventListener('load', () => {

    if (!localStorage.getItem('pagesAndTimes')) {
        localStorage.setItem('pagesAndTimes', JSON.stringify({'page': page.substr(22), 'time': time}));
    } else {
        const timeArr = [];
        let currentStorage = JSON.parse(localStorage.getItem('pagesAndTimes'));
        if (currentStorage.constructor === Array) {
            currentStorage.forEach(item => {
                timeArr.push(item)
            });
        } else {
            timeArr.push(currentStorage);
        }
        time = moment().format();
        page = window.location.pathname;
        timeArr.push({'page': page.substr(22), 'time': time});
        localStorage.setItem('pagesAndTimes', JSON.stringify(timeArr));
    }

    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
    }, {});

    /*
    const serialize = (obj) => {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };
     */

    const closeButtonListeners = () => {
        const closeButtons = document.getElementsByClassName('close-alert');
        const modalClose = document.getElementById('modal-close-btn');
        Array.from(closeButtons).forEach(function (element) {
            element.addEventListener('click', e => {
                element.parentElement.classList.add('d-none');
            });
        });
        modalClose.addEventListener('click', e => {
            $('#confirm-email').modal('hide');
        });
    };

    const checkValidation = () => {
        let valid = true;

        if (document.getElementById('first-name').value.trim() === "") {
            let element = document.getElementById('first-name');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#first-name').tooltip('show');
            valid = false;
        }
        if (document.getElementById('last-name').value.trim() === "") {
            let element = document.getElementById('last-name');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#last-name').tooltip('show');
            valid = false;
        }
        if (document.getElementById('email').value.trim() === "") {
            let element = document.getElementById('email');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#email').tooltip('show');
            valid = false;
        } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value.trim()) === false) {
            let element = document.getElementById('email');
            element.style.backgroundColor = 'mistyrose';
            element.style.border = '1px solid red';
            $('#email').attr('data-original-title', 'Please enter a valid email address.')
                .tooltip('show');
            valid = false;
        }
        return valid;
    };

    const clearTracking = () => {
        const button = document.getElementById('clear-btn');
        const clearDiv = document.getElementById('no-storage');
        const table = document.getElementById('table-wrapper');
        table.classList.add('d-none');
        button.classList.add('d-none');
        clearDiv.classList.remove('d-none');
    }

    if (page === '/CPST_342_Assignments/portfolio.html') {
        $('.carousel').carousel();

        $("#personal-1").click(function () {
            $("#carousel-personal").carousel(0);
        });
        $("#personal-2").click(function () {
            $("#carousel-personal").carousel(1);
        });
        $("#personal-3").click(function () {
            $("#carousel-personal").carousel(2);
        });

        $("#personal-prev").click(function () {
            $("#carousel-personal").carousel("prev");
        });
        $("#personal-next").click(function () {
            $("#carousel-personal").carousel("next");
        });

        $("#school-1").click(function () {
            $("#carousel-school").carousel(0);
        });
        $("#school-2").click(function () {
            $("#carousel-school").carousel(1);
        });
        $("#school-3").click(function () {
            $("#carousel-school").carousel(2);
        });

        $("#school-prev").click(function () {
            $("#carousel-school").carousel("prev");
        });
        $("#school-next").click(function () {
            $("#carousel-school").carousel("next");
        });
    }

    if (page === '/CPST_342_Assignments/contact.html') {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

        const form = document.getElementById('contact-form');
        //const method = form.getAttribute('method');
        //const action = form.getAttribute('action');

        closeButtonListeners();
        /*
        // Used if fetch is an option, which I cannot get to work with FormSubmit.co
        const submitForm = async () => {
            //different formats attempted with fetch
            const formInfo = new FormData(form);
            const formJSON = formToJSON(form.elements);
            const paramJSON = serialize(formJSON);
            console.log('forminfo');
            console.log(...formInfo);
            console.log('formjson');
            console.log(JSON.stringify(formJSON));
            console.log('paramjson');
            console.log(paramJSON);
            return await fetch(action, {
                method,
                mode: 'cors',
                body: formJSON,
            });
        };
        */

        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = formToJSON(form.elements);

            //Using ajax because I can't get FormSubmit to work with fetch
            $.ajax({
                url: 'https://formsubmit.co/ajax/c06fc327d69cbbc9443d13152dea2d5d',
                method: 'POST',
                data: data
            }).done(() => {
                $('#confirm-email').modal('hide');
                document.getElementById('success-alert').classList.remove("d-none");
                form.reset();
            }).fail(() => {
                $('#confirm-email').modal('hide');
                document.getElementById('cancel-alert').classList.remove("d-none");
            });

            /*
            //Original fetch submit, FormSubmit sends a blank email
            submitForm().then((response) => {
                console.log(response.text());
                $('#confirm-email').modal('hide');
                if (response.status == '200') {
                    document.getElementById('success-alert').classList.remove("d-none");
                } else {
                    document.getElementById('cancel-alert').classList.remove("d-none");
                }
            }).catch((err) => {
                alert("Something went wrong, please try again.");
                console.log(err);
                $('#confirm-email').modal('hide');
                document.getElementById('cancel-alert').classList.remove("d-none");
            });
            */
        });

        document.getElementById('cancel-btn').addEventListener('click', e => {
            $('#confirm-email').modal('hide');
            document.getElementById('cancel-alert').classList.remove("d-none");
        });

        document.getElementById('contact-form').addEventListener('keypress', e => {
            if (e.keyCode === 13) {
                e.preventDefault();
                if (checkValidation() === true) {
                    form.submit();
                }
            }
        });

        document.getElementById('send-btn').addEventListener('click', e => {
            if (checkValidation() === true) {
                $('#confirm-email').modal('show');
            }
        });

        document.getElementById('first-name').addEventListener('keyup', e => {
            let element = document.getElementById('first-name');
            element.style.backgroundColor = 'white';
            element.style.border = 'none';
        });

        document.getElementById('last-name').addEventListener('keyup', e => {
            let element = document.getElementById('last-name');
            element.style.backgroundColor = 'white';
            element.style.border = 'none';
        });

        document.getElementById('email').addEventListener('keyup', e => {
            let element = document.getElementById('email');
            element.style.backgroundColor = 'white';
            element.style.border = 'none';
        });
    }

    if (page === '/CPST_342_Assignments/tracking.html') {

        $(document).ready( function () {
            $('#tracking-table').DataTable();
            if (localStorage.getItem('pagesAndTimes')){
                const table = document.getElementById('table-wrapper');
                const button = document.getElementById('clear-btn');
                const clearDiv = document.getElementById('no-storage');
                clearDiv.classList.add('d-none');
                table.classList.remove('d-none');
                table.classList.remove('d-none');
                button.classList.remove('d-none');
            }
        } );

        let tableBody = document.getElementById('time-table');
        let currentStorage = JSON.parse(localStorage.getItem('pagesAndTimes'));
        const storageArr = [];
        if (currentStorage.constructor === Array) {
            currentStorage.forEach(item => {
                storageArr.push(item)
            });
        } else {
            storageArr.push(currentStorage);
        }
        storageArr.map(item => {
            let tr = document.createElement('tr');
            let tdPage = document.createElement('td');
            let tdTime = document.createElement('td');
            tdPage.innerText = item.page;
            tdTime.innerText = item.time;
            tr.appendChild(tdPage);
            tr.appendChild(tdTime);
            tableBody.appendChild(tr);

        });

        document.getElementById('clear-btn').addEventListener('click', e => {
            localStorage.clear();
            clearTracking();
        });
    }

});




