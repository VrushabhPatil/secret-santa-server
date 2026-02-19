class SantaService {
  constructor(employees, previousAssignments = []) {
    this.employees = employees;
    this.previousAssignments = previousAssignments;
  }

  generateAssignments() {
    if (this.employees.length < 2) {
      throw new Error("Minimum 2 employees required");
    }

    const maxRetries = 200;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const shuffled = this.shuffle([...this.employees]);
      const assignments = [];
      let valid = true;

      for (let i = 0; i < this.employees.length; i++) {
        const giver = this.employees[i];
        const receiver = shuffled[i];

        if (
          giver.email === receiver.email ||
          this.wasAssignedLastYear(giver, receiver)
        ) {
          valid = false;
          break;
        }

        assignments.push({
          employee: giver,
          secretChild: receiver,
        });
      }

      if (valid) return assignments;
    }

    throw new Error("Unable to generate valid Secret Santa assignments");
  }

  wasAssignedLastYear(giver, receiver) {
    return this.previousAssignments.some(
      (entry) =>
        entry.employeeEmail === giver.email &&
        entry.secretChildEmail === receiver.email
    );
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

module.exports = SantaService;
