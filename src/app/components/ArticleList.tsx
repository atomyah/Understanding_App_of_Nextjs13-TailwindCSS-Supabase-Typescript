import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Article } from "@/types";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  articles: Article[];
};

// pages.tsxの<ArticleList articles={articles} />から貰ってきたprops、articles.
// 上記のtype..のように型定義しないと（ここではArticleListProps）エラーでる．
const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
};

export default ArticleList;
