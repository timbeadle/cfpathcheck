<cfimport prefix="mp" taglib="../extensions/customtags/" />
<cfimport prefix="common" taglib="../../extensions/customtags/common" />

<cfimport prefix='foobar' taglib='../ctags/foobar/' />

<cfif structkeyexists(url,"topcat_name_urlsafe")>
	<cfif variables.topcat.recordcount>
		<mp:nav>
			<mpx:foobar />
		</mp:nav_new>
	<cfelse>
		<cfinclude template="missing.cfm" />
	</cfif>
<cfelse>
	<cfinclude template="missing.cfm" />
	<foo:bar /><baz:smeg />

	<foo:barbaz />
</cfif>

<cfinclude template='missing.cfm' />

<cfscript>
include 'missing.cfm';
</cfscript>
