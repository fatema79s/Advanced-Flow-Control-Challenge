const inputElement = document.querySelector("#input");
const buttonElement = document.querySelector("#button");

const DATA = [
  {id: "avatar_url", isImage: true },
  {id: "name" },
  {id: "bio" },
  {id: "twitter_username" },
  {id: "followers" },
];

buttonElement?.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = inputElement.value;
  try {
    const result = await fetchData(username);
    // fillData({id: "avatar_url", data: result.avatar_url, isImage: true});
    // fillData({id: "name", data: result.name});
    // fillData({id: "bio", data: result.bio});
    // fillData({id: "twitter_username", data: result.twitter_username});
    // fillData({id: "followers", data: result.followers});
    DATA.forEach((item) => fillData({ ...item, data: result[item.id] }));
  } catch (err) {
    alert(err);
  }
});

const fetchData = async (username) => {
  const result = await fetch(`https://api.github.com/users/${username}`);
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(new Error("This username is not found"));
};

const fillData = ({id, data, isImage}) => {
  const element = document.querySelector(`#${id}`);
  if (!isImage) {
    element.textContent = data;
  } else {
    element.src = data;
  }
};
