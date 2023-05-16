/*
 Matthew Payne 04/1/2001

 Functionality presents an interactive calendar for a use to pick a date from.
 The current supported date format is 'mm/dd/yyyy'. Originally, the calendar was drawn in 
 a popup window(some of that code is left commented out.  I decided to create a calendar drop-down with similiar functionality to the 
 date picker used by expedia.com ie the calendar automatically is positioned below the object it is called from.

 To utilize this functionality for a text box, a call would look something like ->
 <INPUT id=cmdDisplayCalEnd  onclick="javascript:buildCal(frmDateSelect.txtEndDate);" name=cmdDisplayCalEnd type=button style="HEIGHT: 22px; WIDTH: 19px" value=...>

*/

 var browser   = new Browser();
 var newformat = {date:{d:0,m:1,y:2},time:{h:0,m:1}};
 var sCalDate ;
 var iW = 185 ;
 var iH = 133 ;
 
 
 if (browser.ie4 || browser.ie5) 
	 document.write("<iframe id='spCal' name='spCal' STYLE='display:none; border:ridge;position:absolute;width:"+iW+";height:"+iH+";z-index=105' MARGINHEIGHT='0' MARGINWIDTH='0' width:156 SCROLLING='NO'></iframe>");

 if (browser.ns6 || browser.ns4)
	 document.write("<div id='spCal' name='spCal' class='content' STYLE='display:none; border:ridge;position:fixed;width:'+iW+';height:'+iH+';z-index=4' MARGINHEIGHT='0' MARGINWIDTH='0' width:156 SCROLLING='NO'></div>");


/*  
	Functions for validating dates
	var newformat = {date:{d:0,m:1,y:2},time:{h:0,m:1}}; is the format = dd/mm/yyyy
	var newformat = {date:{m:0,d:1,y:2},time:{h:0,m:1}}; is the format = mm/dd/yyyy
*/
function buildCal()
{
	var calDate = new Date();
	calDateField = arguments[0];

	/* This section is IE 5+ specific.  
	   In order to run this in lower browsers, a span tag called 
	   "spCal" needs to be defined in the HTML document.  
	 */  

	CalFrame = document.getElementById("spCal");

	if (CalFrame=='undefined')
	 {
	    //CalFrame =document.createElement("<span id='spCal' STYLE='display:none; border:ridge;position:absolute;width:'+iW+';height:'+iH+';z-index=100' MARGINHEIGHT='0' MARGINWIDTH='0' NORESIZE FRAMEBORDER='0' width:156 SCROLLING='NO'></span>"); 

    	    document.write("<span id='spCal' STYLE='display:none; border:ridge;position:fixed;width:'+iW+';height:'+iH+';z-index=100' MARGINHEIGHT='0' MARGINWIDTH='0' NORESIZE FRAMEBORDER='0' width:156 SCROLLING='NO'></span>");
	    CalFrame = document.getElementById("spCal");
	    //document.body.insertBefore(CalFrame);
	 }
	 
	OutP = getObjLoc(calDateField) ;

	var screenW = document.body.scrollWidth;
 	var screenH = document.body.scrollHeight;
	
	var eT = OutP.top; 
	var dH = CalFrame.style.pixelHeight;
	var dW = CalFrame.style.pixelWidth;

	// var dW = calDateField.offsetWidth;

	if ( screenH < (eT+dH) ) {
		eT = eT - dH + calDateField.scrollHeight ;
	}
/*
	if ( screenW < (OutP.left + calDateField.offsetWidth+dW) ) {
		if (eT==OutP.top) 
			eT = eT +
		eT = eT - dH + calDateField.scrollHeight ;
	}
*/

	CalFrame.style.left = OutP.left + calDateField.offsetWidth;
	CalFrame.style.top  = eT ;	

/*
var texte = "** calDateField **";
   with (document.body)
   {
      texte += "\r\noffsetWidth="         + offsetWidth;
      texte += "\r\noffsetHeight="        + offsetHeight;
      texte += "\r\nscrollLeft="          + scrollLeft;
      texte += "\r\nscrollTop="           + scrollTop;
      texte += "\r\nscrollWidth="         + scrollWidth;
      texte += "\r\nscrollHeight="        + scrollHeight;
      texte += "\r\nstyle.pixelLeft="     + style.pixelLeft;
      texte += "\r\nstyle.pixelTop="      + style.pixelTop;
      texte += "\r\nstyle.pixelWidth="    + style.pixelWidth;
      texte += "\r\nstyle.pixelHeight="   + style.pixelHeight;
   }
   alert(texte);
*/

    switch (isValidDate(calDateField.value))
    {
	case 0:
		// no date supplied, use current date
		calDate = new Date();
		break;

	case -1:
    		// invalid date supplied,
    		alert('invalid date given');
    		return false;
    		break;

	case 1:
		calDate = calDateField.value.toDateTime(newformat);
		break;
     }

	if (CalFrame.style.display == "")
	{
		CalFrame.style.display = "none";
		return;
	}

	sCalDate = calDate.getDate() + '/' + (calDate.getUTCMonth() + 1) + '/' + calDate.getFullYear() ;

	// First call to the calendar gets set to the current date
	//alert(calDate.getDate() + '/' + (calDate.getUTCMonth() + 1) + '/' + calDate.getFullYear());
  	drawCal(calDate.getDate() + '/' + (calDate.getUTCMonth() + 1) + '/' + calDate.getFullYear());
	CalFrame.style.display = "";
}



