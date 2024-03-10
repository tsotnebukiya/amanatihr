import { faker } from '@faker-js/faker';
// import * as admin from 'firebase-admin';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECTID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECTID}.firebaseio.com`,
});

const firestore = admin.firestore();

const usersCollection = firestore.collection('usersDummy');
const attendanceCollection = firestore.collection('attendanceDummy');

const createDummyEmployees = async () => {
  const dummyEmployees = [];
  for (let i = 0; i < 5; i++) {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const email = faker.internet.email({ firstName: name, lastName: surname });
    const password = faker.internet.password();
    const birthday = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    const image = faker.image.avatar();
    const fakeUser = {
      name,
      surname,
      email,
      password,
      birthday,
      image,
    };
    const userRecord = await admin.auth().createUser({
      email: fakeUser.email,
      password: fakeUser.password,
    });
    const uid = userRecord.uid;
    await usersCollection.doc(uid).set({
      name: fakeUser.name,
      surname: fakeUser.surname,
      birthday: fakeUser.birthday,
      image_url: fakeUser.image,
    });
    dummyEmployees.push(fakeUser);
  }
  return dummyEmployees;
};

const createDummyAttendance = async () => {
  const query = usersCollection.orderBy('birthday');
  const snapshot = await query.get();
  const attendanceRecords = [];
  snapshot.forEach((el) => {
    const userId = el.id;
    const currentDate = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(currentDate.getMonth() - 1);

    for (
      let date = new Date(monthAgo);
      date <= currentDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDate() !== 0) {
        // Generate random number of entries between 1 and 2
        const numberOfEntries = Math.floor(Math.random() * 2) + 1;
        // Calculate total available hours for the day (between 5 and 12)
        const totalHours = Math.floor(Math.random() * 8) + 5;
        // Initialize array to store check-in and check-out times
        const attendanceIntervals = [];

        // Calculate total number of hours for each entry
        let remainingHours = totalHours;
        for (let i = 0; i < numberOfEntries; i++) {
          // Generate random check-in time between 9 AM and 11 AM
          const checkInTime = new Date(date);
          checkInTime.setHours(Math.floor(Math.random() * 2) + 9); // Hours between 9 (9 AM) and 11 (11 AM)
          checkInTime.setMinutes(Math.floor(Math.random() * 60));

          // Calculate maximum possible hours for this entry
          const maxEntryHours = Math.min(remainingHours, 12);

          // Generate random duration for this entry between 1 and the remaining hours or 12, whichever is smaller
          const entryHours = Math.max(
            1,
            Math.floor(Math.random() * maxEntryHours) + 1
          );
          // Calculate check-out time
          const checkOutTime = new Date(checkInTime);
          checkOutTime.setHours(checkInTime.getHours() + entryHours);
          checkOutTime.setMinutes(Math.floor(Math.random() * 60));

          // Subtract entry hours from remaining hours
          remainingHours -= entryHours;

          // Push the attendance interval to the array
          attendanceIntervals.push({ checkInTime, checkOutTime });
        }

        // Store attendance records in the array
        attendanceIntervals.forEach((interval) => {
          const attendanceRecord = {
            check_in: true,
            created_at: interval.checkInTime,
            user_id: userId,
          };
          const checkoutRecord = {
            check_in: false,
            created_at: interval.checkOutTime,
            user_id: userId,
          };
          attendanceRecords.push(attendanceRecord, checkoutRecord);
        });
      }
    }
  });
  // const batch = firestore.batch();
  // attendanceRecords.forEach((record) => {
  //   const newRecordRef = attendanceCollection.doc();
  //   batch.set(newRecordRef, record);
  // });
  // await batch.commit();
  return attendanceRecords;
};

const createDummy = async () => {
  // await createDummyEmployees();
  await createDummyAttendance();
};

createDummy();
