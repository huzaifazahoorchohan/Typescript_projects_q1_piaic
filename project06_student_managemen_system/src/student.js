export class Student {
    constructor(name, coursesEnrolled = [], balance = 0) {
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.balance = balance;
        this.studentID = `S${Student.nextStudentID++}`;
    }
    enrollCourse(courseName) {
        this.coursesEnrolled.push(courseName);
    }
    viewBalance() {
        return this.balance;
    }
    payTuition(amount) {
        this.balance -= amount;
    }
    showStatus() {
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses Enrolled: ${this.coursesEnrolled.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}
Student.nextStudentID = 1000;
