const config = {
    database: 'database',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: './database.sqlite',
        define: {
            underscore: true
        }
    }
}

module.exports = config;