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
        imageCaption: ".image-caption",
        hidden: "hidden",
        show: ".show",
        zoomImage: "zoom-image",
        menu: ".menu",
        btnUser: ".btn-user",
        user: ".user",
        navbarDropdown: ".navbar-dropdown",
        sidebarMenu: ".sidebar",
        btnSidebar: ".btn-sidebar",
        btnClose: ".btn-close",
        sidebarMenuContents: ".sidebar-menu",
        sidebarAccountDropdown: ".sidebar-account-dropdown",
        sidebarMenuOptions: ".sidebar-menu-options",
        btnApp: ".btn-app",
        appScreen: ".app-screen",
        dropDownMenuOptions:".dropdown-options",
        dropDownMenuOption: ".dropdown-option"
    };
    // for each element of the list of DOM elements i.e nodes run the custom function passeed in second argument
    let nodeListForEach = function (list, callBackFunction) {
        for (let i = 0; i < list.length; i++) {
            callBackFunction(list[i], i);
        }
    };
    return {

        getDOMStrings: function () {
            return DOMStrings;
        },

        hideAllGalleryCaptions: function () {
            $(DOMStrings.imageCaption).addClass(DOMStrings.hidden);
        },


        toggleAccountDropDownMenu: function () {
            let toggleHeight = $(DOMStrings.dropDownMenuOptions).height() === 200 ? "0px" : "200px";
            $(DOMStrings.dropDownMenuOptions).stop().animate({height: toggleHeight}, 1, function () {
                $(DOMStrings.dropDownMenuOptions).stop().fadeToggle(toggleHeight).delay(2000);

                // $(DOMStrings.user).toggle(toggleHeight);
            });
        },

        toggleSidebar: function () {
            let toggleWidth = $(DOMStrings.sidebarMenu).width() === 400 ? "0px" : "400px";
            $(DOMStrings.sidebarMenu).stop().animate({width: toggleWidth}, 1, function () {
                $(DOMStrings.btnClose).toggle(toggleWidth);
            });
            $(DOMStrings.sidebarMenuOptions).stop().fadeToggle(toggleWidth).delay(2000);

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
        $(DOMStrings.galleryImage).hover(function () {
            $(this).stop().toggleClass(DOMStrings.zoomImage);
            $("#" + $(this)[0].parentNode.children[1].id).stop().toggleClass(DOMStrings.hidden);
        });
        $(DOMStrings.btnUser).click(uiController.toggleAccountDropDownMenu);
        $(DOMStrings.btnSidebar).click(uiController.toggleSidebar);
        $(DOMStrings.btnClose).click(uiController.toggleSidebar);
    };


    return {
        init: function () {
            uiController.hideAllGalleryCaptions();
            initializeEventListeners();
        }
    };

})(dataController, uiController);

$(document).ready(function () {
    controller.init();
});


