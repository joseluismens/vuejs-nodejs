<template>
    <div v-if="show" class="snackbar" :class="color">
      <span>{{ message }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      message: String,
      color: String,
    },
  };
  </script>
  
  <style scoped>
  .snackbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    opacity: 0.9;
    transition: opacity 0.3s;
  }
  
  .success {
    background-color: green;
  }
  
  .danger {
    background-color: red;
  }
  </style>
  