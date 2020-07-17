const core = require('@actions/core');
const waitOn = require('wait-on');

function numberInput(name, def) {
  const num = parseInt(core.getInput(name));
  return def != null && isNaN(num) ? def : num;
}
function booleanInput(name) {
  return core.getInput(name).toLowerCase() == 'true';
}

async function main() {
  const resource = core.getInput('resource', { required: true }).split(' ');
  const config = core.getInput('config');
  const delay = numberInput('delay');
  const httpTimeout = numberInput('httpTimeout');
  const interval = numberInput('interval');
  const log = booleanInput('log');
  const reverse = booleanInput('reverse');
  const simultaneous = numberInput('simultaneous', Number.POSITIVE_INFINITY);
  const timeout = numberInput('timeout');
  const tcpTimeout = numberInput('tcpTimeout');
  const verbose = booleanInput('verbose');
  const window = numberInput('window');

  let defaults = {};
  if (config) {
    defaults = require(config);
  }

  const opts = {
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
    core.debug('Successfully waited for resources to become accessible');
  } catch(ex) {
    core.setFailed(ex);
  }
}

main();
