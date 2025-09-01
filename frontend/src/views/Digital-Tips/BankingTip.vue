<template>
  <div class="tip-body">
    <h2 class="tip-title">Banking: balances, transfers, and payments</h2>

    <!-- Activities / tiles inside the tip -->
    <div class="grid">
      <article class="card">
        <h3>Check account balance</h3>
        <ul>
          <li>On the accounts home, click the account <em>tile</em> to open details and recent transactions.</li>
          <li>Or use <strong>View accounts</strong> in the top navigation → <strong>Transactions</strong>.</li>
          <li>Filters like <em>Last 30 days</em> or <em>Custom range</em> help narrow results.</li>
        </ul>
      </article>

      <article class="card">
        <h3>Transfer between your accounts</h3>
        <ul>
          <li>Open <strong>Transfer</strong> (or <strong>Pay/Transfer</strong> in the menu).</li>
          <li>Select <strong>From</strong> and <strong>To</strong> accounts, enter the amount and a description.</li>
          <li>Tip: use <strong>Schedule</strong> for automatic saving (e.g., weekly).</li>
        </ul>
      </article>

      <article class="card">
        <h3>Pay someone (third party)</h3>
        <ul>
          <li>Go to <strong>Pay/Transfer</strong> → <strong>Pay someone</strong>.</li>
          <li>Enter BSB &amp; Account (or PayID), amount, and a reference the recipient will see.</li>
          <li>Save the payee for next time and keep the receipt number.</li>
        </ul>
      </article>

      <article class="card">
        <h3>BPAY a bill</h3>
        <ul>
          <li>Open <strong>BPAY</strong> in payments.</li>
          <li>Enter the <strong>Biller Code</strong> and <strong>CRN/Reference</strong> from your bill, amount, and the <strong>From</strong> account.</li>
          <li>Save the biller and consider scheduling before the due date.</li>
        </ul>
      </article>
    </div>

    <!-- Interactive practice -->
    <BankingPractice :image-src="image" :hotspots="hotspots" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import BankingPractice from '@/components/digital-tips/BankingPractice.vue'

// Put your screenshot at: src/assets/digital-tips/banking/mock-netbank.png
// (you can replace with any image later)
import image from '@/assets/digital-tips/banking/mock-netbank.png'

// Hotspot rectangles are percentages relative to the image.
// Tune x,y,w,h by eye to fit your screenshot.
const hotspots = reactive([
  { name:'View accounts (header)', x:24, y:6,  w:12, h:6,  task:'Check account balance', msg:'Open “View accounts” to list all accounts.', correct:false },
  { name:'Accounts tiles area',    x:9,  y:22, w:45, h:55, task:'Check account balance', msg:'Click an account tile to see details.',     correct:false },
  { name:'Pay/Transfer (menu)',    x:57, y:6,  w:16, h:6,  task:'Pay someone',           msg:'Use Pay/Transfer to pay a person/business.',correct:false },
  { name:'BPAY panel (right)',     x:66, y:36, w:20, h:20, task:'BPAY a bill',           msg:'Start a BPAY from this panel.',            correct:false },
  { name:'Transfer panel (right)', x:66, y:60, w:20, h:18, task:'Transfer between accts',msg:'Use Transfer to move money internally.',   correct:false },
])
</script>

<style scoped>
.tip-body{ display:block }
.tip-title{ margin:0 0 12px; font-size:28px; line-height:1.2 }
.grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; margin:12px 0 16px }
.card{ background:#fff; border:1px solid #eee; border-radius:14px; padding:12px }
.card h3{ margin:0 0 6px }
.card ul{ margin:0; padding-left:18px }
</style>
