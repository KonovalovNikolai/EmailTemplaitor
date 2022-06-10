import { Box, Button, CircularProgress, Divider, Link, Modal, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { useCallback, useEffect, useState } from "react";

export interface SendLogItem {
  to: string;
  status: "success" | "error";
  preview: string;
}

interface SendPageProps {
  onSend: () => void;
}

export const SendPage = ({ onSend }: SendPageProps) => {
  const [log, setLog] = useState<SendLogItem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.handleEmailResult((event, result) => {
      console.log(result);

      setLog(prev => {
        const newItem: SendLogItem = {
          to: result.to,
          status: result.status,
          preview: result.url
        };

        return [...prev, newItem];
      });
    });

    window.electron.ipcRenderer.handleFinishSend((event) => {
      setModalOpen(false);
    });
  }, []);

  const handleClick = useCallback(
    () => {
      setModalOpen(true);
      onSend();
    },
    []
  );

  return (
    <Paper elevation={0}>
      <Box>
        <Button
          onClick={handleClick}
          variant={"contained"}
          endIcon={<SendIcon />}
          sx={{
            margin: "10px",
            textAlign: "center"
          }}
        >
          Отправить
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="overline">Лог рассылки:</Typography>
        {
          log.length > 0 &&
          log.map(item => {
            if (item.status === "error") {
              return (
                <Typography key={item.preview} variant="overline" color={"red"}>
                  Не удалось отправить письмо для {item.to}.
                </Typography>
              );
            }

            return (
              <Typography key={item.preview} variant="overline">
                Успешная отправка для <Link onClick={() => openURL(item.preview)}>{item.to}</Link>.
              </Typography>
            );
          })
        }
      </Box>
      <Modal open={isModalOpen}>
        <ModalLoadBox elevation={3}>
          <Typography variant="h6">Идёт рассылка...</Typography>
          <CircularProgress size={100} color={"success"} />
        </ModalLoadBox>
      </Modal>
    </Paper>
  );
};

function openURL(url: string) {
  window.electron.ipcRenderer.openURL(url);
}

const ModalLoadBox = styled(Paper, { name: "ModalPreview" })(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  transform: 'translate(-50%, -50%)',

  borderRadius: 0,

  padding: "10px",

  width: "400px",
  height: "200px",
}));
