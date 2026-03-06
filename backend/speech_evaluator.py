from __future__ import annotations

import difflib
from typing import Tuple


def _normalize(text: str) -> str:
  """
  Normalize text for comparison:
  - strip spaces
  - lower-case
  - keep letters, digits, and spaces
  """
  if not text:
    return ""
  text = text.strip().lower()
  cleaned = []
  for ch in text:
    if ch.isalnum() or ch.isspace():
      cleaned.append(ch)
  return "".join(cleaned)


def evaluate_pronunciation(
  spoken_text: str, expected_text: str, language: str = "en"
) -> Tuple[float, str]:
  """
  Compare spoken_text to expected_text and return:
  - accuracy score between 0.0 and 1.0
  - simple feedback string
  """
  spoken_norm = _normalize(spoken_text or "")
  expected_norm = _normalize(expected_text or "")

  if not expected_norm:
    return 0.0, "No expected word provided."

  if not spoken_norm:
    return 0.0, "I could not hear the word. Please try once more."

  similarity = difflib.SequenceMatcher(None, spoken_norm, expected_norm).ratio()
  score = round(similarity, 2)

  if score >= 0.9:
    feedback = "Excellent pronunciation!"
  elif score >= 0.75:
    feedback = "Good pronunciation."
  elif score >= 0.5:
    feedback = "Almost there, let us try again."
  else:
    feedback = "Keep trying, you can do it!"

  if language == "hi":
    # Very simple bilingual-style hints, still using English phrases
    if score >= 0.9:
      feedback = "बहुत बढ़िया! Excellent!"
    elif score >= 0.75:
      feedback = "अच्छा उच्चारण। Good job."
    elif score >= 0.5:
      feedback = "लगभग सही, एक बार और बोलें।"
    else:
      feedback = "कोई बात नहीं, दोबारा कोशिश करें।"

  return score, feedback


if __name__ == "__main__":
  print(evaluate_pronunciation("apple", "apple"))

