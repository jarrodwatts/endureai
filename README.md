A chat application powered by GPT 3.5, prompted with mental-health focus to create a mental-health chat bot.

https://endureai.com/

## Built with

- Firebase (Auth, DB)
- Stripe
- Open AI API
- Next.js + TypeScript
- Material UI + CSS Modules

## How it works

1. User creates their profile
  - Auth account gets created from their google account
  - User document created in users collection

2. User selects their bot type and adds personal info
  - User is sent to /setup, adds information about themselves, selects their preferred type of conversation / behaviour
  - Data is stored in user document

3. User begins chat at /talk
  - Each message the user sends triggers the API to ask chat gpt for a completion.
  - The prompt, user information, and as many of the latest messages (from both human and bot) are sent with the request.
  - Both sent and received messages are stored in the messages collection, associated with a userId field
