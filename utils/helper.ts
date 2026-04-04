export function getInitials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const trimmed = name.trim();

    // Common titles to skip
    const titles = ["mr", "mrs", "ms", "md", "dr", "prof"];

    const words = trimmed.split(" ").filter(word => word.length > 0);

    // Filter out titles
    const significantWords = words.filter(word =>
      !titles.includes(word.toLowerCase())
    );

    if (significantWords.length >= 2) {
      // Take first letter of first and last significant word
      return significantWords[0].charAt(0).toUpperCase() +
        significantWords[significantWords.length - 1].charAt(0).toUpperCase();
    } else if (significantWords.length === 1) {
      // Only one significant word
      const word = significantWords[0];
      if (word.length >= 2) {
        return word.slice(0, 2).toUpperCase();
      }
      return word.charAt(0).toUpperCase().repeat(2);
    } else if (words.length > 0) {
      // Fallback to all words if no significant words
      if (words.length >= 2) {
        return words[0].charAt(0).toUpperCase() +
          words[words.length - 1].charAt(0).toUpperCase();
      }
      const word = words[0];
      return word.length >= 2 ? word.slice(0, 2).toUpperCase() : word.charAt(0).toUpperCase().repeat(2);
    }
  }

  if (email && email.trim()) {
    const emailInitial = email.trim().charAt(0).toUpperCase();
    return emailInitial + emailInitial;
  }

  return "UU";
}
