<!-- UploadNewData.vue -->
<template>
    <div>
      <!-- Upload Meals -->
      <div class="upload-section">
        <h2>Upload Meals</h2>
        <input type="file" ref="mealsFile" @change="handleFileCache('meals')" />
        <button @click="handleFileUpload('meals')">Upload to Meals</button>
      </div>
  
      <!-- Upload Workouts -->
      <div class="upload-section">
        <h2>Upload Workouts</h2>
        <input type="file" ref="workoutsFile" @change="handleFileCache('workouts')" />
        <button @click="handleFileUpload('workouts')">Upload to Workouts</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { db } from "../../firebaseConfig";
  import { collection, addDoc } from 'firebase/firestore';
  
  export default {
    setup() {
      const mealsFile = ref(null);
      const workoutsFile = ref(null);
  
      const handleFileCache = (type) => {
        let fileInput;
  
        if (type === 'meals') {
          fileInput = mealsFile.value;
        } else if (type === 'workouts') {
          fileInput = workoutsFile.value;
        }
  
        if (fileInput && fileInput.files[0]) {
          const file = fileInput.files[0];
          const reader = new FileReader();
  
          reader.onload = (event) => {
            const parsedData = JSON.parse(event.target.result);
            // Cache this data to local storage
            localStorage.setItem(`${type}Data`, JSON.stringify(parsedData));
          };
  
          reader.readAsText(file);
        }
      };
  
      const handleFileUpload = async (type) => {
        let collectionName;
  
        if (type === 'meals') {
          collectionName = 'Meals';
        } else if (type === 'workouts') {
          collectionName = 'Workouts';
        }
  
        const cachedData = localStorage.getItem(`${type}Data`);
  
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const col = collection(db, collectionName);
          await addDoc(col, parsedData);
        }
      };
  
      return {
        mealsFile,
        workoutsFile,
        handleFileCache,
        handleFileUpload,
      };
    },
  };
  </script>
  
  <style scoped>
  .upload-section {
    margin-bottom: 20px;
  }
  </style>
  