/*your function must return a json in this format:
   [
        {
            "id": 323232,
            "text": "Item 1"
        },
        {
            "id": 43233,
            "text": "Item 2"
        },
        {
            "id": 543223,
            "text": "Item 3"
        }
    ]
*/

function initAutoComplete(inp, settings) {
    debugger
    if (!verifySettingsFormat(settings)) {
        return;
    }
    //setting default timeout to 300ms
    if (!settings.hasOwnProperty("typingTimeout")) {
        settings.typingTimeout = 300;
    }
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    let val;
    /*this variable controls the seconds since the user typed something*/
    let timeout;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", async function (e) {
        val = this.value;
        if (val.length > 2) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = await setTimeout(onChangeFunction, settings.typingTimeout);
        } else {
            closeAllLists();
        }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    async function onChangeFunction() {
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        let a = document.createElement("DIV");
        a.setAttribute("id", inp.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        inp.parentNode.appendChild(a);
        /*request the function passed on params, getting the data that will be displayed in select*/
        let arr = await settings.searchFunc(val);
        /*verifying json format*/
        if (verifyJsonFormat(arr)) {
            /*for each item in the array...*/
            insertOptions(inp, arr, a);
        }
    }

    function verifySettingsFormat(settings) {
        if (settings) {
            //verifying searchFunc property
            if (settings.hasOwnProperty("searchFunc")) {
                //verifying typeof searchFunc
                if (typeof (settings.searchFunc) != "function") {
                    console.error("The property searchFunc can't be typeof " + typeof (settings.searchFunc) + ", it must be a function.");
                    return false;
                }
            } else {
                console.error("The json settings is missing searchFunc property.");
                return false;
            }

            //verifying typingTimeout property
            if (settings.hasOwnProperty("typingTimeout")) {
                //verifying typeof typingTimeout
                if (typeof (settings.typingTimeout) != "int") {
                    console.error("The property typingTimeout can't be typeof " + typeof (settings.typingTimeout) + ", it must be a int.");
                    return false;
                } else if (settings.typingTimeout <= 0 || settings.typingTimeout > 3000) {
                    console.error("The property typingTimeout must to be between 1ms and 3000ms");
                    return false;
                }
            }

            return true;
        }
    }

    function verifyJsonFormat(arr) {
        if (arr) {
            if (arr.hasOwnProperty("length")) {
                if (arr.length > 0) {
                    if (arr[0].hasOwnProperty("id") && arr[0].hasOwnProperty("text")) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }

        console.error('JSON format is invalid. Corret format:  [{"id": 323232, "text": "Item 1"}]');
        return false;
    }

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function insertOptions(inp, arr, a) {
        for (i = 0; i < arr.length; i++) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].text.substr(0, inp.value.length) + "</strong>";
            b.innerHTML += arr[i].text.substr(inp.value.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' item-id='" + arr[i].id + "' value='" + arr[i].text + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                inp.setAttribute("value-id", this.getElementsByTagName("input")[0].getAttribute("item-id"));
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
