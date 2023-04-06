// Your code here
const names = document.getElementById("character-bar");
const name = document.querySelector("#name");
const image = document.querySelector("#image");
let votes = document.querySelector("#vote-count");
let allData = [];

function fetchData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      naming(data);
    });
}
fetchData("http://localhost:3001/characters");
function naming(data) {

  data.map((item) => {
    console.log("item name: ", item.name);
    
    let spanTag = document.createElement("span");
    
    spanTag.textContent = item.name;
    names.appendChild(spanTag);
    spanTag.addEventListener("click", (e) => {
      name.textContent = item.name;
      console.log(image.src);
      image.src = item.image;
      votes.textContent = item.votes;
    });
  });
}

const form = document.getElementById("votes-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newVotes = parseInt(event.target.votes.value);
  const currentVotes = parseInt(votes.textContent);
  votes.textContent = currentVotes + newVotes;
});
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  votes.textContent = "0";
})