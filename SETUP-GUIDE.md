# SJS School app – setup guide

St. James H.S. School, Gongrai · one app for all staff

**One link, one icon, one sign-in.** The Home screen has tiles for:

| Section | Who | What |
|---|---|---|
| ✅ My Attendance | every teacher | Tap **I am Present** each day. Apply for **CL / ML / OD**. Nobody can change a mark. |
| 📢 Notices | all staff (the Admin posts) | Circulars, holidays, exam dates, meetings. Pin important ones. Share on WhatsApp. |
| 🧑‍🎓 Student Attendance | confirmed staff | Your SJS Attendance app (classes, AM/PM, fines, parent messages), now inside. |
| 🗓️ Time Table | everyone | Your SJS Time Table app (routine, free teachers, adjustments), now inside. |
| 📝 Marks & Report Cards | confirmed staff | Enter marks for each exam and subject, results with rank, pass % and top 10, A4 report cards. |
| 📚 Homework | confirmed staff | Post each day's homework for a class and send it to the parents' WhatsApp group. |
| ✍️ Exams | confirmed staff | Date sheet, **my invigilation duty**, seat plan and "where does this student sit?". |
| 📆 Calendar | confirmed staff | Holidays, exams, CCA days, PTMs. The next 14 days show on Home. |
| 💰 Fee Status | confirmed staff | Dues for each class, pasted from the Fee Collection workbook, with WhatsApp reminders. |
| Admin tiles | Admin email only | Teacher dashboard, leave approvals, confirm teachers, register (Excel), reports, settings. |

The app uses your Firebase project **`sjs-timetable`**. The settings are already in `config.js`.

---

## 1. Put the app online

1. Sign in to GitHub as **stjames1980** → **+ → New repository** → name it **`sjs-school`** → **Public** → **Create**.
2. **Upload files**: drag in **all 14 files in this folder** (there are no sub-folders). Tap **Commit changes**.
3. **Settings → Pages** → Branch **main**, **/ (root)** → **Save**.
4. After 1–2 minutes the app is live at **https://stjames1980.github.io/sjs-school/**

## 2. Firebase (one time)

In <https://console.firebase.google.com>, open project **sjs-timetable**:

1. **Authentication → Sign-in method**: **Email/Password** must be **Enabled**.
2. **Authentication → Settings → Authorized domains**: **stjames1980.github.io** must be listed.
3. **Firestore → Rules**: replace everything with the whole of **`firestore.rules`**. Put your **Admin email** where it says `PUT-ADMIN-EMAIL-HERE@gmail.com`, then tap **Publish**.
   These rules cover all four sections. The Time Table data stays as it is.

## 3. Move your old Student Attendance data in

Your old SJS Attendance app may save to a different place. To bring its classes and records into the new app:

1. In the **old** SJS Attendance app: **More → Data & sync → Backup**. This saves a backup file.
2. In the **new** SJS School app: **Student Attendance → More → Restore backup**, then choose that file.

If the old data is saved only on one phone, open **Student Attendance** in the new app on that same phone and use **Upload this phone's data**.

## 4. First steps for the Admin

1. Open the link, sign in with the **Admin email** (the same one as the Time Table).
2. **Teachers** → **Paste a list** of all teachers (`Name, Designation, Subject, Shift`).
3. **Settings**: session months, **marking times for each shift** (set them to match your real school timing), weekly off, holidays, leave types.
4. **Settings → Share app link on WhatsApp** sends the link to the staff group.
5. As teachers sign up: **Teachers → Confirm teachers** → **Confirm** each one. Confirming opens Notices and Student Attendance for them.

## 5. What each teacher does

1. Open the link → install it (**Chrome ⋮ → Install app**, or **iPhone Share → Add to Home Screen**).
2. Type an email and a new password, then tap **New teacher – create account**. Then **My Attendance → choose your name**.
3. Every school day: **My Attendance → I am Present** before the closing time.
4. Use **⌂ SJS Home** (the bottom-right button) to go back from Student Attendance or the Time Table.

## 6. Good to know

* The old separate apps (sjs-attendance, sjs-timetable, sjs-teacher-attendance) are no longer needed once everyone uses SJS School. The Time Table data is shared, so both can run side by side while you switch.
* Attendance marks and leave decisions are final. Nobody can edit them in the app.
* The Firebase project owner could still change data in the Firebase console, so keep that Google account private.
* **Updating later:** upload the changed files, then change `VERSION` in `sw.js` (for example `sjs-school-v2`).

---

## 7. New in version 11 (Nov 2026)

**After uploading, the Admin must publish the new `firestore.rules` once** (Firebase → Firestore → Rules → paste everything → Publish). Without this the new sections show "Permission problem".

