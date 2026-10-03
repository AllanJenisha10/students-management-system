
let students = [], courses = [];
const dlg = $('#dlg'), form = $('#stuForm');

/* ---------- login and tabs ---------- */
guard('admin').then(() => show('dashboard'));

document.querySelectorAll('[data-tab]').forEach(b => {
  b.onclick = () => show(b.dataset.tab);
});

function show(tab) {
  document.querySelectorAll('[data-tab]').forEach(b =>
    b.classList.toggle('on', b.dataset.tab === tab)
  );

  document.querySelectorAll('main section').forEach(s => {
    s.hidden = s.id !== tab;
  });

  if (tab === 'dashboard') loadDashboard();
  if (tab === 'students') loadStudents();
  if (tab === 'courses') loadCourses();
  if (tab === 'attendance' || tab === 'marks') fillPickers();
  if (tab === 'marks') loadMarks();
}

/* ---------- dashboard ---------- */
async function loadDashboard() {
  try {
    const [
      studentData,
      courseData,
      markData,
      attendanceData
    ] = await Promise.all([
      api('api/students.php'),
      api('api/courses.php'),
      api('api/marks.php'),
      api('api/attendance.php?summary=1')
    ]);

    // Main dashboard cards
    $('#dashStudents').textContent = studentData.length;
    $('#dashCourses').textContent = courseData.length;
    $('#dashMarks').textContent = markData.length;

    $('#dashAttendance').textContent =
      Number(attendanceData.total_records || 0);

    // Attendance summary
    const present = Number(attendanceData.present_count || 0);
    const absent = Number(attendanceData.absent_count || 0);
    const total = present + absent;

    $('#dashPresent').textContent = present;
    $('#dashAbsent').textContent = absent;
    $('#attendanceTotal').textContent = total;

    // Attendance bars
    const presentPercent = total
      ? (present / total) * 100
      : 0;

    const absentPercent = total
      ? (absent / total) * 100
      : 0;

    $('#presentBar').style.width = presentPercent + '%';
    $('#absentBar').style.width = absentPercent + '%';

    // Average marks
    const scores = markData
      .map(m => Number(m.score))
      .filter(score => Number.isFinite(score));

    const average = scores.length
      ? scores.reduce((sum, score) => sum + score, 0) /
        scores.length
      : 0;

    $('#dashAverage').textContent = average.toFixed(1);
    $('#marksCount').textContent = markData.length;

    $('#marksDescription').textContent = scores.length
      ? 'Average of ' + scores.length + ' recorded marks'
      : 'No marks recorded yet';

    // Recent marks
    // Assumes the API returns marks in insertion order.
    const recentMarks = markData.slice(-5).reverse();

    $('#recentMarksBody').innerHTML = recentMarks.length
      ? recentMarks.map(m => `
          <tr>
            <td>${esc(m.roll_no ?? '')}</td>
            <td>${esc(m.name ?? '')}</td>
            <td>${esc(m.course_code ?? '')}</td>
            <td>${esc(m.exam_type ?? '')}</td>
            <td>${esc(m.score ?? '')}</td>
          </tr>
        `).join('')
      : `<tr>
          <td colspan="5" class="empty">
            No marks recorded yet.
          </td>
        </tr>`;

    // Current date
    const dateElement = $('#dashDate');

    if (dateElement) {
      dateElement.textContent =
        new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
    }

  } catch (err) {
    toast('Could not load dashboard: ' + err.message, true);
  }
}

/* ---------- students ---------- */
async function loadStudents() {
  try {
    students = await api(
      'api/students.php?q=' +
      encodeURIComponent($('#search').value)
    );

    $('#stuBody').innerHTML = students.length
      ? students.map(s => `
          <tr>
            <td>${esc(s.roll_no)}</td>
            <td>${esc(s.name)}</td>
            <td>${esc(s.department)}</td>
            <td>${esc(s.year)}</td>
            <td>${esc(s.email)}</td>
            <td class="act">
              <button class="link" data-edit="${s.id}">
                Edit
              </button>
              <button class="link bad" data-del="${s.id}">
                Delete
              </button>
            </td>
          </tr>
        `).join('')
      : `<tr>
          <td colspan="6" class="empty">
            No students found. Use Add student to create one.
          </td>
        </tr>`;

  } catch (err) {
    toast(err.message, true);
  }
}

