import { join } from 'path';
import telescope from '@osmonauts/telescope';
import { sync as rimraf } from 'rimraf';

const protoDirs = [join(__dirname, '/../../../__fixtures__/chain1')];
const outPath = join(__dirname, '/../src/codegen');
rimraf(outPath);

telescope({
  protoDirs,
  outPath,
  options: {
    removeUnusedImports: true,
    interfaces: {
      enabled: true,
      useUnionTypes: false
    },
    prototypes: {
      addTypeUrlToDecoders: true,
      excluded: {
        packages: ['cosmos.group.v1']
      },
      methods: {
        fromJSON: false,
        toJSON: false
      },
      parser: {
        keepCase: false
      },
      typingsFormat: {
        duration: 'duration',
        timestamp: 'date',
        useExact: false
      }
    },
    aminoEncoding: {
      enabled: true,
      useRecursiveV2encoding: true
    },
    lcdClients: {
      enabled: true
    },
    rpcClients: {
      enabled: true,
      camelCase: true
    },
    reactQuery: {
      enabled: true
    },
    packages: {
      osmosis: {
        classesUseArrowFunctions: true
      }
    }
  }
})
  .then(() => {
    console.log('✨ all done!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
