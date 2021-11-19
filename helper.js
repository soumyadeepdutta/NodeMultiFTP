const ftp = require("basic-ftp")

const upload_path = __dirname + '/uploads/';

// ftp configuration
const FTP_HOST = '192.168.0.6';
const FTP_USER = 'nodeftp';
const FTP_PASSWORD = 'node@ftp12';
const FTP_SECURE = false;
const FTP_PATH = '/ftp/upload/'

async function upload(file) {
    try {
        console.log('uploading ' + file.name);
        await file.mv(upload_path + file.name);
        await upload_to_ftp_server(file)

        console.log('uploaded ' + file.name);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

async function upload_to_ftp_server(file) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASSWORD,
            secure: FTP_SECURE
        })
        await client.uploadFrom(upload_path + file.name, FTP_PATH + file.name);
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

// upload_to_ftp_server()

module.exports = upload;