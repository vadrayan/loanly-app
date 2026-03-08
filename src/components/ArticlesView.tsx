import { useEffect, useState } from "react";
import { marked } from "marked";
import { useParams } from "react-router-dom";

marked.setOptions({ async: false });



export default function ArticlesView() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");
  
   

  useEffect(() => {
    const articleUrl = `https://loanlyemi-content.s3.amazonaws.com/articles/${slug}.html`;
  
    if(!slug) return;
    fetch(articleUrl)
      .then(res => res.text())
      .then(setContent)
      .catch(console.error);}, [slug]);

  return(
    <div
      style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
