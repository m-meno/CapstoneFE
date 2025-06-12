import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TypePage.module.css"

export default function TypePage() {
    const { type } = useParams();
    const nav = useNavigate();

    const [posts, setPosts] = useState(null);

    async function getTypePosts() {
        try {
            const url = `http://localhost:3000/api/post`
            let res = await axios(url);
            let posts = res.data.filter((post) => post.type === type)
            setPosts(posts)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getTypePosts();
    }, [type])

    const typeOffer = type === "Offer"

    function displayPosts() {
        return (
            <div className={styles.grid}>
                {posts.map((post) => (

                    <Card key={post._id} post={post} />

                ))}
            </div>
        )
    }

    function handleFilter(e) {
        if (e.target.value) nav(`/type/${e.target.value}`);
        else nav("/")
    }
    return (
        <>
            <div className={styles.page}>
            {typeOffer ? (
                <h1>Offers</h1>) : (
                <h1>Requests</h1>
            )}
            <div className={styles.container}>
                <div className={styles.filterBar} >
                    <label>
                        <strong>Filter By:</strong>
                        <select className={styles.select} onChange={handleFilter}>
                            <option value="">...</option>
                            <option value="Offer">Offers</option>
                            <option value="Request">Requests</option>
                        </select>
                    </label>
                </div>

                {posts ? displayPosts() : <h3>Loading...</h3>}
            </div>
            </div>
        </>
    )
}