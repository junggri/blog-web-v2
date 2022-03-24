import {gql} from "@apollo/client";

export const tag_fragment = `
    fragment tagBody on Tag{
        hashId
        createdAt
        updatedAt
        tag
    }
`;

export const like_fragment = `
   fragment likeBody on Likes{
        hashId
        createdAt
        updatedAt
   }
`;

export const reply_fragment = `
   fragment replyBody on Reply{
      id
      createdAt
      bgroup
      sorts
      depth
      comment
      writer
      hashId
      postId
      parentId
   }
`;

export const hit_fragment = `
   fragment hitBody on Hit{
      createdAt
      updatedAt
      hashId
   }
`;

export const post_fragment = `
   ${hit_fragment}
   ${reply_fragment}
   ${tag_fragment}
   ${like_fragment}
   fragment postBody on Post {
      hashId     
      title
      desc
      content
      thumbnail
      createdAt
      updatedAt
      open
      hit {
         ...hitBody
      }
      reply{
         ...replyBody
      }
      tag{
        ...tagBody
      }
      likes{
         ...likeBody
      }
   }
`;


export const GET_POSTS = gql`
   ${post_fragment}
   query gql($data : PaginationInput!) {
      posts(data : $data){
         leftCount
         edges{
            cursor
            node{
               ...postBody
            }
         }
         pageInfo{
            endCursor
            hasNextPage
         }
      } 
   }   
`;

export const GET_POST = gql`
   ${post_fragment}
   query gql($data : HashIdInput!) {
      post(data : $data){
         ...postBody
      } 
   }   
`;

export const GET_HASHIDS = gql`
   query gql{
      getHashIdsToBuild{
         hashIds  
      }
   }
`;

export const GET_TAG_RELATION = gql`
   query gql{
      getTags{
         tag
         id
         hashId
         post{
            hashId     
            title
            desc
            content
            thumbnail
            createdAt
            updatedAt
            open
         }         
      }
   }
`;

export const GOOGLE_API_VISITOR = gql`
   query gql{
      getVisitor{
         totalsForAllResults{
            user
            session
         }
         rows
      }
   }
`;

export const VALIDATE = gql`
   query gql{
      validate
   }
`;

export const YOUTUBE = gql`
   query gql($data : YoutubeInput!){
      getVideos(data:$data){
          nextPageToken
          data
      }
   }
`;

export const GET_LIST = gql`
   query gql{
      getLikeList
   }
`

export const IS_SUBSCRIBE_USER = gql`
   query gql{
      isSubscribe
   }
`