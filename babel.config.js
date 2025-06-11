module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [ // Add this 'plugins' array
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@navigation': './navigation',
            '@screens': './screens',
            '@services': './services',
            '@store': './store',
            '@types': './types',
          },
        },
      ],
    ],
  };
};