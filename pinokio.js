module.exports = {
  version: "8.0.0",
  path: "plugin",
  title: "Freebuff Desktop",
  icon: "icon.png",
  description: "Open the current project in the Freebuff Desktop app (Windows 64-bit).",
  link: "https://freebuff.com/desktop",
  launch_type: "desktop",
  run: [{
    method: "app.launch",
    params: {
      app: "Freebuff",
      args: ["{{args.cwd}}"],
      install: "https://freebuff.com/api/desktop/download/windows"
    }
  }]
}
