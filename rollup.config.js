export default {
    input: 'dist/index.js',
    output: {
      file: 'dist/bundles/capauthentication.umd.js',
      name: 'ng.capauthentication',
      globals: {
        '@angular/core': 'ng.core'
      },
      format: 'umd',
      sourceMap: false
    }
  }