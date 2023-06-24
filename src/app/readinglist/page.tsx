"use client";

import React, { useContext, useEffect } from "react";
import { Typography, Empty, Layout } from "antd";
import { BooksContext } from "@/contexts/BooksContext";
import BookItem from "@/components/Book.item";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;

const ReadingList: React.FC = () => {
  const router = useRouter();
  const { readingList } = useContext(BooksContext);
  const { isLogged } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
  }, [isLogged]);

  return (
    <Content>
      <Typography.Title level={3} style={{ fontWeight: "bold" }}>
        Reading List
      </Typography.Title>
      {readingList.map((book, index) => (
        <BookItem book={book} key={`book-${index}`} fav={true} />
      ))}
      {readingList.length === 0 && <Empty />}
    </Content>
  );
};

export default ReadingList;
