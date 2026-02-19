const SantaService = require("../src/services/santa.service");

describe("SantaService", () => {
  test("should not assign self", () => {
    const employees = [
      { name: "A", email: "a@test.com" },
      { name: "B", email: "b@test.com" },
    ];

    const service = new SantaService(employees);
    const result = service.generateAssignments();

    result.forEach((assignment) => {
      expect(assignment.employee.email)
        .not.toBe(assignment.secretChild.email);
    });
  });
});
