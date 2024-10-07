const data = [
  {
    incident_id: "INC001",
    description: "The server is down and not responding",
    reported_by: "user1",
  },
  {
    incident_id: "INC002",
    description: "Unable to access the email system",
    reported_by: "user2",
  },
  {
    incident_id: "INC003",
    description: "The website is slow",
    reported_by: "user3",
  },
  {
    incident_id: "INC004",
    description: "System crashes when opening a specific application",
    reported_by: "user4",
  },
  {
    incident_id: "INC005",
    description: "I dont know what i'm doing here",
    reported_by: "user5",
  },
  {
    incident_id: "INC006",
    description: "Lets go home",
    reported_by: "user6",
  },
];

/**
 * Function will loop via data and add category property to each
 * item in array depending on keyword in description
 * @param {data} - array of test objects
 * @returns {result} array of categorized objects
 **/

function categorizeIncByDescription(data) {
  if (!data) {
    return;
  }

  const result = [];

  // const map = {
  //   "Network Issues": ["server", "network", "connection"],
  //   "Email Issues": ["email", "mailbox", "outlook"],
  //   "Performance Issues": ["slow", "lag", "performance"],
  //   "Application Issues": ["application", "software", "app"],
  // };

  // Transformin cateogry map so that maching words are keys in object to have better access - O(1)
  // If map above would be dynamic we would use function to transform it into categoryMap below
  const categoryMap = {
    server: "Network Issues",
    network: "Network Issues",
    connection: "Network Issues",
    email: "Email Issues",
    mailbox: "Email Issues",
    outlook: "Email Issues",
    slow: "Performance Issues",
    lag: "Performance Issues",
    performance: "Performance Issues",
    application: "Application Issues",
    software: "Application Issues",
    app: "Application Issues",
  };

  try {
    // caching length of incoming data
    const len = data.length;
    // choosing ugly for loop for better performance since we expecting N number of inputs
    for (let i = 0; i < len; i++) {
      // creating array from description and lowercasing words for later comparison
      const descriptionArr = data[i].description.toLowerCase().split(" ");

      // checking if some word is matching our key in cateogryMap object
      // if yes pushing object otherwise exiting early
      // storing boolean flag into variable keyFound whether word was found
      const keyFound = descriptionArr.some((word) => {
        return (
          // taking advantage of hashed object and searching in constant O(1)
          categoryMap.hasOwnProperty(word) &&
          result.push({
            ...data[i],
            category: categoryMap[word],
          })
        );
      });
      // if key was not found we are adding object with General cateogry into result array
      if (!keyFound) {
        result.push({
          ...data[i],
          category: "General",
        });
      }
    }
    return result;
  } catch (error) {
    return {
      function: "categorizeIncByDescription",
      error: error,
    };
  }
}

const result = categorizeIncByDescription(data);
console.log("result", result);
