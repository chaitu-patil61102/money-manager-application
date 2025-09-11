export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Convert number to string to handle decimals
    const numStr = num.toString();
    const parts = numStr.split(".");

    let integerPart = parts[0];
    let fractionalPart = parts[1] || "";

    // Regex for Indian numbering system
    // Last 3 digits remain, then every 2 digits get a comma
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if (otherNumbers !== "") {
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integerPart = formattedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree; // For numbers less than 1000
    }

    // Combine integer and fractional parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};
