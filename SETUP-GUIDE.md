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

**Version 35 – Pre-Board / Selection exam (Class X and XII).** A separate exam, not counted in the Final Result. Enter Marks → Term: **Pre-Board Examination** → Theory and Internal. Results and Report Cards → choose **Pre-Board Examination**. Class X card: Code, Subject, Theory, Internal, Total, Grade, Status, then Overall Result. Class XII card: Full / Pass / Obtained / Status for Theory and for Internal / Practical. A subject code typed in front of the name (`184 English Lng & Lit`) is printed in the Code column. Setup → Class groups → Secondary / Senior Secondary: name, full marks, which classes, card layout. Upload `marks.html` and `sw.js`.

**Version 37.** The report card now shares out any empty space by itself: the Principal's seal box is larger and the rows and chart are roomier, so there is no wide gap above the signatures. Upload `marks.html` and `sw.js`.

**Version 42 – Nursery “My First Report Card”.** Nursery now has its own group in Setup (**Nursery**), with one exam, **Final Examination**, and three subjects (English, Mathematics, Drawing) out of **30** each. To change the full marks: Setup → Class groups and exams → Nursery → *Exams in Final Examination* → `Final Exam=30` → Save setup. Subjects, the My Skills list (`Group name: skill, skill; Next group: skill, skill`) and the star ratings are changed in the same place. Stars, height, weight, attendance, the remark and **I am special because…** are entered in Grades & Remarks. Print from Report Cards → class Nursery. KG-I and KG-II keep their own card. Upload `marks.html` and `sw.js`.

**Version 43 – Nursery card.** The boxes are wider, and the class teacher's full name now prints in full. Grades & Remarks → class Nursery has two new choices, for **Class teacher's remarks** and for **I am special because…**: *Automatic + teacher can change* (an empty box gets the automatic text), *Automatic only*, or *Teacher writes only* (an empty box prints blank lines to write by hand). Tap **Save** after choosing. The remark choice also works for the other classes. Upload `marks.html` and `sw.js`.

**Version 44.**
- **Excel template (Enter Marks):** *Download Excel template* gives one sheet for each exam (subjects across, students down, saved marks already filled in). Fill it in Excel, then *Upload filled Excel*. The app shows what will change and lists any wrong marks before saving. Type AB for absent. Do not change the Roll No column or the grey KEY row.
- **Summary of every exam (Results):** *Excel – all exams* / *Print – all exams*: marks, %, grade and rank in every exam side by side, in Final merit order, plus a merit list sheet for each exam. Ranks are dense: equal percentages share a rank (1, 2, 2, 3 …).
- **Whole school (Dashboard → Whole school result summary → Load all classes):** choose the exam; every class and section with totals, toppers and grades. Excel has a sheet for each exam and an *Overall* sheet with the pass % of every exam. Print gives the summary, the 1st–3rd rank holders of every class, and a page of pass % in every exam.
- **Final Review tab:** every student of a class in merit order with all subjects, total, % and attendance. Choose *Consider (promote)* or *Not considered – Detain* for each, add a note, tap *Save decisions*. *Grace* adds marks. Print and Excel review sheets. Minimum attendance (default 75%) is set in Setup.
Upload `marks.html` and `sw.js`.

**Version 45 – pass marks.** A subject is passed when the marks reach 33% of its full marks **rounded up**: out of 50 → 17, out of 80 → 27, out of 100 → 33 (so 16.5/50 and 26.5/80 are not passed). Every result sheet, merit list and review sheet (screen, print and Excel) now has a **Full marks** row and a **Pass marks** row under the subject names. For PT-I/PT-II out of 50 counting as 10, write `PT-I=50>10` and `PT-II=50>10` in Setup. Upload `marks.html` and `sw.js`.

**Version 46 – results of single exams.** In PT-I, PT-II, Half Yearly and Annual, a student below the pass marks in 1 or 2 subjects gets **SIMPLE PASS**, and in 3 or more subjects gets **FAILED** (the same rule as Term and Final). New choice in Setup → "A student absent (AB) in an exam": **FAILED in that exam (PT-I, PT-II, Half Yearly, Annual) – Term and Final worked out as usual**. Choose it and tap Save setup. Upload `marks.html` and `sw.js`.