$('#search').oninput = loadStudents;

function openForm(s = null) {
  form.reset();

  form.elements['id'].value = s ? s.id : '';

  $('#dlgTitle').textContent = s
    ? 'Edit student'
    : 'Add student';

  form.elements['roll_no'].readOnly = !!s;

  if (s) {
    for (const k of [
      'roll_no',
      'name',
      'email',
      'phone',
      'department',
      'year'
    ]) {
      form.elements[k].value = s[k] ?? '';
    }
  }

  dlg.showModal();
}

$('#addStu').onclick = () => openForm();

$('#dlgCancel').onclick = () => dlg.close();

form.onsubmit = async e => {
  e.preventDefault();

  const d = Object.fromEntries(new FormData(form));

  try {
    await api(
      'api/students.php',
      d.id ? 'PUT' : 'POST',
      d
    );

    dlg.close();

    toast(d.id ? 'Student updated' : 'Student added');

    await loadStudents();
  } catch (err) {
    toast(err.message, true);
  }
};

$('#stuBody').onclick = async e => {
  const ed = e.target.dataset.edit;
  const del = e.target.dataset.del;

  if (ed) {
    openForm(students.find(s => s.id == ed));
  }

  if (
    del &&
    confirm(
      'Delete this student and all their attendance and marks?'
    )
  ) {
    try {
      await api('api/students.php?id=' + del, 'DELETE');

      toast('Student deleted');

      await loadStudents();
    } catch (err) {
      toast(err.message, true);
    }
  }
};

/* ---------- courses ---------- */
async function loadCourses() {
  try {
    courses = await api('api/courses.php');

    $('#courseBody').innerHTML = courses.length
      ? courses.map(c => `
          <tr>
            <td>${esc(c.course_code)}</td>
            <td>${esc(c.course_name)}</td>
            <td class="act">
              <button class="link bad" data-del="${c.id}">
                Delete
              </button>
            </td>
          </tr>
        `).join('')
      : `<tr>
          <td colspan="3" class="empty">
            No courses yet. Add one above.
          </td>
        </tr>`;

  } catch (err) {
    toast(err.message, true);
  }
}

$('#courseForm').onsubmit = async e => {
  e.preventDefault();

  try {
    await api(
      'api/courses.php',
      'POST',
      Object.fromEntries(new FormData(e.target))
    );

    e.target.reset();

    toast('Course added');

    await loadCourses();
  } catch (err) {
    toast(err.message, true);
  }
};

$('#courseBody').onclick = async e => {
  const id = e.target.dataset.del;

  if (
    id &&
    confirm('Delete this course and its attendance and marks?')
  ) {
    try {
      await api('api/courses.php?id=' + id, 'DELETE');

      toast('Course deleted');

      await loadCourses();
    } catch (err) {
      toast(err.message, true);
    }
  }
};

/* ---------- shared pickers ---------- */
async function fillPickers() {
  try {
    [courses, students] = await Promise.all([
      api('api/courses.php'),
      api('api/students.php')
    ]);

    const copt = courses.map(c => `
      <option value="${c.id}">
        ${esc(c.course_code)} - ${esc(c.course_name)}
      </option>
    `).join('');

    $('#attCourse').innerHTML = copt;
    $('#mkCourse').innerHTML = copt;

    $('#mkStudent').innerHTML = students.map(s => `
      <option value="${s.id}">
        ${esc(s.roll_no)} - ${esc(s.name)}
      </option>
    `).join('');

    if (!$('#attDate').value) {
      $('#attDate').value =
        new Date().toISOString().slice(0, 10);
    }

    $('#attBody').innerHTML = `
      <tr>
        <td colspan="3" class="empty">
          Choose a course and date, then load students.
        </td>
      </tr>
    `;

    $('#attSave').hidden = true;
    $('#attSave').dataset.ids = '';

  } catch (err) {
    toast(err.message, true);
  }
}

