import app from './app.js'
import knex from 'knex'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

class App {
    constructor() {
        http.createServer(app).listen(process.env.PORT, (err) => {
            if (err) return process.exit()
            console.log(`Server started on port ${process.env.PORT}`)
        })
        // this.db = knex({
        //     client: 'pg',
        //     connection: process.env.PG_CONNECTION_STRING,
        //     searchPath: ['knex', 'public'],
        // })
        // console.log('Knex_postgres: db connected')
    }
}

export default new App()
