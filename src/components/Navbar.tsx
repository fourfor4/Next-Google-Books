import React, { useContext } from "react";
import { Space, Divider, Typography, Badge, Button } from "antd";
import { BooksContext } from "@/contexts/BooksContext";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";

const Navbar: React.FC = () => {
  const { readingList } = useContext(BooksContext);
  const { setIsLogged, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setIsLogged(false);
    setUser({ email: "", name: "" });
    localStorage.setItem("loginStatus", "false");
  };

  return (
    <div style={{ textAlign: "center", padding: 16 }}>
      <Space split={<Divider type="vertical" />}>
        <Typography style={{ color: "white" }}>Google Books</Typography>
        <Link href="/">Search</Link>
        <Link
          href={"/readinglist"}
          style={{ display: "flex", alignItems: "center" }}
        >
          Reading List
          {readingList.length > 0 && (
            <Badge
              count={readingList.length}
              size="small"
              color="green"
              style={{ marginBottom: 12, marginLeft: 4 }}
            />
          )}
        </Link>
        <Button type="primary" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Space>
    </div>
  );
};

export default Navbar;
