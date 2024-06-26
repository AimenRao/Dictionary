const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("text-info");
const meaningCon = document.querySelector(".meaning-container");
const titleEl = document.querySelector("#title");
const meaningEl = document.querySelector("#meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningCon.style.display = "none";
    infoTextEl.innerText = "Loading...";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningCon.style.display = "block";
      infoTextEl.innerText = "Incorrect Word"
      titleEl.innerText = word;
      meaningEl.innerText = "Not Found";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningCon.style.display = "block";
      audioEl.style.display = "inline-flex"
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    infoTextEl.innerText = "An Error Occured. Try Again Later"
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
