module.exports = {
  schema: [
    {
      'https://hover.hasura.app/v1/graphql': {
        headers: {
          'X-Hasura-Admin-Secret': process.env.ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['./lib/queries/*.ts', './lib/mutations/*.ts'],
  overwrite: true,
  generates: {
    './types/graphQLTypes.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};
