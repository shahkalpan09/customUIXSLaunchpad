# customUIXSLaunchpad
SAP HANA XS Custom (Fiori Like) Launchpad

Problems:<br/>
<ul>
<li>Having HANA XS Engine. ( As Fiori Launchpad plugin not available need for custom Launchpad type app required)</li>
<li>Single entry point was not available for all user or all same role based apps (Landing Page for role based user)</li>
<li>Provide group of tiles on basis of user role. </li>
<li>Getting details of logged in user.</li>
<li>Session management was difficult (Options for Login and Logout).</li>
</ul>

Solution:<br/>
<ul>
<li> Designed UI like Launchpad using unified Shell and other components.</li>
<li>Managed user role on backend using custom table and on basis of user role group of tiles are available on custom Launchpad.</li>
<li>Most important session management done by CSRF token (Debugged HANA XS session and applied same). </li>
</ul>

SCN Link :
https://blogs.sap.com/2016/05/01/fiori-custom-launchpad-for-hana-xs-with-session-management-login-and-logout/

Basic UI Designs: <br/>
<ul><li> Landing Page </li></ul>
<img src="https://blogs.sap.com/wp-content/uploads/2016/05/launchpad1_941795.png"/>

<ul><li> Individual Page </li></ul>
<img src="https://blogs.sap.com/wp-content/uploads/2016/05/launchpad2_941807.png"/>

<ul><li> Login Page </li></ul>
<img src="https://blogs.sap.com/wp-content/uploads/2016/05/launchpad_login_941809.png"/>

Happy Coding .. 🙂 Have a nice day (y)
