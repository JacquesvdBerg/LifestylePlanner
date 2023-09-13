<template>
  <div class="workouts-container">
    <h2>{{ currentDay }}'s Wourkout Plan</h2>
    <div v-if="!loading && todayWorkout && todayWorkout.length">
      <div class="flex">
        <div
          class="workout-card"
          v-for="workout in todayWorkout"
          :key="workout.name"
        >
          <h3>{{ workout.name }}</h3>
          <p>{{ workout.description }}</p>
          <p v-if="workout.reps">Repetitions: {{ workout.reps }}</p>
          <p v-if="workout.sets">Sets: {{ workout.sets }}</p>
        </div>
      </div>
    </div>
    <p v-if="loading" class="loading">Loading...</p>
    <p
      v-if="!loading && (!todayWorkout || !todayWorkout.length)"
      class="no-workouts"
    >
      No workouts found for today.
    </p>
  </div>
</template>

<script>
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      todayWorkout: [],
      loading: true,
    };
  },
  computed: {
    currentDay() {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[new Date().getDay()];
    },
  },
  async mounted() {
    // Fetching the specific day's document from Workouts collection
    const currentDayDocRef = doc(db, "Workouts", this.currentDay);

    // Getting the data from the document for the current day
    const currentDayDocSnapshot = await getDoc(currentDayDocRef);
    if (currentDayDocSnapshot.exists()) {
      this.todayWorkout = currentDayDocSnapshot.data().workouts;
    }

    this.loading = false;
  },
};
</script>

<style scoped>
.workouts-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.workout-card {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.workout-card h3 {
  margin-top: 0;
  color: #fff;
}

.workout-card p {
  margin: 10px 0;
}

.loading,
.no-workouts {
  text-align: center;
  font-weight: bold;
  color: #777;
}

.flex {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}
</style>
