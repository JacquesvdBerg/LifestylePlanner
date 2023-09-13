<template>
  <div v-if="loadingMeals">Loading...</div>
  <div v-else>
    <h2>{{ currentDay }}'s Meal Plan</h2>
    <div
      class="meal-card"
      v-for="meal in todaysMeals"
      :key="meal.type"
      @click="showMealPopup(meal)"
    >
      <h4 class="meal-item">
        {{ meal.type }} <span class="prepTime">({{ meal.prepTime }} mins)</span>
      </h4>
    </div>

    <!-- Popup -->
    <div class="overlay" v-if="showPopup"></div>

    <div class="popup" v-if="showPopup">
      <button @click="showPopup = false" class="close-button">&times;</button>
      <div class="popup-content">
        <h1 class="meal-type">
          {{ sMeal.type }}
          <span class="prepTime">({{ sMeal.prepTime }} mins)</span>
        </h1>
        <!-- Add more details here -->
        <div class="container-details">
          <div class="left">
            <div class="description">
              <h3 class="type-name">Description</h3>
              {{ sMeal.description }}
            </div>
            <div class="ingredients">
              <h3 class="type-name">Ingredients</h3>
              <ul>
                <li v-for="ingredient in sMeal.ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
            </div>
            <div class="meal-directions">
              <h3 class="type-name">Directions</h3>
              {{ sMeal.directions }}
            </div>
          </div>
          <div class="right">
            <div class="supplements">
              <h3 class="type-name">Supplements</h3>
              <div class="supp-container">
                <h4 class="supp-type">Before the Gym...</h4>
                {{ allMeals[currentDay]?.supplements?.beforeGym }}
                <h4 class="supp-type">After the Gym...</h4>
                {{ allMeals[currentDay]?.supplements?.afterGym }}
                <h4 class="supp-type">In the Morning...</h4>
                {{ allMeals[currentDay]?.supplements?.morning }}
                <h4 class="supp-type">In the Evening...</h4>
                {{ allMeals[currentDay]?.supplements?.evening }}
              </div>
            </div>
            <div class="water-intake">
              <h3 class="type-name">Water Intake</h3>
              <div class="supp-container">
                {{ allMeals[currentDay]?.water }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="loading" class="loading">Loading...</p>
    <p
      v-if="!loading && (!todayWorkout || !todayWorkout.length)"
      class="no-workouts"
    >
      No meals found for today.
    </p>
  </div>
</template>

<style scoped>
li {
  margin: 0; /* Removes margin */
  padding: 4px 0; /* Adds a small padding at the top and bottom */
}
.close-button {
  background: none;
  color: rgb(207, 0, 0);
  font-family: var(--primary-font);
  font-weight: 900;
  font-size: 2.5rem;
  border: none;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 5%;
  /* justify-content: flex-end !important; */
}
.close-button:hover {
  color: #ff4800;
  font-size: 2.9rem;
  transform: scale(1.1);
  cursor: pointer;
}

.prepTime {
  color: #ff4800;
}

.water-intake{
  margin-top: 1.5rem;
}

.left {
  display: flex;
  width: 50%;
  height: 100%;
  padding-right: 1rem;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  display: flex;
  width: 50%;
  height: 100%;
  padding-right: 1rem;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
}

.container-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  height: 100%;
}

.type-name {
  font-family: var(--secondary-font);
  font-weight: 900;
  letter-spacing: 0.5rem;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ff4800;
  color: #ff4800;
}

.supp-type {
  font-family: var(--primary-font);
  font-weight: 900;
  letter-spacing: 0.1rem;
  padding-bottom: 5px;
  padding-top: 20px;
  color: #ff4800;
  text-align: left;
}

.supp-container {
  padding-left: 15px;
}

.meal-type {
  text-align: center;
  text-transform: uppercase;
  background-color: var(--gradient-fire);
}

h2 {
  padding-bottom: 0.5rem;
}

.meal-item {
  text-decoration: none;
  font-family: var(--primary-font);
  font-weight: 400;
  font-size: 1.2rem;
  padding: 0.2rem;
}



.meal-item:hover {
  color: var(--button-bg-color);
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(0.6 * 100vw);
  height: calc(0.8 * 100vh);
  background-color: var(--primary-bg-color);
  border-radius: 5%;
  box-shadow: 0 0 10px 0 rgb(255, 153, 0);
  z-index: 100;
}

.popup-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(12, 12, 12, 0.911);
  z-index: 99;
}

.meal-card {
  cursor: pointer;
}
</style>

<script>
import { db } from "../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      loadingMeals: true,
      allMeals: {},
      showPopup: false, // for controlling the popup display
      supplements: {
        beforeGym: "",
        afterGym: "",
        morning: "",
        evening: "",
      },
      water: "",
      selectedMeal: {}, // to store the selected meal data
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
    todaysMeals() {
      return this.allMeals[this.currentDay]?.meals || [];
    },
  },
  mounted() {
    const mainMealsCollection = collection(db, "Meals");
    const currentDayDocRef = doc(mainMealsCollection, this.currentDay);

    getDoc(currentDayDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.allMeals[this.currentDay] = data;
        this.supplements = data.supplements || this.supplements;
        this.water = data.water || "";
      }
      this.loadingMeals = false;
    });
  },
  methods: {
    showMealPopup(meal) {
      this.sMeal = meal;
      this.showPopup = true;
    },
  },
};
</script>
