function CalculEBE(zone) {

	var elt = document.getElementById( "ebe" ) ;
	var zlt = document.getElementById( zone ) ;
	
	var zTaxe = new Array("zA", "zB", "zC", "zD", "zE", "zF", "zG", "zH", "zI" ) ;
	
	var z1, n1, tTaxe ; 
		
	tTaxe = 0 ;
	for (var i=0; i < zTaxe.length; ++i) {
 		z1 = document.getElementById( zTaxe[i] ) ;
		n1 = parseFloat(z1.value.replace(' ', '').replace(' ', '').replace(' ', '') );
		if ( isNaN(n1)) n1 = 0 ;
		if ( i < 2) {
			tTaxe += n1 ;
		}
		else {
			tTaxe -= n1 ;
		}
		if (zone == zTaxe[i]) {
			 zlt.value = format( Math.round(n1), 0) ;
	  }
 	}

	 //elt.value = tTaxe ;
	  elt.value = format( Math.round(tTaxe), 0) ;

		if (zone == "zA") {
			 elt = document.getElementById( "ca" ) ;
			 elt.value = zlt.value ;
	  }
		if (zone == "zH") {
			 elt = document.getElementById( "sal" ) ;
			 elt.value = zlt.value ;
	  }
		if (zone == "zI") {
			 elt = document.getElementById( "cot" ) ;
			 elt.value = zlt.value ;
	  }
	
	return true ;
}

function CalculLib(zone) {

	var elt = document.getElementById( "ebe" ) ;
	var zlt = document.getElementById( zone ) ;
	
	var zTaxe = new Array("ca", "zC", "zE", "sal", "cot" ) ;
	
	var z1, n1, tTaxe ; 
		
	tTaxe = 0 ;
	for (var i=0; i < zTaxe.length; ++i) {
 		z1 = document.getElementById( zTaxe[i] ) ;
		n1 = parseFloat(z1.value.replace(' ', '').replace(' ', '').replace(' ', '') );
		if ( isNaN(n1)) n1 = 0 ;
		if ( i == 0) {
			tTaxe += n1 ;
		}
		else {
			tTaxe -= n1 ;
		}
		if (zone == zTaxe[i]) {
			 zlt.value = format( Math.round(n1), 0) ;
	  }
 	}

	 //elt.value = tTaxe ;
	  elt.value = format( Math.round(tTaxe), 0) ;

	return true ;
}

function format( valeur, decimal ) 
{
  // formate un chiffre avec 'decimal' chiffres apres la virgule et un separateur
  	var separateur = ' ' ;
	var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur))));
 	var val=Math.floor(Math.abs(valeur));	
	if ((decimal==0)||(deci==Math.pow(10,decimal))) {
	//	val=Math.floor(Math.abs(valeur)); 
		val=Math.round(Math.abs(valeur)); 
		deci=0;
	}
	var val_format=val+"";
	var nb=val_format.length;
	for (var i=1;i<4;i++) {	
		if (val>=Math.pow(10,(3*i))) {
		val_format = val_format.substring(0,nb-(3*i)) +
					 separateur + 
			     	 val_format.substring(nb-(3*i) ) ;
		}
	}	
	if (decimal>0) {
		var decim="";
 		for (var j=0;j<(decimal-deci.toString().length);j++) {
			decim+="0";
		}
		deci=decim+deci.toString();
		val_format=val_format+"."+deci;	
	}
	if (parseFloat(valeur)<0) {
		val_format="-"+val_format;
	}
	return val_format;
}

function formatDec(zlt) {

	var n1  ; 
		
	n1 = parseFloat(zlt.value.replace(' ', '').replace(' ', '').replace(' ', '') );
	if ( isNaN(n1)) n1 = 0 ;
	zlt.value = format( Math.round(n1), 0) ;

	return true ;
}


//  End -->
