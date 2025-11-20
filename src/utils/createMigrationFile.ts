import fs from 'fs';
import prettier from 'prettier';
import { IMigrationOptions } from '../types';
import { makeFilename, writePromise } from './fileHelper';

export const createMigrationFile = async (
  commands: string,
  meta: string,
  options: IMigrationOptions,
) => {
  const filename = makeFilename(options, meta);
  const migrationDir = options.outDir || './migrations';

  if (!fs.existsSync(migrationDir)) {
    fs.mkdirSync(migrationDir);
  }

  return writePromise(
    `${migrationDir}/${filename}`,
    await prettier.format(commands, {
      parser: 'typescript',
      ...options.prettierOptions,
    }),
  );
};
