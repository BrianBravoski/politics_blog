// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient,gql } from "graphql"


const graphqlAPI = process.env.NEXT_PUBLIC_POLITICS_ENDPOINT;


export default async function asynchandler(req, res) {
  // const {name, email, slug, comment} =req.body;

  const graphQLClient = new GraphQLClient (graphqlAPI, {
    headers:{
      authorization:`Bearer ${process.env.GRAPHCMS_TOKEN}`
    },
  }) ;

  const query = gql`
    mutation CreateComment ($name; String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post :{connect: {slug: $slug} } } ){ id }
    }
    `

    try {
      const result = await graphQLClient.request(query, {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        slug: req.body.slug,
      });
  
      return res.status(200).send(result);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
      
    }

    

  }