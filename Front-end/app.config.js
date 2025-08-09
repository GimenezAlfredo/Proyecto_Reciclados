import 'dotenv/config';

export default {
  expo: {
    name: "MiApp",
    slug: "miapp",
    extra: {
      apiUrl: process.env.API_URL
    }
  }
};
