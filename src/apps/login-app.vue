<template>Loading</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  try {
    const code = new URLSearchParams(window.location.search).get('code');
    const res = await fetch(
      `https://xkfnmqnr4f.execute-api.eu-central-1.amazonaws.com/default/github-ouath-code-authorization-token-exchange?code=${code}`,
      {
        method: 'POST',
      },
    );
    const data = await res.json();
    if (
      'access_token' in data &&
      'token_type' in data &&
      data.token_type === 'bearer'
    ) {
      window.localStorage.setItem('access_token', data.access_token);
      router.replace('/');
    }
  } catch (reason: unknown) {
    console.error(`failed to login: ${JSON.stringify(reason)}`);
  }
});
</script>
