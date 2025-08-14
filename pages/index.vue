<script setup lang="ts">
import { computed } from 'vue'

const query = `query {
  products {
    id
    name
    description
    price
  }
}`

const { data, error } = await useFetch('/api/gql', {
  method: 'POST',
  body: { query }
})

const products = computed(() => data.value?.data?.products ?? [])
</script>

<template>
  <main>
    <h1>Products</h1>
    <p v-if="error">Error: {{ error.message }}</p>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p v-if="product.price">Price: {{ product.price }}</p>
      </li>
    </ul>
  </main>
</template>
