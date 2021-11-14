## Notes

<!-- ?Problem -->

-Hot reloading is not working on some operating systems after React17

<!-- ?Solution -->

-so move back to older version to fix it

#### Older React Version

```
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-scripts": "3.4.3",
```

#### Current React Version

```
"react": "^17.0.1",
"react-dom": "^17.0.1",
"react-scripts": "4.0.0",
```

#### Alternative fix

.env file in the root
FAST_REFRESH=FALSE

<!-- .env file credentials -->

REACT_APP_AUTH_DOMAIN = dev-fehdvemv.us.auth0.com
REACT_APP_AUTH_CLIENT_ID = c0uRA9k05vZm2OdQhrZkjymvn5hY7Qlp
REACT_APP_STRIPE_PUBLIC_KEY =pk_test_51JM2fQLQlBBvQByqORnC1mJ3N5XlYZuUcNgoCXWvR4ZQ58I3t61T33ER4QggntU0zbUpobGN3jDYxjAqnCKNiIOM00eQ5Rf3jW
REACT_APP_STRIPE_SECRET_KEY =sk_test_51JM2fQLQlBBvQByqtCPkQrAf0jJ9eW346baySIHN7APpOhmq2BWbvWN4dUjqcczVKuxaeWcwh9M8JUvXEs1bnG1U00mZFz1MQA
