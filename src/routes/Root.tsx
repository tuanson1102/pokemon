import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

export default function Root() {
  return (
    <Container maxWidth={"container.xl"}>
      <Header />
      <Outlet />
    </Container>
  );
}
