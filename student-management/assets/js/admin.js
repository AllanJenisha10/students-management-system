let students = [], courses = [];
const dlg = $('#dlg'), form = $('#stuForm');

guard('admin').then(() => show('students'));

/* ---------- tabs ---------- */
document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => show(b.dataset.tab));
function show(tab) {
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  document.querySelectorAll('main section').forEach(s => s.hidden = s.id !== tab);
  if (tab === 'students') loadStudents();
  if (tab === 'courses') loadCourses();
  if (tab === 'attendance' || tab === 'marks') fillPickers();
  if (tab === 'marks') loadMarks();
}

/* ---------- students ---------- */
async function loadStudents() {
  try {
    students = await api('api/students.php?q=' + encodeURIComponent($('#search').value));
    $('#stuBody').innerHTML = students.length ? students.map(s => `<tr>
      <td>${esc(s.roll_no)}</td><td>${esc(s.name)}</td><td>${esc(s.department)}</td><td>${esc(s.year)}</td><td>${esc(s.email)}</td>
      <td class="act"><button class="link" data-edit="${s.id}">Edit</button><button class="link bad" data-del="${s.id}">Delete</button></td></tr>`).join('')
      : '<tr><td colspan="6" class="empty">No students found. Use Add student to create one.</td></tr>';
  } catch (e) { toast(e.message, true); }
}
$('#search').oninput = loadStudents;

function openForm(s) {
  form.reset();
  $('#dlgTitle').textContent = s ? 'Edit student' : 'Add student';
  form.roll_no.readOnly = !!s;
  if (s) for (const k in s) if (form[k]) form[k].value = s[k] ?? '';
  dlg.showModal();
}
$('#addStu').onclick = () => openForm();
$('#dlgCancel').onclick = () => dlg.close();

form.onsubmit = async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  try {
    await api('api/students.php', d.id ? 'PUT' : 'POST', d);
    dlg.close();
    toast(d.id ? 'Student updated' : 'Student added');
    loadStudents();
  } catch (err) { toast(err.message, true); }
};

$('#stuBody').onclick = async e => {
  const ed = e.target.dataset.edit, del = e.target.dataset.del;
  if (ed) openForm(students.find(s => s.id == ed));
  if (del && confirm('Delete this student and all their attendance and marks?')) {
    try { await api('api/students.php?id=' + del, 'DELETE'); toast('Student deleted'); loadStudents(); }
    catch (err) { toast(err.message, true); }
  }
};

/* ---------- courses ---------- */
async function loadCourses() {
  courses = await api('api/courses.php');
  $('#courseBody').innerHTML = courses.length ? courses.map(c => `<tr>
    <td>${esc(c.course_code)}</td><td>${esc(c.course_name)}</td>
    <td class="act"><button class="link bad" data-del="${c.id}">Delete</button></td></tr>`).join('')
    : '<tr><td colspan="3" class="empty">No courses yet. Add one above.</td></tr>';
}
$('#courseForm').onsubmit = async e => {
  e.preventDefault();
  try {
    await api('api/courses.php', 'POST', Object.fromEntries(new FormData(e.target)));
    e.target.reset(); toast('Course added'); loadCourses();
  } catch (err) { toast(err.message, true); }
};
$('#courseBody').onclick = async e => {
  const id = e.target.dataset.del;
  if (id && confirm('Delete this course and its attendance and marks?')) {
    await api('api/courses.php?id=' + id, 'DELETE'); toast('Course deleted'); loadCourses();
  }
};

/* ---------- shared pickers ---------- */
async function fillPickers() {
  [courses, students] = await Promise.all([api('api/courses.php'), api('api/students.php')]);
  const copt = courses.map(c => `<option value="${c.id}">${esc(c.course_code)} - ${esc(c.course_name)}</option>`).join('');
  $('#attCourse').innerHTML = $('#mkCourse').innerHTML = copt;
  $('#mkStudent').innerHTML = students.map(s => `<option value="${s.id}">${esc(s.roll_no)} - ${esc(s.name)}</option>`).join('');
  if (!$('#attDate').value) $('#attDate').value = new Date().toISOString().slice(0, 10);
}

/* ---------- attendance ---------- */
$('#attLoad').onclick = async () => {
  const c = $('#attCourse').value, d = $('#attDate').value;
  if (!c || !d) return toast('Choose a course and a date', true);
  const rows = await api(`api/attendance.php?course_id=${c}&date=${d}`);
  $('#attBody').innerHTML = rows.length ? rows.map(r => `<tr><td>${esc(r.roll_no)}</td><td>${esc(r.name)}</td>
    <td class="radios">
      <label><input type="radio" name="st${r.id}" value="present" ${r.status === 'present' ? 'checked' : ''}>Present</label>
      <label><input type="radio" name="st${r.id}" value="absent" ${r.status === 'absent' ? 'checked' : ''}>Absent</label>
    </td></tr>`).join('') : '<tr><td colspan="3" class="empty">No students yet. Add students first.</td></tr>';
  $('#attSave').hidden = !rows.length;
  $('#attSave').dataset.ids = rows.map(r => r.id).join(',');
};
$('#attSave').onclick = async () => {
  const records = $('#attSave').dataset.ids.split(',').map(id => ({
    student_id: id, status: document.querySelector(`input[name=st${id}]:checked`).value
  }));
  try {
    await api('api/attendance.php', 'POST', { course_id: $('#attCourse').value, date: $('#attDate').value, records });
    toast('Attendance saved');
  } catch (err) { toast(err.message, true); }
};

/* ---------- marks ---------- */
async function loadMarks() {
  const rows = await api('api/marks.php');
  $('#markBody').innerHTML = rows.length ? rows.map(m => `<tr>
    <td>${esc(m.roll_no)}</td><td>${esc(m.name)}</td><td>${esc(m.course_code)}</td><td>${esc(m.exam_type)}</td><td>${esc(m.score)}</td>
    <td class="act"><button class="link bad" data-del="${m.id}">Delete</button></td></tr>`).join('')
    : '<tr><td colspan="6" class="empty">No marks recorded yet.</td></tr>';
}
$('#markForm').onsubmit = async e => {
  e.preventDefault();
  try {
    await api('api/marks.php', 'POST', Object.fromEntries(new FormData(e.target)));
    toast('Marks saved'); loadMarks();
  } catch (err) { toast(err.message, true); }
};
$('#markBody').onclick = async e => {
  const id = e.target.dataset.del;
  if (id && confirm('Delete this mark?')) { await api('api/marks.php?id=' + id, 'DELETE'); toast('Mark deleted'); loadMarks(); }
};
