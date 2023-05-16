
function validateAndInsert(theform) {
	theform.action.value="<%=PAYESTAE.ACTION_INSERT%>";
	theform.submit(); 
}
function onlySelect(theform) {
	theform.action.value="<%=PAYESTAE.ACTION_SELECT%>";
	theform.submit(); 
}
function validateAndUpdate(theform) {
	if(confirm('Voulez-vous vraiment modifier cet enregistrement ?')) {
		theform.action.value="<%=PAYESTAE.ACTION_UPDATE%>";
		if (theform.action.value == "U")
		{
			theform.submit();
		}
	}  
}
function confirmAndDelete(theform) {
	if(confirm('Voulez-vous vraiment supprimer cet enregistrement ?')) {
		theform.action.value="<%=PAYESTAE.ACTION_DELETE%>";
		if (theform.action.value == "D")
		{
			theform.submit();
		}
	}  
}
function confirmAndUpdate(theform) {
	if(confirm('Attention vous allez modifier la date de fin effet ?')) {
		theform.action.value="<%=PAYESTAE.ACTION_FERMER%>";
		if (theform.action.value == "F")
		{
			theform.submit();
		}
	}  
}
function effacEcran(theform) {
	theform.action.value = "";
	theform.affiche.value = ""; 
	theform.submit();  
}
function onlySubmit(theform) {
	theform.submit(); 
}

