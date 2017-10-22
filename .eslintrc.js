module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true
    },
    "rules": {
      "prefer-destructuring": ["error", {
        "array": false,
        "object": false
      }],
      "no-restricted-globals": [
        "error",
        "event",
        "fdescribe",
      ],
      "no-underscore-dangle": [
        "error",
        { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] },
      ]
    }
};
