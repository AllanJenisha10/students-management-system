(async () => {
    try {
        await guard("student");

        const {
            profile: p,
            attendance,
            marks
        } = await api("api/student.php");

        // Student profile
        $("#hello").textContent = "Hello, " + p.name;

        $("#profile").innerHTML = [
            ["Roll no", p.roll_no],
            ["Department", p.department],
            ["Year", p.year],
            ["Email", p.email],
            ["Phone", p.phone]
        ].map(([key, value]) => `
            <div>
                <small>${esc(key)}</small>
                ${esc(value) || "-"}
            </div>
        `).join("");

        // Attendance
        $("#attBody").innerHTML = attendance.length
            ? attendance.map(a => {
                const present = Number(a.present) || 0;
                const total = Number(a.total) || 0;

                const percentage = total
                    ? Math.round(100 * present / total)
                    : 0;

                return `
                    <tr>
                        <td>
                            ${esc(a.course_code)} -
                            ${esc(a.course_name)}
                        </td>
                        <td>${present} of ${total} classes</td>
                        <td>${percentage}%</td>
                        <td>
                            <div class="meter ${
                                percentage < 75 ? "low" : ""
                            }">
                                <i style="width:${percentage}%"></i>
                            </div>
                        </td>
                    </tr>
                `;
            }).join("")
            : `
                <tr>
                    <td colspan="4" class="empty">
                        No attendance recorded yet.
                    </td>
                </tr>
            `;

        // Marks
        $("#markBody").innerHTML = marks.length
            ? marks.map(m => `
                <tr>
                    <td>
                        ${esc(m.course_code)} -
                        ${esc(m.course_name)}
                    </td>
                    <td>${esc(m.exam_type)}</td>
                    <td>${esc(m.score)}</td>
                </tr>
            `).join("")
            : `
                <tr>
                    <td colspan="3" class="empty">
                        No marks published yet.
                    </td>
                </tr>
            `;

    } catch (error) {
        toast(error.message || "Unable to load student records.", true);
    }
})();