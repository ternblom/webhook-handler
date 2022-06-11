# webhook-handler

# steps

1. Clone the repo `https://github.com/ternblom/webhook-handler.git`
2. Create the file `.env`
3. Add the following content

```sh
NODE_ENV=development
PORT=3500
LOGS_FOLDER=/usr/src/webhook-handler/logs
ACCOUNT_SID=
AUTH_TOKEN=
MY_TWILIO_NUMBER=
TWILIO_VERIFY_SERVICE=
```

3. Change the PORT if needed
4. Check the file `run.sh`

# endpoints

## GET

- **DOMAIN_URL**/api/v1 -> to check if the api is working
- **DOMAIN_URL**/api/v1/logs -> to send data

## POST

- **DOMAIN_URL**/api/v1/twilio/verify -> to send a verification code

> Body paramters:
>
> - number

- **DOMAIN_URL**/api/v1/twilio/message -> to send a message
  Body paramters:

> Body paramters:
>
> - number
> - message
