"use client";

import React, { useContext, useEffect, useState } from "react";
import { Space, Divider, Typography, Badge, Button } from "antd";
import { BooksContext } from "@/contexts/BooksContext";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";

const Navbar: React.FC = () => {
  const { readingList } = useContext(BooksContext);
  const { isLogged, setIsLogged, setUser } = useContext(UserContext);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn(isLogged);
  }, [isLogged]);

  const handleLogout = () => {
    setIsLogged(false);
    setUser({ email: "", name: "" });
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("user");
  };

  return (
    <div style={{ textAlign: "center", padding: 16 }}>
      <Space split={<Divider type="vertical" />}>
        <Typography style={{ color: "white" }}>
          Welcome To Popcorn Books
        </Typography>
        {loggedIn && (
          <>
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
          </>
        )}
      </Space>
    </div>
  );
};

export default Navbar;
