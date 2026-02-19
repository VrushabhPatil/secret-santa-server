const EMPLOYEE_HEADERS = ["Employee_Name", "Employee_EmailID"];
const PREVIOUS_HEADERS = [
  "Employee_Name",
  "Employee_EmailID",
  "Secret_Child_Name",
  "Secret_Child_EmailID",
];

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function ensureRequiredHeaders(rows, requiredHeaders, label) {
  const availableHeaders = Object.keys(rows[0] || {});
  const missingHeaders = requiredHeaders.filter(
    (requiredHeader) => !availableHeaders.includes(requiredHeader)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `${label} is missing required columns: ${missingHeaders.join(", ")}`
    );
  }
}

function ensureRequiredValues(rows, requiredHeaders, label) {
  const invalidRowIndexes = [];

  rows.forEach((row, index) => {
    const hasMissingValue = requiredHeaders.some((header) => {
      const value = normalizeValue(row[header]);
      return !value;
    });

    if (hasMissingValue) {
      invalidRowIndexes.push(index + 2);
    }
  });

  if (invalidRowIndexes.length > 0) {
    throw new Error(
      `${label} has empty required values in row(s): ${invalidRowIndexes.join(
        ", "
      )}`
    );
  }
}

function validateEmployeeRows(rows) {
  if (!rows || rows.length === 0) {
    throw new Error("Employee file has no data rows");
  }

  ensureRequiredHeaders(rows, EMPLOYEE_HEADERS, "Employee file");
  ensureRequiredValues(rows, EMPLOYEE_HEADERS, "Employee file");
}

function validatePreviousRows(rows) {
  if (!rows || rows.length === 0) {
    throw new Error("Previous assignments file has no data rows");
  }

  ensureRequiredHeaders(rows, PREVIOUS_HEADERS, "Previous assignments file");
  ensureRequiredValues(rows, PREVIOUS_HEADERS, "Previous assignments file");
}

function validateEmployees(employees) {
  const emails = new Set();

  employees.forEach((emp) => {
    if (!emp.name || !emp.email) {
      throw new Error("Invalid employee record");
    }

    if (emails.has(emp.email)) {
      throw new Error("Duplicate email found");
    }

    emails.add(emp.email);
  });
}

module.exports = {
  validateEmployees,
  validateEmployeeRows,
  validatePreviousRows,
};
