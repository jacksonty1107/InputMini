const photos = [
  { id: "awaken-my-love", title: "Awaken, My Love!", src: "Photos/awaken_my_love!.jpeg", x: 16, y: 35, rotation: -3 },
  { id: "blonde", title: "Blond", src: "Photos/blonde.jpeg", x: 184, y: 35, rotation: 3 },
  { id: "honeybloom", title: "Honeybloom", src: "Photos/honeybloom.jpeg", x: 352, y: 35, rotation: -2 },
  { id: "mamas-gun", title: "Mama's Gun", src: "Photos/mamas_gun.jpeg", x: 16, y: 230, rotation: 2 },
  { id: "negro-swan", title: "Negro Swan", src: "Photos/negro_swan.jpg", x: 184, y: 230, rotation: -3 },
  { id: "whats-going-on", title: "What's Going On", src: "Photos/whats_going_on.jpeg", x: 352, y: 230, rotation: 3 },
];

const stage = document.getElementById("bg");
const controls = document.getElementById("photo-controls");
const axes = [
  { key: "x", label: "X position", min: 0, max: 360 },
  { key: "y", label: "Y position", min: 0, max: 360 },
  { key: "rotation", label: "Rotation", min: -180, max: 180 },
];

function formatValue(axis, value) {
  return axis === "rotation" ? `${value}°` : `${value} px`;
}

function updatePhoto(photo) {
  const image = document.getElementById(`photo-${photo.id}`);
  const x = document.getElementById(`photo-${photo.id}-x`).value;
  const y = document.getElementById(`photo-${photo.id}-y`).value;
  const rotation = document.getElementById(`photo-${photo.id}-rotation`).value;

  image.style.left = `${x / 5}%`;
  image.style.top = `${y / 5}%`;
  image.style.transform = `rotate(${rotation}deg)`;
}

photos.forEach((photo) => {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "image-controls";
  fieldset.setAttribute("aria-label", `Photo controls for ${photo.title}`);

  const legend = document.createElement("legend");
  legend.textContent = photo.title;
  fieldset.append(legend);

  const image = document.createElement("img");
  image.id = `photo-${photo.id}`;
  image.src = photo.src;
  image.alt = photo.title;
  image.draggable = false;
  stage.append(image);

  axes.forEach((axis) => {
    const inputId = `photo-${photo.id}-${axis.key}`;
    const label = document.createElement("label");
    const output = document.createElement("output");
    const input = document.createElement("input");
    const value = photo[axis.key];

    label.htmlFor = inputId;
    label.append(`${axis.label} `);

    output.id = `${inputId}-value`;
    output.htmlFor = inputId;
    output.textContent = formatValue(axis.key, value);
    label.append(output);

    input.id = inputId;
    input.type = "range";
    input.min = axis.min;
    input.max = axis.max;
    input.value = value;
    input.dataset.photoId = photo.id;
    input.dataset.axis = axis.key;
    input.addEventListener("input", () => {
      document.getElementById(output.id).textContent = formatValue(axis.key, input.value);
      updatePhoto(photo);
    });

    fieldset.append(label, input);
  });

  controls.append(fieldset);
  updatePhoto(photo);
});