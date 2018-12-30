module.exports = {
  lintOnSave: true,
  pluginOptions: {
    electronBuilder: {
      build: {
        appId: "com.theawkwardprogrammer.tagmania",
        win: {
          icon: '',
        }
      },
      chainWebpackMainProcess: config => {
        // Chain webpack config for electron main process only
      },
      chainWebpackRendererProcess: config => {
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin('define').tap(args => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      },
    }
  }
}
