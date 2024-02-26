<template>
    <header class="masthead">
      <div class="logo-container">
        <!-- Assuming you have a logo image in your assets folder -->
        <img src="@/assets/logo_tracom.png" alt="Logo" class="logo" />
      </div>
      <nav class="nav-links">
        <ul>
          <li><router-link to="/">User View</router-link></li>
          <li><router-link to="/detailed-analysis">Detailed View</router-link></li>
          <!-- Add more navigation links here -->
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Masthead-Nav',
  };
  </script>
  
  <style>
  .masthead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #003651;
    color: #fff;
    padding: 1rem;
    height: 7vh;
    width:100%;
    box-sizing: border-box; /* Ensure padding doesn't affect the total width */
    margin: 0 auto; /* Center the masthead if there's any horizontal margin */
    position: fixed; /* Make the masthead fixed at the top */
    top: 0;
    left: 0;
    z-index: 1000; /* Ensure it's above other content */
  }
  
  .logo-container {
    /* Adjustments if needed */
  }
  
  .logo {
    height: 4vh; /* Adjust based on your logo's size */
  }
  
  .nav-links ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  .nav-links li {
    margin-right: 2rem;
  }
  
  .nav-links a {
    color: #fff;
    text-decoration: none;
  }
  </style>
  