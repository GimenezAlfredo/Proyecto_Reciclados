import 'dotenv/config';

export default {
  expo: {
    name: "Reciclap",
    slug: "reciclap",
    extra: {
      apiUrl: process.env.API_URL
    }
  }
};
