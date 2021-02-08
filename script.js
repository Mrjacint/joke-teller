const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "<Your API key>",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
  console.log("Tell me: " + joke);
};

// Get joke from Joke API
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to -Speach
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("getJoke function: " + error);
  }
}

// Add event Listener

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
