# Check if Java is installed
if (-Not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Host "Java not found. Installing..."
    # Add commands to install Java here, e.g., using Chocolatey:
    choco install openjdk-17
}

# Create a browser shortcut to access the app
$shortcutPath = "$env:USERPROFILE\Desktop\MyTaskApp.lnk"
$targetPath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$arguments = "http://localhost:8080"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($shortcutPath)
$Shortcut.TargetPath = $targetPath
$Shortcut.Arguments = $arguments
$Shortcut.IconLocation = "C:\Path\To\AppIcon.ico"
$Shortcut.Save()

Write-Host "Shortcut created on Desktop!"
