const config = {
    database: 'database',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        logging: false,
        storage: './database.sqlite',
        define: {
            underscore: true
        }
    }
}

module.exports = config;