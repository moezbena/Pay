function zoneFocus(s) {
	elt = document.getElementById(s) ;
	elt.focus() ;
	
	return true ;
} 


//bloc les clic sur les boutons
function disableAllBoutons() { //disableAllBoutons
	if (document.forms.length>0) { //if 1
		for (i=0; i<document.forms.length; i++) { //for 1
			if (document.forms[i].elements.length>0) { //if 2
				for (j=0; j<document.forms[i].elements.length; j++) { //for 2
					if (document.forms[i].elements[j].type.toUpperCase()=='SUBMIT' 
					 || document.forms[i].elements[j].type.toUpperCase()=='BUTTON') { //if 3
					 if (document.forms[i].elements[j].disabled==false) { //if 4
					 	document.forms[i].elements[j].disabled=true;
					 } //if 4
					} //if 3
				} //for 2
			} //if 2
		} //for 1
	} //if 1
} //disableAllBoutons

function anyMask(event, sMask) {
	//var sMask = "**?##?####";
	// # numeric
	// * tout
	// A alpha
	//
	var KeyTyped = String.fromCharCode(getKeyCode(event));
	var targ = getTarget(event);
	
	keyCount = targ.value.length;
	//alert(sMask.charAt(keyCount));
	
	if (sMask.charAt(keyCount) == '*')
 	   	return true;
 
	if (sMask.charAt(keyCount) == KeyTyped)
		return true;
	
	if ((sMask.charAt(keyCount) == '#') && isNumeric(KeyTyped)) 
	   return true; 

	if ((sMask.charAt(keyCount) == '-') && isNumeric2(KeyTyped)) 
	   return true; 
	
	if ((sMask.charAt(keyCount) == 'A') && isAlpha(KeyTyped))
         return true; 
    
      if ((sMask.charAt(keyCount) == '?') && isPunct(KeyTyped))
         return true; 
	if (KeyTyped.charCodeAt(0) < 32) return true;
    
    return false;	   
   
	
}

 function getTarget(e) {
  // IE5
   if (e.srcElement) {
   	return e.srcElement;
   }
    if (e.target) {
   	return e.target;
   }	
 }

  function getKeyCode(e) {
 //IE5
 if (e.srcElement) {
 	return e.keyCode
 }
  // NC5
  if (e.target) {
   return e.which
  }
 }

 function isNumeric(c)
{
	var sNumbers = "01234567890";
	if (sNumbers.indexOf(c) == -1)
		return false;
	else return true;
	
}  

 function isNumeric2(c)
{
	var sNumbers = "-+01234567890";
	if (sNumbers.indexOf(c) == -1)
		return false;
	else return true;
	
}  

function isAlpha(c)
{
	var lCode = c.charCodeAt(0);
	if (lCode >= 65 && lCode <= 122 )
 	  {	
		return true;
         }
	else 
	return false;
}  

function isPunct(c)
{
	var lCode = c.charCodeAt(0);
	if (lCode >= 32 && lCode <= 47 )
 	  {	
		return true;
         }
	else 
	return false;

}
 
  function toNext(elmnt,content)
  {
    if (content.length==elmnt.maxLength)
    {
	next=elmnt.tabIndex ;
	
	c = getKeyCode(window.event) ;
	b = true ;
	
	if ((c==9) || (c==16) || (c==17) || (c==18) || (c==20) || (c==27) || (c==45) || (c==144))
	{
	    b = false ;
	} ;

	/* touches deplacements */	
        if ((c > 32) && (c < 41))   
	{
	    b = false ;
	} ;
	    
	if ((next<document.forms[0].elements.length) && b)
	{
		document.forms[0].elements[next].focus() ;
		/* alert ( c ) ; */
	} ;
    }
  }

function aide(origine)
{
	msg=window.open("/testjsp/help.jsp", "Aide", "scrollbars=no,width=400,height=350");
}

/*Test la formatage du mail
*/
function test_email (email) {
	var new_string = new String(email.value);
	if (new_string.match('^[-_\.0-9a-zA-Z]{1,}@[-_\.0-9a-zA-Z]{1,}[\.][0-9a-zA-Z]{2,}$')) {
		//return true;
	}else {
		//return false;
		email.focus();
		alert('L\'adresse email n\'est pas valide ('+email+')');
	}
}


