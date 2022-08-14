import { FC } from "react";
import { Header } from "../components/Header";
import { Paragraph } from "../components/Paragraph";

export const ErrorOccurred: FC<{ error: unknown }> = ({ error }) => (
  <>
    <Header>An error occurred!</Header>
    <Paragraph>
      {error instanceof Error ? error.message : "Unknown error"}
    </Paragraph>
  </>
);
