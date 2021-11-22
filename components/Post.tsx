import * as React from 'react'
import { ICounties, IPost } from '../types'

type Props = {
  post: ICounties
  // deletePost: (id: number) => void
}

const Post: React.FC<Props> = ({ post, /* deletePost */ }) => {
  return (
    <div className='Card'>
      <div className='Card--body'>
        <h1 className='Card--body-title'>{post.name}</h1>
        <p className='Card--body-text'>{post.name}</p>
      </div>
{/*       <button className='Card__button' onClick={() => deletePost(post.id)}>
        Delete
      </button> */}
    </div>
  )
}

export default Post