const fs = require('fs-extra')
const concat = require('concat')

build = async () => {
    const files = [
        './dist/vet-records/runtime.js',
        './dist/vet-records/polyfills.js',
        './dist/vet-records/main.js'
    ]

    await fs.ensureDir('vetrecords')
    await concat(files, 'vetrecords/component.js')
    await fs.copyFile(
        './dist/vet-records/styles.css',
        'vetrecords/styles.css'
    )
    await fs.copyFile(
        './dist/vet-records/index.html',
        'vetrecords/index.html'
    )
}

build()