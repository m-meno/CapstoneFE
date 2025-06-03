import axios from "axios";
import {useState, useEffect} from "react";
import PostForm from "../../components/Forms/PostForm";



export default function Homepage() {
    const [offers, setOffers] = useState([]);
    const [requests, setRequests] = useState([]);

    async function getAllOffers() {
        try {
            //defines endpoint for all offers
            let url = `http://localhost:3000/api/offers`;
            const res = await axios(url);
            let data = res.data;
            // updates offers state with fetched data
            setOffers(data)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

        async function getAllRequests() {
        try {
            //defines endpoint for all requests
            let url = `http://localhost:3000/api/requests`;
            const res = await axios(url);
            let data = res.data;
            // updates request state with fetched data
            setRequests(data)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        getAllOffers();
        getAllRequests();
    }, [])

    return (
        // <>
        // offers.map((offer)=>{
        //     return <Item offer={offer}/>
        // })

        // requests.map((request)=> {
        //     return <Item request={request}/>
        // })
        // </>
        <>
        <h1>Homepage</h1>
        <PostForm/>
        </>
    )


}