function drawCal (sDate)
{
	var sHTML = new String();
	var lTargetYear;
	var lTargetMonth;
	var lTargetDay;
	var sSplitDate;
	var objPop;

	// ex: "02/15/2001" will get split into an array.  the '/' is the separator
	sSplitDate = sDate.split('/');

	lTargetYear = sSplitDate[2];
	lTargetDay = sSplitDate[0];
	lTargetMonth = sSplitDate[1] -1;

	//objPop= window.open('','Note','toobar=no,location=no, directories=no,status=yes,scrollbars=yes,resizable=yes, copyhistory=no,width=300,height=200')
	//font-family : Arial,Helvetica,Sans-serif;
	//font-size : 11px;
	//color : #ffffff;
	//setup styles to define the look of the calendar

	sHTML += '<html><body class="cal">';
	sHTML += '<link rel="stylesheet" type="text/css" href="./css/rbl_1.css" />' ;
 //start grid	
	sHTML += '<table cellspacing=0 border=0 cellpadding=0>';
	sHTML += '<tr class="calHeading">';
	sHTML +=  '<td width=1></td>';
	sHTML +=   '<td width='+iW+'></td>';
	sHTML +=   '<td width=1></td></tr>';
	sHTML +=  '<tr class="calDay"><td width=1></td>';
	sHTML +=  '<td width='+iW+'>';
	sHTML += DrawCalendarMonth(lTargetYear, lTargetMonth, lTargetDay);
	sHTML +=  '</tr></table></body></html>';
	sHTML +=  '</body></html>';

     var calobj = document.getElementById("spCal");
     //calobj.write(sHTML);
      	if (browser.ie4 || browser.ie5){
		self.spCal.document.open();
		self.spCal.document.write(sHTML);
		self.spCal.document.close();
	  //calobj.innerHTML=sHTML;  
	}

        if (browser.ns6 || browser.ns4){
	    //calobj.document.body.innerHTML=sHTML;
	    // calobj.insertAdjacentHTML('beforeEnd', sHTML); 
	    calobj.innerHTML=sHTML;
	    // calobj.document.body.appendChild(sHTML);
	    //calobj.outerHTML=sHTML;
	}
}


