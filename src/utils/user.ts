import { reactive } from 'vue';

export const user = reactive({
  accessToken: undefined as string | undefined,
  avatar: undefined as string | undefined,
  name: undefined as string | undefined,
});

export async function tokenExchange() {
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
      window.localStorage.setItem(
        'oppskrifteriet.no:access_token',
        data.access_token,
      );
      user.accessToken = data.access_token;
      return true;
    }
  } catch (reason: unknown) {
    console.error(`failed to login: ${JSON.stringify(reason)}`);
    return false;
  }
}

export async function getUser() {
  if (user.name) {
    console.log('user already fetched');
    return;
  }
  if (!user.accessToken) {
    console.warn(`cannot fetch user without accessToken`);
    return;
  }
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    if ('name' in data && typeof data.name === 'string') {
      user.name = data.name;
    }
    if ('avatar_url' in data && typeof data.avatar_url === 'string') {
      user.avatar = data.avatar_url;
    }
    return data;
  } catch (reason: unknown) {
    console.error(`failed to fetch user: ${JSON.stringify(reason)}`);
  }
}

export function init() {
  try {
    const accessToken = window.localStorage.getItem(
      'oppskrifteriet.no:access_token',
    );
    if (typeof accessToken === 'string') {
      user.accessToken = accessToken;
      getUser();
    }
  } catch (reason: unknown) {
    console.warn(
      `Cannot read access_token from localStorage: ${JSON.stringify(reason)}`,
    );
  }
}

export async function createIssue(title: string, body: string) {
  try {
    const res = await fetch(
      'https://api.github.com/repos/deificx/oppskrifteriet/issues',
      {
        body: JSON.stringify({
          title,
          body,
          labels: ['recipe'],
        }),
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.html+json',
          Authorization: `Bearer ${user.accessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    return true;
  } catch (reason: unknown) {
    console.warn(`Cannot create issue: ${JSON.stringify(reason)}`);
    return false;
  }
}
