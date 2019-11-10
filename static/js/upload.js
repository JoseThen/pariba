let dropArea = document.getElementById("drop-area");

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add("highlight");
}

function unhighlight(e) {
  dropArea.classList.remove("highlight");
}

dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  [...files].forEach(uploadFile);
}

// function uploadFile(file) {
//   var url = "YOUR URL HERE";
//   var xhr = new XMLHttpRequest();
//   var formData = new FormData();
//   xhr.open("POST", url, true);

//   xhr.addEventListener("readystatechange", function(e) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // Done. Inform the user
//     } else if (xhr.readyState == 4 && xhr.status != 200) {
//       // Error. Inform the user
//     }
//   });

//   formData.append("file", file);
//   xhr.send(formData);
// }

function uploadFile(file, i) {
  // <- Add `i` parameter
  var url = "YOUR URL HERE";
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open("POST", url, true);

  // Add following event listener
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0) / e.total || 100);
  });

  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });

  formData.append("file", file);
  xhr.send(formData);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let fileName = document.createElement("p");
    let fileSize = document.createElement("p");
    fileName.textContent = file.name;
    fileSize.textContent = bytesToSize(file.size);
    document.getElementById("files").appendChild(fileName);
    document.getElementById("files").appendChild(fileSize);
  };
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length); // <- Add this line
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

let filesDone = 0;
let filesToDo = 0;
let progressBar = document.getElementById("progress-bar");

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total =
    uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

// dropArea.addEventListener("dragenter", handlerFunction, false);
// dropArea.addEventListener("dragleave", handlerFunction, false);
// dropArea.addEventListener("dragover", handlerFunction, false);
// dropArea.addEventListener("drop", handlerFunction, false);
