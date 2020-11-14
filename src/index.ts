import path from "path";
import container from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import IConstants from "./constants/interfaces/IConstants";
import Types from './constants/Types';
import saleControllerFactory from "./app/controllers/SaleController";


const constants = container.get<IConstants>(Types.Constants);


(async () => {

    // TODO database connetc
    try {
        await Promise.all([
        ]);
    } catch(e) {
        // if (customErrorsGenerator.isCustomError(e)) {
        //     e.statusCode = customErrorsGenerator.types[e.type]
        // }
        // console.log('hello');

        console.error(e);
        process.exit(1);
    }

    saleControllerFactory(container);

    const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });
    server.setConfig((app) => {

        app.use((req, res, next) => {
            console.log('info', req.path);
            next();
        })
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: '2mb'
        }));
        app.use((req, res, next) => {
            if (req.body?.id) req.body.id = parseInt(req.body.id);
            next();
        });

    });

    let app = server.build();


    app.use('/api*', (req, res) => {
        res.status(404).send({error: 'not found path'});
    });
    app.use('*', (req, res) => {
        console.log('req.url', req.url);
        console.log('req.baseUrl', req.baseUrl);
        console.log('req.path', req.path);

        let pathToRedirect = `/#${req.baseUrl}`;
        console.log('path to redirect', pathToRedirect);

        res.redirect(pathToRedirect);
    });



    app.listen(constants.port, async () => {
       console.log('info', `Server running on port ${constants.port}`);

    });

})();
