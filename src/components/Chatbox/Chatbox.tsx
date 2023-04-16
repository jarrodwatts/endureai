import React from "react";
import { TextField, Button } from "@mui/material";
import styles from "./Chatbox.module.css";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (message: string) => void;
};

export default function ChatBox({ message, setMessage, onSubmit }: Props) {
  const handleSubmit = () => {
    setMessage("");
    onSubmit(message);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className={styles.form}
    >
      <TextField
        className={styles.field}
        placeholder="Type your message"
        value={message}
        onChange={handleMessageChange}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": {
              borderWidth: "2px",
              borderColor: "rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
            },

            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
          },
        }}
      />
      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        <SendIcon />
      </Button>
    </form>
  );
}
