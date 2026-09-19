module.exports = {
  version: "7.0",
  title: "Freebuff Desktop",
  icon: "icon.png",
  description: "The FREE coding agent for your desktop. Launches the Freebuff Desktop app (Windows 64-bit) in your current project.",
  link: "https://freebuff.com/desktop",
  path: "plugin",
  install: [{
    method: "shell.run",
    params: {
      message: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"$exe = Join-Path $env:LOCALAPPDATA 'Programs\\@codebufffreebuff-desktop\\Freebuff.exe'; if (Test-Path $exe) { Write-Output 'Freebuff Desktop is already installed.' } else { Start-Process 'https://freebuff.com/api/desktop/download/windows'; Write-Output 'Opening the Freebuff Desktop download page (Windows 64-bit). Please run the installer, then come back and press Run.' }\""
    }
  }],
  uninstall: [{
    method: "fs.rm",
    params: {
      path: "."
    }
  }],
  update: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }],
  run: [{
    method: "shell.run",
    params: {
      message: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"$exe = Join-Path $env:LOCALAPPDATA 'Programs\\@codebufffreebuff-desktop\\Freebuff.exe'; if (Test-Path $exe) { Start-Process -FilePath $exe -ArgumentList '{{args.cwd}}' } else { Start-Process 'https://freebuff.com/api/desktop/download/windows'; Write-Output 'Freebuff Desktop not found. Opening the Windows 64-bit download page. Please install it, then press Run again.' }\"",
      path: "{{args.cwd}}"
    }
  }]
}
