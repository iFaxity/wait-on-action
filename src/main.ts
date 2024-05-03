import { debug, getInput, setFailed } from '@actions/core';
import waitOn, { WaitOnOptions } from 'wait-on';

function numberInput(name: string) {
  const value = getInput(name);

  if (value) {
    return parseInt(value);
  }
}

function booleanInput(name: string) {
  return getInput(name).toLowerCase() == 'true';
}

async function main() {
  const resource = getInput('resource', { required: true }).split(' ');
  const config = getInput('config');
  const delay = numberInput('delay');
  const httpTimeout = numberInput('httpTimeout');
  const interval = numberInput('interval');
  const log = booleanInput('log');
  const reverse = booleanInput('reverse');
  const simultaneous = numberInput('simultaneous');
  const timeout = numberInput('timeout');
  const tcpTimeout = numberInput('tcpTimeout');
  const verbose = booleanInput('verbose');
  const window = numberInput('window');

  let defaults: Partial<WaitOnOptions> = {};
  if (config) {
    defaults = require(config);
  }

  const opts: WaitOnOptions = {
    ...defaults,
    resources: Array.isArray(resource) ? resource : [resource],
    delay,
    httpTimeout,
    interval,
    log,
    reverse,
    simultaneous,
    timeout,
    tcpTimeout,
    verbose,
    window,
  };

  try {
    // Usage with async await
    await waitOn(opts);
    debug('Successfully waited for resources to become accessible');
  } catch (ex) {
    const err = ex instanceof Error ? ex : String(ex);
    setFailed(err);
  }
}

main();
