<template>
  <div class="ShopOnlineRegister-page">
    <BackButton />
    <h1>How to Register when shopping online</h1>

    <div class="row g-4">
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut1"
          title="Step 1: Enter Registration Page"
          description="User clicks the Sign Up button to enter the registration page."
          bgColor="#FFF5E1"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut2"
          title="Step 2: Fill in Basic Information"
          description="User enters basic details such as name, email, or phone number."
          bgColor="#EDEBFE"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut1"
          title="Step 3: Set Password"
          description="User creates a strong password that meets security requirements."
          bgColor="#D1FAE5"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut2"
          title="Step 4: Confirm Password"
          description="User re-enters the password to confirm it matches."
          bgColor="#FEF9C3"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut1"
          title="Step 5: Accept Terms"
          description="User reviews and accepts the platform’s Terms and Conditions."
          bgColor="#FEE2E2"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut2"
          title="Step 6: Submit Registration"
          description="User clicks the Register or Sign Up button to complete the process."
          bgColor="#DBEAFE"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <TutorialCard
          :icon="tut1"
          title="Step 7: Verify Email/Phone"
          description="User checks email or SMS for a verification code and completes the registration."
          bgColor="#F3E8FF"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/BackButton.vue'
import TutorialCard from '../components/Tutorialcard.vue'


import tut1 from '../assets/tut1.png'
import tut2 from '../assets/tut2.png'
</script>

<style scoped>
.ShopOnlineRegister-page {
  text-align: center;
  padding: 20px;
}
h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.ShopOnlineRegister-page :deep(.tutorial-card) {
  width: 100%;
  height: 100%;
}
</style>
