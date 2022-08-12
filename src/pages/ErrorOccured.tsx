import { FC } from "react";
import { Header } from "../components/Header";
import { Paragraph } from "../components/Paragraph";

export const ErrorOccured: FC<{ error: unknown }> = ({ error }) => (
  <>
    <Header>An error occured!</Header>
    <Paragraph>
      {error instanceof Error ? error.message : "Unknown error"}
    </Paragraph>
  </>
);
