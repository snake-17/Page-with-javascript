const content = null || document.getElementById("content");
const url =
  "https://youtube138.p.rapidapi.com/channel/videos/?id=UCLN3SyT_jQsFx3GTYCMFkMQ&filter=videos_latest&hl=en&gl=US";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "52ab4df621msh4e48ab2fda359d0p1e9c7bjsn673232214a1c",
    "x-rapidapi-host": "youtube138.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const data = await fetchData(url); //
    const videos = data.contents;

    let view = `
      ${videos
        .map((item) => {
          const videoData = item.video;
          if (!videoData) {
            return "";
          }
          const highestQualityThumbnail = videoData.thumbnails.sort(
            (a, b) => b.width - a.width
          )[0];
          return `
          <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
            >
              <img src="${highestQualityThumbnail.url}" alt="${videoData.title}" class="w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${videoData.title}
              </h3>
            </div>
          </div>
        `;
        })
        .join("")}
    `;
    content.innerHTML = view;
  } catch (e) {
    console.error("Error fetching data:", e);
    content.innerHTML = `<p class="text-red-500">Error loading videos. Please try again later.</p>`;
  }
})();
