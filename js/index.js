// App data Controller
// Saves data and retrives data
let DATACRL = (function () {
    return {};
})();
// UI controller
// manipulate the UI data and gets data from UI
let UICRL = (function () {
    let DOMStrings = {
        imageCaption: ".image-caption"
    };
    return {
        DOMStrings : DOMStrings
    };
})();
// App Crl controls the overall app
// Communicate between data controller and UI controller
let APPCRL = (function (dataCrl, uiCrl) {
    let DOMStrings = uiCrl.DOMStrings;
    let eventListeners = {
        favouriteMealsGallery: null
    };
    initializeEventListeners = function () {
eventListeners.favouriteMealsGallery = document.querySelector(DOMStrings.imageCaption);
    };
    return {
        init: function () {
            initializeEventListeners();
            // eventListeners.favouriteMealsGallery.style.visibility= "hidden";
        }
    };
})(DATACRL, UICRL);

APPCRL.init();