<%@ page language="java" contentType="text/html" pageEncoding="utf-8" isErrorPage="true"%>
<%@ include file="../local_inc/constantes.jspf" %>
<jsp:useBean id="infU" scope="session" class="mc.gouv.Notes.readInfoUser" />
<html>
<HEAD>
<script language="JavaScript" type="text/javascript">
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
</script>
<link rel="stylesheet" type="text/css" href="<%=webjarXwlibUrl%>/err/erreur.css" />
</HEAD>
<%@ page isErrorPage="true"  %>
<BODY class='global'>

<table border=0 width="100%" cellpadding="0" cellspacing="0"  bgcolor="#B92228"><tbody>
<tr><td align=left width="111" valign="top" rowspan="3"><img src="<%=webjarXwlibUrl%>/err/img/fond_gouv1.gif" border="0" ></td>
	<td align=left background="<%=webjarXwlibUrl%>/err/img/tback.gif" valign="top" ><img src="<%=webjarXwlibUrl%>/err/img/fond_gouv.jpg"  border="0" ></td>
</tr>
<tr id="TIT_HOM" ><td align=center valign=top >Erreur Applicative</td></tr>
<tr height="2" bgcolor="white"><td></td></tr></tbody>
</table>

<table border=0 width="100%" cellpadding="0" cellspacing="0"  bgcolor="#FFFFF"><tbody>
<tr  valign="top" ><td align=left width="391">
	<img src="<%=webjarXwlibUrl%>/err/img/fond_arc2.png" border="0" ID="NoPrint">
</td>
<td align=left width="*">
<table border=0 width="100%" style="font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 13px;margin-right: 15px ;">
<tr  valign="top">
	<td><br><br>
  Une erreur est survenue dans le traitement de votre requ&egrave;te.<br/>
  Nous vous invitons &agrave; Re-essayer et dans le cas d'erreur persistante &agrave; contacter le service informatique.
  <hr/>
  <center>
        <a href="javascript:history.go(0);">Essayer &agrave; nouveau !</a><br/>
        <a href="javascript:history.go(-1);">Page pr&eacute;c&eacute;dente.</a><br/>
        <br/>
        <a href="/logon">Proc&eacute;dure de connexion</a><br/>
  </center>
  
<small><a href="javascript:onoff_g('trace')">trace</a></small>    
</td></tr>
<% if (infU != null) { %>
<tr><td>
Votre Profil :
<ul> 
<li>Opid : <%=infU.getOpid() %></li>
<li>Nom  : <%=infU.getNom() %></li>
<li>User : <%=infU.getUser() %></li>
<li>Zoom : <%=infU.getProfil() %></li>
<li>Appl : <%=infU.getAppli() %></li>
</ul>
</td></tr>
<% } %>
<tr id="GRP_trace" style="display: none">
<td bgcolor="#FFFF90">
<div id="NoPrint">
    Trace de l'erreur :
<%
    if (exception == null) {
	out.println("<p>Je ne trouve pas de probleme...<p>");
    }
    else {
%>
    <p>
    The name of the exception was:
    <%= exception.toString() %>
    <p>
    The message of the exception was:
    <%= exception.getMessage() %>
    <p>

	The stack trace was:<br>
	 <pre>
    <% 
	 // damn ugly Java, CLOS was an OO language not this faschist crap.
	 java.io.PrintWriter outstream = new java.io.PrintWriter(out);
         exception.printStackTrace(outstream);
    }
%>
    </pre>
</div>
</td></tr>
</table>
</td></tr></tbody></table>

<table class="copyright" width="98%">
   <tr>
    <td width="58%" align="center">
		Copyright &copy; 2007...2022 <a href="http://www.gouv.mc"><b>Gouvernement de Monaco</b></a><br>
	</td>
   </tr>
  </table>
<%@ include file="/inc/piwik.jspf"%>
  </body>
</html>
