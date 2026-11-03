# SJS School app – setup guide

St. James H.S. School, Gongrai · one app for all staff

**One link, one icon, one sign-in.** The Home screen has tiles for:

| Section | Who | What |
|---|---|---|
| ✅ My Attendance | every teacher | Tap **I am Present** each day. Apply for **CL / ML / OD**. Nobody can change a mark. |
| 📢 Notices | all staff (the Admin posts) | Circulars, holidays, exam dates, meetings. Pin important ones. Share on WhatsApp. |
| 🧑‍🎓 Student Attendance | confirmed staff | Your SJS Attendance app (classes, AM/PM, fines, parent messages), now inside. |
| 🗓️ Time Table | everyone | Your SJS Time Table app (routine, free teachers, adjustments), now inside. |
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
