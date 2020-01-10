// Use IFFE (Imediatly invoked function expression to store the private variables and functions
// IFFE for App controller , UI controller and Data Controller
// Description :
// After execution of each outer function i.e data controller , ui controller and app controller respective closures are created
// only interfaces of these functions i.e the object containing functions returned by each of them has the access to
// the closures of them thus creating data encapsulation for inner functionality and private variables
// and avoid unnecessary pollution of global scope by each controller


// Data Controller
// Saves data and retrieves data
let dataController = (function () {
    return {};
})();


// UI controller
// manipulate the UI data and gets data from UI
let uiController = (function () {
    let DOMStrings = {
        sectionFavouriteMeals: ".section-favourite-meals",
        galleryImage: ".galley-image",
        imageCaption: "image-caption"
    };
    return {
        getDOMStrings: function () {
            return DOMStrings;
        }
    };
})();


// App Controller controls the overall app
// Communicate between data controller and UI controller
let controller = (function (dataCrl, uiCrl) {
    let DOMStrings = uiCrl.getDOMStrings();

    // initialize all the event listners
    let initializeEventListeners = function () {
        // event listeners for hovering over any image in favourite meals gallery
        document.querySelector(DOMStrings.galleryImage).addEventListener('mouseover', showFavouriteMealCaption);
    };

    // for each element of the list of DOM elements i.e nodes run the custom function passeed in second argument
    let nodListForEach = function (list, callBackFunction) {
        for (var i = 0; i < list.length; i++) {
            callBackFunction(list[i], i);
        }
    };

    let hideGalleryCaptions = function () {
        let imageCaptionsList;
        imageCaptionsList = document.getElementsByClassName(DOMStrings.imageCaption);
        nodListForEach(imageCaptionsList, function (currentNode, index) {
            currentNode.style.display = 'none';
        });
    };

    let showFavouriteMealCaption = function (event) {
        console.log(event.target);
    };
    return {
        init: function () {
            hideGalleryCaptions();
            initializeEventListeners();
        }
    };
})(dataController, uiController);

controller.init();