* **Substitute duty alert.** When the Admin saves an adjustment in Time Table → Adjust, each substitute teacher sees a gold "Your substitute duty" card on Home with the period, class, subject and **room**. Teachers can tap **Turn on alerts** to also get a phone notification when they open the app.
  The app matches teachers by name. If a name is spelt differently in the routine, set the **Time Table code** (e.g. LK) in SJS App → Teachers → Edit.
* **Leave → adjustment.** In Time Table → Adjust, approved leave for that day is listed. One tap adds those teachers as absent and fills the substitutes. Check, then **Save & publish**.
* **Marks & Report Cards.** Admin first: **Setup** tab → exam names and full marks, pass mark, grades, subjects for each class → Save. Teachers then enter marks. Lock an exam when results are final.
* **Exams.** The Admin, Exam In-Charge or Principal pastes the date sheet, invigilation duty and seat plan from the Excel workbooks (columns are shown on screen).
* **Calendar.** The Admin or Principal adds events one by one, or pastes a list (Date | To date | Title | Type).
* **Fee Status.** The Admin pastes Roll No | Due | Months | Note for each class from the Fee Collection workbook.
* **Student profile.** Photo, date of birth, blood group and address, plus **Call** and **WhatsApp** buttons for the parent.

Files added: `marks.html`, `school.html`, `sjs-common.js`, `sjs-common.css`. Files changed: `index.html`, `attendance.html`, `timetable.html`, `firestore.rules`, `sw.js`, `SETUP-GUIDE.md`.

---

## 8. New in version 13 – Result Software (CBSE pattern, Nursery – XII)

The **Marks & Report Cards** tile is now **Result Software**. Upload these 5 changed files: `marks.html`, `sjs-common.js`, `sw.js`, `index.html`, `SETUP-GUIDE.md`. **No change to the Firestore rules is needed.** Marks already entered (PT-I, Half Yearly, PT-II, Annual) stay.

**Admin first – Setup tab**
1. **School details**: address, CBSE Affiliation No., School Code, UDISE (already filled – check them).
2. **Class groups and exams**: five groups (Pre-Primary, I–V, VI–VIII, IX–X, XI–XII). Each has Term 1 and Term 2. Write exams as `PT-I=10, Note Book=5, Sub. Enrichment=5, Half Yearly=80`.
   `PT-I=25>10` = test out of 25, counted as 10. `>0` = shown but not counted. `T` / `P` = theory / practical (XI–XII).
3. **Subjects for each class**: `Drawing*` = grade only. `Physics [70+30]` = theory 70 + practical 30.
4. **Lock** an exam when its result is final.

**Teachers**
* **Enter Marks**: choose Class → Term → Subject. Type marks (or `AB`). **Save**. "Paste from Excel" also works.
* **Grades & Remarks** (class teacher): working days, days present, co-scholastic grades, remark, and student details (PEN, APAAR, father's and mother's name).
* **Results**: result sheet, rank, pass %, Top 10 (one section or the whole class), subject analysis. Print or Excel.
* **Report Cards**: Term 1, Term 2 or Final. Print one or all (A4). WhatsApp the result to the parent.
* **Dashboard**: entry progress for each subject; the Admin, Principal and Exam In-Charge can load the whole school.

**Offline**
* Open the app and each of your classes **once with the internet on**. After that it works without internet.
* The pill at the bottom-left shows **Online · all saved** or **Offline · saved on this phone**. Offline marks upload by themselves when the internet returns – open the app once when you are back online.
* Try it without touching real data: `…/sjs-school/marks.html?demo=1`

**Two report card designs (version 14).** Setup → Class groups → **Report card design**: *Standard* (formal) or *Junior* (colourful, with stars). Junior is already chosen for Nursery–KG and Class I–V. Upload `marks.html` and `sw.js`.

**Bulk photo upload (version 16).** Result Software → **Grades & Remarks** → choose the class → **📷 Bulk photo upload**. Name the photo files by Roll No (`1.jpg`, `2.jpg` …), Admission No or exact name, choose them all together, check the list, then Save. Upload `marks.html` and `sw.js`.

**Results upgrade (version 17).** In **Results**: (1) **Result for** now lists every exam separately (PT-I, Half Yearly, PT-II, Annual …), each term, and the Final Result. (2) **Order** → *Merit order* shows the merit list; with **Show → Whole Class** it is the merit list of all sections together. (3) **⬇ Excel (complete result)** downloads a real `.xlsx` workbook: Result Sheet, Merit List, All Marks, Subject Analysis. (4) **🖨 Review sheet (merit-wise)** prints the result in merit order with a Remarks / Decision column. Upload `marks.html` and `sw.js`.

