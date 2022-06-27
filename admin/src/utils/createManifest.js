import { v4 } from "uuid";

export default function createManifest(hostname, username, jwt) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<OfficeApp 
        xmlns="http://schemas.microsoft.com/office/appforoffice/1.1" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:bt="http://schemas.microsoft.com/office/officeappbasictypes/1.0" 
        xsi:type="ContentApp">

<!-- Beginn mit Standardeinstellungen: Add-In-Metadaten, die für alle Versionen von Office verwendet werden, wenn keine Überschreibungen bereitgestellt werden. -->

<!-- WICHTIG: Die ID muss eindeutig für Ihr Add-In sein. Wenn Sie dieses Manifest erneut verwenden, stellen Sie sicher, dass Sie diese ID in eine neue GUID ändern. -->
<Id>${v4()}</Id>

<!--Die Version. Updates aus dem Store werden nur ausgelöst, wenn eine Versionsänderung vorliegt. -->
<Version>1.0.0.0</Version>
<ProviderName>${username} @ ${hostname}</ProviderName>
<DefaultLocale>de-DE</DefaultLocale>
<!-- Der Anzeigename Ihres Add-Ins. Er wird im Store und an verschiedenen Stellen in der Office-Benutzeroberfläche verwendet, z. B. im Dialogfeld "Add-Ins". -->
<DisplayName DefaultValue="YAARS" />
<Description DefaultValue="YAARS"/>
<!-- Das Symbol für Ihr Add-In. Es wird auf Installationsbildschirmen und im Dialogfeld "Add-Ins" verwendet. -->
<IconUrl DefaultValue="~remoteAppUrl/Images/Button32x32.png" />

<SupportUrl DefaultValue="http://www.contoso.com" />
<!-- Domänen, die beim Navigieren zulässig sind. Wenn Sie z. B. "ShowTaskpane" verwenden und dann ein href-Link auftritt, ist die Navigation nur zulässig, wenn sich die Domäne in dieser Liste befindet. -->
<AppDomains>
  <AppDomain>AppDomain1</AppDomain>
  <AppDomain>AppDomain2</AppDomain>
  <AppDomain>AppDomain3</AppDomain>
</AppDomains>
<!--Beendet die Standardeinstellungen. -->

<Hosts>
  <Host Name="Presentation" />
</Hosts>
<DefaultSettings>
  <SourceLocation DefaultValue="http://${hostname}:8002/?jwt=${jwt}" />
  <RequestedWidth>400</RequestedWidth>
  <RequestedHeight>400</RequestedHeight>
</DefaultSettings>

<Permissions>ReadWriteDocument</Permissions>

</OfficeApp>
    
    
    `;
}
