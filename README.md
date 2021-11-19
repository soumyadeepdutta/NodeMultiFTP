# NodeFTP

Read Write file to multiple FTP server with NodeJS/Express.

### Configuration

```console
git clone https://github.com/soumyadeepdutta/NodeMultiFTP.git
cd NodeMultiFTP
npm install
```

Change FTP server configuration in helper.js

```javascript
const FTP_HOST = "192.168.0.6";
const FTP_USER = "nodeftp";
const FTP_PASSWORD = "nodeftppassword";
const FTP_SECURE = false;
const FTP_VERBOSE = false;
const FTP_PATH = "/ftp/upload/path";
```

Run with node or nodemon.

```console
node index.js
```

Default port is set to 3000. Check and change code accordingly.
