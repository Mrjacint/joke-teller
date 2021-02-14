const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// get key from my server
const getKey = async () => {
  let key = null;
  const data = await fetch("https://api-endpoint.vercel.app/api/joke-teller");
  const result = await data.text();
  return result;
};

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke, key) => {
  VoiceRSS.speech({
    key: key,
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
  // Call getKey fn for key
  const key = await getKey();
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
    tellMe(joke, key);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("getJoke function: " + error);
  }
}

// Add event Listener
button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
