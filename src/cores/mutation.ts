import {gql} from "@apollo/client";
import {post_fragment} from "~/cores/query";

export const CREATE_VISIT = gql`
  mutation gql($data : VisitInput!){
    createVisit(data : $data)
  }
`;

export const UPSERT_REPLY = gql`
  mutation gql($data : ReplyCreateInput!){
    upsertReply(data:$data){
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
  }
`;


export const CREATE_HIT = gql`
  mutation gql($data : HitInput!){
    createHit(data : $data)
  }
`;

export const UPSERT_TAG = gql`
  mutation gql($data : TagInput!){
    upsertTag(data:$data){
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
`

export const UPSERT_POST = gql`
  ${post_fragment}
  mutation gql($data : PostInput!, $file : Upload!){
    upsertPost(data : $data, file : $file){
      ...postBody
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation gql($data : MessageInput!){
    createMessage(data:$data)
  }
`

export const LOGIN_PROCESS = gql`
  mutation gql($data : UserInput!){
    login(data : $data){
      access_token
    }
  }
`

export const CREATE_LIKE = gql`
  mutation gql($data : LikeInput!){
    createLike(data : $data)   
  }
`

export const SUBSCRIBE = gql`
  mutation gql($data: SubscribeInput!){
    subscribe(data: $data){
      name
      email
      phoneNumber
    }
  }
`

export const UNSUBSCRIBE = gql`
  mutation gql{
    unsubscribe
  }
`