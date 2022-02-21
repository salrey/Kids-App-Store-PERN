////////HELPER FUNCTIONS/////////

const setValues = (storeapp) => {
    if (!storeapp.image) {
        storeapp.image = "https://placeit.net/495947b37621e6"
    }

    if (storeapp.name?.length > 2) {
        const list = storeapp.name.split(" ");
        storeapp.name = list.map((word) => {
            if (word.length > 2) {
                word = word[0].toUpperCase() + word.substring(1).toLowerCase()
            }
            return word
        }).join(" ")
    }

    return storeapp
};

  
module.exports = {
    setValues,
};
  