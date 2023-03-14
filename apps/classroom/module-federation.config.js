module.exports = {
  name: 'classroom',
  exposes: {
    './Routes': 'apps/classroom/src/app/remote-entry/entry.routes.ts',
  },
};
