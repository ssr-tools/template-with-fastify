import { Nav } from "@ssr-tools/css/stylable/Nav";
import { A } from "../config/router";

export const Navigation = () => (
  <Nav
    css={{
      "& ul": {
        margin: 0,
        listStyleType: "none",
        textTransform: "uppercase",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 1,
        padding: "4px 0px",
        marginBottom: 4,
        borderBottom: "1px dashed rgba(0,0,0,0.35)",
        display: "flex",
      },
      "& li": {
        marginRight: 16,
      },
      "& a": {
        textDecoration: "none",
        color: "rgba(0,0,0,0.85)",
        fontWeight: "300",
      },
    }}
  >
    <ul>
      <li>
        <A pathPattern="/">Home</A>
      </li>
      <li>
        <A pathPattern="/about">About</A>
      </li>
      <li>
        <a
          href="https://github.com/ssr-tools/template-with-fastify"
          target="_blank"
          rel="noreferrer"
        >
          GitHub repo
        </a>
      </li>
    </ul>
  </Nav>
);
