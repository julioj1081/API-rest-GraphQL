import {createServer} from 'http'
import {yoga} from './server'
import './database'

const server = createServer(yoga)

server.listen(3100, () => {
    console.log('server on port => ', 3100);
})
