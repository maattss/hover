module.exports = {
  overwrite: true,
  schema: [
    {
      'https://hover-server.herokuapp.com/v1/graphql': {
        headers: {
          'X-Hasura-Admin-Secret': process.env.ADMIN_SECRET,
        },
      },
    },
  ],
  documents: 'graphql/**/*.graphql',
  hooks: {
    afterOneFileWrite: 'prettier --write',
    afterAllFileWrite: 'prettier --write',
  },
  generates: {
    './types/fragmentMatcher.ts': {
      plugins: ['fragment-matcher'],
      config: {
        apolloClientVersion: 3,
      },
    },
    'types/types.ts': {
      plugins: [{ add: { content: '/* eslint-disable */' } }, 'typescript'],
    },
    './': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types/types.ts',
      },
      plugins: [{ add: { content: '/* eslint-disable */' } }, 'typescript-operations', 'typescript-react-apollo'],
      config: {
        gqlImport: '@apollo/client#gql',
        withHOC: false,
        withComponent: false,
        withHooks: true,
        immutableTypes: true,
        nonOptionalTypename: true,
        reactApolloVersion: 3,
        withMutationFn: false,
        withResultType: false,
        withMutationOptionsType: false,
      },
    },
  },
};
