// Messages come back in the format:
// Therapist: <message>, or Psychologist: <message>, or Coach: <message>
// Remove the role from the message.

export default function removeRoleFromResponse(response: string): string {
  const strings = [
    "Therapist: ",
    "Psychologist: ",
    "Coach: ",
    "Life Coach: ",
    "Endure: ",
  ] as const;

  for (const string of strings) {
    if (response.startsWith(string)) {
      return response.slice(string.length);
    }
  }

  return response;
}
