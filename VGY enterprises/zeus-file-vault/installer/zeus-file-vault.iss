[Setup]
AppName=Zeus Vault
AppVersion=1.0.0
DefaultDirName={autopf}\Zeus Vault
DefaultGroupName=Zeus Vault
OutputDir=Output
OutputBaseFilename=ZeusVault_Setup_v1.0.0
Compression=lzma
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64

[Dirs]
; Define the ProgramData directory for configurations and logs
Name: "{commonappdata}\Zeus Vault\config"; Permissions: everyone-modify
Name: "{commonappdata}\Zeus Vault\logs"; Permissions: everyone-modify
Name: "{commonappdata}\Zeus Vault\backups"; Permissions: everyone-modify
Name: "{commonappdata}\Zeus Vault\data"; Permissions: everyone-modify

[Files]
; The bundled node executable containing the backend and frontend assets
Source: "..\dist\server.cjs"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\dist\index.html"; DestDir: "{app}\dist"; Flags: ignoreversion
Source: "..\dist\assets\*"; DestDir: "{app}\dist\assets"; Flags: ignoreversion recurse subdirs createallsubdirs

[Run]
; Install as a Windows Service (using NSSM or similar in production)
; For now, we mock the service creation logic.
Filename: "{sys}\netsh.exe"; Parameters: "advfirewall firewall add rule name=""Zeus Vault API"" dir=in action=allow protocol=TCP localport=3000"; Flags: runhidden
Filename: "node.exe"; Parameters: """{app}\server.cjs"""; Flags: runhidden nowait

[Icons]
Name: "{group}\Zeus Vault Admin"; Filename: "http://localhost:3000"
Name: "{commondesktop}\Zeus Vault"; Filename: "http://localhost:3000"
