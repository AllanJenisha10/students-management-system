(async () => {
  try {
    await guard('student');
    const { profile: p, attendance, marks } = await api('api/student.php');
    $('#hello').textContent = 'Hello, ' + p.name;
    $('#profile').innerHTML = [['Roll no', p.roll_no], ['Department', p.department], ['Year', p.year], ['Email', p.email], ['Phone', p.phone]]
      .map(([k, v]) => `<div><small>${k}</small>${esc(v) || '-'}</div>`).join('');

    $('#attBody').innerHTML = attendance.length ? attendance.map(a => {
      const pct = Math.round(100 * a.present / a.total);
      return `<tr><td>${esc(a.course_code)} - ${esc(a.course_name)}</td><td>${a.present} of ${a.total} classes</td>
        <td>${pct}%</td><td><div class="meter ${pct < 75 ? 'low' : ''}"><i style="width:${pct}%"></i></div></td></tr>`;
    }).join('') : '<tr><td colspan="4" class="empty">No attendance recorded yet.</td></tr>';

    $('#markBody').innerHTML = marks.length ? marks.map(m =>
      `<tr><td>${esc(m.course_code)} - ${esc(m.course_name)}</td><td>${esc(m.exam_type)}</td><td>${esc(m.score)}</td></tr>`).join('')
      : '<tr><td colspan="3" class="empty">No marks published yet.</td></tr>';
  } catch (e) { toast(e.message, true); }
})();
