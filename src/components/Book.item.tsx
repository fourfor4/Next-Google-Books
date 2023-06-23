import React, { useContext } from "react";
import { Card, Typography, Space, Image, Popconfirm, message } from "antd";
import { StarOutlined, StarFilled, EyeFilled } from "@ant-design/icons";
import { IBook } from "../interfaces";
import { BooksContext } from "../contexts/BooksContext";
import constants from "../constants";
import Link from "next/link";
import apiService from "@/services/api.service";
import { UserContext } from "@/contexts/UserContext";

type Props = {
  book: IBook;
  fav?: boolean;
};

const { imgPlaceholderURL, text } = constants;
const { addDescription, addText, removeDescription, removeText } = text;

const BookItem: React.FC<Props> = ({ book, fav }) => {
  const { setReadingList } = useContext(BooksContext);
  const { user } = useContext(UserContext);

  const getSmallThumbnail = (book: IBook) => {
    let smallThumbnailURL =
      book.volumeInfo &&
      book.volumeInfo.imageLinks &&
      book.volumeInfo.imageLinks.smallThumbnail;
    return smallThumbnailURL ? smallThumbnailURL : imgPlaceholderURL;
  };

  const handleSaveToReadingList = async () => {
    try {
      const res = await apiService.addBookToReadingList(
        {
          ...book,
          userId: user._id,
        },
        user._id as string
      );
      const { data } = res;
      if (data.success) {
        message.success(data.msg);
        setReadingList(data.books);
      } else {
        message.error(data.msg);
      }
    } catch (error) {}
  };

  const handleRemoveFromReadingList = async () => {
    try {
      const res = await apiService.removeBookFromReadingList(
        book.id,
        user._id as string
      );
      const { data } = res;
      if (data.success) {
        message.success(data.msg);
        setReadingList(data.books);
      } else {
        message.error(data.msg);
      }
    } catch (error) {}
  };

  return (
    <Card
      key={book.id}
      title={
        <Typography.Title level={3} style={{ fontWeight: "bold" }}>
          {book.volumeInfo.title}
        </Typography.Title>
      }
      style={{ marginBottom: 8 }}
      extra={
        !fav ? (
          <Popconfirm
            placement="topLeft"
            title={addText}
            description={addDescription}
            onConfirm={handleSaveToReadingList}
            okText={<span>Yes</span>}
            cancelText="No"
          >
            <StarOutlined
              style={{ cursor: "pointer", color: "#1677ff", fontSize: 24 }}
            />
          </Popconfirm>
        ) : (
          <Popconfirm
            placement="topLeft"
            title={removeText}
            description={removeDescription}
            onConfirm={handleRemoveFromReadingList}
            okText={<span>Yes</span>}
            cancelText="No"
          >
            <StarFilled
              style={{ cursor: "pointer", color: "#1677ff", fontSize: 24 }}
            />
          </Popconfirm>
        )
      }
    >
      <Typography.Title
        level={5}
        style={{
          marginTop: 0,
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Author: {book.volumeInfo.authors?.join(", ") || "-"}
        <React.Fragment>
          {book.saleInfo?.buyLink && (
            <Link href={book.saleInfo.buyLink} target="_blank">
              <EyeFilled />
            </Link>
          )}
        </React.Fragment>
      </Typography.Title>
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
        Publisher: {book.volumeInfo.publisher || "-"}
      </Typography.Title>
      <Space align="start" size={24}>
        <Image
          src={getSmallThumbnail(book)}
          alt={getSmallThumbnail(book) ? book.volumeInfo.title : "no-image"}
          width={100}
        />
        <Typography>{book.volumeInfo.description}</Typography>
      </Space>
    </Card>
  );
};

export default BookItem;
