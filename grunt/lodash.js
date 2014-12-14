module.exports = {
    'target': {
        'src': ['src/libs/lodash.build.js'],
        'dest': 'src/libs/lodash.build.js'
    },
    'options': {
//        'include': ['each', 'filter', 'map'],
//        'minus': ['result', 'shuffle'],
        exports: ['global']
    }
};