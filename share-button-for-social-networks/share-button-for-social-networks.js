const shareData = {
  title: "Onirix",
  text: "Try our new hunt experience: pair colors",
  url: "https://studio.onirix.com/exp/lnwbxL",
};

document.getElementById("share-button").addEventListener("click", () => {
  navigator.share(shareData);
});
