import { Box, Button, CircularProgress, Divider, Grid, Link, Modal, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export interface SendLogItem {
  to: string;
  status: "success" | "error";
  preview: string;
}

interface SendPageProps {
  log: SendLogItem[];
  onSend: () => Promise<void>;
}

export const SendPage = ({ log, onSend }: SendPageProps) => {
  const handleClick = useCallback(
    async () => {
      await onSend();
    },
    []
  );

  return (
    <>
      <Button onClick={handleClick} variant={"outlined"}>Отправить</Button>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {
          !!log &&
          log.map(item => {
            return item.status === "success" ?
              <Link
                key={item.preview}
                onClick={() => openURL(item.preview)}
              >
                {item.to}
              </Link> :
              <></>;
          })
        }
      </Box>
    </>
  );
};

function openURL(url: string) {
  window.electron.ipcRenderer.openURL(url);
}
