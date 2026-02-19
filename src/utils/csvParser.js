const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

function normalizeHeader(header) {
  return String(header ?? "").replace(/^\uFEFF/, "").trim();
}

function normalizeObjectKeys(record) {
  return Object.entries(record).reduce((accumulator, [key, value]) => {
    accumulator[normalizeHeader(key)] = value;
    return accumulator;
  }, {});
}

function parseCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => normalizeHeader(header),
          mapValues: ({ value }) => String(value ?? "").trim(),
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

function parseExcelFile(filePath) {
  const workbook = XLSX.readFile(filePath, { raw: false });
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];

  if (!firstSheet) {
    return [];
  }

  const rows = XLSX.utils.sheet_to_json(firstSheet, {
    defval: "",
    raw: false,
  });

  return rows.map((row) => normalizeObjectKeys(row));
}

function resolveFilePathAndExtension(fileInput) {
  if (typeof fileInput === "string") {
    return {
      filePath: fileInput,
      extension: path.extname(fileInput).toLowerCase(),
    };
  }

  const filePath = fileInput?.path;
  const extension = path.extname(fileInput?.originalname || "").toLowerCase();

  return { filePath, extension };
}

async function parseCSV(fileInput) {
  const { filePath, extension } = resolveFilePathAndExtension(fileInput);

  if (!filePath) {
    throw new Error("Uploaded file not found");
  }

  if (extension === ".xlsx" || extension === ".xls") {
    return parseExcelFile(filePath);
  }

  return parseCsvFile(filePath);
}

module.exports = parseCSV;
