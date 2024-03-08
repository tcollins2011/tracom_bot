<template>
    <header class="masthead">
      <div class="logo-container">
        <img src="@/assets/logo_tracom.png" alt="Logo" class="logo" />
      </div>
      <nav class="nav-links">
        <ul>
          <li><router-link to="/">User View</router-link></li>
          <li><router-link to="/detailed-analysis">Detailed View</router-link></li>
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
    box-sizing: border-box;
    margin: 0 auto; 
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000; 
  }
  
  .logo {
    height: 4vh; 
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
  