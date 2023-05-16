
function onoff_g(s)
{
    var div  = document.getElementById("GRP_" + s) ;
    var st   = div.style.display ;
    if ( st == "none" ) {
    	div.style.display = "" ;
    }
    else {
    	div.style.display = "none" ;
    }
}
