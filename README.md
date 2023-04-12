iFaxity/wait-on-action
======================

A GitHub Actions wrapper for the [wait-on](https://npmjs.com/package/wait-on)


Inputs
------

### `resource`

**Required**  Resources types are defined by their prefix, if no prefix is
present, the resource is assumed to be of type 'file'

resource prefixes are:

* `file`      - regular file (also default type). ex: file:/path/to/file

* `http`      - HTTP HEAD returns 2XX * response. ex: http://m.com:90/foo

* `https`     - HTTPS HEAD returns 2XX response. ex: https://my/bar

* `http-get`  - HTTP GET returns 2XX response. ex: http://m.com:90/foo

* `https-get` - HTTPS GET returns 2XX response. ex: https://my/bar

* `tcp`       - TCP port is listening. ex: 1.2.3.4:9000 or foo.com:700

* `socket`    - Domain Socket is listening. ex: socket:/path/to/sock
                   For http over socket, use http://unix:SOCK_PATH:URL_PATH
                   like http://unix:/path/to/sock:/foo/bar or
                        http-get://unix:/path/to/sock:/foo/bar
### `config`

js or json config file, useful for http(s) options

### `delay`

Initial delay before checking for resources in ms, default 0

### `httpTimeout`

Maximum time in ms to wait for an HTTP HEAD/GET request, default 0
    which results in using the OS default

### `interval`

Interval to poll resources in ms, default 250ms

### `log`

Log resources begin waited on and when complete or errored

### `reverse`

Reverse operation, wait for resources to NOT be available

### `simultaneous`

Simultaneous / Concurrent connections to a resource, default Infinity
Setting this to 1 would delay new requests until previous one has completed.
Used to limit the number of connections attempted to a resource at a time

### `timeout`

Maximum time in ms to wait before exiting with failure (1) code, default Infinity

### `tcpTimeout`

Maximum time in ms for tcp connect, default 300ms

### `verbose`

Enable debug output to stdout

### `window`

Stability window, the time in ms defining the window of time that
resource needs to have not changed (file size or availability) before
signalling success, default 750ms. If less than interval, it will be
reset to the value of interval. This is only used for files, other
resources are considered available on first detection.


Example usage
-------------
```yaml
uses: iFaxity/wait-on-action
with:
  resource: http://localhost:8080
```
