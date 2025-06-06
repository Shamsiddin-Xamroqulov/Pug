const form = document.querySelector(".jsForm");
const createInput = document.querySelector(".createInput");
const allInputs = document.querySelector(".editInput");
const createBtn = document.querySelector(".js-btn");

createInput.addEventListener("change", (evt) => {
  console.log(evt);
  handleCreate(createInput.value.trim());
});

form.addEventListener("submit", (evt) => {
  console.log(evt);
});
async function handleCreate(text) {
  if (!text) throw new Error("Input value is required");
  try {
    const req = await fetch("http://localhost:4000/coments/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (req.ok) {
      const res = await req.json();
      window.location.reload();
    }
  } catch (error) {
    console.log("xatolik");
  }
}
window.addEventListener("click", async (evt) => {
  evt.preventDefault();
  if (evt.target.matches(".deleteBtn")) {
    const id = evt.target.dataset.id;

    await fetch(`http://localhost:4000/coments/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  }
});

window?.addEventListener("change", async evt => {
  if (evt.target.matches(".editInput")) {
    const id = allInputs.dataset.id;
    const text = allInputs.value;

    await fetch(`http://localhost:4000/coments/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  }
});
