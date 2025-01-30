// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import BMHANNAPro from "../assets/fonts/BMHANNAPro.ttf";
import IntensaFuente from "../assets/fonts/IntensaFuente.ttf";

const GlobalStyle = createGlobalStyle`
html, body {
  margin: 0; /* 기본 여백 제거 */
  padding: 0; /* 기본 패딩 제거 */
  width: 100%; /* 부모 요소(브라우저 창)의 전체 너비 */
  height: 100%; /* 부모 요소(브라우저 창)의 전체 높이 */
  box-sizing: border-box; /* 패딩과 테두리를 크기 안에 포함 */
  font-family: "IntensaFuente";
  background-color: #f5f5f5; /* 기본 배경색 */
}

  *, *::before, *::after {
    box-sizing: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @font-face {
    font-family: 'BMHANNAPro';
    src: url(${BMHANNAPro}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'IntensaFuente';
    src: url(${IntensaFuente}) format('truetype');
    font-weight: normal;
    font-style: normal; 
  }
`;

export default GlobalStyle;
