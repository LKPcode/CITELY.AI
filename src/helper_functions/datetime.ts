export default function formatDateRelativeToCurrent(datetimeString) {
    // Parse the given datetime string into a Date object
    const givenDate = new Date(datetimeString);
  
    // Get the current datetime in the browser
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - givenDate;
  
    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    // Format the result based on the time difference
    if (timeDifference < minute) {
      return "Just now";
    } else if (timeDifference < hour) {
      const minutesAgo = Math.floor(timeDifference / minute);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < day) {
      const hoursAgo = Math.floor(timeDifference / hour);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else {
      const daysAgo = Math.floor(timeDifference / day);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  }