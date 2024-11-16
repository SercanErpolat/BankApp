let userPIN = null;
let accountBalance = 10000.0;

const pinInput = document.getElementById("pinInput");
const loginButton = document.getElementById("loginButton");
const withdrawSection = document.getElementById("withdrawSection");
const withdrawButton = document.getElementById("withdrawButton");
const withdrawAmountInput = document.getElementById("withdrawAmount");
const messageDiv = document.getElementById("message");

loginButton.addEventListener("click", () => {
  const enteredPIN = pinInput.value;

  if (userPIN === null) {
    if (enteredPIN.length === 4) {
      userPIN = enteredPIN;
      showMessage(
        "PIN set successfully! Please use it to log in next time.",
        "success"
      );
      switchToWithdrawalSection();
    } else {
      showMessage("PIN must be exactly 4 digits. Try again.", "error");
    }
  } else {
    if (enteredPIN === userPIN) {
      showMessage("Login successful. Welcome!", "success");
      switchToWithdrawalSection();
    } else {
      showMessage("Incorrect PIN. Please try again.", "error");
    }
  }
});

withdrawButton.addEventListener("click", () => {
  const withdrawAmount = parseFloat(withdrawAmountInput.value);

  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    showMessage("Please enter a valid amount.", "error");
    return;
  }

  if (withdrawAmount > accountBalance) {
    showMessage("Insufficient balance. Please try a smaller amount.", "error");
  } else {
    accountBalance -= withdrawAmount;
    showMessage(
      `Transaction successful! You withdrew $${withdrawAmount.toFixed(
        2
      )}. Remaining balance: $${accountBalance.toFixed(2)}.`,
      "success"
    );
  }

  withdrawAmountInput.value = "";
});

function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.style.color = type === "success" ? "green" : "red";
}

function switchToWithdrawalSection() {
  withdrawSection.style.display = "block";
  pinInput.style.display = "none";
  loginButton.style.display = "none";
}
