const fs = require("fs")
const path = require("path")

// Freebuff Desktop (Windows 64-bit) installs here, e.g.
// C:\Users\<you>\AppData\Local\Programs\@codebufffreebuff-desktop\Freebuff.exe
function desktopExe() {
  const base = process.env.LOCALAPPDATA || process.env.PROGRAMFILES || ""
  return path.join(base, "Programs", "@codebufffreebuff-desktop", "Freebuff.exe")
}

module.exports = {
  version: "7.0",
  path: "plugin",
  title: "Freebuff Desktop",
  icon: "icon.png",
  description: "Open the current project in the Freebuff Desktop app (Windows 64-bit).",
  link: "https://freebuff.com/desktop",
  launch_type: "desktop",
  run: async () => {
    if (fs.existsSync(desktopExe())) {
      return [{
        method: "exec",
        params: {
          // Start-Process detaches the GUI so this step finishes immediately.
          // -WindowStyle Hidden avoids a console flash.
          message: "powershell -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -Command \"Start-Process -FilePath '" + desktopExe() + "' -ArgumentList '{{args.cwd}}'\"",
          path: "{{args.cwd}}"
        }
      }]
    }
    return [{
      method: "notify",
      params: {
        html: "Freebuff Desktop is not installed. Click to download it for Windows 64-bit.",
        href: "https://freebuff.com/api/desktop/download/windows",
        target: "_blank"
      }
    }]
  },
  uninstall: [{
    method: "fs.rm",
    params: {
      path: "."
    }
  }]
}