**Version 47 – Final Review on a phone.** Each student now has a **✎ Decide** button right next to the name. It opens one box with the marks of every subject, attendance, the decision (Consider / Not considered – Detain / As calculated), grace marks and a note; **Save decision** saves it at once. On a computer the Decision and Note columns at the right still work, with **Save decisions** for many students together. Upload `marks.html` and `sw.js`.

**Version 48 – Excel upload report.** After choosing the filled Excel file, the upload box now lists **every sheet** with what happened: marks new/changed, no change, wrong marks (not used), "no marks typed in this sheet", or locked. Marks more than the full marks of that exam (Half Yearly 80, PT 50 or 10, Note Book 5, SEA 5, Practical/IA as set) are not used – correct them in Excel and upload again. Upload `marks.html` and `sw.js`.

**Version 49 – Class XI–XII report card (normal, not Pre-Board).** Under Term 1 / Term 2 the headings read **PT-I (50) not counted**, **Half Yearly Theory (80/70)**, **Practical / IA (30/20)** – the numbers come from the full marks in Setup. The PT-I box shows only the marks scored. Theory and Practical boxes show **marks / pass marks**, e.g. 42/27 and 14/7; marks below the pass marks are red. Totals, grades and everything else are unchanged. The Pre-Board card now shows the same pass marks as the rest of the software (80 → 27, 70 → 24, 30 → 10, 20 → 7). Upload `marks.html` and `sw.js`.

**Version 50 – CBSE rounding of pass marks.** Pass marks are now 33% of the full marks **rounded to the nearest whole number**, as CBSE does: 100 → 33, 80 → 26, 70 → 23, 50 → 17, 30 → 10, 25 → 8, 20 → 7, 10 → 3, 5 → 2. This is used everywhere: pass/fail of every subject, Simple Pass, result sheets (Pass marks row), report cards (marks / pass marks), the Pre-Board card and the Final Review. Upload `marks.html` and `sw.js`.

**Version 51 – Class XI–XII card (normal only).** The marks boxes show only the exact score (below the pass marks in red). The pass marks are printed once in each heading, in the same order as the full marks: **PT-I (50) Pass 17 · not counted**, **Half Yearly Theory (80/70) Pass 26/23**, **Practical / IA (30/20) Pass 10/7**. Pre-Board and all other cards unchanged. Upload `marks.html` and `sw.js`.

**Version 52.** On the normal Class XI–XII card the headings now read **P.M.** instead of "Pass" (P.M. = pass marks): PT-I (50) P.M. 17 · not counted, Half Yearly Theory (80/70) P.M. 26/23, Practical / IA (30/20) P.M. 10/7. Upload `marks.html` and `sw.js`.

**Version 53 – signature space on the Class XI–XII card.** The card now keeps up to 24 mm of signing room above the signature lines (other cards keep 15 mm). The space comes from spare room on the page: a Term card gets the full 24 mm; the Final card, which has more rows, gets what is left (about 18 mm with 5–6 subjects). To change it yourself: in marks.html search for `?24:15` and change 24 (millimetres), then upload marks.html and sw.js with the VERSION number in sw.js increased by one.

**Version 54 – Class XI–XII card.** The signature lines and names are lower (about 5 mm on the Final card), giving more room to sign under the Result box. The Principal's seal box under them is a little shorter. Other cards unchanged. Upload `marks.html` and `sw.js`.

**Version 55 – Class XI–XII card.** Space between the Result box and the signature lines is about 20.5 mm (Final card 20.7 mm, Term cards about 22 mm). To adjust it yourself: in marks.html search for `.card.sr .seal{height:9.5mm` – a smaller number lowers the signatures, a bigger number raises them (1 mm = 1 mm) – and increase the VERSION in sw.js by one.

**Version 56 – Class XI–XII card.** Signature lines and names lowered about 1.5 mm more (Final card: 22 mm below the Result box). Result box, Instructions and the rest unchanged. Adjust yourself: in marks.html search `.card.sr .seal{height:8mm` (smaller = signatures lower) and raise the VERSION in sw.js by one.

**Version 57 – attendance for each exam.** Grades & Remarks → **Attendance for**: *Whole Term* (as before), each exam (**PT-I, Half Yearly, PT-II, Annual**), or **Final – whole year**. For an exam or the Final, type the working days and days present, or choose the dates and tap *Fill attendance from Student Attendance* (it counts from the daily register), then Save. Any box left empty uses the automatic attendance (shown in grey): an exam uses its term's attendance; the Final adds up the terms. *Clear all – use automatic* removes what was typed. An exam's own attendance appears on that exam's result sheet, merit list and Excel; the Final figure appears on the Final result sheet and the report card. Upload `marks.html` and `sw.js`.

