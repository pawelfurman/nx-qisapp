module.exports = {
  name: 'database',
  exposes: {
    './Routes': 'apps/database/src/app/remote-entry/entry.routes.ts',
  },
};
