const {ClientError} = require('..')

module.exports = ()=>{
  throw new ClientError('Not Found', 404) 
}