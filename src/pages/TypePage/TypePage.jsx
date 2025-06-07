import {useParams} from "react-router-dom";
import Card from "../../components/Card/Card";
import {useEffect, useState} from "react";

export default function CategoryPage(){
    const {category} = useParams();
    
    const [items, setItems] = useState(null);
    return(
        <h1>Posts of type</h1>
    )
}