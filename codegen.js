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
  documents: 'graphql/**/*.graphql',
  overwrite: true,
  hooks: {
    afterOneFileWrite: 'prettier --write',
    afterAllFileWrite: 'prettier --write',
  },
  generates: {
    'types/types.ts': {
      plugins: [{ add: { content: '/* eslint-disable */' } }, 'typescript'],
    },
    'types/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types.ts',
      },
      plugins: [
        { add: { content: '/* eslint-disable */' } },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        gqlImport: '@apollo/client#gql',
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
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