**Version 58 – New session.** At the end of the year (all results final, nobody entering marks, internet on): **Setup → New session → Start a new session…**, check the session name, type NEW SESSION, tap *Save copy and clear marks*. It (1) saves a copy of every class – marks, attendance, remarks, decisions, students and photos, (2) reads the copy back and checks it, (3) only then clears the marks, (4) unlocks the exams. If anything fails before step 3, nothing is cleared – just try again. Setup, subjects, students and photos stay. Then set the new session in the SJS App settings and update students in Student Attendance. **Old sessions:** Dashboard → Old sessions → *Open (read-only)* shows that year's results, merit lists, Final Review and report cards exactly as they were; nothing can be changed there. *Back to current session* returns. The copies are stored in mk_cfg (no change to the Firebase rules). The daily Student Attendance register is not cleared by this.

**Version 59 – Class XI–XII result sheets.** In the result sheet, merit list, review sheet (screen, print, Excel) and the Final Review, every subject now has three columns: **Th** (theory), **Pr/IA** (practical / internal assessment) and **Total**, with a Full marks and a Pass marks row for each. Only the part below its pass marks is red, so it is clear why a subject is not passed even when the total is above 33. In the Final, "T1"/"T2" next to a red mark shows the term in which that part was below the pass marks. Other classes are unchanged. Upload `marks.html` and `sw.js`.

**Version 60 – Total column.** On result sheets, merit lists, review sheets and the Final Review (screen, print, Excel) the Total column shows only the marks scored (e.g. 345); the full total (e.g. 500) is in the Full marks row above. The Final Review now also has Full marks and Pass marks rows. Only a student whose full total is different from the others (e.g. fewer subjects) still shows "/total", and Excel keeps the "Out of" column only in that case. Report cards unchanged. Upload `marks.html` and `sw.js`.

**Version 61 – Class X has its own group.** Setup now shows **Class X** separately (Class IX stays in "Secondary (Class IX)" with Note Book and SEA). Class X, Term 1: **PT-I (50) not counted**, **Half Yearly (80)**, **Practical / IA (20)**, **Total (100)**; Term 2 the same with PT-II and Annual. Note Book and SEA are removed for Class X. The report card, result sheets and Final Review of Class X show Theory | Pr/IA | Total like Class XI–XII. Class X's subjects, grades, co-scholastic areas and Pre-Board are copied from its old group; PT-I, Half Yearly, PT-II and Annual marks already entered are kept; Note Book/SEA marks are no longer used. A subject is passed with 33% of theory + IA together (not separately) – change "theory and practical separately" in Setup → Class X if needed. Tap **Save setup** once so the new group is stored. Upload `marks.html` and `sw.js`.

**Version 62 – highlighting when theory and IA are passed together.** When a group's "Theory & practical" setting is **Pass on the subject total** (Class X), the Theory and Pr/IA marks are never red – only the subject Total is red when it is below the pass marks (e.g. 27 + 5 = 32 → only 32 red; 22 + 11 = 33 → nothing red). This applies to the report card, result sheets and the Final Review. With **Must pass each separately** (Class XI–XII) the part below its pass marks is red as before. Upload `marks.html` and `sw.js`.

**Version 63 – Class X normal report card only.** The signature lines, names and the Principal's seal box are 2 mm higher (a little more space between the seal box and the Instructions). Nothing else changed; Class XI–XII and all other cards are exactly as in version 62. Adjust yourself: in marks.html search `.card.sr.cx .ins{margin-top:calc(8px + 2mm)` – a bigger mm number moves the signatures higher – and raise the VERSION in sw.js by one.

