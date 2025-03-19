module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/app/tests'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    }
  };