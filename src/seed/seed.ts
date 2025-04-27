import { mongoDB } from "../config/mongo";
export async function seedDatabase() {
  try {
    const db = mongoDB();
    const studentsCollection = db.collection("students");

    // Check if students already exist (optional if you want idempotency)
    const existingStudents = await studentsCollection.countDocuments();
    if (existingStudents > 0) {
      console.log("✅ Students already exist. Skipping seeding.");
      return;
    }

    // 5 random students
    const students = [
      { name: "John Doe", age: 20 },
      { name: "Jane Smith", age: 22 },
      { name: "Alice Johnson", age: 19 },
      { name: "Bob Brown", age: 21 },
      { name: "Charlie White", age: 23 },
    ];

    await studentsCollection.insertMany(students);
    console.log("✅ Seeded 5 random students into MongoDB");
  } catch (error) {
    console.error("❌ Failed to seed students:", error);
  }
}
