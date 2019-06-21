<title>Visitor Tracking</title>
<h1>Visitor Traking</h1>
<button id="button1">This is Button 1</button>
<button id="button2">This is Button 2</button>
<button id="button3">This is Button 3</button>
<button id="button4">This is Button 4</button>
<button id="button5">This is Button 5</button>
<img style="height: 100" src="https://api.androidhive.info/json/movies/baahubali2.jpg" id="img">
<input type="text" name="" id="focus">
<?php

	if($_GET){
	  print_r(json_decode($_GET['result']));
	}

    // if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    // {
    //   $ip=$_SERVER['HTTP_CLIENT_IP'];
    // }
    // elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    // {
    //   $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    // }
    // else
    // {
    //   $ip=$_SERVER['REMOTE_ADDR'];
    // }
    // echo $ip;

	echo "<br>";
	echo "<br>";	echo "<br>";	echo "<br> <pre>";
 //$location = file_get_contents('https://freegeoip.net/json/'.$_SERVER['REMOTE_ADDR']);
 // $data = file_get_contents("http://api.hostip.info/?ip=".$_SERVER['REMOTE_ADDR']);
 // print_r($data);


//  function testing(){
// 	$contact_json = file_get_contents("http://bcmea.org.bd/home/get_client_ip");

// 	$ip = json_decode($contact_json);

// 	print_r($ip);
// }



?>


<script src="analytics.js" ></script>
        <script type="text/javascript"> 
           do_visitorLog.do_init({ 
                actionItem: [
                    {selector : "#button1", event : "click"},
				   {selector : "#button2", event : "click"},
				   {selector : "#button3", event : "click"},
				   {selector : "#button4", event : "click"},
				   {selector : "#img", event : "mouseout"},
				   {selector : "#focus", event : "focus"},
                ]
            });
        </script>





<!-- <script src="analytics.js" ></script>

<script type="text/javascript">
	do_visitorLog.do_init({
        actionItem : [
		   {selector : "#button1", event : "click"},
		   {selector : "#button2", event : "click"},
		   {selector : "#button3", event : "click"},
		   {selector : "#button4", event : "click"},
		   // {selector : "#img", event : "mouseout"},
		   // {selector : "#focus", event : "focus"},
        ]
	});


</script> -->










































<!-- <script type="text/javascript">
	var ss = document.getElementById('button1');
	ss.addEventListener('click',function(){
		  document.cookie = name + 'startTime=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

	});
</script> -->

<!-- <script type="text/javascript">
	var idleWait = 5000;
	var idleTimer = null;
	var idleState = false;

	['mousemove','keydown','scroll'].forEach( function(evt) {
		document.addEventListener(evt,function(){
		    clearTimeout(idleTimer);
		            
		    if (idleState == true) { 
		        
		       console.log("Welcome Back");           
		    }
		    
		    idleState = false;
		    
		    idleTimer = window.setTimeout(function () { 
		        console.log("You've been idle for " + idleWait/1000 + " seconds");
		        idleState = true;
		    }, idleWait);

		});
	});
</script> -->

<!-- <script type="text/javascript">
	function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
	    //compatibility for firefox and chrome
	    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	    var pc = new myPeerConnection({
	        iceServers: []
	    }),
	    noop = function() {},
	    localIPs = {},
	    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
	    key;

	    function iterateIP(ip) {
	        if (!localIPs[ip]) onNewIP(ip);
	        localIPs[ip] = true;
	    }

	     //create a bogus data channel
	    pc.createDataChannel("");
	    console.log(pc);

	    // create offer and set local description
	    pc.createOffer().then(function(sdp) {
	        sdp.sdp.split('\n').forEach(function(line) {
	            if (line.indexOf('candidate') < 0) return;
	            line.match(ipRegex).forEach(iterateIP);
	        });
	        
	        pc.setLocalDescription(sdp, noop, noop);
	    }).catch(function(reason) {
	        // An error occurred, so handle the failure to connect
	    });

	    //listen for candidate events
	    pc.onicecandidate = function(ice) {
	        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
	        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	    };
	}

	// Usage

	getUserIP(function(ip){
	    alert("Got IP! :" + ip);
	});
</script> -->

<!-- <script type="text/javascript">
	window.onunload = function (event) {
		alert('sadagsj');
	    var message = 'Important: Please click on \'Save\' button to leave this page.';
	    if (typeof event == 'undefined') {
	        event = window.event;
	    }
	    if (event) {
	    	
	        event.returnValue = message;
	        
	        // if (window.XMLHttpRequest){
         //        xmlhttp=new XMLHttpRequest();
         //    }
         //   else{
         //        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
         //    }
         //    var url = 'http://192.168.50.63/dhamaka_offer/api/testing';
         //    var UrlToSend = url;
         //    xmlhttp.open("GET", UrlToSend, true);
         //    xmlhttp.send();
            
            localStorage.setItem("message", message);

	    }
	    return message;
	};

</script> -->

<!-- <script type="text/javascript">

	createCookie('startTime',Date.now(),1);
	readCookie('startTime');

	function createCookie(name,value,days) {
	    var expires = "";
	    if (days) {
	       var date = new Date();
	       date.setTime(date.getTime()+(days*24*60*60*1000));
	       expires = "; expires="+date.toGMTString();
	    }
	    document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') {
	            c = c.substring(1,c.length);
	        }
	        if (c.indexOf(nameEQ) == 0) {
	            return c.substring(nameEQ.length,c.length);
	        }
	    }
	    return null;
	}
</script> -->

<!-- <script src="analytic.js" ></script>

<script type="text/javascript">
	do_visitorLog.init({
        actionItem : [
		   {selector : "#button1", event : "click"},
		   {selector : "#button2", event : "click"},
		   {selector : "#button3", event : "click"},
		   {selector : "#button4", event : "click"},
		   {selector : "#img", event : "mouseout"},
		   {selector : "#focus", event : "focus"},
        ]
	});

	// var request = new XMLHttpRequest()
	// // Open a new connection, using the GET request on the URL endpoint
	// request.open('GET', 'https://ipapi.co/json/', true)
	// request.onload = function (data) {
	// console.log(data.currentTarget.response);
	//  }
	// // Send request
	// request.send()
	//do_TracIp();

</script> -->
		<!-- <script src="http://dhamaka.technobdapis.com/assets/js/analytics.js?clientId='client-6fdg8768'"></script> -->