function Fct_CtrlValeurNum(oChamp, sSepMille, sSepDec, iTaille, iPrecision, sArrondi) {
  var sMsgErreur  = "";    //Message d'erreur.
  var sCar        = "";    //Caractère.
  var bFlagG      = false; //Flag pour supprimer les blancs à gauche.
  var i           = 0;     //Compteur.
  var j           = 0;     //Compteur.
  var k           = 0;     //Position du séparateur de décimal.
  var sValeur     = "";    //Valeur du champ.
  var sValTmp     = "";    //Valeur de travail.
  var sValRetour  = "";    //Valeur retournee.
  var sValEntier  = "";    //Valeur entière.
  var sValDecimal = "";    //Valeur décimale.
  var iPos        = 0;     //Position dans la valeur.

  var NB_3        = 3;
  var SEP_DEC     = ".";
  var CAR_BLANC   = " ";

  sValeur = oChamp.value;
 // if (sValeur == ""&&bObligatoire=="true")) {
   
  //}
  
//A - Contrôle des paramètres.
//A1 - Le séparateur de millier doit être différent du séparateur de décimal.
  if (sSepMille != "" && sSepDec != "") {
    if (sMsgErreur.length == 0 && sSepMille.length > 1) {
      sMsgErreur = 'Un seul caractère pour le séparateur des milliers (' 
                 + sSepMille 
                 + ').';
    }
    if (sMsgErreur.length == 0 && sSepDec.length > 1) {
      sMsgErreur = 'Un seul caractère pour le séparateur de décimal (' 
                 + sSepDec
                 + ').';
    }
    if (sMsgErreur.length == 0 && sSepMille == sSepDec) {
      sMsgErreur = 'Le séparateur des milliers (' 
                 + sSepMille 
                 + ') est identique au séparateur de décimal (' 
                 + sSepDec 
                 + ').';
    }
  }

//A2 - La précision doit être numérique.
  if (sMsgErreur.length == 0) {
    if (sMsgErreur.length == 0 && isNaN(iPrecision)) {
      sMsgErreur = 'la précision doit être numérique (Précision : ' 
                 + iPrecision 
                 + ').';
    }
    if (sMsgErreur.length == 0 && isNaN(iTaille)) {
      sMsgErreur = 'la Taille doit être numêrique (Taille : ' 
                 + iTaille 
                 + ').';
    }
    if ((sMsgErreur.length == 0) && (iPrecision > iTaille)) {
      sMsgErreur = 'la Taille doit être supérieure à la Précision (Taille : ' 
                 + iTaille 
                 + ' - Précision : '
                 + iPrecision
                 + ').';
    }
  }
  


//B - Récup�ration de la valeur d'affichage.
  if (sMsgErreur.length == 0) {
    sValTmp = sValeur;

//B1 - On remplace le s�parateur de d�cimal.
    sValTmp = sValTmp.replace(sSepDec, SEP_DEC);

//B2 - Supprimer les blancs du � gauche (LTRIM).
    for (i = 0; i < sValTmp.length; i++) {
      sCar = sValTmp.charAt(i);
      if (bFlagG == false) {
        if (sCar == CAR_BLANC) {
          sCar = "";
        } else {
          bFlagG = true;
        }
      }
      sValRetour = sValRetour + sCar;
    }
//B2bis - Supprimer les blancs du � gauche (RTRIM).
    bFlagG     = false;
    sValTmp    = sValRetour;
    sValRetour = "";
    for (i = sValTmp.length; i > 0; i--) {
      sCar = sValTmp.charAt(i - 1);
      if (bFlagG == false) {
        if (sCar == CAR_BLANC) {
          sCar = "";
        } else {
          bFlagG = true;
        }
      }
      sValRetour = sCar + sValRetour;
    }

//B3 - On r�cup�re la position du s�parateur de d�cimal.
    sValTmp    = sValRetour;
    sValRetour = "";
    k          = sValTmp.length;
    for (i = sValTmp.length; i > 0; i--) {
      sCar = sValTmp.charAt(i - 1);
      if (sCar == SEP_DEC) {
        k = i - 1;
        i = 0;
      }
    }

//B4 - Traiter les s�parateurs de milliers.
    sValRetour = sValTmp.substring(k, sValTmp.length);
    for (i = k; i > 0; i--) {
      sCar = sValTmp.charAt(i - 1);
      j++;

      if (j == NB_3 + 1) {
        j = 0;
        if (sCar == sSepMille) {
          sCar = "";
        }
      }
      sValRetour = sCar + sValRetour;
    }
  }

//C - Contr�le si la valeur est num�rique.
  if (sMsgErreur.length == 0) {
    if (isNaN(sValRetour) == true) {
      sMsgErreur = 'La valeur n\'est pas numérique ('
                 + sValeur 
                 + ').';
    }
  }

//D - Contr�ler la valeur enti�re et la valeur d�cimale.
  if (sMsgErreur.length == 0) {

//D1 - S�parer la valeur enti�re et la valeur d�cimale.
    sValTmp    = sValRetour;
    sValRetour = "";
    iPos       = sValTmp.indexOf(SEP_DEC, 1);
    if (iPos > 0) {
      sValeurEntier  = sValTmp.substring(0, iPos);
      sValeurDecimal = sValTmp.substring(iPos + 1, sValeur.length);
    } else {
      sValeurEntier  = sValTmp;
      sValeurDecimal = "0";
    }

//D2 - Compl�ter la valeur d�cimale par des z�ros.
    if (sValeurDecimal.length < iPrecision) {
      for (i = 0; i < (iPrecision - sValeurDecimal.length); i++) { sValeurDecimal+= "0"; }
    }


//D3 - 
    if (sValeurEntier.length > (iTaille - iPrecision)) {
      sMsgErreur = 'La valeur entière saisie est trop grande ('
                 + sValeur 
                 + '). Sa taille est limitée à :'
                 + (iTaille - iPrecision) 
                 + '.';

    }
    if (sValeurDecimal.length > iPrecision) {
      if (sArrondi == "a") {
        sValeurDecimal = Math.round((sValeurDecimal / Math.pow(10, sValeurDecimal.length)) * Math.pow(10, iPrecision));
      } else {
        sValeurDecimal = sValeurDecimal.substring(0, iPrecision);
      }
    }
  }

//E - Transformer la valeur pour l'affichage (mettre le s�parateur de milliers et le s�parateur de d�cimal).
  if (sMsgErreur.length == 0) {
    j = 0;
    for(i = sValeurEntier.length; i > 0; i--) {
      if (j == NB_3) {
        j          = 0;
        sValRetour = sValeurEntier.charAt(i - 1) + sSepMille + sValRetour;
      } else {
        sValRetour = sValeurEntier.charAt(i - 1) + sValRetour;
      }
      j++;
    }
    if (sValeurDecimal != "") {
      sValRetour = sValRetour + sSepDec + sValeurDecimal;
    }
  }

//Z - Traitement du message d'erreur.
  if (sMsgErreur.length > 0) {
    g_bFlag    = true;
    oChamp.focus();
    alert(sMsgErreur);
    sValRetour = sValeur;
  } else {
    g_bFlag    = false
  }
  return sValRetour;
} //Fin Fct_CtrlValeurNum
//  End -->
