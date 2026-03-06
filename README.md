VAANI – Speech Learning Assistant
=================================

VAANI is a kid-friendly speech learning assistant designed for children with Autism, Down Syndrome, and Intellectual Disabilities to practice vocal communication, pronunciation, and basic language skills.

## Project Structure

- **frontend**: React single-page application (Vite-based)
- **backend**: Flask API for pronunciation evaluation and simple NLP feedback

### Frontend

- Tech: **React**, **Vite**
- Speech features:
  - Web Speech API for **speech recognition** (English/Hindi)
  - `speechSynthesis` for **text-to-speech**
- Pages:
  - Home
  - Learn Alphabets
  - Learn Numbers
  - Speak Practice
  - Parent Dashboard

#### Run frontend

```bash
cd frontend
npm install
npm start
```

The app will start on `http://localhost:5173` by default (Vite). You can change the port in `vite.config.js` if needed.

### Backend

- Tech: **Python**, **Flask**
- Endpoint:
  - `POST /evaluate`
    - Request JSON:
      - `spoken_text`: text from speech recognition
      - `expected_text`: target word/phrase
      - `language`: `"en"` or `"hi"` (optional)
    - Response JSON:
      - `accuracy`: number between 0 and 1
      - `feedback`: friendly feedback string

#### Run backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API will start on `http://localhost:5000`.

### Connecting Frontend and Backend

- Frontend calls the backend at `http://localhost:5000/evaluate`.
- Make sure the backend is running **before** using speech practice features.

### Notes

- The UI uses bright colors, large rounded buttons, emojis, and minimal text to stay kid-friendly.
- Parent Dashboard reads simple practice stats from `localStorage` (client-side only).

