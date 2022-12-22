////////////////////////////////
// helper functions
////////////////////////////////

function isExpiryDateField(field){
    return field === "month" || field === "year";
}
function addInputChecks(form_input, card_element, field) {
    const field_types = {
        "name": {
            "default": "Jane Appleseed",
            "regex": /^[a-z ,.'-]+$/i,
            "regex_hint": "Alpha characters only"
        },
        "number": {
            "default": "0000 0000 0000 0000",
            "regex": /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
            "regex_hint": "Numbers and spaces only"
        },
        "month": {
            "default": "00",
            "regex": /^[0-9]{2}$/,
            "regex_hint": "2 numbers"
        },
        "year": {
            "default": "00",
            "regex": /^[0-9]{2}$/,
            "regex_hint": "Use 2 numbers"
        },
        "cvc": {
            "default": "000",
            "regex": /^[0-9]{3}$/,
            "regex_hint": "3 numbers only"
        }
    }
    form_input.addEventListener('keyup', (e) => {

        //variable hint element
        let hint;
        if (isExpiryDateField(field)) {
            hint = e.target.parentNode.parentNode.parentNode.lastElementChild;
        } else {
            hint = e.target.nextElementSibling;
        }

        if (!field_types[field].regex.test(e.target.value)) {
            e.target.classList.add("invalid");
            card_element.innerText = e.target.value;
            hint.style.display = "block";
            hint.innerText = "Invalid: " + field_types[field].regex_hint;

            if (e.target.value === "") {
                card_element.innerText = field_types[field].default;
                hint.innerText = "Invalid: Can't be blank";
            }

        } else {
            if (isExpiryDateField(field)){
                let field_as_integer = parseInt(e.target.value);
                if (field==="month" && (field_as_integer < 1 || field_as_integer > 12)){
                    hint.innerText = "Invalid: Must be 1-12";
                    e.target.classList.add("invalid");
                    hint.style.display = "block";
                } else {
                    e.target.classList.remove("invalid");
                    hint.style.display = "none";
                }
                card_element.innerText = e.target.value;
                if (e.target.value === "") {
                    card_element.innerText = field_types[field].default;
                    hint.innerText = "Invalid: Can't be blank";
                }
            } else {
                card_element.innerText = e.target.value;
                e.target.classList.remove("invalid");
                hint.style.display = "none";
            }

        }

    })
}

const cc_form = document.querySelector("#cc-form");
const state_complete = document.querySelector("#state-complete");
cc_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let invalid_fields = document.querySelector(".invalid");
    if (invalid_fields == null && form_cardholder_name.value !== "" && form_card_number.value !== "" && form_expiry_month.value !== "" && form_expiry_year.value !== "" && form_cvc.value !== ""){
        cc_form.style.display = "none";
        state_complete.style.display = "flex";
    }
})


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

