const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const count = document.getElementById("count");

let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents(students);

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();
    const department = document.getElementById("department").value.trim();

    const exists = students.some(student => student.id === id);

    if (exists) {
        alert("Student ID already exists!");
        return;
    }

    const student = {
        name,
        id,
        department
    };

    students.push(student);

    saveStudents();

    displayStudents(students);

    form.reset();
});

function displayStudents(data) {

    table.innerHTML = "";

    data.forEach((student, index) => {

        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.department}</td>
            <td>
                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    count.textContent = students.length;
}

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        saveStudents();

        displayStudents(students);
    }
}

function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

search.addEventListener("keyup", function () {

    const keyword = search.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(keyword) ||
        student.id.toLowerCase().includes(keyword) ||
        student.department.toLowerCase().includes(keyword)
    );

    displayStudents(filtered);
});