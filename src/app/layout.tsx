"use client";
import { UserContext, UserProvider } from "@/contexts/UserContext";
import { BooksContext, BooksProvider } from "@/contexts/BooksContext";
import "./globals.css";
import { Inter } from "next/font/google";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "antd";
import Navbar from "@/components/Navbar";
import apiService from "@/services/api.service";

const { Header, Content } = Layout;

const App = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);
  const { setReadingList } = useContext(BooksContext);
  useEffect(() => {
    if (isLogged) {
      router.push("/");
      getReadingList();
    } else {
      router.replace("/auth/login");
    }
  }, [isLogged]);

  const getReadingList = async () => {
    try {
      const res = await apiService.getReadingList();
      const { data } = res;

      if (data.success) {
        setReadingList(data.books);
      }
    } catch (error) {}
  };

  return (
    <>
      {isLogged ? (
        <Layout>
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <Navbar />
          </Header>
          <Content
            style={{
              padding: 24,
              background: "white",
            }}
          >
            {children}
          </Content>
        </Layout>
      ) : (
        <Layout>
          <Header
            className="text-white text-lg font-bold flex items-center"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
            }}
          >
            Welcome to Popcorn Books
          </Header>
          <Content
            style={{
              padding: 24,
              background: "white",
            }}
          >
            {children}
          </Content>
        </Layout>
      )}
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <BooksProvider>
        <html lang="en">
          <body>
            <App>{children}</App>
          </body>
        </html>
      </BooksProvider>
    </UserProvider>
  );
}
