 
var do_visitorLog = (function () {
        var minutesToExpire = 3 ;
        
        var idleWait = minutesToExpire*60*1000; // 3 min
        var idleTimer = null;
        var idleState = false;
        
        // var myTags = document.getElementsByTagName("script");
        // var src = myTags[0]['attributes']['src'].nodeValue;  //console.log(src) ; 
        // let params = (new URL(src)).searchParams;
        // let clientId = params.get('clientId') ;

        // var baseURI = myTags[0]['attributes']['src'].baseURI ; //console.log(baseURI) ;
        // let baseURIparams = (new URL(baseURI)).searchParams;

        var visitorInfo = {
            // clientId:clientId,
            // userId: baseURIparams.get('userId'),
            // utmSource : baseURIparams.get('utm_source'),
            // utmMedium : baseURIparams.get('utm_medium'),
            // utmCampaign : baseURIparams.get('utm_campaign'),
        } 
 
  
    var defaultSetting = {
        // Available functionality
        location: true,
        processOnAction: true,
        actionItem: {
            selector: '', 
            event: ''
        },
        processTime: 5,
        processData: function(results) {
            console.log(results);
     




            if (window.XMLHttpRequest){
                 xmlhttp=new XMLHttpRequest();
             }
            else{
                 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
             }
           
            //var PageToSendTo = 'http://localhost/test/index.php';
            var PageToSendTo = 'http://dhamaka.technobdapis.com/api/webTrafficData';
             
             var resultData = encodeURIComponent(JSON.stringify(results));
             var MyVariable =  '?result='+resultData ;
             var UrlToSend = PageToSendTo + MyVariable;
             xmlhttp.open("GET", UrlToSend, true);
             xmlhttp.send();





        },
    },
    startingData = {
         locationInfo:{},
         visitorInfo:visitorInfo,
         browserInfo: {
            startTime: new Date().getTime(),
            languages: navigator.languages || '',
            userAgent: navigator.userAgent || '',
            //history : window.history,
        },
        pageVisit: {
            landingPage:window.location.href,
            pageTitle: document.title,
        },
    },  
    regularData = {
//        sessionInfo: [],
        actionObject:[],
         pageVisit: {
            domain: document.domain,
            currentPage:window.location.href,
            pageTitle: document.title,
        },
        time: {
             endTime: Date.now(),
        },
    },
    support = !!document.querySelector && !!document.addEventListener,
    settings; 
    
    function do_getSettings(defaultSetting, options){
        var option;
        for(option in options) {
            if (options.hasOwnProperty(option)) {
                defaultSetting[option] = options[option];
            }
        }
        return defaultSetting;
    }
 
    function do_init(options) { 
     
        if (options && typeof options === "object") {
            settings = do_getSettings(defaultSetting, options);
        }
        
        var sessionId = do_accessCookieData('clientSessionId');
        
        if(sessionId!="" && sessionId!=null) // previous session id exist 
        {   console.log("in exist ") ;
            sessionInfo = do_updateCookieExpireTime('clientSessionId') ; // increase expired time by 5 min

            visitorInfo.sessionId  = sessionInfo[0]; 
            visitorInfo.sessionExpireTime  = sessionInfo[1]; 
            do_processResults(true) ;
        }
        else if(sessionId==null || sessionId=='')  // previous session id doesnot exist. create new one  
        { 
           console.log("in doesn't exist ") ;
           var sessionInfo = do_createCookie('clientSessionId', minutesToExpire) ;
           visitorInfo.sessionId  = sessionInfo[0]; 
           visitorInfo.sessionExpireTime  = sessionInfo[1]; 
           do_processResults(true) ;
        }
        
        
        // Check if idol . If time expire during idol time then session is destroied automatically.
        // At the end of idol time new session will be created  
        ['mousemove','keydown','scroll'].forEach( function(evt) {
            document.addEventListener(evt,function(){
                clearTimeout(idleTimer);
                if (idleState == true) { 

                    console.log("Welcome Back"); 
                     // when back to page actively create new one ---send  data to server of new session
                    var sessionInfo = do_createCookie('clientSessionId', minutesToExpire) ;
                    var sessionId =  sessionInfo[0] ;
                    var sessionExpireTime =  sessionInfo[1] ;

                    //console.log('sessionId== '+sessionId) ; console.log(sessionExpireTime) ;

                    visitorInfo.sessionId  = sessionId; 
                    visitorInfo.sessionExpireTime  = sessionExpireTime; 
                    do_processResults(true) ;
                }

                idleState = false;

                idleTimer = window.setTimeout(function () { 
                    // after time expired destroy previous session ---done by browser. no data to be send. 
                    // clear session by cron in server end
                    console.log("You've been idle for " + (idleWait/1000)/60 + " minutes");
                    console.log("Your cookie has been removed by browser");
                    idleState = true;
                    
                }, idleWait);

            });
        });
      
       
       // Hit server after each event  in the page 
       document.addEventListener('DOMContentLoaded', function () {  
            
            if (!support){ console.log("in addEventListener ") ;  return; }
            if (settings.processOnAction) {
                if(settings.actionItem.length > 0){
                
                  var sessionId = do_accessCookieData('clientSessionId');
                  var sessionEspired = '' ;
                  for(let i = 0; i < settings.actionItem.length; i++)
                  {  
                        count = 0 ;
                        var node = document.querySelector(settings.actionItem[i].selector);
                        console.log(node) ;
                        if(!!!node)
                           throw new Error( settings.actionItem[i].selector + ' Selector was not found.' );
                        
                        node.addEventListener(settings.actionItem[i].event, function () {

//                            regularData.sessionInfo.push({
//                                sessionId:sessionId ,
//                                sessionEspired:sessionEspired,
//                            }) ;
                        
                            regularData.actionObject.push({
                            id:i ,
                            event: settings.actionItem[i].event ,
                            node:settings.actionItem[i].selector ,
                            eventCount : count++ ,
                            timestamp: Date.now(),
                            sessionId:sessionId ,
                            sessionEspired:sessionEspired,}) ;

                            do_processResults() ;

                        })
                  }
                }
            }
            
        });
    }
    
    function do_createCookie(cookieName,minutesToExpire)
    {
       //var sessionId='_' + Math.random().toString(36).substr(2, 9);
       var sessionId= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
       var date = new Date();
       date.setTime(date.getTime()+(minutesToExpire*60*1000));
       document.cookie = cookieName + "=" + sessionId + "; expires=" + date.toGMTString();
       var sessionInfo = [sessionId,date] ;
       return sessionInfo ;
    }
    
    function do_accessCookieData(cookieName)
    {    
        //console.log(document.cookie.split(';')) ;
        var name = cookieName + "=";
        var allCookieArray = document.cookie.split(';');   
        for(var i=0; i<allCookieArray.length; i++)
        {
            var temp = allCookieArray[i].trim(); //console.log(temp) ; 
            if (temp.indexOf(name)==0) 
            { 
                return temp.substring(name.length,temp.length);
            }
        }
        return "";
    }
    
    function do_updateCookieExpireTime(cookieName){  
        var sessionId = do_accessCookieData(cookieName);
        var date = new Date();
        date.setTime(date.getTime()+(minutesToExpire*60*1000));  
        document.cookie = cookieName + "=" + sessionId + "; expires=" + date.toGMTString();
        var sessionInfo = [sessionId,date] ;
        return sessionInfo ;
    }
     
    function do_processResults(onload){
        if(settings.hasOwnProperty('processData')){
            if(onload){
                return settings.processData(startingData);
            }else{
                return settings.processData(regularData);
            }
        }
        return false;
    }
    
// Module pattern, only expose necessary methods
    return {
        do_init: do_init,
        //do_processResults: do_processResults,
    };

})();