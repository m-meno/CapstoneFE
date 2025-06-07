import {createContext, useContext, useState} from "react";

const PostListContext = createContext();

export default function PostListProvider({children}){
    const [postList, setPostList] = useState(null);

    let removeFromPostList = (id) => {
        setPostList((l)=> l.filter((el)=> el._id !== id))
    };

    let getType = (type) => {
        return postList.filter((l) => l.type == type)
    };

    let updatePostList = (id, newUpdate) => {
        let updatedPostList = postList.map((post)=> {
            if(post._id == id){
                return newUpdate;
            }
            return post;
        });
        setPostList(updatedPostList)
    };
    let addToPostList = (newPost)=> {
        let newPostItem = [...postList, newPost];
        setPostList(newPostItem)
    };

    return(
        <PostListContext.Provider
            value={(
                postList,
                setPostList,
                removeFromPostList,
                getType,
                updatePostList,
                addToPostList
            )}
            >
            {children}
            </PostListContext.Provider>
    );
}

    export function usePostList(){
        return useContext(PostListContext)
    }

