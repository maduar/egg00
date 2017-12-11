const Controller = require( 'egg' ).Controller;

class HomeController extends Controller {
    async index() {
        const { app, ctx } = this;
        const params = ctx.query;

        const id = params.id || -1;

        ctx.body = `Hello world, ${id}`;
    }

    async getId() {
        const { app, ctx } = this;
        const params = ctx.query;

        const id = params.id;
        if (!id) {
            return ctx.body = `wrong`;
        }

        return ctx.body = `Hello world ,,,, ${id}`
    }
}

module.exports = HomeController;
