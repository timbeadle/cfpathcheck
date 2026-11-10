<cfimport prefix="mp" taglib="test-template.cfm" />
<?xml version="1.0"?><xml:element />
<mp:nav />
<cfinclude template="test-script.cfm" />
<cfinclude template="./#request.id#.cfm" />
<cfinclude template="./" & request.id & ".cfm" />
<cfinclude template="/webroot/missing.cfm" />
<!--- @usage <usage:element /> --->