function DrawCalendarMonth(lYear, lMonth, lDay)
{
   var sCal = new String();
   var sMonthPicker = new String();
   var dcurrDate= new Date(lYear, lMonth, lDay);
/*   
   monthArray = new Array('January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December');
   weekdayList  = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
   weekdayArray = new Array('Su','Mo','Tu','We','Th','Fr','Sa');
*/
   monthArray = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
   weekdayList  = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
   weekdayArray = new Array('Di','Lu','Ma','Me','Je','Ve','Sa');

   var lDaysInMonth = GetDaysInMonth(dcurrDate.getMonth()+1, dcurrDate.getYear());
   var thisMonthFirstDay = new Date(dcurrDate.getFullYear(), dcurrDate.getMonth(), 1);

   var sNextYear = (thisMonthFirstDay.getUTCMonth()+ 1) + '/' + 1 + '/' + (thisMonthFirstDay.getFullYear() +1);
//   var sPrevYear = (thisMonthFirstDay.getUTCMonth()+ 1) + '/' + 1 + '/' + (thisMonthFirstDay.getFullYear() -1);    
   var sPrevYear  = ( 1 + '/' + (thisMonthFirstDay.getUTCMonth()+ 1) + '/' + (thisMonthFirstDay.getFullYear() -1));
   var sNextMonth = ( 1 + '/' + (thisMonthFirstDay.getUTCMonth()+ 2) + '/' + (thisMonthFirstDay.getFullYear()));
   var sPrevMonth = ( 1 + '/' + (thisMonthFirstDay.getUTCMonth()+ 0) + '/' + (thisMonthFirstDay.getFullYear()));

    

   // 'Set the Date variables


   sMonthPicker += '<select class="month" name="month" id="month" onchange="javascript:var blah=\'01/\' + (this.selectedIndex + 1) + \'/' + thisMonthFirstDay.getFullYear() +'\';parent.drawCal(blah);">';
   for (var y=0; y < 12;y++){
      sMonthPicker += '<option value="' + y + '"';
      if (y == lMonth) sMonthPicker += ' selected';
	  sMonthPicker += '>' + monthArray[y] + '</option>';
    }
    sMonthPicker += '</select>';
//	    alert(sMonthPicker);

   sCal = '<table width='+iW+' border=1 style="background-color:while;border-collapse:collapse">' + '<tr class="heading" bgcolor="beige">';
   sCal += '<td style="cursor:hand;" onmouseover="this.style.backgroundColor=\'white\';" onmouseout="this.style.backgroundColor=\'\';" onclick="javascript:parent.drawCal(\'' + sPrevYear +'\');" align=center>&lt;&lt;</td>';
   //sCal += '<td style="cursor:hand;" onmouseover="this.style.backgroundColor=\'white\';" onmouseout="this.style.backgroundColor=\'\';" onclick="parent.drawCal(\'' + sPrevMonth +'\');" align=center>&lt;</td>';
   sCal += '<td colspan=5 align=center><font face="verdana, arial" size=1>' + sMonthPicker + dcurrDate.getFullYear() + '</font></td>';
   //self.onerror = alert('Error in draw occured');
   //sCal += '<td style="cursor:hand;" onmouseover="this.style.backgroundColor=\'white\';" onmouseout="this.style.backgroundColor=\'\';" onclick="parent.drawCal(\'' + sNextMonth +'\');" align=center>&gt;</td>';
   sCal += '<td style="cursor:hand;" onmouseover="this.style.backgroundColor=\'white\';" onmouseout="this.style.backgroundColor=\'\';" onclick="parent.drawCal(\'' + sNextYear +'\');" align=center>&gt;&gt;</td>';
   sCal += '</tr>';
   //document.write(sCal);

 weekdays = '<tr bgcolor="#aaaaaa">';
 // LOOP THROUGH WEEKDAY ARRAY
		for (i in weekdayArray) {
			weekdays += '<td align=center class="calHead">' + weekdayArray[i] +'</td>';
		}
		weekdays += '</TR><TR>';

  sCal += weekdays;

  //document.write ('The start day for this month is' + thisMonthFirstDay.getDay() +'<TR>');
  for (i=0; i < thisMonthFirstDay.getDay(); i++)  
  {
	sCal += DrawOtherDay(thisMonthFirstDay.getDay() - i, dcurrDate);
  }

  for (i=1; i < lDaysInMonth+1; i++)  
  {
	dcurrDate.setDate(i);
	sCal += DrawNormalDay(i, dcurrDate);
	
	if (dcurrDate.getDay() ==6) 
	//start a new week if we are at the end
	{ 
		sCal +='</tr><tr>';      
	}
  }

 return sCal;
}



