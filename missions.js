const {ApolloServer,gql} =require('apollo-server');
const {buildFederatedSchema} =require('@apollo/federation');
const fetch = require('node-fetch');

const port = process.env.PORT || 4002;
const apiUrl = process.env.API_URL || 'http://localhost:3000';

const typeDefs = gql`
    type Mission {
        id: ID!
        crew: [Astronaut]
        designation: String!
        startDate: String
        endDate: String
    }

    extend type Astronaut @key(fields:"id") {
        id: ID! @external
    }
    extend type Query {
        mission(id:ID!): Mission
        missions: [Mission]
    }
`;
const resolvers = {
    Mission:{
        crew(mission){
            return mission.crew.map(id=>({__typename:'Astronaut',id}));
        }
    },
    Query:{
        mission(_,{id}){
            return fetch(`${apiUrl}/missions/${id}`).then(res=>res.json());
        },
        missions(){
            return fetch(`${apiUrl}/missions`).then(res=>res.json());
        }
    }
}
const server = new ApolloServer({
    schema:buildFederatedSchema([{typeDefs,resolvers}])
});

server.listen({port}).then(({url})=>{console.log('Mission Server ready at '+ url)}).catch(err=>{});