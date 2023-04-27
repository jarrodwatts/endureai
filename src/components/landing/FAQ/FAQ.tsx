import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./FAQ.module.css";
import Link from "next/link";

export default function FAQ() {
  return (
    <section id="features" className={styles.faq}>
      <div className={`${styles.content}`}>
        <Typography variant="h2">FAQ</Typography>

        <Typography variant="body1" className={styles.desc}>
          Please read these carefully to understand the risks and privacy
          concerns before using Endure.
        </Typography>

        <ul className={styles.warningList}>
          <li className={styles.warningItem}>
            <Typography variant="body2">
              The AI is not human. It does not know what it is saying.
            </Typography>
          </li>
          <li className={styles.warningItem}>
            <Typography variant="body2">
              Endure can potentially give you terrible, wrong, harmful advice.
            </Typography>
          </li>
          <li className={styles.warningItem}>
            <Typography variant="body2">
              Endure has no guarantee to be safe at all. It is not a replacement
              for professional help.
            </Typography>
          </li>
        </ul>

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1">
              Can this replace my therapist / psychologist / other professional?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              NO! Endure uses GPT 3.5, an AI that does not understand what it is
              saying. It uses this service along with specific prompts, with
              context of your profile and most recent messages to generate what
              it thinks is the most relevant sequence of characters to respond
              to your message. This is not a replacement for seeking
              professional help.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="body1">Are my messages private?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              No. Any <strong>admin</strong> of this application (i.e. me) can
              see all the contents of your messages, which are associated to
              your account. In theory, I can read your entire conversation.{" "}
              <strong>I 100% have the capability to read your messages.</strong>
              <br />
              <br />I say this to be transparent with you, not because I want to
              spy on your conversations. If the application is hacked, your
              messages are available <strong>in plain text</strong> to the
              hacker. Obviously I will try my best (and have implemented
              security measures) to prevent this from happening. In the near
              future, I will likely implement a solution of encrypting messages
              if this is a requested feature.
              <br />
              <br />
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Admins can read your messages (currently)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Other users cannot read your messages (database security rules
                  with auth)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Only your authenticated user can read/write messages in your
                  own conversation
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  The contents of your messages are sent to the Chat GPT API, so
                  they also have access to your messages.
                </Typography>
              </li>
            </ul>

            <Typography variant="body2">
              General rule of thumb is that if you do not want to run the slight
              risk of myself or potential attackers seeing your messages during
              this early stage of development, be intentionally vague or do not
              share anything that you would not want to be public.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="body1">Is using this service safe?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              No. I have essentially zero control over what the AI says to you.
              If you feel that you are at risk, or the AI makes you feel unsafe,
              uncomfortable, or distressed, please stop using the application
              immediately and seek professional help.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="body1">
              The AI told me some horrific advice, what&rsquo;s up with that?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              I have basically zero control over the response of the AI. It is
              completely up to the training it has received, which is developed
              by OpenAI.
              <br />
              <br />
              The AI is not a human, and it does not understand what it is
              saying.
              <br />
              <br />
              Any advice it gives should be taken with a grain of salt. If you
              are in a crisis, please seek professional help. If you are in a
              crisis and need immediate assistance, please call 911 or your
              local emergency number.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="body1">
              How does this work from a technical POV?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              It uses{" "}
              <Link href="https://platform.openai.com/docs/guides/chat">
                Chat Completion API (Chat GPT 3.5)
              </Link>{" "}
              to produce responses to your message. With each request, the
              following information is sent:
            </Typography>

            <ul>
              <li>
                <Typography variant="body2">
                  Your profile information (i.e. your &ldquo;about&rdquo;
                  section)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  As many of your conversation&rsquo;s most recent previous
                  messages as the API allows
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Your latest message&rsquo;s content
                </Typography>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <Typography variant="body1" className={styles.disclaimer}>
          Do not use this service if you believe you are vulnerable or in a
          crisis. This application has the potential to make you feel worse, and
          say things that will not help your situation. If you are in a crisis
          and need immediate assistance, please call 911 or your local emergency
          number.
        </Typography>
      </div>
    </section>
  );
}
