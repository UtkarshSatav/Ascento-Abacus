'use strict';

const { db } = require('../../config/firebase');

const getDayBounds = (date = new Date()) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
};

const getMonthBounds = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
};

const getDashboardAnalytics = async () => {
  const now = new Date();
  const { start: startOfToday, end: endOfToday } = getDayBounds(now);
  const { start: startOfMonth, end: endOfMonth } = getMonthBounds(now);

  // Firestore queries
  const [
    studentsSnap,
    teachersSnap,
    classesSnap,
    subjectsSnap,
    newStudentsSnap,
    newTeachersSnap,
    attendanceTodaySnap,
    feesPaidSnap,
    feesPendingSnap,
    upcomingMeetingsSnap,
    recentNoticesSnap,
    recentEnquiriesSnap,
  ] = await Promise.all([
    db.collection('students').count().get(),
    db.collection('teachers').count().get(),
    db.collection('classes').count().get(),
    db.collection('subjects').count().get(),
    db.collection('students').where('createdAt', '>=', startOfToday).where('createdAt', '<', endOfToday).count().get(),
    db.collection('teachers').where('createdAt', '>=', startOfToday).where('createdAt', '<', endOfToday).count().get(),
    db.collection('attendance').where('date', '>=', startOfToday).where('date', '<', endOfToday).get(),
    db.collection('fees').where('paymentStatus', '==', 'paid').where('paymentDate', '>=', startOfMonth).where('paymentDate', '<', endOfMonth).get(),
    db.collection('fees').where('paymentStatus', '==', 'pending').get(),
    db.collection('meetings').where('meetingDate', '>=', startOfToday).orderBy('meetingDate').orderBy('startTime').limit(5).get(),
    db.collection('notifications').where('status', '==', 'active').orderBy('createdAt', 'desc').limit(5).get(),
    db.collection('enquiries').orderBy('createdAt', 'desc').limit(5).get(),
  ]);

  // Aggregate attendance percentage manually as Firestore counts are simple
  const attendanceDocs = attendanceTodaySnap.docs;
  const attendanceTotal = attendanceDocs.length;
  const attendancePresent = attendanceDocs.filter(doc => doc.data().status === 'present').length;
  const attendanceTodayPercentage = attendanceTotal > 0 ? Math.round((attendancePresent / attendanceTotal) * 100 * 100) / 100 : 0;

  // Aggregate fees collected
  let feesCollectedThisMonth = 0;
  feesPaidSnap.forEach(doc => { feesCollectedThisMonth += doc.data().amount || 0; });

  // Aggregate pending fees
  let pendingFees = 0;
  feesPendingSnap.forEach(doc => { pendingFees += doc.data().amount || 0; });

  return {
    totalStudents: studentsSnap.data().count,
    totalTeachers: teachersSnap.data().count,
    totalClasses: classesSnap.data().count,
    totalSubjects: subjectsSnap.data().count,
    newStudentsToday: newStudentsSnap.data().count,
    newTeachersToday: newTeachersSnap.data().count,
    attendanceTodayPercentage,
    feesCollectedThisMonth,
    pendingFees,
    upcomingMeetings: upcomingMeetingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    recentNotices: recentNoticesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    recentEnquiries: recentEnquiriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
  };
};

module.exports = {
  getDashboardAnalytics,
};