**Version 64 – new side menu for the whole SJS App.** A new file **sjs-nav.js** adds the same menu to every page: Home, Teacher Attendance, Notices · Student Attendance, Time Table, Result Software (with its pages: Dashboard, Enter Marks, Grades & Remarks, Results, Final Review, Report Cards, Setup) · Homework, Exams, Calendar, Fee Status · Admin/Management (Dashboard, All Classes, Leave, Teachers, Register, Teacher Report, Settings – shown to those allowed). On a computer or tablet (1100 px wide or more) it stays open on the left; on a phone the **☰ Menu** button (where "⌂ SJS Home" was) opens it. The home page has a new look (welcome banner, modern cards). Every home-page screen now has its own address (e.g. index.html#notices). Nothing else in the modules, reports or rules changed. Upload **all** files: sjs-nav.js (new), index.html, attendance.html, timetable.html, marks.html, school.html, sw.js.

**Version 65 – whole school printouts (Dashboard → Whole school result summary → Load all classes → choose the exam).**
- **🖨 Summary (1 page):** every section, a total for each class and the whole school, with **Boys / Girls / Total** for Students, Passed, Not passed and Pass %, plus Appeared, Simple pass, Average and Highest. No Grades column. It always fits one A4 page (it shrinks slightly if there are many sections). Boys/Girls come from Boy (M) / Girl (F) in Student Attendance; students without it are counted only in Total.
- **🏆 Top 10 rank holders:** one page per class (all its sections together), ranks 1 to 10 in merit order. Equal percentages share a rank, so a class may list more than 10 students (e.g. 1, 2, 2, 3 … 10). Only passed students are ranked (Setup → Rank is given to).
- **🖨 Pass % – all exams:** the pass % and average of every class in every exam (was page 2 of the old summary).
Upload `marks.html` and `sw.js`.

**Version 66 – whole school (Dashboard).** *Pass % – all exams* (print and the Excel "Overall" sheet) no longer has Note Book and SEA columns. **Top 10 rank holders:** choose in the dropdown – all classes (one page each), one class with all its sections together, one section only, or all sections (one page each) – then **🖨 Print / Save as PDF** (in the print window choose "Save as PDF" as the printer) or **⬇ Excel** (one sheet per class/section). Upload `marks.html` and `sw.js` (and the version 64 files if not uploaded yet).

**Version 67 – student details by Excel.** Result Software → **Grades & Remarks** → choose the class → **👤 Student details: ⬇ Download Excel**. One row per student: Student's Name, Admission No, Gender (M/F), Date of Birth (DD-MM-YYYY), Father's Name, Mother's Name, Parent / Guardian, Phone, Address, Blood Group, PEN No, APAAR ID (details already saved are filled in). Fill it, then **⬆ Upload filled Excel**: the app shows what changes and lists any wrong entries, then **Save details**. Do not change the grey Student ID and Roll No columns; an empty box is not changed; type a dash ( - ) to clear a detail. The details are saved in the same student records as Student Attendance (Name, Admission No, Gender, Phone, Address, Date of Birth, Blood Group and Parent appear there too) and print on the report card. Only the class teacher or the Admin can upload. The Details button in Report Cards now also has Gender, Phone and Address. Upload `marks.html` and `sw.js`.

## Version 68
- Class lists everywhere (Result Software dropdowns, Dashboard whole-school summary, Top 10, Student Attendance, Home) now follow school order: Nursery, LKG (KG-I), UKG (KG-II), I, II … XII, then section A, B, C. The saved "order" number of a class is only used for names the app does not recognise.

## Version 69
- Report cards now always fit on one A4 page. When a class has many subjects (for example LKG / UKG with many subjects and their parts), the whole card is shrunk a little so it does not run onto a second page. Cards that already fit are not changed.

## Version 70
- Student details (Details box and the Excel template): the "Parent / Guardian" box is removed – Father's name and Mother's name are used. Old saved parent names stay as a back-up for the card only.
- A red "⎋ Sign out" button is now at the top right, beside your name and role (Admin / Principal / Teacher), on Home, Result Software and the Homework / Exams / Calendar / Fees pages. It asks "Sign out of the SJS App?" first. The old Sign out button at the bottom of Home is removed.
- This version also changes sjs-common.css – upload it too.

## Version 71
- Attendance now builds up from the exams: type (or fill from Student Attendance) the attendance of PT-I, Half Yearly, PT-II and Annual separately in Grades & Remarks → "Attendance for".
  - Term-I = PT-I + Half Yearly and Term-II = PT-II + Annual, added automatically (days present and working days). Type a Term number only to change it by hand; an empty box stays automatic.
  - Final = Term-I + Term-II automatically; "Final – whole year" can still be typed by hand.
  - Every exam result sheet (PT-I, Half Yearly, PT-II, Annual) shows that exam's own attendance; Term and Final result sheets, report cards and the Final Review show the totals.
