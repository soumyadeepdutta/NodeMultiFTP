const ftp = require("basic-ftp");
const { readFile } = require("fs/promises")

const upload_path = __dirname + '/uploads/';

// ftp configuration
const FTP_HOST = '192.168.0.6';
const FTP_USER = 'nodeftp';
const FTP_PASSWORD = 'node@ftp12';
const FTP_SECURE = false;
const FTP_VERBOSE = false
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

async function download(filename) {
    try {
        let file = await check_locally_exists(upload_path + filename);

        // console.log('searching for ' + upload_path + filename);
        // console.log('is locally present ' + file);

        if (!file) {
            await download_from_ftp_server(filename);
            file = await check_locally_exists(upload_path + filename);
            if (!file) return null;
        };
        return upload_path + filename;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function check_locally_exists(filename) {
    try {
        let file = await readFile(filename);
        if (file) return true;
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function upload_to_ftp_server(file) {
    const client = new ftp.Client()
    client.ftp.verbose = FTP_VERBOSE
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

async function download_from_ftp_server(filename) {

    // console.log('downloading from FTP');

    const client = new ftp.Client()
    client.ftp.verbose = FTP_VERBOSE
    try {
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASSWORD,
            secure: FTP_SECURE
        })
        await client.downloadTo(upload_path + filename, FTP_PATH + filename);
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}
// upload_to_ftp_server()

module.exports = { upload, download };