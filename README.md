# Nexus: Multi-Agent Research Team

Nexus is an advanced autonomous research application that leverages a team of specialized AI agents to conduct deep research, analyze data, and author comprehensive blog posts on any given topic. Built with React and the Google Gemini API, it demonstrates the power of multi-agent orchestration and real-time grounding.

## 🚀 Features

*   **Multi-Agent Workflow**: Orchestrates three distinct AI agents (Researcher, Analyst, Writer) to transform a simple topic into a high-quality article.
*   **Real-Time Web Research**: The Researcher agent utilizes Google Search Grounding to fetch live data, facts, and citations from the web.
*   **Interactive Dashboard**: A visual interface that tracks the real-time status (Working, Completed, Failed) and output of each agent.
*   **Context-Aware Chat**: An integrated chat interface that allows users to ask follow-up questions based specifically on the generated blog post and raw research notes.
*   **User Authentication**: A simulated secure authentication system featuring Login, Registration, and Email Verification flows.
*   **Session History**: Automatically persists research sessions to local storage, allowing users to browse and revisit previous topics via the sidebar.
*   **Social Sharing**: Built-in tools to quickly share generated content to X (Twitter), LinkedIn, or copy to clipboard for Instagram/other platforms.
*   **Responsive Design**: A modern, dark-themed UI built with Tailwind CSS that works seamlessly on desktop and mobile.

## 🤖 The Agent Team

1.  **Nexus Search (Researcher)**
    *   *Role*: Data Gathering
    *   *Model*: `gemini-2.5-flash`
    *   *Tools*: Google Search
    *   *Task*: Scours the web for factual information, historical context, and recent news. Returns raw notes with source citations.

2.  **Logic Core (Analyst)**
    *   *Role*: Data Synthesis
    *   *Model*: `gemini-2.5-flash`
    *   *Task*: Processes the raw research data to identify key trends, eliminate noise, and structure the information into a logical brief.

3.  **Creative Engine (Writer)**
    *   *Role*: Content Creation
    *   *Model*: `gemini-2.5-flash`
    *   *Task*: Transforms the analytical brief into an engaging, SEO-friendly blog post formatted in Markdown.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS (CDN)
*   **AI Logic**: Google Gemini API (`@google/genai`)
*   **Markdown Rendering**: `react-markdown`
*   **State Management**: React Hooks & Local Storage

## 📦 Setup & Installation

1.  **Prerequisites**
    *   Node.js installed.
    *   A valid Google Gemini API Key.

2.  **Installation**
    ```bash
    npm install
    ```

3.  **Configuration** — get a free key at <https://aistudio.google.com/apikey>, then either:
    *   copy `.env.example` to `.env` and set `GEMINI_API_KEY=...` (restart the dev server), **or**
    *   run the app and paste the key into the **🔑 Add Gemini API key** button (stored only in your browser's localStorage).

    > ⚠️ The key from `.env` is compiled into the JavaScript bundle. Use it for **local use only**.
    > If you host a build publicly, leave `.env` empty so each visitor brings their own key.

    The model used by all agents is set in one place: `MODEL` in `services/geminiService.ts`.

4.  **Running the App**
    ```bash
    npm run dev      # http://localhost:3000
    npm run build    # production build into dist/
    ```

## 📖 Usage Guide

1.  **Authentication**: 
    *   Launch the app.
    *   Register a new account.
    *   Enter the simulation code `1234` when prompted for email verification.
    *   Note: login is a **local demo** (accounts live in your browser's localStorage, no real email is sent) — it only separates research history per user on one machine.
2.  **Deploy Agents**:
    *   Enter a topic (e.g., "The Impact of AI on Healthcare") in the main search bar.
    *   Click "Deploy".
3.  **Monitor Progress**:
    *   Watch as the Researcher finds sources (links appear in the card).
    *   Wait for the Analyst to structure the data.
    *   Read the final output from the Writer.
4.  **Interact**:
    *   **Share**: Use the buttons below the blog post to share to social media.
    *   **Chat**: Scroll to the bottom "Ask Follow-up Questions" section to query the specific data found during the session.
    *   **History**: Use the sidebar to switch between past research sessions.

## 📂 Project Structure

*   `App.tsx`: Main application logic and layout orchestration.
*   `services/geminiService.ts`: API layer handling communication with Google Gemini, including specific prompts for each agent role.
*   `services/storageService.ts`: Handles simulated authentication and local data persistence.
*   `services/apiKey.ts`: Resolves the Gemini API key (browser-stored key → `.env`) and turns API errors into readable messages.
*   `services/cacheService.ts`: IndexedDB research cache (24h) and history storage.
*   `components/`:
    *   `AgentCard.tsx`: Visual representation of an individual agent.
    *   `ChatInterface.tsx`: Component for follow-up Q&A.
    *   `AuthPage.tsx`: Login/Register screens.
    *   `Sidebar.tsx`: Navigation and history management.
    *   `ApiKeySettings.tsx`: In-app Gemini API key input.
    *   `ShareButtons.tsx`: Social media integration.

---
*Powered by Google Gemini*
