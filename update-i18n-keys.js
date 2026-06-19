import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all language files in src/locales
const localesDir = path.join(__dirname, 'src', 'locales');
const languageFiles = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'));

// English base translation for all new keys (this will be the template)
const englishTranslations = {
  reviewForm: {
    "title": "Leave a Review",
    "name": "Your Name",
    "namePlaceholder": "Enter your full name",
    "location": "Your Location",
    "locationPlaceholder": "Enter your area (Chennai, Thiruvallur, Avadi, etc.)",
    "text": "Your Review",
    "textPlaceholder": "Write your experience with our services",
    "submit": "Submit Review",
    "success": "Thank you for your review! It has been published successfully.",
    "error": "There was an error submitting your review. Please try again."
  },
  bookingStatus: {
    "title": "Check Your Booking Status",
    "bookingId": "Booking ID",
    "bookingIdPlaceholder": "Enter your booking ID (e.g., BK001)",
    "check": "Check Status",
    "notFound": "Booking not found. Please check your booking ID and try again.",
    "statuses": {
      "pending": "Pending",
      "confirmed": "Confirmed",
      "inProgress": "In Progress",
      "completed": "Completed",
      "cancelled": "Cancelled"
    }
  }
};

// Function to add new keys to a language file
const addKeysToLanguageFile = (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(fileContent);
    
    // Only add if the keys don't already exist (don't overwrite existing translations)
    if (!translations.reviewForm) translations.reviewForm = englishTranslations.reviewForm;
    if (!translations.bookingStatus) translations.bookingStatus = englishTranslations.bookingStatus;
    
    // Write the updated translations back
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');
    console.log(`Updated successfully: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
};

// Process all language files
let successCount = 0;
languageFiles.forEach(file => {
  const filePath = path.join(localesDir, file);
  if (addKeysToLanguageFile(filePath)) successCount++;
});

console.log(`\nCompleted! Successfully updated ${successCount} of ${languageFiles.length} language files.`);
console.log('New i18n keys for reviewForm and bookingStatus have been added to all language files.');