////////////////////////////////
// helper functions
////////////////////////////////
function addInputChecks(form_input, card_element, field){
    const field_types = {
        "name": {
            "default": "Jane Appleseed"
        },
        "number": {
            "default": "0000 0000 0000 0000"
        },
        "month": {
            "default": "00"
        },
        "year": {
            "default": "00"
        },
        "cvc": {
            "default": "000"
        }
    }
    form_input.addEventListener('keyup', (e)=>{
        if (field!=="month" && field!=="year"){
            if (e.target.value === ""){
                card_element.innerText = field_types[field].default;
                e.target.classList.add("invalid");
                e.target.nextElementSibling.style.display = "block";
            } else {
                card_element.innerText = e.target.value;
                e.target.classList.remove("invalid");
                e.target.nextElementSibling.style.display = "none";
            }
        } else {
            let sibling;
            if (e.target.parentNode.nextElementSibling){
                sibling = e.target.parentNode.nextElementSibling.firstElementChild;
            } else {
                sibling = e.target.parentNode.previousElementSibling.firstElementChild;
            }
            console.log(sibling);
            if (e.target.value === ""){
                card_element.innerText = "00";
                e.target.classList.add("invalid");
                e.target.parentNode.parentNode.parentNode.lastElementChild.style.display="block";
            } else {
                card_element.innerText = e.target.value;
                e.target.classList.remove("invalid");
                e.target.parentNode.parentNode.parentNode.lastElementChild.style.display="none";
            }
            if (sibling.value === "" && sibling.classList.contains('invalid')) {
                e.target.parentNode.parentNode.parentNode.lastElementChild.style.display="block";
            }
        }
    })
}


// add cardholder name validation
const form_cardholder_name = document.querySelector("#cardholder_name");
const card_cardholder_name = document.querySelector(".card-name");
addInputChecks(form_cardholder_name, card_cardholder_name, "name");


// add card number validation
const form_card_number = document.querySelector("#card_number");
const card_card_number = document.querySelector(".card-number");
addInputChecks(form_card_number, card_card_number, "number");

// add card expiry validation
const form_expiry_month = document.querySelector("#expiry_month");
const form_expiry_year = document.querySelector("#expiry_year");
const card_expiry_month = document.querySelector(".card-expiry .month");
const card_expiry_year = document.querySelector(".card-expiry .year");
addInputChecks(form_expiry_month, card_expiry_month, "month");
addInputChecks(form_expiry_year, card_expiry_year, "year");

// add card cvc validation
const form_cvc = document.querySelector("#cvc");
const card_cvc = document.querySelector(".cvc-number");
addInputChecks(form_cvc, card_cvc, "cvc");

