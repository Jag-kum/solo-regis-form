document.querySelector(".details").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const submitBtn = document.getElementById("submitBtn");
  const name = document.getElementById("name").value.trim();
  const regNo = document.getElementById("regNo").value.trim();
  const phone = document.getElementById("phone").value.trim();

  clearErrors();

  setButtonLoadingState(submitBtn, true);

  if (!name || !regNo || !phone) {
    showError("All fields are required.");
    setButtonLoadingState(submitBtn, false);
    return;
  }

  if (!validateRegNo(regNo)) {
    showError("Registration number must be 9 characters long.");
    setButtonLoadingState(submitBtn, false);
    return;
  }

  if (!validatePhoneNumber(phone)) {
    showError(
      "Phone number must be between 10-13 digits and contain only numbers."
    );
    setButtonLoadingState(submitBtn, false);
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("regNo", regNo);
  formData.append("phone", phone);

  fetch(
    "https://script.google.com/macros/s/AKfycbyruEzUIf_tk0nXRdnxO9a1KONr2bP2dsz-nwJ4OzwJSZQwmdjUF-UxiyEO1lHI8Zdu/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        displaySuccessMessage("Your registration was successful!");
        document.querySelector(".details").reset(); 
      } else {
        showError(
          "There was an error submitting your registration. Please try again."
        );
      }
      setButtonLoadingState(submitBtn, false);
    })
    .catch((error) => {
      showError("An error occurred during submission. Please try again.");
      console.error("Error:", error);
      setButtonLoadingState(submitBtn, false);
    });
});

function showError(message) {
  const errorContainer = document.getElementById("error-container");
  const errorMsg = document.createElement("p");
  errorMsg.textContent = message;
  errorContainer.appendChild(errorMsg);
  errorContainer.style.display = "block"; 
}

function clearErrors() {
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerHTML = ""; 
  errorContainer.style.display = "none"; 
}


function setButtonLoadingState(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.textContent = "Submitting...";
  } else {
    button.disabled = false;
    button.textContent = "Submit";
  }
}

function validateRegNo(regNo) {
  return regNo.length === 9;
}

function validatePhoneNumber(phone) {
  const phonePattern = /^\d{10,13}$/;
  return phonePattern.test(phone);
}

function displaySuccessMessage(message) {
  const successContainer = document.getElementById("success-container");
  const successMsg = document.createElement("p");
  successMsg.textContent = message;
  successContainer.appendChild(successMsg);
  successContainer.style.display = "block"; 
}
