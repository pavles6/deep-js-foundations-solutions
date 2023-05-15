const printRecords = (recordIds) => {
  recordIds
    .map((id) => studentRecords.find((student) => student.id == id))
    .filter((student) => student != undefined)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })
    .forEach((student) =>
      console.log(
        `${student.name} (${student.id}): ${student.paid ? "Paid" : "Not Paid"}`
      )
    );
};

const paidStudentsToEnroll = () => {
  return studentRecords
    .map((student) => {
      if (
        student.paid &&
        !currentEnrollment.find((studentId) => student.id == studentId)
      ) {
        return student.id;
      }
    })
    .concat(...currentEnrollment);
};

const remindUnpaid = (recordIds) => {
  const unpaidIds = recordIds.filter((studentId) => {
    const student = studentRecords.find((student) => student.id == studentId);
    return student && !student.paid;
  });

  printRecords(unpaidIds);
};

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

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
