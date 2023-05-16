<%@ page errorPage="/err/Erreur.jsp" pageEncoding="UTF-8"%>
<%@ include file="/local_inc/constantes.jspf" %>
<%  int edtSecLevelMin =  RUN_MIN ;

	String topTitle = "Traitement d'un Batch" ;
%>
<%@ include file="/inc/sec.jspf" %>
<%@ include file="/inc/jstl.jspf" %>
<%
	String app = request.getParameter("APP") ;
	String nom = request.getParameter("NOM") ;
%>
<%@ include file="/local_inc/connGEN.jsp" %>
<sql:query var="q0" dataSource="${GEN}">
    SELECT A.APPLI, A.NOM, A.TYPE, A.CLASS, A.TITRE, A.GROUPE, A.DATA
	  from JOBDEF A
   	 where A.APPLI = '<%=app%>'
   	   and A.NOM = '<%=nom%>'
</sql:query>

<%@ include file="/inc/top_min.jspf" %>

<table class="tbl0" width="100%">
        <c:forEach var="zz" items="${q0.rows}">
                <tr class=rsmall>
                                <th class=tdr>Application :</th><td><%=app%></td>
                                <th class=tdr>Groupe :</th><td><c:out value="${zz.GROUPE}" /></td>
                </tr>
                <tr class=rsmall><th class=tdr>Nom du job :</th><td><%=nom%></td>
                        <th class=tdr>Type :</th>
                        <td><c:set var="tp" value="${zz.type}" />
                        <c:choose>
                                        <c:when test='${tp == "B"}'>Etat Birt</c:when>
                                        <c:when test='${tp == "J"}'>Batch Java</c:when>
                                        <c:when test='${tp == "?"}'>Autre</c:when>
                   </c:choose>
                   </td>
                </tr>
                <tr class=rsmall><th colspan=4><c:out value="${zz.titre}"/></th></tr>
                <tr class=rsmall><td colspan=4><br/>
                  <form NAME="edt_1" action="run_job.jsp" method=GET>
                            <input type="hidden" value="<c:out value="${zz.appli}"/>"  name="__APP">
                            <input type="hidden" value="<c:out value="${zz.nom}"/>"   name="__NOM">
                            <input type="hidden" value="<c:out value="${zz.CLASS}"/>"  name="__FILE">
                            <c:out value="${zz.data}" escapeXml="false"/><br/>
                            <center><input class="fBtSb" type=submit name="ok" value=" Executer "></center>
                  </form>
                </td></tr>
        </c:forEach>
</table>

<%@ include file="/inc/bottom_min.jspf" %>