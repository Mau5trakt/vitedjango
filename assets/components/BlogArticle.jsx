import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import DOMPurify from "dompurify";


const BlogArticle = () => {
    const {slug} = useParams()
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchArticle = async () =>{
            try{
             const response = await axios.get(`/api/articles/${slug}`)
                const data = response.data;
                setArticle(data);
                const cleanHTML = DOMPurify.sanitize(article.body)


            } catch (error){
                console.error("Error fetching article: ", error)
            } finally {
                setLoading(false)
            }
        }
        fetchArticle()
    }, [slug])

    if (loading) return <div> Loading ... </div>;
    if (error) return <div> Error getting the data </div>;
    if (!article) return null;

    return(

        <div className="relative flex flex-col gap-4">
            <div
                className="sticky top-0 h-48 flex flex-col justify-end"
                style={{ backgroundColor: article.color }}
            >
                <h2 className="text-4xl font-bold">{article.title}</h2>
                <p className="mt-2"> {article.tags.join(" ,")}  </p>
            </div>
            <div className="sticky top-0 h-1024 flex flex-col bg-[#2c2c2c] text-white p-4">
               <h2> Algo </h2>
            </div>


        </div>

        /*<>
            <div className="relative flex flex-col gap-4">
            <div className="sticky top-0 h-48  flex flex-col justify-end"
                 style={{ backgroundColor: article.color }}
                >
                <h2 className="text-4xl font-bold"> {article.title} </h2>
                <p className="mt-2"> {article.tags.join(", ")}  </p>
            </div>

            <h1> {article.title} </h1>
            <h3>
                {article.tags.join(', ')}
            </h3>
            <div> {article.color} </div>
            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body)}}
            >

            </div>
            </div>
        </>*/
    )
}

export default BlogArticle;