from __future__ import annotations

from flask import Flask, jsonify, request
from flask_cors import CORS

from speech_evaluator import evaluate_pronunciation

app = Flask(__name__)
CORS(app)


@app.route("/evaluate", methods=["POST"])
def evaluate():
  """
  Receive spoken text and expected word, return accuracy and feedback.
  Expected JSON body:
  {
    "spoken_text": "child speech",
    "expected_text": "target",
    "language": "en" | "hi"
  }
  """
  data = request.get_json(silent=True) or {}

  spoken_text = data.get("spoken_text", "") or ""
  expected_text = data.get("expected_text", "") or ""
  language = data.get("language", "en") or "en"

  accuracy, feedback = evaluate_pronunciation(spoken_text, expected_text, language)

  return jsonify(
    {
      "accuracy": float(accuracy),
      "feedback": feedback,
    }
  )


@app.route("/health", methods=["GET"])
def health():
  return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)

