<%@ page language="java" buffer="8kb" errorPage="/err/Erreur.jsp" pageEncoding="UTF-8" %>
<%@ include file="/local_inc/constantes.jspf" %>
<%    int edtSecLevelMin =  BATCH_MIN ;

String  topTitle = "Consultation des Travaux BATCH" ;
%>
<%@ include file="/inc/sec.jspf" %>
<% _igroup = 5 ; 
 response.sendRedirect("lst_job2.jsp");
%>
