export const removeDupicatesFromArrayOfObjects = (array, removeBy) => {
  return array.reduce((unique, o) => {
    if (!unique.some((obj) => obj[removeBy] === o[removeBy])) {
      unique.push(o);
    }
    return unique;
  }, []);
};

// export const removeDupicatesFromArrayOfObjects = (array, removeBy) => {
//   let newArray = [];

//   // Declare an empty object
//   let uniqueObject = {};

//   // Loop for the array elements
//   for (let i in array) {
//     // Extract the title
//     var objTitle = array[i][removeBy];

//     // Use the title as the index
//     uniqueObject[objTitle] = array[i];
//   }

//   // Loop to push unique object into array
//   for (let i in uniqueObject) {
//     newArray.push(uniqueObject[i]);
//   }

//   // Display the unique objects
//   return newArray;
// };
