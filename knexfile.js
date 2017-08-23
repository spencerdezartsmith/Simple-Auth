// export a connection
module.exports = {
  client: 'pg',
  connection: 'postgres://localhost:5432/auth_server',
  migrations: {
    directory: __dirname + '/db/migrations'
  }
}
