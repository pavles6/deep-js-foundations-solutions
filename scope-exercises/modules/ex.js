const deepJS = defineWorkshop();

[
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
].forEach(deepJS.addStudent);

[410, 105, 664, 375].forEach(deepJS.enrollStudent);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
deepJS.printCurrentEnrollment();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

// ********************************

function defineWorkshop() {
  const currentEnrollment = [];

  const studentRecords = [];

  return {
    addStudent(record) {
      if (
        record &&
        typeof record.id == "number" &&
        typeof record.name == "string" &&
        typeof record.paid == "boolean"
      ) {
        studentRecords.push(record);
      }
    },
    enrollStudent(id) {
      if (id && typeof id == "number" && !currentEnrollment.includes(id)) {
        currentEnrollment.push(id);
      }
    },
    printCurrentEnrollment() {
      printRecords(currentEnrollment);
    },
    enrollPaidStudents() {
      paidStudentsToEnroll();
    },
    remindUnpaidStudents() {
      remindUnpaid();
    },
  };

  function getStudentFromId(studentId) {
    return studentRecords.find(matchId);

    // *************************

    function matchId(record) {
      return record.id == studentId;
    }
  }

  function printRecords(recordIds) {
    const records = recordIds.map(getStudentFromId);

    records.sort(sortByNameAsc);

    records.forEach(printRecord);
  }

  function sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  }

  function printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
    );
  }

  function paidStudentsToEnroll() {
    const recordsToEnroll = studentRecords.filter(needToEnroll);

    const idsToEnroll = recordsToEnroll.map(getStudentId);

    currentEnrollment.push(...idsToEnroll);
  }

  function needToEnroll(record) {
    return record.paid && !currentEnrollment.includes(record.id);
  }

  function getStudentId(record) {
    return record.id;
  }

  function remindUnpaid() {
    const unpaidIds = currentEnrollment.filter(notYetPaid);

    printRecords(unpaidIds);
  }

  function notYetPaid(studentId) {
    const record = getStudentFromId(studentId);
    return !record.paid;
  }
}
