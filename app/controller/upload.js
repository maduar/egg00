const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const conifg = require('../../config/config.default');
const Help = require('./help/util');

class UploadController extends Controller {
    async upload() {
        const stream = await this.ctx.getFileStream();

        const extname = path.extname(stream.filename).toLowerCase();
        const uuid = Help.create_uuid();
        const filename = uuid + extname;

        const images_path = 'app/public'
        const target = path.join(images_path, filename);
        const writeStream = fs.createWriteStream(target);

        const url_path = `http://${conifg.server_ip}:9999/images/${filename}`;

        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }

        this.ctx.body = {
            url_path: url_path
        };
    }
}

module.exports = UploadController;