const parseCSV = require("../utils/csvParser");
const createCSV = require("../utils/csvWriter");
const SantaService = require("../services/santa.service");
const Employee = require("../models/employee.model");
const fs = require("fs/promises");
const {
  validateEmployees,
  validateEmployeeRows,
  validatePreviousRows,
} = require("../services/validation.service");

async function cleanupUploadedFiles(files) {
  const uploadedFiles = Object.values(files || {}).flat();

  await Promise.all(
    uploadedFiles.map(async (file) => {
      if (!file?.path) {
        return;
      }

      try {
        await fs.unlink(file.path);
      } catch {
      }
    })
  );
}

exports.generate = async (req, res, next) => {
  try {
    const employeeFile = req.files?.employees?.[0];
    const previousFile = req.files?.previous?.[0];

    if (!employeeFile) {
      throw new Error("Employee file is required");
    }

    const employeeData = await parseCSV(employeeFile);
    validateEmployeeRows(employeeData);

    const previousData = req.files.previous
      ? await parseCSV(previousFile)
      : [];

    if (previousData.length > 0) {
      validatePreviousRows(previousData);
    }

    const employees = employeeData.map(
      (e) => new Employee(e.Employee_Name, e.Employee_EmailID)
    );

    validateEmployees(employees);

    const previousAssignments = previousData.map((p) => ({
      employeeEmail: p.Employee_EmailID,
      secretChildEmail: p.Secret_Child_EmailID,
    }));

    const santaService = new SantaService(
      employees,
      previousAssignments
    );

    const result = santaService.generateAssignments();

    const filePath = await createCSV(result);

    res.download(filePath, async () => {
      await cleanupUploadedFiles(req.files);
    });
  } catch (error) {
    await cleanupUploadedFiles(req.files);
    next(error);
  }
};
