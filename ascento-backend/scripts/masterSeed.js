'use strict';

const { auth, db } = require('../src/config/firebase');
const logger = require('../src/utils/logger');

const masterSeed = async () => {
  try {
    const adminEmail = 'master-admin@ascento.com';
    const adminPassword = 'AscentoMaster@2026';

    console.log(`\n🚀 CLEANING & SEEDING ERP ENGINE...`);

    // 1. DELETE OLD ADMINS (Optional but cleaning up as requested)
    const oldAdmins = ['admin@ascento.com', 'ianutkarsh@gmail.com'];
    for (const email of oldAdmins) {
      try {
        const user = await auth.getUserByEmail(email);
        await auth.deleteUser(user.uid);
        await db.collection('Users').doc(user.uid).delete();
        console.log(`🗑️ Deleted old admin: ${email}`);
      } catch (e) {} // Skip if not found
    }

    // 2. CREATE NEW MASTER ADMIN
    let adminRecord;
    try {
      adminRecord = await auth.createUser({
        email: adminEmail,
        password: adminPassword,
        displayName: 'Master Administrator',
      });
      console.log(`✅ Created Master Admin Auth: ${adminEmail}`);
    } catch (e) {
      adminRecord = await auth.getUserByEmail(adminEmail);
      console.log(`❕ Admin auth already exists: ${adminEmail}`);
    }

    await auth.setCustomUserClaims(adminRecord.uid, { role: 'Admin' });
    await db.collection('Users').doc(adminRecord.uid).set({
      Name: 'Master Administrator',
      Email: adminEmail,
      Role: 'Admin',
      CreatedAt: new Date().toISOString()
    });
    console.log(`✅ Synced Master Admin Firestore Profile`);

    // 3. SEED DUMMY ENQUIRIES
    console.log(`\n📩 Seeding Enquiries...`);
    const enquiries = [
      { fullName: "Aryan Sharma", email: "aryan@example.com", phoneNumber: "9876543210", classInterested: "Abacus Level 1", message: "Interested in demo class", status: "new" },
      { fullName: "Priya Patel", email: "priya@example.com", phoneNumber: "9123456780", classInterested: "Vedic Maths", message: "Looking for weekend batch", status: "contacted" },
      { fullName: "Rohit Verma", email: "rohit@example.com", phoneNumber: "8887776665", classInterested: "Brain Gym", message: "Price details please?", status: "new" }
    ];

    for (const enq of enquiries) {
      await db.collection('enquiries').add({
        ...enq,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log(`✅ Seeded ${enquiries.length} Enquiries`);

    // 4. SEED DUMMY STUDENTS
    console.log(`\n🎓 Seeding Students...`);
    const students = [
      { studentName: "Kabir Singh", studentId: "ASC-1001", course: "Abacus Level 3", batchCode: "B-SUN-10", admissionDate: new Date().toISOString() },
      { studentName: "Ananya Roy", studentId: "ASC-1002", course: "Vedic Maths", batchCode: "B-SAT-02", admissionDate: new Date().toISOString() },
      { studentName: "Ishaan Mehta", studentId: "ASC-1003", course: "Abacus Level 1", batchCode: "B-MON-05", admissionDate: new Date().toISOString() }
    ];

    for (const std of students) {
      await db.collection('students').add({
        ...std,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log(`✅ Seeded ${students.length} Students`);

    // 5. SEED DUMMY STATS (Manual adjustments for counters if needed, but Firestore counts them on fly)
    console.log(`\n✨ MASTER SEEDING COMPLETE! ✨`);
    console.log(`-----------------------------------`);
    console.log(`LOGIN EMAIL   : ${adminEmail}`);
    console.log(`LOGIN PASSWORD: ${adminPassword}`);
    console.log(`DASHBOARD URL : http://localhost:3000/admin`);
    console.log(`-----------------------------------`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

masterSeed();
