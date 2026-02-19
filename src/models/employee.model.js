class Employee {
  constructor(name, email) {
    const safeName = typeof name === "string" ? name.trim() : "";
    const safeEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!safeName || !safeEmail) {
      throw new Error(
        "Invalid employee record: Employee_Name and Employee_EmailID are required"
      );
    }

    this.name = safeName;
    this.email = safeEmail;
  }
}

module.exports = Employee;
