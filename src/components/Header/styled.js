import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  padding: 24px 64px;
  background-color: #3eb399;
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
