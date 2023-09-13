<template>
  <div id="app">
    <div class="header">
      <div></div>
      <div class="container-text">
        <h1 class="main-header-text">JQ Check-in</h1>
        <h4 class="main-header-sub">lifestyle planner</h4>
      </div>
      <div class="menu-bar">
        <button @click="toggleSidebar" class="burger-menu">☰</button>
      </div>
    </div>
    <div class="container">
      <div v-if="showSidebar" class="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Home</li>
          <li>Workouts</li>
          <li>Meal Plans</li>
        </ul>
      </div>
      <div class="content">
        <div class="card">
          <WorkoutComponent />
        </div>
        <div class="card">
          <MealPlanComponent />
        </div>
      </div>
    </div>
    <UploadNewData />
  </div>
</template>

<script>
import WorkoutComponent from "./components/WorkoutComponent.vue";
import MealPlanComponent from "./components/MealPlanComponent.vue";
import UploadNewData from "./components/UploadNewData.vue";

export default {
  name: "App",
  components: {
    WorkoutComponent,
    MealPlanComponent,
    UploadNewData,
  },
  data() {
    return {
      showSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>

<style>
  .gradient-fire {
    background: linear-gradient(
      90deg, 
      var(--header-bg-color), 
      var(--sidebar-bg-color),
      var(--content-bg-color),
      var(--button-bg-color)
    );
  }

  .main-header-text {
    font-size: 3rem;
    margin: 0;
    color: var(--button-bg-color);
    /* background: var(--gradient-fire);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; */
    font-weight: 900;
    letter-spacing: 1.5px;
    font-family: var(--primary-font);
  }

  .main-header-sub {
    padding-top: 10px;
    font-family: var(--secondary-font);
    font-weight: 400;
    letter-spacing: 7.5px;

  }


body {
  background-color: #141414;
  color: #fff;
  text-align: center;
  font-family: Arial, sans-serif;
}

.header {
  background-color: #333;
  color: white;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.menu-bar {
  display: flex;
}

.burger-menu {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
}

.container {
  display: flex;
}

.sidebar {
  background-color: #1e1e1e;
  width: 15%;
  padding: 16px;
  height: 50vh;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}

.card {
  margin: 20px;
  background-color: #333;
  padding: 16px;
  flex-grow: 1;
}

h2 {
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px 0;
}

li:last-child {
  border-bottom: none;
}
</style>
