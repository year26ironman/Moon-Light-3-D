import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

import {
  Contract,
  ledger,
  pureCircuits,
  type ImpureCircuits,
  type Ledger,
  type PureCircuits,
} from './managed/scholarship/contract/index.js';

export {
  Contract,
  ledger,
  pureCircuits,
  type ImpureCircuits,
  type Ledger,
  type PureCircuits,
};

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));

export const zkConfigPath = path.resolve(
  moduleDirectory,
  'managed',
  'scholarship',
);

export const CompiledScholarshipContract = CompiledContract.make(
  'ScholarshipContract',
  Contract,
).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);
