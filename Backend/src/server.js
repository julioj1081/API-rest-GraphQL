import {createYoga, createSchema} from 'graphql-yoga'
import fs from 'fs'
import path from 'path'
import resolvers from './graphql/resolvers'

const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql/schema.graphql'), 'utf-8')

export const yoga = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    })
})
