import React from "react";

import { Container } from "@components/Container";
import { StyledFooter, Inner, Left, Right } from "./styled";

export const Footer = () => (
  <StyledFooter>
    <Container maxWidth={1200}>
      <Inner>
        <Left>
          <div>
            Contribute on{" "}
            <a href="https://github.com/aboeglin/javachess-client">Github</a>
          </div>
        </Left>
        <Right>
          <div>
            Copyright &copy;{" "}
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Sorcerers
            </a>{" "} */}
            2020
          </div>
          {/* <div>
            <a href="https://github.com/open-sorcerers/foresight-gatsby-starter/blob/master/LICENSE">
              MIT
            </a>{" "}
            Licensed
          </div> */}
        </Right>
      </Inner>
    </Container>
  </StyledFooter>
);

export default Footer;
