

export default function Post({post}){
    return(
        <div>
            <img src={post.url}/>
            <h3>{post.title}</h3>
            <h4>{post.location}</h4>
            <p>{post.description}</p>
            <button>Favorite</button>
        </div>
    )
}