function DrawOtherDay(lDayOffset, dDate)
{
 var DayNumber;
 var dWorkingDate = new Date(dDate.getYear(), dDate.getMonth(), (- lDayOffset) + 1) 
 var sTemp = new String(); 

 DayNumber = dWorkingDate.getDate();

 //' Draws a day cell - date is in previous or next month
 //' The response.write's are separate lines for clarity only

 sTemp = '<td class="calOtherDay" align=center>';
 sTemp += '';
 sTemp += DayNumber + '</td>';

 return sTemp;
}



function DrawNormalDay(DayNumber, dDate)
{
 //' Draws a day cell - date is in current month
 //' The response.write's are separate lines for clarity only

  var sDayDate = new String();
  var sTemp = new String(); 
  var dToday = new Date();
  var sToday = dToday.getDate() + '/' + (dToday.getMonth() + 1) + '/' + dToday.getFullYear() ;
  var sClassName = 'calDay';

  
 // sDayDate = (dDate.getMonth() + 1) + '/' + DayNumber + '/' + dDate.getFullYear();
  sDayDate = DayNumber + '/' +(dDate.getMonth() + 1) + '/' +  dDate.getFullYear();

  if(dDate.getDay() == 0 || dDate.getDay() == 6)
	sClassName='calWeekEnd';

  if (sDayDate == sToday)
	sClassName='calToday';

  if (sDayDate == sCalDate)
	sClassName='calSelect';

  if (DayNumber<10) 
  	sDayDate = '0'+DayNumber + '/';
  else
  	sDayDate = DayNumber + '/' ;

  if ((dDate.getMonth() + 1)<10) 
  	sDayDate = sDayDate + '0' + (dDate.getMonth() + 1) + '/' +  dDate.getFullYear();
  else
  	sDayDate = sDayDate + (dDate.getMonth() + 1) + '/' +  dDate.getFullYear();

  sTemp += '<td class="' + sClassName +'" ';
  sTemp += 'onclick="javascript:parent.calDateField.value=(\'' + sDayDate + '\'); parent.HideCal();"';
  sTemp += ' align=center>';
  sTemp += '<a class="' + sClassName + '" href="#" onclick="void(\'' + sDayDate + '\');">' + DayNumber + '</a></td>';
  return sTemp;
}



function HideCal()
{
	CalFrame.style.display = "none"
}



function GetNextMonth(dCurrentDate) {

	var lbmonth;
	var lbyear;

	
        // IF MONTH IS DECEMBER, SET MONTH TO JANUARY AND INCREMENT THE YEAR
        if (dCurrentDate.getMonth == 11) {
            dCurrentDate.setMonth(0);
            dCurrentDate.setYear(dCurrentDate.getYear() + 1);
            //dCurrentDate.setFullYear(glbyear);
        }
        else {
            dCurrentDate.setMonth(dCurrentDate.getMonth() + 1);
        }
        //dCurrentDate.setMonth(glbmonth);
        return dCurrentDate;
}



function GetDaysInMonth(iMonth, iYear) 
{
	//Returns the number of days in a month
	/*
		In: iMonth: Number of the Month -not zero based ie 3=March
  		    iYear: four digit year
	*/

	var dPrevDate = new Date(iYear, iMonth, 0);
	return dPrevDate.getDate();
}



String.prototype.getDateStr = function (dateformat) 
{
 re = {d:"\\d(\\d|)",m:"([\\d]|)\\d",y:"\\d\\d([\\d]|)([\\d]|)" };

 tempobj = {};
 for(var i=0; i<3; i++)
  for(var j in dateformat)
   if(dateformat[j]==i) {
    dateformat[i]=j;
    break;
   }

 var re_str = "\\b" + re[dateformat[0]] + "([\\.]|[\\/])" + re[dateformat[1]] + "([\.]|[\/])" + re[dateformat[2]] + "\\b";
 var date = this.match(new RegExp(re_str,"gi"));

 return  (date==null ? null : date[0].indexOf(".")!=-1 && date[0].indexOf("/")!=-1? null : date[0]);
}



