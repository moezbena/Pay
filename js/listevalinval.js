function listevalinval_val(tf) {
	if(tf.listevalide.length>0){
	  for (i=0; i<tf.listevalide.length; i++) { 
	    tf.listevalide[i].checked = tf.tousaucunsval.checked; 
	  } 
	}else{
		tf.listevalide.checked = tf.tousaucunsval.checked;
	}
}
function listevalinval_inval(tf) {
	if(tf.listeinvalide.length>0){
	  for (i=0; i<tf.listeinvalide.length; i++) { 
	    tf.listeinvalide[i].checked = tf.tousaucunsinval.checked; 
	  } 
	}else{
		tf.listeinvalide.checked = tf.tousaucunsinval.checked;
	} 
}
function listeencsel_val(tf) {
	var elements = tf.getElementsByTagName('input');
 
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].type == 'checkbox' && elements[i].name == 'encsel_'+i) {
			elements[i].checked = tf.tousaucunenc.checked;
		}
	}
}
function listefacsel_val(tf) {
	var elements = tf.getElementsByTagName('input');
 
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].type == 'checkbox' && elements[i].name.substring(0, 7) == 'facsel_') {
			elements[i].checked = tf.tousaucunfac.checked;
		}
	}
}