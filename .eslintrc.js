module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:node/recommended'
  ],
  'plugins': ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  'rules': {
    'prettier/prettier': 'error',
    'node/no-unsupported-features/es-syntax': ['error', {
      'version': '>=8.3.0',
      'ignores': ['modules', 'destructuring']
    }],
    'space-before-function-paren': ['error', {
      'anonymous': 'ignore',
      'named': 'ignore',
      'asyncArrow': 'ignore'
    }],
    "node/no-missing-import": ["error", {
      "allowModules": ["graphql", "config", "utils", "validations"],
      "resolvePaths": ["/src"],
      "tryExtensions": [".js"]
  }]
  }
}
