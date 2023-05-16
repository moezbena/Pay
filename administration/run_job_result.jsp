<%@ page language="java" buffer="8kb" errorPage="/err/Erreur.jsp" pageEncoding="UTF-8" %>
<%@ page import="mc.gouv.batch.JobdefTbl" %>
<%@ page import="mc.gouv.Notes.readInfoUser" %>
<%@ include file="/local_inc/constantes.jspf" %>
<%  int edtSecLevelMin =  RUN_MIN ;
	String topTitle = "Traitement d'un Batch" ;
%>
<%@ include file="/inc/sec.jspf" %>
<%
	readInfoUser infoUser = (readInfoUser)request.getAttribute("infU");
	JobdefTbl job = (JobdefTbl)request.getAttribute("job");
	String params = (String)request.getAttribute("params");
	String stdOut = (String)request.getAttribute("stdOut");
	String stdErr = (String)request.getAttribute("stdErr");
	int exitValue = (Integer)request.getAttribute("exitValue");
%>

<%@ include file="/inc/top_min.jspf" %>

<table class="tbl0" width="100%">
<tr class=rsmall><th class=tdr>Application</th><th><%=job.getAppli()%></th></tr>
<tr class=rsmall><th class=tdr>Job</th><th><%=job.getNom()%></th></tr>
<tr class=rsmall><th class=tdr>Demandeur</th><th><%=infoUser.getOpid()%></th></tr>
<tr class=rsmall><th class=tdr>Script</th><th><%=job.getClasse()%></th></tr>
<tr class=rsmall><th class=tdr>Param&egrave;tres</th><th><%=params%></th></tr>
<tr><th>Code retour</th><td><%= exitValue %></td></tr>
</table>

<h2>Sortie standard</h2>
<pre>
<%= stdOut %>
</pre>

<h2>Sortie d'erreur</h2>
<pre>
<%= stdErr %>
</pre>
<%@ include file="/inc/bottom_min.jspf" %>

