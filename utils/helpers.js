
(function(global) {
    global.ENV = class {
        // process.env.NODE_ENV is set in .env file
        static get isDev() {
            return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';
        }
        static get isProd() {
            return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
        }
        static get isStage() {
            return process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'stage';
        }
    }
})(globalThis)



