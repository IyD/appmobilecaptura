<%-- 
    Document   : proxy
    Created on : 2/10/2012, 01:46:38 PM
    Author     : Rodrigo
--%>

    <%@page session="false"%> 
    <%@page contentType="text/html" pageEncoding="UTF-8"%>
    <%@page import="java.net.*,java.io.*,mx.unam.igg.gits.decode.Decode" %>


<%
        StringBuffer sbf = new StringBuffer();

        //Access the page
        try {

             URLDecoder ur = new URLDecoder();
     
             String reqUrl = request.getQueryString();  
          
              URL url2 = new URL(ur.decode((ur.decode(reqUrl.toString().substring(4), "UTF-8")), "UTF-8"));

                   URLConnection yc = url2.openConnection();

        BufferedReader in = new BufferedReader(new InputStreamReader(
                                    yc.getInputStream()));
                String inputLine;
                while ( (inputLine = in.readLine()) != null) sbf.append(inputLine);
                //out.println(inputLine);
                out.println(sbf.toString());
               // out.println("hola");
                in.close();
 
              
        
                               }catch(UnsupportedEncodingException f){
                             
       }

%>