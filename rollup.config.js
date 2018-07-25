export default {
    input: 'dist/index.js',
    output: {
      file: 'dist/bundles/capauthorization.umd.js',
      name: 'ng.capauthorization',
      globals: {
        '@angular/core': 'ng.core'
      },
      format: 'umd',
      sourceMap: false
    }
  }