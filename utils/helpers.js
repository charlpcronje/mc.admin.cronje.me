
(function(global) {
    global.isDev = ()=> {
        return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';
    }
    
    global.isProd = ()=> {
        return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
    }
    
    global.isStage = ()=> {
        return process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'stage';
    }
})(globalThis)



