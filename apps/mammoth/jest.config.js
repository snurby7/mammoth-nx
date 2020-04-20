module.exports = {
  name: 'mammoth',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mammoth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
