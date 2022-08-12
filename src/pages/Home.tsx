import { Header } from "../components/Header";
import { Paragraph } from "../components/Paragraph";
import { A } from "../config/router";

export const Home = () => (
  <>
    <Header>Hello world</Header>
    <Paragraph>
      Hi! This is a really simple project. It shows the usage of&nbsp;
      {ssrToolsLink} combined with {fastifyLink}.
    </Paragraph>
    <Paragraph>
      From here you can go to&nbsp;
      {aboutLink}.
    </Paragraph>
  </>
);

const aboutLink = <A pathPattern="/about">about page</A>;

const ssrToolsLink = (
  <a
    href="https://github.com/ssr-tools/ssr-tools"
    target="_blank"
    rel="noreferrer"
  >
    ssr-tools
  </a>
);

const fastifyLink = (
  <a href="https://github.com/fastify/fastify" target="_blank" rel="noreferrer">
    fastify
  </a>
);
