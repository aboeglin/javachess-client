import React from "react";

import { Container } from "@components/Container";
import { StyledHeader, Inner, Left } from "./styled";

export const Header = () => (
  <StyledHeader>
    <Container maxWidth={1200}>
      <Inner>
        <Left>
          <h2>Chess Game</h2>
        </Left>
      </Inner>
    </Container>
  </StyledHeader>
);

export default Header;
