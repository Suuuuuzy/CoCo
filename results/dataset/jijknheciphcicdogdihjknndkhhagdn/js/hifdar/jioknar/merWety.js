function mytaticos() {
  const gobon = "grab-" + chrome.runtime.id.substr(0, 8);
  ytCertsa(gobon);
};

function ytCertsa(gratry) {
  let ramba = Array.from($(".swiper-wrapper .swiper-slide:not(." + gratry + ")"));
  ramba.forEach(incTres => {
    const wira = $(incTres).find(".sidebar .tiktok-toolbar");
    if(!wira) return;
    $(wira).append(`<div class="tiktok-toolbar-download tiktok-toolbar-section" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4NCgk8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMzgyLjU2LDIzMy4zNzZDMzc5Ljk2OCwyMjcuNjQ4LDM3NC4yNzIsMjI0LDM2OCwyMjRoLTY0VjE2YzAtOC44MzItNy4xNjgtMTYtMTYtMTZoLTY0Yy04LjgzMiwwLTE2LDcuMTY4LTE2LDE2djIwOGgtNjQgYy02LjI3MiwwLTExLjk2OCwzLjY4LTE0LjU2LDkuMzc2Yy0yLjYyNCw1LjcyOC0xLjYsMTIuNDE2LDIuNTI4LDE3LjE1MmwxMTIsMTI4YzMuMDQsMy40ODgsNy40MjQsNS40NzIsMTIuMDMyLDUuNDcyIGM0LjYwOCwwLDguOTkyLTIuMDE2LDEyLjAzMi01LjQ3MmwxMTItMTI4QzM4NC4xOTIsMjQ1LjgyNCwzODUuMTUyLDIzOS4xMDQsMzgyLjU2LDIzMy4zNzZ6Ii8+DQoJPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTQzMiwzNTJ2OTZIODB2LTk2SDE2djEyOGMwLDE3LjY5NiwxNC4zMzYsMzIsMzIsMzJoNDE2YzE3LjY5NiwwLDMyLTE0LjMwNCwzMi0zMlYzNTJINDMyeiIvPg0KPC9zdmc+DQo=');"></div>`);
    $(wira).find(".tiktok-toolbar-download").on("click", () => {
      const vidak = $(incTres).find("video");
      if(!vidak || !vidak.src) return;
      const dosir = vidak.src;
      const asgard = $(incTres).find(".bottom-name").text().trim().replace(/[^0-9a-z._-]/ig, "");
      grind(dosir, [ "TikTok", "video", asgard, qazi()].join("_") + ".mp4");
    });
    $(incTres).addClass(gratry);
  });
}