String.prototype.getTimeStr = function (timeformat) {
 var time = this.match(/\b(\d|)\d\:\d\d\b/);

 return (time==null ? null : time[0]);

}


String.prototype.toDateTime = function (format) {
 typeof(format)=="undefined"? format = {date:{y:2,m:1,d:0},time:{h:0,m:1}} : null;
 with(this) {
  var d_ = getDateStr(format.date);
  var d = d_!= null? d_.split(d_.match(/\D/)) : [1,1,1970];
  d[format.date.m]--;

  new String(d[format.date.y]).length==2? d[format.date.y]=parseInt("19" + d[format.date.y]) : null;
  var t_ = getTimeStr(format.time);
  t = t_!=null? t_.split(t_.match(/\D/)) : [0,0];
 }

 with(format) {
  var td = new Date (d[date.y],d[date.m],d[date.d],t[time.h],t[time.m]);
  return (td.getFullYear()==d[date.y] && td.getMonth()==d[date.m] && 
          td.getDate()==d[date.d] && td.getHours()==t[time.h] && 
          td.getMinutes()==t[time.m]? td : null);
 }
}


  function Browser(){
	  this.dom = document.getElementById?1:0;
	  this.ie4 = (document.all && !this.dom)?1:0;
	  this.ns4 = (document.layers && !this.dom)?1:0;
	  this.ns6 = (this.dom && !document.all)?1:0;
	  this.ie5 = (this.dom && document.all)?1:0;
	  this.ok = this.dom || this.ie4 || this.ns4;
	  this.platform = navigator.platform;
  }


function isValidDate (sDateIn) 
{
 	switch(true)
 	{
 		case (Date.UTC(new Date(1970,0,1,0,0,0))==Date.UTC(sDateIn.toDateTime(newformat))):
 			//alert('nothing entered here');
 			return 0;
 			break;
 		case ((sDateIn.toDateTime(newformat)) != null): 
 			//alert('valid date/time');
 			return 1;
 			break;
 		case true: 
 		//same as case else or default (ie result must have been null)
 			//alert('invalid date');
 			return -1;
 			break;
 	}
}

// Browser Detection
isMac = (navigator.appVersion.indexOf("Mac")!=-1) ? true : false;
NS4 = (document.layers) ? true : false;
IEmac = ((document.all)&&(isMac)) ? true : false;
IE4plus = (document.all) ? true : false;
IE4 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 4.")!=-1)) ? true : false;
IE5 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 5.")!=-1)) ? true : false;
ver4 = (NS4 || IE4plus) ? true : false;
NS6 = (!document.layers) && (navigator.userAgent.indexOf('Netscape')!=-1)?true:false;

function getObjLoc(oIn)
{
     var oOut = new Object();
     oOut.top = 0;
     oOut.left = 0;

     if ((IE4plus && !isMac) || (IEmac && IE5) )
     {
          oOut.left = oIn.offsetLeft;
          oOut.top = oIn.offsetTop;
          var newp = oIn.offsetParent;
          while(newp != null)
          {
               oOut.left += newp.offsetLeft;
               oOut.top += newp.offsetTop;
               newp = newp.offsetParent;
          }
          if (IEmac)
          {     
               oOut.left += parseInt(document.body.leftMargin);
               oOut.top +=  parseInt(document.body.topMargin);
          }
     }
     else if (NS4)
     {
          oOut.left = oIn.x;
          oOut.top = oIn.y;
     }
     else if (isMac && IE4)
     {
          var el = oIn;
          do
          {     
               if (isInt(el.offsetTop))
                    oOut.top += el.offsetTop;
               if (isInt(el.offsetLeft))
                    oOut.left += el.offsetLeft;
               el = el.parentElement;
          } while (el.tagName != "BODY");
          if (navigator.appVersion.indexOf("4.5")>=0)
               oOut.top = oOut.top - 15;
     }
     else if (NS6)
     {
          var b=document.getElementsByTagName('body')[0];
          oOut.left = oIn.offsetLeft+b.offsetLeft;
          oOut.top = oIn.offsetTop+b.offsetTop;
     }
     return oOut;
} 

//-->
