import { useState } from "react";
import "./App.css";
const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

async function askAi(prompt) {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
  });
  console.log(completion);
  return completion.data.choices[0].text;
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  function handleChange(e) {
    setPrompt(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const aiResponse = await askAi(prompt);
      setResponse(aiResponse);
    } catch (e) {
      setResponse("AI is tired 💤💤 Try again l8r.");
    }
  }
  return (
    <div className="App">
      <h1>
        AskAI (by <a href="https://github.com/softwarebyze">@softwarebyze</a>)
      </h1>
      <form onSubmit={handleSubmit}>
        <input value={prompt} onChange={handleChange} />
        <button type="submit">Ask!</button>
      </form>
      <p>{response}</p>
    </div>
  );
}
