import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  padding: 24px 24px;
  background-color: #222;
  border-top: 1px solid rgba(0, 0, 0, 0.38);
  color: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  line-height: 24px;

  h2 {
    margin: 0;
  }

  a {
    color: #fff;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