/* ---------- attendance ---------- */
$('#attCourse').onchange = () => {
  $('#attBody').innerHTML = '';
  $('#attSave').hidden = true;
  $('#attSave').dataset.ids = '';
};

$('#attDate').onchange = () => {
  $('#attBody').innerHTML = '';
  $('#attSave').hidden = true;
  $('#attSave').dataset.ids = '';
};

$('#attLoad').onclick = async () => {
  const courseId = $('#attCourse').value;
  const date = $('#attDate').value;

  if (!courseId || !date) {
    return toast('Choose a course and a date', true);
  }

  try {
    const rows = await api(
      `api/attendance.php?course_id=${encodeURIComponent(courseId)}&date=${encodeURIComponent(date)}`
    );

    $('#attBody').innerHTML = rows.length
      ? rows.map(r => `
          <tr>
            <td>${esc(r.roll_no)}</td>
            <td>${esc(r.name)}</td>
            <td class="radios">
              <label>
                <input
                  type="radio"
                  name="st${r.id}"
                  value="present"
                  ${r.status === 'present' ? 'checked' : ''}
                >
                Present
              </label>

              <label>
                <input
                  type="radio"
                  name="st${r.id}"
                  value="absent"
                  ${r.status === 'absent' ? 'checked' : ''}
                >
                Absent
              </label>
            </td>
          </tr>
        `).join('')
      : `<tr>
          <td colspan="3" class="empty">
            No students found. Add students first.
          </td>
        </tr>`;

    $('#attSave').dataset.ids =
      rows.map(r => r.id).join(',');

    $('#attSave').hidden = rows.length === 0;

  } catch (err) {
    toast(err.message, true);
  }
};

$('#attSave').onclick = async () => {
  const courseId = $('#attCourse').value;
  const date = $('#attDate').value;

  const ids = ($('#attSave').dataset.ids || '')
    .split(',')
    .filter(Boolean);

  if (!courseId || !date || ids.length === 0) {
    return toast('Load attendance first', true);
  }

  const records = [];

  for (const id of ids) {
    const selected = document.querySelector(
      `input[name="st${id}"]:checked`
    );

    if (!selected) {
      return toast(
        'Select attendance for every student',
        true
      );
    }

    records.push({
      student_id: Number(id),
      status: selected.value
    });
  }

  try {
    await api('api/attendance.php', 'POST', {
      course_id: Number(courseId),
      date: date,
      records: records
    });

    toast('Attendance saved successfully');

  } catch (err) {
    toast(err.message, true);
  }
};

/* ---------- marks ---------- */
async function loadMarks() {
  try {
    const rows = await api('api/marks.php');

    $('#markBody').innerHTML = rows.length
      ? rows.map(m => `
          <tr>
            <td>${esc(m.roll_no)}</td>
            <td>${esc(m.name)}</td>
            <td>${esc(m.course_code)}</td>
            <td>${esc(m.exam_type)}</td>
            <td>${esc(m.score)}</td>
            <td class="act">
              <button class="link bad" data-del="${m.id}">
                Delete
              </button>
            </td>
          </tr>
        `).join('')
      : `<tr>
          <td colspan="6" class="empty">
            No marks recorded yet.
          </td>
        </tr>`;

  } catch (err) {
    toast(err.message, true);
  }
}

$('#markForm').onsubmit = async e => {
  e.preventDefault();

  try {
    await api(
      'api/marks.php',
      'POST',
      Object.fromEntries(new FormData(e.target))
    );

    toast('Marks saved');

    await loadMarks();

    e.target.reset();

  } catch (err) {
    toast(err.message, true);
  }
};

$('#markBody').onclick = async e => {
  const id = e.target.dataset.del;

  if (id && confirm('Delete this mark?')) {
    try {
      await api('api/marks.php?id=' + id, 'DELETE');

      toast('Mark deleted');

      await loadMarks();

    } catch (err) {
      toast(err.message, true);
    }
  }
};