**Attendance in results (version 18).** Result sheet, merit list, review sheet and the Excel workbook now show attendance (days present / working days). In **Grades & Remarks**, choose the term's first and last date and tap **Fill attendance from Student Attendance** – the app counts it from the register; check and **Save**. Upload `marks.html` and `sw.js`.

**Report card changes (version 19).** Under GRAND TOTAL the card now has rows for Percentage, Rank, Attendance (with %) and Result – for Term 1, Term 2 and Overall. Overall = Term 1 50% + Term 2 50% (out of 100 in each subject). Subject Enrichment is printed as SEA. The line “(Issued by school as per directives of Central Board of Secondary Education, Delhi)” is under the title (change it in Setup → School details). Upload `marks.html` and `sw.js`.

**Report card changes (version 20).** Final column (marks only, no “out of”), a GRADE row after Percentage, Performance Analysis chart (highest in class, class average, marks obtained), signatures and INSTRUCTIONS (grading scale) at the bottom of the page. Upload `marks.html` and `sw.js`.

**Report card look (version 21).** CBSE logo top-left and school logo top-right (same size), bigger motto, equal margins on all four sides, darker lines and bigger marks so photocopies stay clear. **New file: `cbse.png`** – upload it with `marks.html` and `sw.js`. To use a sharper CBSE logo, upload a bigger picture with the same name `cbse.png`.

**KG report card (version 22).** For Nursery / KG the subjects can have parts (aspects), like your KG mark sheet: in Setup → Subjects write `English {Written 30, Reading 10, Dictation 10}, Rhymes {Recitation 30, Singing 20}, Mathematics {Written 30, Oral 20}, Drawing {Written 30, Creativity 10, Skill 10}`. Exams for the group: `P.Test-I=50, Half Yearly=50` and `P.Test-II=50, Annual=50`. In **Enter Marks** choose the subject and the exam – each aspect is a column. The report card shows every aspect, the subject Total, the 50% share of each term, Final and grades. KG has its own grade scale (A+, A, B, C, D) – change it in Setup → Class groups. **Height and Weight** are typed in Grades & Remarks and print as Health Status. Upload `marks.html` and `sw.js`.

**Report card polish (version 23).** Margins are 4 mm on all four sides (in the print window choose Margins: Default or None, Scale 100%), bigger student profile and photo, lighter table lines, bigger marks. KG grade scale: A+ 90–100, A 75–89, B 56–74, C 33–55, D 32 & below. Upload `marks.html` and `sw.js`.

**Version 24.** Health Status prints once (latest height and weight). Margins 6 mm on all sides. A dashed space for the Principal's seal under the signatures. Upload `marks.html` and `sw.js`.

**Result review (version 26).** Results → choose the class and **Final Result** → the **Result review** list at the bottom shows every student below the pass mark. The Admin, Principal or Exam In-Charge taps **Review** to (1) give **grace marks** in a subject, (2) **promote on special consideration**, or (3) **detain**. A failed Final result now reads **DETAINED in Class …**. Grace marks print with a † on the report card. Lock "Final result review" in Setup when the results are issued. Upload `marks.html` and `sw.js`.

**Version 27.** The version number shows at the bottom of Result Software. Updates now appear as soon as GitHub has published them (no 10-minute wait). Setup → Class groups → **↺ Use the latest default for this group** brings one group (for example Pre-Primary) up to the newest exams, subjects, grades and card design. Upload `marks.html` and `sw.js`.

**Version 29 – Simple Pass.** A student below the pass mark in 1 or 2 subjects in the Final Result gets **SIMPLE PASS** (promoted, no rank). Setup → Pass mark, grades and rank: choose the number of subjects, and Simple Pass or Compartment. Grades & Remarks has **Write automatic remarks in empty boxes** – the teacher can then edit any remark before saving. To change a decision after review: Results → Final Result → Result review → **Review**. Upload `marks.html` and `sw.js`.

**Version 31.** After review, the result reads **CONSIDERED ON SPECIAL CONSIDERATION** (Results → Final Result → Result review → Review → Decision). The wording can be changed in Setup → Pass mark, grades and rank. Upload `marks.html` and `sw.js`.

**Version 32 – absent rule.** Setup → Pass mark, grades and rank → **A student absent (AB) in an exam**: either AB counts as 0 marks (usual), or the result is FAILED for that exam / term / year. With the second choice the result reads FAILED (ABSENT) and names the subject. Upload `marks.html` and `sw.js`.

**Version 33.** The **Save setup** button now stays visible at the bottom of Setup. If the database refuses to save (old Firestore rules), the app says so in a red box with the fix: Firebase console → Firestore Database → Rules → paste the whole `firestore.rules` → Publish. Upload `marks.html` and `sw.js`.
