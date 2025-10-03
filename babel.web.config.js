module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'not dead', 'not ie <= 11'],
        },
        modules: false,
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    'babel-plugin-react-native-web',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          'react-native': 'react-native-web',
        },
      },
    ],
  ],
};
