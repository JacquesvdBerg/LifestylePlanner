<template>
    <div>
      <button @click="populateData">Populate Firestore</button>
    </div>
</template>
  
<script>
import { db } from "../../firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';


export default {
  methods: {
    populateData() {
      this.populateWorkouts();
      this.populateMeals();
      alert('Data populated successfully!');
    },
    populateWorkouts() {
      const workoutsData = {
        "Monday": [
          { id: 1, name: "Push-ups", description: "Do 3 sets of 10 reps." },
          // ... other exercises
        ],
        // ... other days
      };

      for (const day in workoutsData) {
        const dayRef = doc(db, "workouts", day);
        setDoc(dayRef, { exercises: workoutsData[day] });
      }
    },
    populateMeals() {
      const mealsData = {
        "Monday": [
          { id: 1, name: "Breakfast", description: "Oatmeal with berries..." },
          // ... other meals
        ],
        // ... other days
      };

      for (const day in mealsData) {
        const dayRef = doc(db, "meals", day);
        setDoc(dayRef, { foods: mealsData[day] });
      }
    }
  }
};
</script>
