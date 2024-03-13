module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: 'usage',
      corejs: 3, 
    }]
  ],
  plugins: [
    "@babel/plugin-transform-private-methods",
    "@babel/plugin-proposal-class-properties"
  ]
};
