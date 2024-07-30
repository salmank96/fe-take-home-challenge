import React, { useEffect, useState } from "react";
import Card from "./Card";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
export default function CardList({ searchQuery,setSearchQuery, categoryQuery ,sourceQuery,fromDate,toDate,selectedCategory  }) {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      let newsAPIKey = process.env.REACT_APP_API_KEY;
     
      
        // Fetch news based on category
        // apiUrl = `https://newsapi.org/v2/everything?q=apple&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${newsAPIKey}`;
      const  apiUrl = `https://news-nextjs-apis.vercel.app/api/news-org?q=${searchQuery}&sources=${sourceQuery}&fromDate=${fromDate}&toDate=${toDate}&sortBy=popularity&apiKey=${newsAPIKey}`;
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data?.articles){
          setNews(data.articles);
          setSearchQuery("")
        }else if(data?.sources){
          setNews(data?.sources);
          setSearchQuery("")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when request completes
      }
    };

    fetchNews();
  }, [searchQuery,categoryQuery,sourceQuery,fromDate]);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader
            color={"#36D7B7"}
            loading={loading}
            css={override}
            size={150}
          />
        </div>
      ) : (
        <>
          {!news || news.length == 0 ? (
            <div>
              <h2>Sorry, No Results Found</h2>
            </div>
          ) : (
            <Card news={news} selectedCategory={selectedCategory} />
          )}
        </>
      )}
    </>
  );
}
