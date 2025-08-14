<script setup lang="ts">
import { ref } from 'vue'

const query = `query {
  products {
    id
    name
    description
    price
  }
}`

const loading = ref(false)
const result = ref(null)
const error = ref(null)

async function runQuery() {
  loading.value = true
  result.value = null
  error.value = null
  try {
    result.value = await $fetch('/api/gql', {
      method: 'POST',
      body: { query }
    })
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen p-8 bg-[#f7f7f8] flex flex-col items-center">
    <h1 class="text-xl mb-6">GraphQL Products</h1>
    <button
      class="bg-[#10a37f] text-white rounded-md px-6 py-3 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="loading"
      @click="runQuery"
    >
      {{ loading ? 'Loading...' : 'Test Query' }}
    </button>
    <div
      v-if="error"
      class="w-full max-w-[40rem] mt-6 rounded-md px-6 py-4 bg-white shadow whitespace-pre-wrap border-l-4 border-red-500 text-red-700"
    >
      <pre>{{ error.message ?? error }}</pre>
    </div>
    <div
      v-else-if="result"
      class="w-full max-w-[40rem] mt-6 rounded-md px-6 py-4 bg-white shadow whitespace-pre-wrap"
    >
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </main>
</template>

