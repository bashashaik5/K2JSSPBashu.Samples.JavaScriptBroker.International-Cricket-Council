import "@k2oss/k2-broker-core";

metadata = {
  systemName: "com.k2.icc",
  displayName: "International Cricket Council",
  description: "A Test Custom Broker to retreive details of ICC, you can browse details of cricket teams associated with ICC.",
  configuration: {
    "typeOfSource": {
      displayName: "Typeof Source",
      type: "string",
      value: "Teams"
    }
  },
};

ondescribe = async function ({ configuration }): Promise<void> {
  postSchema({
    objects: {
      "teams": {
        displayName: "Cricket Teams",
        description: "Internation Cricket Teams associated with ICC",
        properties: {
          "id": {
            displayName: "ID",
            type: "number",
          },
          "name": {
            displayName: "Name",
            type: "string",
          },
          "continent": {
            displayName: "Continent",
            type: "string"
          }
        },
        methods: {
          "getTeams": {
            displayName: "Get Teams",
            type: "list",
            outputs: ["id", "name", "continent"]
          }
        }
      }
    }
  });
};

onexecute = async function ({ objectName, methodName, parameters, properties, configuration }): Promise<void> {
  switch (objectName) {
    case "teams":
      await onexecuteTeams(methodName, properties, parameters, configuration); break;
    default:
      throw new Error("The object " + objectName + " is not supported.");
  }
};

async function onexecuteTeams(methodName: string, properties: SingleRecord, parameters: SingleRecord, configuration: SingleRecord): Promise<void> {
  switch (methodName) {
    case "getTeams": await onexecuteTeamsGetList(parameters, properties, configuration); break;
    default: throw new Error("The method " + methodName + " is not supported.");
  }
}

async function onexecuteTeamsGetList(parameters: SingleRecord, properties: SingleRecord, configuration: SingleRecord): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const teamsObj = [
      {
        "id": 1,
        "name": "India",
        "cont": "ASIA"
      },
      {
        "id": 2,
        "name": "Australia",
        "cont": "ASIA"
      },
      {
        "id": 3,
        "name": "England",
        "cont": "Europe"
      },
      {
        "id": 4,
        "name": "South Africa",
        "cont": "Africa"
      }
    ]

    const teamIds = teamsObj.map(x => x.id);
    const teamNames = teamsObj.map(x => x.name);
    const teamCont = teamsObj.map(x => x.cont);

    postResult({
      "id": teamIds.toString(),
      "name": teamNames.toString(),
      "continent": teamCont.toString()
    });
  });

}



