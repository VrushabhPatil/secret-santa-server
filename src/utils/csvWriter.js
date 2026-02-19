const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

async function createCSV(assignments) {
  const filePath = path.join(__dirname, "../../output.csv");

  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "employeeName", title: "Employee_Name" },
      { id: "employeeEmail", title: "Employee_EmailID" },
      { id: "childName", title: "Secret_Child_Name" },
      { id: "childEmail", title: "Secret_Child_EmailID" },
    ],
  });

  const records = assignments.map((a) => ({
    employeeName: a.employee.name,
    employeeEmail: a.employee.email,
    childName: a.secretChild.name,
    childEmail: a.secretChild.email,
  }));

  await csvWriter.writeRecords(records);

  return filePath;
}

module.exports = createCSV;
