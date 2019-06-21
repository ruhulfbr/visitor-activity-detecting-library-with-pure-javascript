
var do_visitorLog = (function(){
    //
    // Private variables
    //
    var do_defaults = {
        // Available functionality
        clickCount: true,
        clickDetails: true,
        location:true,
        processOnAction: true,

        // Action Item
        actionItem: [],
        processTime: 5555,
        processData: function(results){

            var resultData = JSON.stringify(results);
            console.log(results);

           //Get method 
           if (window.XMLHttpRequest){
                xmlhttp=new XMLHttpRequest();
            }
           else{
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            var url = 'http://localhost/test/index.php';
            var param =  '?clientId="dsahd"&userId="dsdyhs98daj"&trafficData='+resultData;
            var UrlToSend = url + param;
            xmlhttp.open("GET", UrlToSend, true);
            xmlhttp.send();

        },
    },
    // End results, what is shown to the user
    results = {
        visitorInfo: {
            appCodeName: navigator.appCodeName || '',
            appName: navigator.appName || '',
            vendor: navigator.vendor || '',
            platform: navigator.platform || '',
            userAgent: navigator.userAgent || ''
        },
        time: {
            startTime: Date(Date.now()).toString(),
            totalTime: 0,
            timeOnPage: 0,
        },
        clicks: {
            clickCount:0,
            clickDetails: []
        },
        pageVisit: {
            currentPage : window.location.href,
            pageTitle : document.title,
        },
        locationInfo : {},
        action : {
            actionCount : 0,
            actionName : [],
        }

    },
    support = !!document.querySelector && !!document.addEventListener,
    settings;

    // Helper Functions
    var helperActions = {

        //Time On Page and Total Time;
        timer: function(){
            window.setInterval(function(){
                if(document['visibilityState'] === 'visible'){
                    results.time.timeOnPage++;
                }
                results.time.totalTime++;
            },1000);
        },
    }

    /**
     * Merge do_defaults with options
     * @private
     * @param {Object} default settings
     * @param {Object} user options
     * @returns {Object} merged object
     */
    function getSettings(do_defaults, options){
        var option;
        for(option in options){
            if(options.hasOwnProperty(option)){
                do_defaults[option] = options[option];
            }
        }
        return do_defaults;
    }

    /**
     * Initialize the event listeners
     * @public
     * @param {Object} user options
     */
    function init(options){
        if(!support) return;

        // Extend default options
        if (options && typeof options === "object") {
            settings = getSettings(do_defaults, options);
        }

        document.addEventListener('DOMContentLoaded', function() {

            
                window.setTimeout(function(){
                    processResults(true);
                    localStorage.setItem('onload',true);
                },500);
            

           
            
            // Countdown Timer
            window.setInterval(function(){
                if(document['visibilityState'] === 'visible'){
                    results.time.timeOnPage++;
                }
                results.time.totalTime++;
                // Check if we need to process results
                if(settings.processTime > 0 && results.time.totalTime % settings.processTime === 0){
                    processResults();
                }
            },1000);

            // if(settings.clickCount || settings.clickDetails){
            //     document.addEventListener('mouseup', function(){
            //         if(settings.clickCount){
            //             results.clicks.clickCount++;
            //         }
            //         if(settings.clickDetails){
            //             results.clicks.clickDetails.push({
            //                 timestamp: Date.now(),
            //                 node: event.target.outerHTML,
            //             });
            //         }
            //     });
            // }

            if(settings.location){
                var request = new XMLHttpRequest()
                // Open a new connection, using the GET request on the URL endpoint
                request.open('GET', 'https://ipapi.co/json/', true)
                request.onload = function (data) {

                    results.locationInfo.location = JSON.parse(data.currentTarget.response);
 
                 }
                // Send request
                request.send()
            }


            // Event Listener to porcess
            if(settings.processOnAction){
                if(settings.actionItem.length > 0){
                    for(var i = 0 ;i<settings.actionItem.length; i++){
                        var node = document.querySelector(settings.actionItem[i].selector);
                        if(!!!node) throw new Error('Selector was not found.');
                        
                        node.addEventListener(settings.actionItem[i].event, function(){
                            //return processResults();
                            results.action.actionCount++,
                            results.action.actionName.push({
                                name : node,
                                phone : "01749769449    " + [i],
                            });

                        })
                    }
                }
            }


        });
    }
    /**
     * Calls provided function with results as parameter
     * @public
     */
    function processResults(onload){
        if(settings.hasOwnProperty('processData')){
            if(onload){
                var onloadData = {
                    locationInfo : results.locationInfo,
                    visitorInfo : results.visitorInfo,
                    startTime : results.time,
                }
                return settings.processData(onloadData );
            }else{
                return settings.processData(results);
            }
        }
        return false;
    }


    // Module pattern, only expose necessary methods
    return {
        init: init,
        processResults: processResults,
    };

})();

